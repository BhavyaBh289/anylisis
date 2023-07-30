const fs = require("fs");
const axios = require("axios");
const { spawn } = require('child_process');

let twitterAPIAutomation = () => {
  const jsonFilePath = "./tempTweet.json";

  fs.access(jsonFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist.");
    } else {
      fs.readFile(jsonFilePath, "utf-8", async (err, jsonData) => {
        if (err) {
          console.error("Error reading JSON file:", err);
        } else {
          try {
            const jsonArray = JSON.parse(jsonData);
            // console.log("JsONArray ==> ",jsonArray);
            // console.log("JSONData ==>  ",jsonData)
            runPythonScript(jsonData)
            .then((result) => {
              console.log('************Result From Python:***********\n');
              console.log(result);
              console.log("\n----------------------------------------------");
            })
            .catch((error) => {
              console.error('Error:', error.message);
            });
            for (const jsonObject of jsonArray) {
              try {
                const response = await axios.post(
                  "http://localhost:8050/api/tour/addTweets",
                  jsonObject
                );
                // console.log("Response:", response.data);
              } catch (error) {
                console.error("Error making POST request:", error);
              }
            }
            fs.unlink(jsonFilePath, (err) => {
              if (err) {
                console.error("Error deleting JSON file:", err);
              } else {
                console.log("JSON file deleted successfully.");
              }
            });
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      });
    }
  });
};

function runPythonScript(dataToSend) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["./my_script.py"]);
    pythonProcess.stdout.on("data", (data) => {
      resolve(data.toString().trim());
    });
    pythonProcess.on("error", (error) => {
      reject(error);
    });
    pythonProcess.stdin.write(dataToSend + "\n");
    pythonProcess.stdin.end();
  });
}

setInterval(twitterAPIAutomation, 80000);
