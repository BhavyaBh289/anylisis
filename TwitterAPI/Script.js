let flag = true ;
let tweetsData = [] ;
let index = 0 ;

let swapComponent = () => {
   flag = !flag ;
   console.log("flag is.........",flag);
    if(flag){
        history.forward();
    }else{
        history.back();
        getTweets();
    }
}

let getTweets  = () => { 
       var tmp = document.querySelector(".css-1dbjc4n.r-1loqt21.r-18u37iz.r-1ny4l3l.r-1udh08x.r-1qhn6m8.r-i023vh.r-o7ynqc.r-6416eg");
        //console.log(tmp.innerText);
        data = tmp.innerText.split("\n");
        // name = data[0];
       username = data[1];
       tweet = "" ;
      for(let i=4;i<data.length;i++){
            tweet = tweet + data[i] + " " ;
      }
       //console.log(data);
       console.log(username);
      console.log(tweet);
      const currDate = new Date();
      const options = { timeZone: 'Asia/Kolkata' };
      const today = currDate.toLocaleDateString();
      const indianTime = currDate.toLocaleTimeString('en-IN', options);
      let obj = {
        "name" : data[0] ,
        "username" : data[1] ,
        "tweet" : tweet,
        "time" : indianTime ,
        "date" : today ,
      }
    //   let temp = [] ;
    //   temp[0] = data[0];
    //   temp[1] = username ;
    //   temp[2] = tweet ;
     if(index==0 || tweetsData[tweetsData.length-1].tweet != tweet ){
      tweetsData[index++] = obj ;
        }
    }

let storeToLocal = () => {
  let newData = JSON.stringify(tweetsData);
  localStorage.setItem('myData', newData) ;

  const jsonData = localStorage.getItem('myData');

if (jsonData) {
  try {
    const data = JSON.parse(jsonData);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'tempTweet.json';
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error('Error processing data:', error);
  }
} else {
  console.error('No data found in localStorage.');
}
localStorage.clear();
}

setInterval(swapComponent,3000);

setInterval(storeToLocal,60000);

// setTimeout(()=>{
//   fs.writeFileSync("./tweets.json",
//   JSON.stringify(tweetsData));
// },15000);

// var fetchTweets = setInterval(function(){
 
//     if(flag) {
//       var tmp = document.querySelector(".css-1dbjc4n.r-1loqt21.r-18u37iz.r-1ny4l3l.r-1udh08x.r-1qhn6m8.r-i023vh.r-o7ynqc.r-6416eg");
//         //console.log(tmp.innerText);
//         data = tmp.innerText.split("\n");
//         name = data[0];
//        username = data[1];
//        tweet = "" ;
//       for(let i=4;i<data.length;i++){
//             tweet = tweet + data[i] + " " ;
//       }
//        //console.log(data);
//        console.log(username);
//       console.log(tweet);
//       let temp = [] ;
//       temp[0] = username ;
//       temp[1] = tweet ;
//      if(index==0 || !tweetsData[tweetsData.length-1].includes(tweet)){
//       tweetsData[index++] = temp ;
//         }
//     }
// },7000);