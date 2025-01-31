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
var mysql = require('mysql2');
//const bcrypt = require('bcrypt');
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*')//https://www.itraktech.com
  res.header("Access-Control-Allow-Headers", '*')
  //res.header("Access-Control-Allow-Credentials", true)
  next()
});



/**********************
 * Example get method *
 **********************/

/*app.get('/checkstdtattendance', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});*/

app.get('/checkstdtattendance', (req, res) => {
  //res.json({message: "Hello from itrak server! We are pretty okay now!"});
      //res.json({message: "Ready to connect"});
      let conresult = 'Ready to connect';
      const conn_string = {
          host: "logindb.cn280y6asncv.us-east-1.rds.amazonaws.com",
          user: "root",//root
          password: "ROOTuser12!",//;e_xbAi*f0ae
          database: "itrakedu"
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
          //let cur_date1 = new Date();
          let attend_date = req.query.attend_date;
          let stdt_id = req.query.stdt_id;
          let term = req.query.term;
          //let stdt_id = 'oluwsupo0001';
          //let cur_date2 = cur_date1.toString();
          console.log(attend_date);
          //console.log(cur_date1);
          //console.log(cur_date2);
          /*let yr = cur_date.getFullYear();
          let mth = cur_date.getMonth()+1;
          let day = cur_date.getDate();
          //let attend_date = cur_date.toLocaleDateString();
          let attend_date = yr + '-' + mth + '-' + day;
          let stdt_id = req.query.student_id;
          let term = '1st';
          if(9<=mth<=12) term = '1st';
          else if(1<=mth<=4) term = '2nd';
          else if(5<=mth<=8) term = '3rd';
          console.log(attend_date);
          //res.send(reply);*/
          let sql = "select session_id from itrakedu.acad_sessions where session_start <= '" + attend_date + "' and session_end >= '" + attend_date + "'";
          //let sql = "select session_id from itrakedu.acad_sessions where session_start <= '2024-09-21' and session_end >= '2024-09-21'";
          //let sql = "SELECT pwd from itrak_user WHERE email_addr="+"'"+req.query.user_id+"'";
          //let sql = "INSERT INTO itrak_user (email_addr, pwd, user_type) VALUES (" + req.query.email_addr + "," + req.query.pwd + "," +req.query.user_type + ")";
          con.query(sql, function (err, result) {
              if(err) throw err;
              if (result.length) {
                  console.log(result);
                  let sess_id = result[0].session_id;
                  let sql2 = "select week, sunday, monday, tuesday, wednesday, thursday, friday, saturday, week_start, week_end from itrakedu.attendance where student_id='"+ stdt_id +"' and session_id='" + sess_id + "' and term='"+ term +"'";
                  con.query(sql2, function (err, attend_result) {
                      if (attend_result.length) {
                          console.log(attend_result);
                          res.send({'status':'OK', 'session_id':sess_id, 'attendance_table':attend_result});
                      }
                      else {
                          conresult = "No attendance record found!";
                          console.log(conresult);
                          res.send({'status':'ERR', 'details':conresult});
                      }   
                  });
                  /*var i = 0;
                  result.forEach(element => {
                       console.log("Query Result" + i + ": " + result[i].user_type + " " + result[i].email_addr + " " + result[i].pwd);
                      i++;
                  });*/
              } else {
                  conresult = "No academic session record found!";
                  console.log(conresult);
                  res.send({'status':'ERR', 'details':conresult});
              }
              con.end((err)=>{
                 if(err) throw err;
              });
          });
      });
//      res.json({success: 'check stdt attendance call succeed!', url: req.url, body: conn_string});
});

app.get('/checkstdtattendance/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/checkstdtattendance', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/checkstdtattendance/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/checkstdtattendance', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/checkstdtattendance/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/checkstdtattendance', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/checkstdtattendance/*', function(req, res) {
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
