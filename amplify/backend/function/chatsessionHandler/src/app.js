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

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cookieparser());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use(
  session({
      key: "userid",
      secret: "loginsession",
      resave: "false",
      saveUninitialized: "false",
      cookie: {
          expires: 1000 * 60 * 60 * 24
      }
  })
)

/**********************
 * Example get method *
 **********************/
/*
app.get('/chatmsg', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});*/

app.get('/chatmsg/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

const chatsession = [];
//const sessionrequest = [{}];
//let msgcollection = [[]];
//let chatbotusers = [];//stores current users names against their boxno.


app.post('/chatmsg', (req,res) => {//post
    //let newmsg = {"session_id":req.query.session_id, "msg":req.query.msg};
    if (req.query.session_id==chatsession[req.query.session_no].session_id) {
        chatsession[req.query.session_no].msgcollection[req.query.bxno].push(req.query.msg);
        return res.send({"msg":"Message successfully delivered.", "connect_status":"OK"});
    }

});

app.post('/startsession', (req,res) => {//post
    let time = new Date();
    //session_count = Object.keys(chatsession).length;
    timeout_count = session_count;
    //console.log(timeout_count);
    let newsession = {
        "session_open": false,
        "start_time": time.toTimeString(),
        "end_time": '',
        "session_id": time.getFullYear() + time.getMonth() + time.getDate() + session_count.toPrecision(4),
        "users": [req.query.username],//usernames of all active participants who have joined the session.
        "userID": [req.query.userID],//userIDs of all active participants who have joined the session.
        "requested_users": ['adeyolu03','glotech247','itechmaster22'],//yet-to-join users. Initialized for testing only
        "chatgroupfilter": [req.query.chatgroupfilter],//database query string from client App
        "msgcollection": [[req.query.msg]],
        "last_read_index": [[]]//tracking last read messages from all users in the session.
    };

    chatsession.push(newsession);
    session_count++;
    //console.log(session_count + ": " + timeout_count);
    /**
     * Get applicable users from database using the chatgroupfilter
     * Send SMS, Email, Mobile App/Push Notifications to all applicable users to join the session
     * use:
     * joinChat(userID,chatgroupfilter,username,session_no,session_id,start_time)
     * **/

    setTimeout(() => {
        if(!chatsession[timeout_count].session_open){//if none has joined the chat
            chatsession.splice(timeout_count,1);//remove session
            session_count--;
            console.log("Session " + session_count + " request timeout and removed.");
            //return res.send({"connect_status":"failed"});   
        }        
    }, 240000);
    console.log(chatsession);
    return res.send({
        "boxno": 0,
        "session_no":timeout_count,
        "session_id":chatsession[timeout_count].session_id,
        "start_time":chatsession[timeout_count].start_time,
        "users":chatsession[timeout_count].users,
        "connect_status":"success"
    });
});

app.post('/joinsession', (req,res) => {//post
    if (req.query.session_id==chatsession[req.query.session_no].session_id){//session still valid?
        if (!(chatsession[req.query.session_no].userID.some((value) => req.query.userID==value))) {//create record and assign new boxno
            let newbxno = Object.keys(chatsession[req.query.session_no].msgcollection).length;//general record index
            chatsession[req.query.session_no].msgcollection.push([req.query.msg]);
            chatsession[req.query.session_no].users.push(req.query.username);
            chatsession[req.query.session_no].userID.push(req.query.userID);
            chatsession[req.query.session_no].last_read_index.push([]);
            chatsession[req.query.session_no].session_open = true;
            return res.send({
                "boxno":newbxno,
                "connect_status":"success"
            });
        }else if(req.query.comp_restart){//resend existing boxno
            myboxno = (chatsession[req.query.session_no].userID).indexOf(req.query.userID);
            for (let index = 0; index < (chatsession[req.query.session_no].last_read_index[myboxno]).length; index++) {
                chatsession[req.query.session_no].last_read_index[myboxno][index] = 0;    
            }
            /*(chatsession[req.query.session_no].last_read_index[myboxno]).forEach(element => {
                element = 0;
            });*/
            return res.send({
                "boxno":myboxno,
                "connect_status":"success"
            });
        }
    } 
    else {
        return res.send({"connect_status":"Session timeout."});
    }
});

app.get('/checksession', (req,res) => {
    //let session_count = Object.keys(chatsession).length;
    console.log(chatsession);
    if (session_count) {
        for (let index = 0; index < session_count; index++) {
            let users_count = chatsession[index].requested_users.length;
            for (let userindex = 0; userindex < users_count; userindex++) {
                console.log(chatsession[index].requested_users);
                if (chatsession[index].requested_users[userindex] == req.query.userID) {
                    return res.send({
                        "session_no": index,
                        "session_id": chatsession[index].session_id,
                        "start_time":chatsession[index].start_time,
                        "users":chatsession[index].users,
                        "session_requested":true
                    });
                }  
            }
        }
        return res.send({"session_requested":false});
    }
    else {
        return res.send({"session_available":false});
    }
});

app.post('/endsession', (req,res) => {//post
    let time = new Date();
    chatsession[req.query.session_no].session_open = false;
    chatsession[req.query.session_no].end_time = time.toTimeString();
    /**
     * Save session details on file
     **/
        fs.appendFile('chat sessions record.txt', JSON.stringify(chatsession[req.query.session_no])+'\n', function(err){
            if (err) throw err;           
        });
    console.log('Chat backup completed before removal.')
    chatsession.splice(req.query.session_no,1);//remove session
    session_count--;
    return res.send({"connect_status": "success", "end_time": time.toTimeString(), "msg": "Session ended at: " + time.toLocaleTimeString()});   
});

app.get('/newmsg', (req, res) => {
    let session_no = req.query.session_no;
    let sessionlen = Object.keys(chatsession).length;//no of sessions currently available.
    if(sessionlen > session_no){
        if (req.query.session_id==chatsession[session_no].session_id){
            let qbxno = req.query.bxno;//assisgned session msg box no
            let msglen = Object.keys(chatsession[session_no].msgcollection).length;//no of msgs in the chat
            let mynewmsg = [];
            for (let m_index = 0; m_index < msglen; m_index++) {//collate all available msgs except yours(qbxno)
                if(m_index >= chatsession[session_no].last_read_index[qbxno].length){
                    chatsession[session_no].last_read_index[qbxno].push(0); 
                }
                if (m_index != qbxno) {
                    let msglen = chatsession[session_no].msgcollection[m_index].length;
                    let unread_index = chatsession[session_no].last_read_index[qbxno][m_index];
                    if (unread_index<msglen) {
                        const unread_msg = chatsession[session_no].msgcollection[m_index].slice(unread_index,msglen);
                        const curmsg = unread_msg.map((value,index,Array) => {
                            return({"msg":value,"username":chatsession[session_no].users[m_index]});//,"sender_msg_index":index,"total_msg_read":Array.length});
                            });
                        /*while(Object.keys(chatsession[session_no].msgcollection[index]).length){//message remaining in box?
                            const curmsg = chatsession[session_no].msgcollection[index].shift();
                            mynewmsg.push({"msg":curmsg,"username":chatsession[session_no].users[index]}); 
                        }*/      
                        mynewmsg.push(curmsg); 
                        console.log(mynewmsg);
                        chatsession[session_no].last_read_index[qbxno][m_index] = msglen;  
                        console.log(chatsession[session_no]);
                    }
               }        
            } 
            //console.log(mynewmsg.length + "message(s) available");
            if (mynewmsg.length) {
                return res.send({"msgcollection":mynewmsg, "connect_status":"OK"});
            } else { 
                return res.send({"connect_status":"No message"});
            }
            //return mynewmsg.length ? res.send({"msgcollection":mynewmsg, "connect_status":"OK"}) : res.send({"connect_status":"No message"});
        }
        else{
            return res.send({"connect_status":"Invalid session."});
        }
    }else{
        return res.send({"connect_status":"Invalid session."});
    }
});

app.get('/sessionrequeststatus', (req, res) => {
    if(req.query.session_id==chatsession[req.query.session_no].session_id){//if session id is still valid
        if(chatsession[req.query.session_no].session_open){
             console.log("Session " + req.query.session_no + " is now open to chat.");
            return res.send({"session_open":true, "session_timeout":false, "users":chatsession[req.query.session_no].users});
        }else { 
            console.log("Session " + req.query.session_no + " is NOT yet open to chat.");
            return res.send({"session_open":false, "session_timeout":false});
        }
    }else {
        console.log("Session " + req.query.session_no + " has been removed.");
        return res.send({"session_open":false, "session_timeout":true});
    }   
    //res.json({message: "Hello from itrak server! We are pretty okay now!"});
    //res.json({success: 'session request status call succeed!', url: req.url, body: conn_string})
});

/****************************
* Example post method *
****************************/

app.post('/chatmsg', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/chatmsg/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/chatmsg', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/chatmsg/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/chatmsg', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/chatmsg/*', function(req, res) {
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
