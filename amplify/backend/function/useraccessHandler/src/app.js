/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const session = require('express-session');
const uuid = require('uuid');
//const {RedisStore} = require ("connect-redis");
//const {createClient} = require ("redis");
const cookieparser = require('cookie-parser');
var mysql = require('mysql2');
const bcrypt = require('bcryptjs');//bcrypt does not work on aws due to linux env
// declare a new express app
const app = express();
//const sessionStore = new session.MemoryStore();
const saltRounds = 10; 
let userSession = [
    {
        user_logged_in: false,
        userid: 1,
        username: "user1",
        view: 0,
        cookie: {
          expires: ''
        }
    }
]
//var user_sessions = {};
/*app.use(cors({
  origin: ["https://www.itraktech.com"],//http://localhost:3000
  methods: ["GET","POST","PUT","DELETE","OPTIONS","PATCH"],
  allowedHeaders: '*',
  credentials: true
}));*/
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}));
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cookieparser());
//////app.set('trust proxy', 1)//trust first proxy

/*//Initialize client
let redisClient = createClient();
redisClient.connect().catch(console.error);

//Initialize store
let redisStore = new RedisStore({
  client: redisClient,
  preix: "itrakuser"
});*/

//Initialize session storage
app.use(
  session({
      key: "auth_token",
      //store: redisStore,
      resave: "false",
      saveUninitialized: "true",
      secret: "loginsession",
      cookie: {
          maxAge: 1000 * 60 * 60 * 144,
          httpOnly: true,
          secure: true,
          //rolling: false
          //sameSite: true
      }
  })
)

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')//'https://www.itraktech.com'
  res.header("Access-Control-Allow-Headers", '*')
  //res.header("Access-Control-Allow-Credentials", true)
  next()
});

app.use(express.json());

/*
#app.config['MAIL_SERVER'] = 'smtpout.secureserver.net'
#app.config['MAIL_PORT'] = '465'
#app.config['MAIL_USE_TLS'] = 'False'
#app.config['MAIL_USE_SSL'] = 'True'
#app.config['MAIL_USERNAME'] = 'info@itraktech.com'
#app.config['MAIL_PASSWORD'] = 'itrakT25#'
#app.config['MAIL_DEFAULT_SENDER'] = 'info@itraktech.com'
*/
/*redisClient.on('error',(err) => {
  console.log(err);
});*/
/**********************
 * Example get method *
 **********************/

app.get('/newuser', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/newuser/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/newuser', function(req, res) {
      //res.json({message: "Ready to connect"});
      let conresult = 'Ready to connect';
      let user_license = 'None';
      const conn_string = {
          host: "logindb.cn280y6asncv.us-east-1.rds.amazonaws.com",
          user: "root",//root
          password: "ROOTuser12!",//;e_xbAi*f0ae
          database: "logindb"
      };
      const mailsender = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true, //SSL
        secureConnection: 'false',
        auth: {
          user: 'info@itraktech.com',
          pass: 'itrakT25#'
        }
      });
      const loginHeader = `
        display:flex;
        justify-content:space-between;
        align-content:center;
        position:relative; 
        width:stretch; 
        height:80px; 
        margin:10px; 
        padding:20px; 
        border:5px solid rgba(0,0,0,0.05); 
        background-color:rgba(206, 231, 230, 0.15);`
      
        const bodyContainer = `
        position:relative; 
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-content:center;
        width:auto; 
        height:auto; 
        margin:10px; 
        padding:20px; 
        border:1px solid rgba(0,0,0,0.05); 
        background-color: rgba(0,0,0,0.03);`

      const bodyContent = `
        display:inline-block; 
        justify-content:left; 
        min-width:300; 
        height:auto; 
        padding:20px; 
        background-color:white; 
        font-size: 1.2em; 
        align-content:left;`

      const footerContainer = `
        display:grid;
        justify-content:center;
        align-content:center;
        background-color: #aeaeae;
        position:relative; 
        width:auto; 
        height:180px; 
        margin:10px; 
        padding:20px;`

      const footerLinks = `
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        justify-content: space-around;
        text-decoration:none;`
        
      const logoImg = `
        width:40px;
        height:60px;
        margin:10px;`

      const email_string = {
          from: "Itrak Technology Company <info@itraktech.com>",
          to: req.query.email_addr,
          cc: "admin@itraktech.com",
          replyTo: "info@itraktech.com",//;e_xbAi*f0ae
          subject: "ITRAK Academic App Registration",
      //  text: "Hello User! Thank you for choosing our software to monitor and boost the performance of your students.\n\nKindly see your registration details below:\n\nUsername: " + req.query.email_addr + "\nUser Type: " + req.query.user_type + "\n\nBest Regards, \n\nService Delivery Team\nItrak Technology Company Ltd",
          html: `<div style="` + loginHeader + `">` +
                      `<h1>iTrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo" style="` + logoImg  +`"/>
                  </div>
                  <div style="` + bodyContainer  +`" id="body-container"> 
                    <h1>Software License Registration</h1>
                    <p style="` + bodyContent  +`">
                      Hello User! Thank you for choosing our software to monitor and boost the performance of your students.
                      <br />
                      <br />
                      Kindly see your registration details below:
                      <br />
                      <br />
                      Username: ` + req.query.email_addr + 
                      `<br />
                      User Type: ` + req.query.user_type + 
                      `<br />
                      User License: ` + user_license + 
                      `<br />
                      <br />
                      Please visit our website: www.itraktech.com to submit a Request For Quote - RFQ, 
                      in order to purchase or renew your License.                    
                      <br />
                      <br />
                      Best Regards,
                      <br />
                      <br />
                      Support Team
                      <br />
                      Itrak Technology Company Ltd
                    </p>
                  </div>
                  <div style="` + footerContainer  +`">
                    <img src="itrak-logo.png" id="company-logo" style="` + logoImg  +`"/>
                    <div style="` + footerLinks  +`">
                      <a href="www.itraktech.com">Contact Us</a>
                      <a href="www.itraktech.com">Terms &amp; Conditions</a>
                      <a href="www.itraktech.com">Purchase License</a>
                      <a href="www.itraktech.com">Renew License</a>
                    </div>
                    <p>Copyright 2024 iTrak Software is a licensed product of iTrak Technology Company Ltd</p>
                  </div>`
        };


                  
                    mailsender.sendMail(email_string)
                    .then((info) => {
                      console.log('Email sent: ', info.response)
                      conresult = 'OK';
                      res.send(conresult);
                    })
                    .catch ((err) =>{
                    console.error('Error sending email: ', err)
                    res.send('Error sending email: ', err);
                    });
                  

                  
                  
