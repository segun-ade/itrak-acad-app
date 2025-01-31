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
/*
app.get('/checkstdtperformance', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});
*/
app.get('/checkstdtperformance', (req, res) => {
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
          let perf_date = req.query.perf_date;
          let stdt_id = req.query.stdt_id;
          let sess_id = req.query.sess_id;
          let term = req.query.term;
          let perf_trend = [''];
          let trend_count = 0;
          //let stdt_id = 'oluwsupo0001';
          //let cur_date2 = cur_date1.toString();
          console.log(perf_date);
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
          let sql = "SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='" + stdt_id + "' and subject_offering.term='" + term + "' and subject_offering.session_id='" + sess_id + "'";
          //let sql = "select session_id from itrakedu.acad_sessions where session_start <= '" + attend_date + "' and session_end >= '" + attend_date + "'";
          //let sql = "select session_id from itrakedu.acad_sessions where session_start <= '2024-09-21' and session_end >= '2024-09-21'";
          //let sql = "SELECT pwd from itrak_user WHERE email_addr="+"'"+req.query.user_id+"'";
          //let sql = "INSERT INTO itrak_user (email_addr, pwd, user_type) VALUES (" + req.query.email_addr + "," + req.query.pwd + "," +req.query.user_type + ")";
          con.query(sql, function (err, term_result) {
              if(err) throw err;
              if (term_result.length) {
                  console.log(term_result);
                  let sql2 = "SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='" + stdt_id + "' and performance.assessment_date='" + perf_date + "'";
                  con.query(sql2, function (err, day_perf_result) {
                      if(err) throw err;
                      if (day_perf_result.length) {
                          console.log(day_perf_result);
                          for (let index = 0; index < day_perf_result.length; index++) {
                              let title =day_perf_result[index].title;
                              console.log(title);
                              let sql3 = "SELECT performance.score FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='" + stdt_id + "' and performance.assessment_date<'" + perf_date + "' and subjects.title='" + title + "'";
                              con.query(sql3, function (err, perf_trend_result) {
                                  if(err) throw err;

                                  if (perf_trend_result.length) {
                                      console.log(perf_trend_result[0]);
                                      let cur_score = parseInt(day_perf_result[index].score);
                                      let prev_score = parseInt(perf_trend_result[0].score);
                                      console.log(cur_score + ': '+prev_score);
                                      if (cur_score > prev_score){
                                          console.log(cur_score + ': '+prev_score + ' up');
                                          perf_trend[index] = 'up';
                                      }else if (cur_score < prev_score){
                                          console.log(cur_score + ': '+prev_score + ' down');
                                          perf_trend[index] = 'down';
                                      }else if (cur_score == prev_score){
                                          console.log(cur_score + ': '+prev_score + ' same');
                                          perf_trend[index] = 'same';
                                      }
                                      console.log(perf_trend[index]);
                                      //res.send({'status':'OK', 'session_id':perf_date, 'attendance_table':day_perf_result});
                                  }
                                  else {
                                      console.log('none');
                                      perf_trend[index] = 'none';
                                      //perf_trend_result = "No previous record found for " + perf_date + "!";
                                      console.log(perf_trend_result);
                                      //res.send({'status':'ERR', 'details':conresult});
                                  } 
                                  console.log(perf_trend);
                                  trend_count++;
                                  if(trend_count == day_perf_result.length){
                                      res.send({'status':'OK', 'day_perf':day_perf_result, 'perf_trend':perf_trend, 'term_perf':term_result});
                                      con.end((err)=>{
                                      if(err) throw err;
                                      });  
                                  }
                              });  
                          }
                      }
                      else {
                          day_perf_result = "No performance record found for given date: " + perf_date + "!";
                          console.log(day_perf_result);
                          res.send({'status':'ERR', 'details':day_perf_result});
                          con.end((err)=>{
                              if(err) throw err;
                           });
                      }   
                  });
              } else 
              {
                  term_result = "No performance record found!";
                  console.log(term_result);
                  res.send({'status':'ERR', 'details':term_result});
                  con.end((err)=>{
                      if(err) throw err;
                   });
              }
          });
      });
//      res.json({success: 'check stdt performance call succeed!', url: req.url, body: conn_string})
});

