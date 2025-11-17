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
        //res.json({message: "Ready to connect"});
      let conresult = 'Ready to connect';
      //let user_license = 'None'; req.query.students_no + ` students for ` + req.query.duration
      let dollar_rate = 1500;//naira per dollar from DB based on http req location
      const user_currency = 'NGN';//currency from DB based on http req location
      let per_user_mthly_license_cost = 6.99;//in dollar  from DB based on http req location
      let lic_cost = req.query.students_no * req.query.duration * per_user_mthly_license_cost * dollar_rate;
      let autorenew_license = (req.query.autorenew) ? "Yes" : "No";
      let account_no = '0168032083';// from DB
      let bank_name = 'Guaranty Trust Bank';// from DB
      const curDate = new Date();
      const curYear = curDate.getFullYear();
      const curMonth = curDate.getMonth() + 1;
      const curDay = curDate.getDate();
      const RFQ_Date = curDate.toString();
      const school_names = req.query.school.split(" ");
      const firstletters = school_names.map(name => name[0]);
      const school_id = firstletters.toString().replace(/,/g, "") + curDay + curMonth + curYear;
      
      const currency_formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: user_currency
      });
      const license_cost = currency_formatter.format(lic_cost);

      console.log(school_id);
      console.log(RFQ_Date);

      const conn_string = {
          host: "logindb.cn280y6asncv.us-east-1.rds.amazonaws.com",
          user: "root",//root
          password: "ROOTuser12!",//;e_xbAi*f0ae
          database: "logindb"
      };
      const mailsender = nodemailer.createTransport({
        host: 'smtp.office365.com', //'smtpout.secureserver.net',
        port: 587, //465,
        //secure: true, //SSL
        secureConnection: 'true',
        auth: {
          user: 'info@itraktech.com',
          pass: 'itrakT25#'
        }
      });
      const loginHeader = `
        width:stretch; 
        min-height:80px; 
        margin:10px; 
        padding:20px; 
        border:5px solid rgba(0,0,0,0.05); 
        background-color:rgba(206, 231, 230, 0.85);`;
      
      const bodyContainer = `
        align-content:center;
        width:auto; 
        height:auto; 
        margin:10px; 
        padding:20px; 
        border:1px solid rgba(0,0,0,0.05); 
        background-color: rgba(0,0,0,0.03);`;

      const bodyContent = `
        display:inline-block; 
        min-width:300; 
        height:auto; 
        padding:20px; 
        background-color:white; 
        font-size: 1.2em; 
        text-align:left;`;

      const footerContainer = `
        align-content:center;
        background-color: #aeaeae;
        width:auto; 
        height:180px; 
        margin:10px; 
        padding:20px;`;

      const footerLinks = `
        justify-content: space-around;
        text-decoration:none;`;
        
      const logoImg = `
        width:40px;
        height:60px;
        margin:0px;`;