/*/
      var con = mysql.createConnection({
          host: conn_string.host,
          user: conn_string.user,//root
          password: conn_string.password,//;e_xbAi*f0ae
          database: conn_string.database
      });
      
      con.connect(function(err) {
          if(err) {       
              conresult = 'Error: Unable to connect to database.';
              console.log(conresult + ": " + err);
              throw err;
          }
          console.log("Connected!");
          conresult = "Successfully connected to " + conn_string.user + '@' + conn_string.host;
          console.log(conresult);
          //let sql1 = "SELECT * from itrak_user";
          bcrypt.hash(req.query.pwd,saltRounds,(err,hash)=>{
              if(err) throw err;
              //let sql = "INSERT INTO itrak_user (email_addr, pwd, user_type) VALUES (" + "'" + req.query.email_addr +  "'" + "," +  "'" + req.query.pwd +  "'" + "," +  "'" + req.query.user_type +  "'" + ")";
              let sql = "INSERT INTO itrak_user (email_addr, pwd, user_type) VALUES (" + "'" + req.query.email_addr +  "'" + "," +  "'" + hash +  "'" + "," +  "'" + req.query.user_type +  "'" + ")";
              con.query(sql, function (err, result) {
                  if(err) throw err;
                  console.log("1 new user record inserted.");
                  /*var i = 0;
                  result.forEach(element => {
                       console.log("Query Result" + i + ": " + result[i].user_type + " " + result[i].email_addr + " " + result[i].pwd);
                      i++;
                  });*/
/*/                  conresult = 'OK';
                  console.log(conresult);

                  try {
                    mail_resp = mailsender.sendMail(email_string);
                    console.log('Email sent: ', mail_resp.response)
                    res.send(conresult);
                  } 
                  catch (error) {
                    console.error('Error sending email: ', err)
                    res.send('Error sending email: ', err);
                  }
                  
  
                  con.end((err)=>{
                      if(err) throw err;
                  });
              });
          })
  
      });
/*/      //res.send(conresult);
//  res.json({success: 'post call succeed!', url: req.url, body: conn_string})
});

app.post('/newuser/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.get('/checkregusersession', (req, res) => {
  console.log(req);
  console.log(req.cookies);
  if(req.cookies.user_token){
    const token = req.cookies.user_token;
    console.log(token);
    if(userSession[token]){
      console.log(userSession[token]);
      userSession[token].view_no = (userSession[token].view_no)? userSession[token].view_no + 1 : 1;
      console.log(userSession[token]);

      if(userSession[token].user_logged_in){
        console.log("User is still logged in.");
        res.send({"user_valid":true, "userID":userSession[token].userid});//,  "session": req.session
      }else{
        console.log("Session expired or does not exist");
        res.send({"user_valid":false, "sessions": userSession});//,  "session": req.session
      }
    }
  }else{
    console.log("Session does not exist");
    res.send({"user_valid":false, "sessions": userSession});
  }
});

