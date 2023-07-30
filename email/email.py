import smtplib
from email.mime.multipart import MIMEMultipart

password = ""  # Your Password
fromaddr = ""  # Your Email

toaddr = "vivekghuge2002@gmail.com"
msg = MIMEMultipart()
msg['From'] = "aryan.mamidwar20@vit.edu"  # Your Email Id
msg['Subject'] = "Test mail for CN CP"
body = '''Hello this is a test mail for CN Course Project proof of concept.'''

s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login(fromaddr, password)
text = msg.as_string()
s.sendmail(fromaddr, toaddr, text)

s.quit()