//newuser?email_addr=' + email_addr + '&school=' + school + '&students_no=' + studentsNo + '&duration=' + duration + '&autorenew=' + autorenew)
          //API.post(itrakacadAPI, '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type)
      const email_string = {
          from: "Itrak Technology Company <info@itraktech.com>",
          to: req.query.email_addr,
          cc: "admin@itraktech.com",
          replyTo: "info@itraktech.com",//;e_xbAi*f0ae
          subject: "ITRAK Academic App Licensing",
      //  text: "Hello User! Thank you for choosing our software to monitor and boost the performance of your students.\n\nKindly see your registration details below:\n\nUsername: " + req.query.email_addr + "\nUser Type: " + req.query.user_type + "\n\nBest Regards, \n\nService Delivery Team\nItrak Technology Company Ltd",
          html: `<div style="` + loginHeader + `">` +
                  `<table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left"><img src="itrak-logo.png" id="company-logo" style="` + logoImg  +`"/></td>
                        <td align="center"><h1 style="text-align:center";>ITrak Technology Company Limited</h1></td>
                        <td align="right"><h3 style="text-align:right"; "margin-left:50px">(RC-8893573)</h3></td>
                      </tr>
                    </table>
                    <div style="margin:0 auto">
                      <p style="text-align:center"; "font-size:1.2em">Electrical Engineering, Electronics Manufacturing, Software Development and ICT Services.</p>
                    </div>
                  </div>
                  <div style="` + bodyContainer  +`" id="body-container"> 
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center"><h2 style="text-align:center">Software License Quotation Request</h2></td>
                      </tr>
                      <tr>
                        <td align="center">
                          <p style="` + bodyContent  +`">
                            Dear User, 
                            <br />
                            <br />
                            Thank you for choosing our software to monitor and boost the performance of your students.
                            <br />
                            <br />  
                            Kindly see your information and request details below:
                            <br />
                            <br />
                            Username: <strong>` + req.query.email_addr + `</strong> 
                            <br />
                            School: <strong>` + req.query.school + `</strong>
                            <br />
                            School Representative: <strong>` + req.query.school_rep + `</strong>
                            <br />
                            Rep's Phone No: <strong>` + req.query.phone_no + `</strong>
                            <br />
                            No of Students to be registered: <strong>` + req.query.students_no + `</strong>
                            <br />
                            License Duration: <strong>` + req.query.duration + `</strong> months
                            <br />
                            Autorenew License: <strong>` + autorenew_license + `</strong>
                            <br />
                            <br /> 
                            License Cost for <strong>` + req.query.students_no + `</strong> students for <strong>` + req.query.duration + `</strong> months: <strong>` + license_cost + `</strong>
                            <br />
                            <br /> 
                            Kindly pay the required sum of <strong>` + license_cost + `</strong> into below account:
                            <br />
                            <br />
                            Account No: <strong>` + account_no + `</strong>
                            <br />
                            Bank: <strong>` + bank_name + `</strong>
                            <br />
                            <br />
                            After payment, please reply this email with your payment details.                    
                            <br />
                            <br />
                            Best Regards,
                            <br />
                            <br />
                            Support Team
                            <br />
                            Itrak Technology Company Ltd
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div style="` + footerContainer  +`">
                    <img src="itrak-logo.png" id="company-logo" style="` + logoImg  +`"/>
                    <div style="` + footerLinks  +`">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="left" style="padding:20"><a href="www.itraktech.com">Contact Us</a></td>
                          <td align="right" style="padding:20"><a href="www.itraktech.com">Terms &amp; Conditions</a></td>
                        </tr>
                        <tr>
                          <td align="left" style="padding:20"><a href="www.itraktech.com">Purchase License</a></td>
                          <td align="right" style="padding:20"><a href="www.itraktech.com">Renew License</a></td>
                        </tr>
                      </table>
                    </div>
                    <p style="text-align:center">Copyright 2024 iTrak Software is a licensed product of iTrak Technology Company Limited. All rights reserved.</p>
                  </div>`
        };

    mailsender.sendMail(email_string)
    .then((info) => {              
      console.log('Email sent: ', info.response)
      //conresult = 'OK';                      

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
        //*bcrypt//  bcrypt.hash(req.query.pwd,saltRounds,(err,hash)=>{
        //*bcrypt//      if(err) throw err;
              //let sql = "INSERT INTO itrak_user (email_addr, pwd, user_type) VALUES (" + "'" + req.query.email_addr +  "'" + "," +  "'" + req.query.pwd +  "'" + "," +  "'" + req.query.user_type +  "'" + ")";
              let sql = "INSERT INTO licenses (email_addr, school, school_id school_rep, phone_no, students_no, duration, autorenew, rfq_date) VALUES (" + "'" + req.query.email_addr +  "'" + "," + "'" + req.query.school +  "'" + "," + "'" + school_id +  "'" + "," + "'" + req.query.school_rep +  "'" + "," + "'" + req.query.phone_no +  "'" + "," + "'" + req.query.students_no +  "'" + "," +  "'" + req.query.duration +  "'" + "," + "'" + autorenew_license +  "'" + "," + "'" + RFQ_Date +  "'" + ")";
              con.query(sql, function (err, result) {
                  if(err) throw err;
                  console.log("1 new RFQ record inserted.");
                  /*var i = 0;
                  result.forEach(element => {
                       console.log("Query Result" + i + ": " + result[i].user_type + " " + result[i].email_addr + " " + result[i].pwd);
                      i++;
                  });*/
                  conresult = 'OK';
                  console.log(conresult);
                  res.send(conresult);
                  });
  
                  con.end((err)=>{
                      if(err) throw err;
                  });
        //*bcrypt//      });
          });
    })
    .catch ((err) =>{
      console.error('Error sending email: ', err)
      res.send('Invalid email');
    });
  //res.json({success: 'get call succeed!', url: req.url});
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
        host: 'smtp.office365.com', //'smtpout.secureserver.net',
        port: 587, //465,
        //secure: true, //SSL
        secureConnection: 'true',
        auth: {
          user: 'info@itraktech.com',
          pass: 'itrakT25#'
        }
      });
      const loginHeader = `
        width:stretch; 
        min-height:80px; 
        margin:10px; 
        padding:20px; 
        border:5px solid rgba(0,0,0,0.05); 
        background-color:rgba(206, 231, 230, 0.85);`;
      
      const bodyContainer = `
        align-content:center;
        width:auto; 
        height:auto; 
        margin:10px; 
        padding:20px; 
        border:1px solid rgba(0,0,0,0.05); 
        background-color: rgba(0,0,0,0.03);`;

      const bodyContent = `
        display:inline-block; 
        min-width:300; 
        height:auto; 
        padding:20px; 
        background-color:white; 
        font-size: 1.2em; 
        text-align:left;`;

      const footerContainer = `
        align-content:center;
        background-color: #aeaeae;
        width:auto; 
        height:180px; 
        margin:10px; 
        padding:20px;`;

      const footerLinks = `
        justify-content: space-around;
        text-decoration:none;`;
        
      const logoImg = `
        width:40px;
        height:60px;
        margin:0px;`;

      const email_string = {
          from: "Itrak Technology Company <info@itraktech.com>",
          to: req.query.email_addr,
          cc: "admin@itraktech.com",
          replyTo: "info@itraktech.com",//;e_xbAi*f0ae
          subject: "ITRAK Academic App Registration",
      //  text: "Hello User! Thank you for choosing our software to monitor and boost the performance of your students.\n\nKindly see your registration details below:\n\nUsername: " + req.query.email_addr + "\nUser Type: " + req.query.user_type + "\n\nBest Regards, \n\nService Delivery Team\nItrak Technology Company Ltd",
          html: `<div style="` + loginHeader + `">` +
                  `<table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="left"><img src="itrak-logo.png" id="company-logo" style="` + logoImg  +`"/></td>
                        <td align="center"><h1 style="text-align:center";>ITrak Technology Company Limited</h1></td>
                        <td align="right"><h3 style="text-align:right"; "margin-left:50px">(RC-8893573)</h3></td>
                      </tr>
                    </table>
                    <div style="margin:0 auto">
                      <p style="text-align:center"; "font-size:1.2em">Electrical Engineering, Electronics Manufacturing, Software Development and ICT Services.</p>
                    </div>
                  </div>
                  <div style="` + bodyContainer  +`" id="body-container"> 
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center"><h2 style="text-align:center">Software License Registration</h2></td>
                      </tr>
                      <tr>
                        <td align="center">
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
                            Please visit our website: <a href="www.itraktech.com">www.itraktech.com</a> to submit a Request For Quote - RFQ, 
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
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div style="` + footerContainer  +`">
                    <img src="itrak-logo.png" id="company-logo" style="` + logoImg  +`"/>
                    <div style="` + footerLinks  +`">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="left" style="padding:20"><a href="www.itraktech.com">Contact Us</a></td>
                          <td align="right" style="padding:20"><a href="www.itraktech.com">Terms &amp; Conditions</a></td>
                        </tr>
                        <tr>
                          <td align="left" style="padding:20"><a href="www.itraktech.com">Purchase License</a></td>
                          <td align="right" style="padding:20"><a href="www.itraktech.com">Renew License</a></td>
                        </tr>
                      </table>
                    </div>
                    <p style="text-align:center">Copyright 2024 iTrak Software is a licensed product of iTrak Technology Company Limited. All rights reserved.</p>
                  </div>`
        };

    mailsender.sendMail(email_string)
    .then((info) => {              
      console.log('Email sent: ', info.response)
      //conresult = 'OK';                      

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
                  conresult = 'OK';
                  console.log(conresult);
                  res.send(conresult);
                  });
  
                  con.end((err)=>{
                      if(err) throw err;
                  });
              });
          });
    })
    .catch ((err) =>{
      console.error('Error sending email: ', err)
      res.send('Invalid email');
    });
      //res.send(conresult);
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