app.get('/checkstdtassignment', (req, res) => {
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
          let perf_date = req.query.perf_date;
          let stdt_id = req.query.stdt_id;
          let sess_id = req.query.sess_id;
          let term = req.query.term;
          let perf_trend = [''];
          let trend_count = 0;
          console.log(perf_date);
          let sql = "SELECT subjects.title, assignments.page_no, assignments.question_no, assignments.score, assignments.assignment_date FROM itrakedu.assignments inner join itrakedu.subject_offering on assignments.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='" + stdt_id + "' and subject_offering.term='" + term + "' and subject_offering.session_id='" + sess_id + "'";
          con.query(sql, function (err, term_result) {
              if(err) throw err;
              if (term_result.length) {
                  console.log(term_result);
                  let sql2 = "SELECT subjects.title, assignments.page_no, assignments.question_no, assignments.score, assignments.assignment_date FROM itrakedu.assignments inner join itrakedu.subject_offering on assignments.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='" + stdt_id + "' and assignments.assignment_date='" + perf_date + "'";
                  con.query(sql2, function (err, day_asgnmt_result) {
                      if(err) throw err;
                      if (day_asgnmt_result.length) {
                          console.log(day_asgnmt_result);
                          for (let index = 0; index < day_asgnmt_result.length; index++) {
                              let title =day_asgnmt_result[index].title;
                              console.log(title);
                              let sql3 = "SELECT assignments.score FROM itrakedu.assignments inner join itrakedu.subject_offering on assignments.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='" + stdt_id + "' and assignments.assignment_date<'" + perf_date + "' and subjects.title='" + title + "'";
                              con.query(sql3, function (err, asgnmt_trend_result) {
                                  if(err) throw err;

                                  if (asgnmt_trend_result.length) {
                                      console.log(asgnmt_trend_result[0]);
                                      let cur_score = parseInt(day_asgnmt_result[index].score);
                                      let prev_score = parseInt(asgnmt_trend_result[0].score);
                                      console.log(cur_score + ': '+prev_score);
                                      if (cur_score > prev_score){
                                          console.log(cur_score + ': '+prev_score + ' up');
                                          perf_trend[index] = 'up';
                                      }else if (cur_score < prev_score){
                                          console.log(cur_score + ': '+prev_score + ' down');
                                          perf_trend[index] = 'down';
                                      }else if (cur_score == prev_score){
                                          console.log(cur_score + ': '+prev_score + ' same');
                                          perf_trend[index] = 'same';
                                      }
                                      console.log(perf_trend[index]);
                                  }
                                  else {
                                      console.log('none');
                                      perf_trend[index] = 'none';
                                      console.log(asgnmt_trend_result);
                                  } 
                                  console.log(perf_trend);
                                  trend_count++;
                                  if(trend_count == day_asgnmt_result.length){
                                      res.send({'status':'OK', 'day_asgmt':day_asgnmt_result, 'asgmt_perf_trend':perf_trend, 'term_asgmt':term_result});
                                      con.end((err)=>{
                                      if(err) throw err;
                                      });  
                                  }
                              });  
                          }
                      }
                      else {
                          day_asgnmt_result = "No assignment record found for given date: " + perf_date + "!";
                          console.log(day_asgnmt_result);
                          res.send({'status':'ERR', 'details':day_asgnmt_result});
                          con.end((err)=>{
                              if(err) throw err;
                           });
                      }   
                  });
              } else 
              {
                  term_result = "No assignment record found!";
                  console.log(term_result);
                  res.send({'status':'ERR', 'details':term_result});
                  con.end((err)=>{
                      if(err) throw err;
                   });
              }
          });
      });
//      res.json({success: 'check stdt assignment call succeed!', url: req.url, body: conn_string})
});