app.get('/removeregusersession', (req, res) => {
  console.log(req.session);
  if(req.session.user_logged_in){
      req.session.destroy();
      console.log("User has been removed.");
      res.send(true);
  }else{
      console.log("Session already expired/removed or does not exist");
      res.send(false);
  }
});

app.get('/checkreguser', (req, res) => {
  //res.json({message: "Hello from itrak server! We are pretty okay now!"});
      //res.json({message: "Ready to connect"});
      console.log(req);
      console.log(req.cookies);
      /*console.log(req.sessionID);
      console.log(req.session);*/
      if(req.cookies.user_token){
        const token = req.cookies.user_token;
        console.log(token);
        if(userSession[token]){
          console.log(userSession[token]);
          userSession[token].user_logged_in = false;
        }
      }

      //console.log(req.url);
      let conresult = 'Ready to connect';
      const conn_string = {
          host: "logindb.cn280y6asncv.us-east-1.rds.amazonaws.com",
          user: "root",//root
          password: "ROOTuser12!",//;e_xbAi*f0ae
          database: "logindb"
      };
      var con = mysql.createConnection({
          host: conn_string.host,
          user: conn_string.user,//root
          password: conn_string.password,//;e_xbAi*f0ae
          database: conn_string.database
      }); 
      
      con.connect(function(err) {
          if(err) {       
              conresult = 'Error: Unable to connect to database.';
              console.log(conresult + ": " + err);
              throw err;
          }
          console.log("Connected!");
          conresult = "Successfully connected to " + conn_string.user + '@' + conn_string.host;
          console.log(conresult);
          
          let sql = "SELECT pwd from itrak_user WHERE email_addr="+"'"+req.query.user_id+"'";
          //let sql = "INSERT INTO itrak_user (email_addr, pwd, user_type) VALUES (" + req.query.email_addr + "," + req.query.pwd + "," +req.query.user_type + ")";
          con.query(sql, function (err, result) {
              if(err) throw err;
              if (result.length) {
                  let userpwd = result[0].pwd;
                  console.log("Submitted pwd: "+req.query.pwd);
                  console.log("pwd for "+req.query.user_id+" is: "+ userpwd);
                  /*var i = 0;
                  result.forEach(element => {
                       console.log("Query Result" + i + ": " + result[i].user_type + " " + result[i].email_addr + " " + result[i].pwd);
                      i++;
                  });*/
                  bcrypt.compare(req.query.pwd,userpwd,(err,comp_resp)=>{
                      if(err) throw err;
                      conresult = comp_resp;
                      console.log("Password Match: " + conresult);
                      console.log(req.query);
                      if (conresult) {
                          console.log("Remember Login:" + req.query.rem_login);
                          if(req.query.rem_login=='true'){//remember user login
                              const sessiontoken = uuid.v4();
                              console.log(sessiontoken);
                              const expireAt = 1000 * 60 * 60 * 1440;
                              res.cookie("user_token", sessiontoken, {
                                maxAge: expireAt,    
                                httpOnly: true,
                                secure: true                                
                              });
                              userSession[sessiontoken] =     {
                                user_logged_in: conresult,
                                userid: req.query.user_id,
                                username: "user1",
                                view: 1,
                                cookie: {
                                  expires: expireAt//change to date
                                }
                            }
                              ////req.session.user_logged_in = conresult;
                              //req.session.view_no = (req.session.view_no)? req.session.view_no + 1 : 1;
                              ////req.session.userid = req.query.user_id;
                              //req.session.save();
                              
                              //req.session.token = sessiontoken;
                              
                              //const sessiontoken = req.sessionID;
                              
                              /*res.cookie("login_token", sessiontoken, {
                                maxAge: 1000 * 60 * 60 * 144,
                                httpOnly: true,
                                secure: true
                                //sameSite: true
                            });*/
                              ////console.log(sessiontoken);
                              ////console.log(req.cookies);
                              ////console.log(req.sessionID);
                              ////console.log(req.session);
                              //req.session.save();
                          }
                          //req.session.user = conresult;
                          //req.session.userid = req.query.user_id;

                          res.send({"user_valid": conresult, "sessions": userSession});//
                      } else {
                          res.send("Wrong username or password. Pls check your inputs and try again!")
                      }
                      
                  })
                  /*conresult = (req.query.pwd==userpwd)? true:false;
                  console.log(conresult);
                  res.send(conresult);*/
              } else {
                  conresult = "User doesn't exist!";
                  console.log(conresult);
                  res.send(conresult);
              }
              con.end((err)=>{
                 if(err) throw err;
              });
          });
      });
//res.json({success: 'check reg user call succeed!', url: req.url, body: conn_string})
});
/****************************
* Example put method *
****************************/

app.put('/newuser', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/newuser/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/newuser', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/newuser/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
