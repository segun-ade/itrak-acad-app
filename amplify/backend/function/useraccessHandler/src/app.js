/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const session = require('express-session');
const cookieparser = require('cookie-parser');
var mysql = require('mysql2');
const bcrypt = require('bcryptjs');//bcrypt does not work on aws due to linux env
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cookieparser());
//app.set('trust proxy', 1)//trust first proxy

app.use(
  session({
      key: "userid",
      secret: "loginsession",
      resave: "false",
      saveUninitialized: "true",
      cookie: {
          maxAge: 1000 * 60 * 60 * 24,
          //secure: true
      }
  })
)

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


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
  
                  con.end((err)=>{
                      if(err) throw err;
                  });
              });
          })
  
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
  console.log(req.session);
  console.log(req.sessionID);
  req.session.view_no = (req.session.view_no)? req.session.view_no + 1 : 1;
  res.cookie('userID', "itrak user"+req.session.view_no);
  req.session.user_identity = "itrak_user"+req.session.view_no;
  console.log(req.session);
  if(req.session.user){
      console.log("User is still logged in.");
      res.send({"user_valid":true, "userID":req.session.userid});//,  "session": req.session
  }else{
      console.log("Session expired or does not exist");
      res.send({"user_valid":false});//,  "session": req.session
  }
});

app.get('/removeregusersession', (req, res) => {
  console.log(req.session);
  if(req.session.user){
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
      console.log(req.url);
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
                          if(req.query.rem_login==true){//remember user login
                              console.log(req.session);
                              req.session.user = conresult;
                              //req.session.view_no = (req.session.view_no)? req.session.view_no + 1 : 1;
                              req.session.userid = req.query.user_id;
                              console.log(req.session);
                          }
                          req.session.user = conresult;
                          req.session.userid = req.query.user_id;

                          res.send({"user_valid": conresult});//, "session": req.session
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