app.get('/checkstdtactivity', (req, res) => {
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
      let perf_date = req.query.perf_date;
      let stdt_id = req.query.stdt_id;
      let sess_id = req.query.sess_id;
      let term = req.query.term;
      let perf_trend = [''];
      let trend_count = 0;
      console.log(perf_date);
      let sql = "SELECT extra_cur_activity.title, extra_cur_activity.score, extra_cur_activity.date FROM itrakedu.extra_cur_activity where extra_cur_activity.student_id='" + stdt_id + "' and extra_cur_activity.term='" + term + "' and extra_cur_activity.session_id='" + sess_id + "'";
      con.query(sql, function (err, term_result) {
          if(err) throw err;
          if (term_result.length) {
              console.log(term_result);
              let sql2 = "SELECT extra_cur_activity.title, extra_cur_activity.score, extra_cur_activity.date FROM itrakedu.extra_cur_activity where extra_cur_activity.student_id='" + stdt_id + "' and extra_cur_activity.date='" + perf_date + "'";
              con.query(sql2, function (err, day_perf_result) {
                  if(err) throw err;
                  if (day_perf_result.length) {
                      console.log(day_perf_result);
                      for (let index = 0; index < day_perf_result.length; index++) {
                          let title =day_perf_result[index].title;
                          console.log(title);
                          let sql3 = "SELECT extra_cur_activity.score FROM itrakedu.extra_cur_activity where extra_cur_activity.student_id='" + stdt_id + "' and extra_cur_activity.date<'" + perf_date + "' and extra_cur_activity.title='" + title + "'";
                          con.query(sql3, function (err, perf_trend_result) {
                              if(err) throw err;

                              if (perf_trend_result.length) {
                                  console.log(perf_trend_result[0]);
                                  let cur_score = parseInt(day_perf_result[index].score);
                                  let prev_score = parseInt(perf_trend_result[0].score);
                                  console.log(cur_score + ': '+prev_score);
                                  if (cur_score > prev_score){
                                      console.log(cur_score + ': '+prev_score + ' up');
                                      perf_trend[index] = 'up';
                                  }else if (cur_score < prev_score){
                                      console.log(cur_score + ': '+prev_score + ' down');
                                      perf_trend[index] = 'down';
                                  }else if (cur_score == prev_score){
                                      console.log(cur_score + ': '+prev_score + ' same');
                                      perf_trend[index] = 'same';
                                  }
                                  console.log(perf_trend[index]);
                              }
                              else {
                                  console.log('none');
                                  perf_trend[index] = 'none';
                                  console.log(perf_trend_result);
                              } 
                              console.log(perf_trend);
                              trend_count++;
                              if(trend_count == day_perf_result.length){
                                  res.send({'status':'OK', 'day_xtra_cur':day_perf_result, 'xtra_cur_perf_trend':perf_trend, 'term_xtra_cur':term_result});
                                  con.end((err)=>{
                                  if(err) throw err;
                                  });  
                              }
                          });  
                      }
                  }
                  else {
                      day_perf_result = "No Extra-curricular activity record found for given date: " + perf_date + "!";
                      console.log(day_perf_result);
                      res.send({'status':'ERR', 'details':day_perf_result});
                      con.end((err)=>{
                          if(err) throw err;
                       });
                  }   
              });
          } else 
          {
              term_result = "No Extra-curricular activity record found!";
              console.log(term_result);
              res.send({'status':'ERR', 'details':term_result});
              con.end((err)=>{
                  if(err) throw err;
               });
          }
      });
  });
//  res.json({success: 'check stdt activity call succeed!', url: req.url, body: conn_string})
});

app.get('/checkstdtnews', (req, res) => {
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
      let perf_date = req.query.perf_date;
      let stdt_id = req.query.stdt_id;
      let sess_id = req.query.sess_id;
      let term = req.query.term;
      let perf_trend = [''];
      let trend_count = 0;
      console.log(perf_date);
      let sql = "SELECT news.title, news.read_status, news.news_date FROM itrakedu.news where news.student_id='" + stdt_id + "' and news.term='" + term + "' and news.session_id='" + sess_id + "'";
      con.query(sql, function (err, term_result) {
          if(err) throw err;
          if (term_result.length) {
              console.log(term_result);
              let sql2 = "SELECT news.title, news.score, news.news_date FROM itrakedu.news where news.student_id='" + stdt_id + "' and news.news_date='" + perf_date + "'";
              con.query(sql2, function (err, day_news_result) {
                  if(err) throw err;
                  if (day_news_result.length) {
                      console.log(day_news_result);
                      for (let index = 0; index < day_news_result.length; index++) {
                          let title =day_news_result[index].title;
                          console.log(title);
                          let sql3 = "SELECT news.score FROM itrakedu.news where news.student_id='" + stdt_id + "' and news.news_date<'" + perf_date + "' and news.title='" + title + "'";
                          con.query(sql3, function (err, news_trend_result) {
                              if(err) throw err;

                              if (news_trend_result.length) {
                                  console.log(news_trend_result[0]);
                                  let cur_score = parseInt(day_news_result[index].score);
                                  let prev_score = parseInt(news_trend_result[0].score);
                                  console.log(cur_score + ': '+prev_score);
                                  if (cur_score > prev_score){
                                      console.log(cur_score + ': '+prev_score + ' up');
                                      perf_trend[index] = 'up';
                                  }else if (cur_score < prev_score){
                                      console.log(cur_score + ': '+prev_score + ' down');
                                      perf_trend[index] = 'down';
                                  }else if (cur_score == prev_score){
                                      console.log(cur_score + ': '+prev_score + ' same');
                                      perf_trend[index] = 'same';
                                  }
                                  console.log(perf_trend[index]);
                              }
                              else {
                                  console.log('none');
                                  perf_trend[index] = 'none';
                                  console.log(news_trend_result);
                              } 
                              console.log(perf_trend);
                              trend_count++;
                              if(trend_count == day_news_result.length){
                                  res.send({'status':'OK', 'day_news':day_news_result, 'news_perf_trend':perf_trend, 'term_news':term_result});
                                  con.end((err)=>{
                                  if(err) throw err;
                                  });  
                              }
                          });  
                      }
                  }
                  else {
                      day_perf_result = "No news or message found for given date: " + perf_date + "!";
                      console.log(day_perf_result);
                      res.send({'status':'ERR', 'details':day_perf_result});
                      con.end((err)=>{
                          if(err) throw err;
                       });
                  }   
              });
          } else 
          {
              term_result = "No news or message found!";
              console.log(term_result);
              res.send({'status':'ERR', 'details':term_result});
              con.end((err)=>{
                  if(err) throw err;
               });
          }
      });
  });
//  res.json({success: 'check stdt news call succeed!', url: req.url, body: conn_string});
});

/*
app.get('/message', (req, res) => {
  res.json({message: "Hello from itrak server! We are pretty okay now!"});
});
app.get('/time', (req, res) => {
  let cur_date = new Date();
  let attend_date = cur_date.getDate();
  let attend_day = cur_date.getDay();
  let attend_yr = cur_date.getFullYear();
  let attend_mth = cur_date.getMonth();
  let reply = "Date: "+attend_date+"  Year: "+attend_yr+"  Week Day: "+attend_day+"  Month: "+attend_mth;
  console.log(reply);
  res.send(reply);
  //let time = new Date();
  //res.json({time: "Current time is:" + time.toTimeString()});
  //res.json({Date: cur_date.toLocaleDateString()});
});

app.get('/my_dt', (req, res) => {
  let mynew_dt = cur_dt.myDateTime();
  res.json(mynew_dt);
});

app.get('/my_db', (req, res) => {
  let conn_result = db_mod.connectdb();
  let mynew_dt = cur_dt.myDateTime();
  res.json(mynew_dt + ": " + conn_result);
});

app.listen(8000, () => {
  console.log('itrak server is now running on port 8000');
});

http.createServer((req, res) => {
  
  fs.readFile('chat sessions record.txt', function(err, data){
      res.writeHead(200, {'Content-type': 'text/html'});
      res.write(data);
      res.end();
  });
}).listen(8080);
*/
/*SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='oluwsupo0001' and performance.assessment_date<'2024-08-09' and subjects.title='ENGLISH LANGUAGE'; */
/*SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='oluwsupo0001' and performance.assessment_date='2024-08-06'; */
/*select `week`, sunday, monday, tuesday, wednesday, thursday, friday, saturday, week_start, week_end from itrakedu.attendance where student_id='oluwsupo0001' and session_id='2024/2025' and term='1st'; */

/*SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='oluwsupo0001' and performance.assessment_date='2024-08-09';
SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='oluwsupo0001' and performance.assessment_date<'2024-08-09' and subjects.title='ENGLISH LANGUAGE';
SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='oluwsupo0001' and subject_offering.term='1st' and subject_offering.session_id='2024/2025' and subjects.title='MATHS';
SELECT performance.assessment_type, subjects.title, performance.score, performance.assessment_date FROM itrakedu.performance inner join itrakedu.subject_offering on performance.offering_id=subject_offering.offering_id inner join itrakedu.subjects on subject_offering.subject_id=subjects.subject_id where subject_offering.student_id='oluwsupo0001' and subject_offering.term='1st' and subject_offering.session_id='2024/2025'; */
app.get('/checkstdtperformance/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/checkstdtperformance', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/checkstdtperformance/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/checkstdtperformance', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/checkstdtperformance/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/checkstdtperformance', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/checkstdtperformance/*', function(req, res) {
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
