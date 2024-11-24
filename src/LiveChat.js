// JavaScript source code//import Component from 'react';
import React, { Component } from 'react';
import sendicon from './sendicon.jpg';
//import axios from "axios";
//import Amplify, {API} from 'aws-amplify'
import { post } from 'aws-amplify/api';
import { get } from 'aws-amplify/api';

//import { useState } from 'react';

class LiveChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlekeypress = this.handlekeypress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sumInput = this.sumInput.bind(this);
        this.msgBody = this.msgBody.bind(this);
        this.inMsgNote = this.inMsgNote.bind(this);
        this.outMsgNote =  this.outMsgNote.bind(this);
        this.startSession = this.startSession.bind(this);
        this.endSession = this.endSession.bind(this);
        this.handleInMsg = this.handleInMsg.bind(this);
        this.updateInMsgChange = this.updateInMsgChange.bind(this);
        this.updateMsgServer = this.updateMsgServer.bind(this);
        //this.connectAgent = this.connectAgent.bind(this);
        //this.setSessionAgent = this.setSessionAgent.bind(this);
        //this.connectServer = this.connectServer.bind(this);
        this.session_header = this.session_header.bind(this);
        this.session_endnote = this.session_endnote.bind(this);
        this.joinSession = this.joinSession.bind(this);

        this.comp_shd_update = true;
        //this.mtype = this.props.mtype;//"large";//
        //this.size = this.props.size;//56;//
        this.itrakacadAPI = "api9f6ae8ba";
        this.path = '\sessions';
        this.userID = this.props.userID;
        this.name = this.props.name;
        this.agents = [];
        this.chatfilter = "";
        this.first_inmsg = true;
        this.first_outmsg = true;
        this.chat_ended = true;
        this.msg_counter = 0;
        this.session_open = false;
        this.session_ended = false;
        this.session_initiated = false;
        this.session_check_initiated = false;
        this.autoresponse  = "Thank you for your message. Pls wait while we reply you shortly."
        this.state = {  new_inmsg: "",
                        new_outmsg: "",
                        //chat_ended: true,
                        session: {  //open: false,
                                    msgbxno: '',
                                    session_no: '',
                                    id: '',
                                    start_time: '',
                                    end_time: '',
                                },                       
                        username: this.name,
                        agentname:  "",
                        //msg_counter: 0,
                        sentmsg: [{  index_no: 0,
                                    msg: "No message yet.",
                                    msg_no: 0,
                                    msg_time: '6:50pm',
                                    msg_read: false
                                }],
                        recvdmsg: [{    index_no: 0,
                                        msg: "Waiting for response",
                                        msg_no: 0,
                                        msg_time: '6:54pm',
                                        username: '',
                                        msg_read: false
                                }],
                     };
        //this.state = { name:  "James br/own" };
        //this.state = { msg: "Old message" };
        //this.state = { chatmsg: "New message" };
        console.log(this.props.name + ": " + this.props.userID);
        console.log(this.state.username);
        //console.log(this.state.msg);
        
    }

    //update unsubmitted outmsg from UI component here
    handleChange = (event) => {
        //console.log(event.target.name);
        //const name = event.target.name;
        const new_msg = event.target.value;
       /* var msgcopy = {...this.state.sentmsg}
        msgcopy.msg = new_msg;
        this.setState({ sentmsg: msgcopy }, ()=>console.log(this.state.sentmsg.msg));*/
        this.comp_shd_update = false;
        this.shouldComponentUpdate();
        this.setState({new_outmsg: new_msg}, ()=>console.log(this.state.new_outmsg));
        
        //console.log(this.state.name);
    }

    //update unsubmitted inmsg from msgserver here
    updateInMsgChange = (msg) =>{
        this.setState({new_inmsg: msg});//add timer controlled callback fn to animate typing ongoing on UI
    }

    handlekeypress = (event) => {
        if (event.key === "Enter") {
            if (document.getElementById('msg-field').value != '') {
                this.handleSubmit(event);
            }
        }
    }
    //update submitted outmsg locally and on the server
    handleSubmit = (event) => {
        if(event.target.typeof==='submit') event.preventDefault();
        document.getElementById('msg-field').value = '';
        this.comp_shd_update = true;
        this.shouldComponentUpdate();
        let index = this.state.sentmsg.length;
        let count = this.msg_counter + 1;
        let time = new Date().toLocaleTimeString();        
        if(this.first_outmsg){
            if(this.chat_ended){
                this.chat_ended = false;//start new chat
                count = 1;
                this.msg_counter = count;
            }
            console.log(this.state.new_outmsg);       
            index = 0;
            //var msgcopy = [...this.state.sentmsg];
            let first_msg = [{  index_no: index,
                msg: this.state.new_outmsg,
                msg_no: count,
                msg_time: time,
                msg_read: false
            }];
        
            //msgcopy = {...msgcopy,msg_to_add};//msgcopy.push(msg_to_add);, ()=>console.log("Message and index: " + this.state.sentmsg[index].msg + index) 
            //this.handleInMsg(this.autoresponse);
            this.setState({ sentmsg: first_msg });
            this.first_outmsg = false;
            /* msgcopy = [{//reset msgs 
                index_no: 0,
                msg: "",
                msg_no: 0,
                msg_time: '',
                msg_read: false
            }];
            this.setState({ sentmsg: msgcopy }, ()=>console.log('sentmsg erased.'));
            this.setState({ recvdmsg: msgcopy }, ()=>console.log('recvdmsg erased.'));*/
        }else{
            console.log(this.state.new_outmsg);       
            /*let index = this.state.sentmsg.length;
            let count = this.msg_counter + 1;
            let time = new Date().toTimeString();*/
    
            var msgcopy = [...this.state.sentmsg];
            msgcopy = [...msgcopy, 
                {  index_no: index,
                    msg: this.state.new_outmsg,
                    msg_no: count,
                    msg_time: time,
                    msg_read: false
                }
            ];
            this.setState({ sentmsg: msgcopy });
            this.msg_counter = count;
        }
               
        if (this.session_open) {
            //this.handleInMsg(this.autoresponse);
            console.log(index);
            this.updateMsgServer(this.state.new_outmsg);
        }
        else if(!this.session_initiated){
            this.startSession();
            //this.handleInMsg([[{"msg":this.autoresponse,"username":this.state.username}]]);    
            this.handleInMsg([[{"msg":this.autoresponse,"username":'Autoresponse'}]]);       
        }
        this.setState({new_outmsg: ''});
        //this.setState({new_outmsg: "Debugging"}, ()=>console.log(this.state.new_outmsg));
        //this.setState({ msg: "Waiting for chatmsg" },()=>console.log(this.state.sentmsg.msg));
        //console.log(this.state.msg);
        //console.log(this.sumInput());
    }

    //update submitted inmsg locally from the server
    handleInMsg = (svr_msg) => {
        console.log('new message received: '+svr_msg);

        console.log(this.state.new_inmsg);       
        let start_index = this.state.recvdmsg.length;
        let newmsglen = svr_msg.length;
        let count = this.msg_counter + 1;
        //let time = new Date().toLocaleTimeString();

        if(this.first_inmsg){
            if(this.chat_ended){
                this.chat_ended = false;//start new chat
                count = 1;
                this.msg_counter = count;
            }
            
            console.log(this.state.new_inmsg);       
            start_index = 0;
            //var msgcopy = [...this.state.sentmsg];
            /**/let first_msg = [];
            let msgcopy = [];
            //let indx_msg = [];
            console.log(svr_msg[0]);
            for (let indx = 0; indx < newmsglen; indx++) {
                msgcopy = svr_msg.shift();
                let indx_msg = msgcopy.map((value, index) => {
                    return (
                        {   index_no: start_index + indx,
                            //msg: this.state.new_inmsg,
                            msg: value.msg,
                            msg_no: count + indx,
                            msg_time: new Date().toLocaleTimeString(),
                            username:value.username,
                            msg_read: true
                        }
                    )
                });
                first_msg = [...first_msg, ...indx_msg];    
            }       /**/
            //let first_msg = [];
            /*let first_msg = svr_msg.map((value, index) => {
                return (
                    {   index_no: start_index + index,
                        //msg: this.state.new_inmsg,
                        msg: value.msg,
                        msg_no: count + index,
                        msg_time: new Date().toLocaleTimeString(),
                        username:value.username,
                        msg_read: true
                    }
                );
            });*/
            //first_msg = [...first_msg, ...indx_msg]; 
            //msgcopy = {...msgcopy,msg_to_add};//msgcopy.push(msg_to_add);, ()=>console.log("Message and index: " + this.state.sentmsg[index].msg + index) 
            this.setState({ recvdmsg: first_msg });
            this.msg_counter = count + newmsglen - 1;
            this.first_inmsg = false;
            /* msgcopy = [{//reset msgs 
                index_no: 0,
                msg: "",
                msg_no: 0,
                msg_time: '',
                msg_read: false
            }];
            this.setState({ sentmsg: msgcopy }, ()=>console.log('sentmsg erased.'));
            this.setState({ recvdmsg: msgcopy }, ()=>console.log('recvdmsg erased.'));*/
        }else{
            console.log(this.state.new_inmsg);
            console.log(svr_msg);       

            /**/let new_msg = [];
            let msgcopy = [];
            for (let indx = 0; indx < newmsglen; indx++) {
                msgcopy = svr_msg.shift();
                let indx_msg = msgcopy.map((value, index) => {
                    return (
                        {   index_no: start_index + indx,
                            //msg: this.state.new_inmsg,
                            msg: value.msg,
                            msg_no: count + indx,
                            msg_time: new Date().toLocaleTimeString(),
                            username:value.username,
                            msg_read: true
                        }
                    );
                });
                new_msg = [...new_msg, ...indx_msg];    
            }       /**/

            /*let new_msg = [];
            for (let indx = 0; indx < newmsglen; indx++) {
                let indx_msg = (svr_msg[indx]).map((value, index) => {
                    return (
                let indx_msg =  [{   index_no: start_index + indx,
                            //msg: this.state.new_inmsg,
                            msg: svr_msg[indx].msg,
                            msg_no: count + indx,
                            msg_time: new Date().toLocaleTimeString(),
                            username:svr_msg[indx].username,
                            msg_read: true
                        }];
                    );
                });
                new_msg = [...new_msg, ...indx_msg];    
            }*/

            /*let new_msg = svr_msg.map((value, index) => {
                return (
                    {   index_no: start_index + index,
                        //msg: this.state.new_inmsg,
                        msg: value.msg,
                        msg_no: count + index,
                        msg_time: new Date().toLocaleTimeString(),
                        username:value.username,
                        msg_read: true
                    }
                );
            });*/
            var msg_copy = [...this.state.recvdmsg];
            msg_copy = [...msg_copy, ...new_msg];
            /*    {  index_no: index,
                    msg: this.state.new_inmsg,
                    //msg: svr_msg,
                    msg_no: count,
                    msg_time: time,
                    msg_read: false
                }*/
            
            this.setState({ recvdmsg: msg_copy });
            //this.msg_counter = count;
            this.msg_counter = count + newmsglen - 1;
        }
               
        
        if (this.session_open) {//update UI after state changes.
            console.log(start_index);
        }
        else{
            //this.startSession();//Get session consent and token from user @UI
        }
        //this.setState({new_inmsg: ''});
    }
   
    sumInput = () => {
        let x = 15;
        x += this.size;
        return x;
    }

    msgBody = () => {
        let inmsg_index = 0;
        let outmsg_index = 0;
        //let max_index = this.msg_counter;
        let msg1_len = this.state.sentmsg.length;
        let msg2_len = this.state.recvdmsg.length;
        let max_index = msg1_len + msg2_len;
        let sent = [...this.state.sentmsg];
        let recvd = [...this.state.recvdmsg]
        let sent_duplicated = false;
        let recvd_duplicated = false;
        const msgcontent = [];
        /*
        for (let index = 1; index <= max_index; index++) {
            //console.log(this.state.sentmsg[outmsg_index].msg_no + ":" + outmsg_index);
            if(msg1_len>outmsg_index){
                if(index == this.state.sentmsg[outmsg_index].msg_no){
                    // msgcontent.push(this.inMsgNote(inmsg_index));
                    msgcontent.push(this.outMsgNote(outmsg_index));
                    outmsg_index++;
                }
                else if(index == this.state.recvdmsg[inmsg_index].msg_no){
                    msgcontent.push(this.inMsgNote(inmsg_index));
                    inmsg_index++;
                }
            }
            else{
                msgcontent.push(this.inMsgNote(inmsg_index));
                inmsg_index++;
            }
        }*/
        if(this.msg_counter>=1){
            let msg_count = 1;
            for (let index = 1; index <= max_index; index++) {
                if(outmsg_index<msg1_len){//message found
                    if(msg_count == sent[outmsg_index].msg_no){
                        // msgcontent.push(this.inMsgNote(inmsg_index));
                        msgcontent.push(this.outMsgNote(outmsg_index));
                        outmsg_index++;
                        if(outmsg_index<msg1_len){//another message found
                            sent_duplicated = (!(msg_count == sent[outmsg_index].msg_no))? false : true;   
                        }
                        if(inmsg_index<msg2_len){//another message found
                            recvd_duplicated = (!(msg_count == recvd[inmsg_index].msg_no))? false : true;   
                        }
                        msg_count = (sent_duplicated||recvd_duplicated)? msg_count : msg_count+1;//increment msg_no count if no duplicate found.
                    }else if(inmsg_index<msg2_len){
                        if(msg_count == recvd[inmsg_index].msg_no){
                            msgcontent.push(this.inMsgNote(inmsg_index));
                            inmsg_index++;
                            if(outmsg_index<msg1_len){//another message found
                                sent_duplicated = (!(msg_count == sent[outmsg_index].msg_no))? false : true;   
                            }
                            if(inmsg_index<msg2_len){//another message found
                                recvd_duplicated = (!(msg_count == recvd[inmsg_index].msg_no))? false : true;   
                            }
                            msg_count = (sent_duplicated||recvd_duplicated)? msg_count : msg_count+1;//increment msg_no count if no duplicate found.
                        }
                    }
                }else if(inmsg_index<msg2_len){
                    if(msg_count == recvd[inmsg_index].msg_no){
                        msgcontent.push(this.inMsgNote(inmsg_index));
                        inmsg_index++;
                        if(outmsg_index<msg1_len){//another message found
                            sent_duplicated = (!(msg_count == sent[outmsg_index].msg_no))? false : true;   
                        }
                        if(inmsg_index<msg2_len){//another message found
                            recvd_duplicated = (!(msg_count == recvd[inmsg_index].msg_no))? false : true;   
                        }
                        msg_count = (sent_duplicated||recvd_duplicated)? msg_count : msg_count+1;//increment msg_no count if no duplicate found.
                    }
                }               
            }
        }
        return(msgcontent);
    }

    session_header = () => {
        if (this.session_open || this.session_ended) {
            return(
                <div className='session-header'>
                    <i>Hi <b>{this.state.username}</b>, a LiveChat session has been established. You are currently chatting with <b>{this.state.agentname}</b>.
                    <br/>Session ID: {this.state.session.id}, Session started: {this.state.session.start_time}<br/>
                    <a className='chat-link' onClick={this.endSession}>Click here to end session</a>
                    </i>
                </div>
            );  
        }else{
            return(
                <div className='session-header'>
                    <i>Hi <b>{this.state.username}</b>, pls write your message and click submit to start a live chat session...</i>
                </div>
            );
        }
    }

    session_endnote = () => {
        if (this.session_ended) {
            return(
                <div className='session-header'>
                    <i>LiveChat session with <b>{this.state.agentname}</b> has ended.
                    <br/>Session ID: {this.state.session.id}, Session started at: {this.state.session.start_time}<br/>
                    <br/>Session ended at: {this.state.session.end_time}<br/>
                    To start a new session, <a className='chat-link' onClick={this.startSession}>click here.</a>
                    </i>
                </div>
            );  
        }else if(this.session_open){
            return(
                <div className='session-header'>
                    <i>To end this session, <a className='chat-link' onClick={this.endSession}>click here.</a></i>
                </div>
            );
        }
    }

    inMsgNote = (msg_index) => {
        console.log(this.state.recvdmsg[msg_index].msg);
        console.log(this.state.recvdmsg[msg_index].msg_no);
        console.log(this.state.recvdmsg[msg_index].msg_time);
        return(//<img className="marker-icon" src={sendicon} /> 
                    <div className='msg-wrapper'>
                        <div className='in-msg-container'>                            
                            <div className='in-msg'>
                                <span>{this.state.recvdmsg[msg_index].msg}</span>
                                <span>: {this.state.recvdmsg[msg_index].msg_no}</span>  
                                <div className='msgtime'><sub>{this.state.recvdmsg[msg_index].msg_time}</sub></div>   
                                <div className='sendername'><sub>{this.state.recvdmsg[msg_index].username}</sub></div>                       
                            </div>                                             
                        </div>
                    </div>
        );
    }

    outMsgNote = (msg_index) => {
        console.log(this.state.sentmsg[msg_index].msg);
        console.log(this.state.sentmsg[msg_index].msg_no);
        console.log(this.state.sentmsg[msg_index].msg_time);
        return(
                    <div className='msg-wrapper'>
                        <div className='out-msg-container'>
                            <div className='out-msg'>
                                <span>{this.state.sentmsg[msg_index].msg}</span>   
                                <span>: {this.state.sentmsg[msg_index].msg_no}</span>
                                <div className='msgtime'><sub>{this.state.sentmsg[msg_index].msg_time}</sub></div>                        
                            </div>
                            <img className="marker-icon" src={sendicon} />                       
                        </div>
                    </div> 
        );            
    }

    updateMsgServer = (msgnote) => {
        let msgdelivered = false;
        //axios.post('http://localhost:8000/chatmsg?session_id=' + this.state.session.id + '&session_no=' + this.state.session.session_no + '&msg=' + msgnote + '&bxno=' + this.state.session.msgbxno)
        //API.post(this.itrakacadAPI, '/chatmsg?session_id=' + this.state.session.id + '&session_no=' + this.state.session.session_no + '&msg=' + msgnote + '&bxno=' + this.state.session.msgbxno)
/*        post({
            apiName: this.itrakacadAPI,
            path: '/chatmsg?session_id=' + this.state.session.id + '&session_no=' + this.state.session.session_no + '&msg=' + msgnote + '&bxno=' + this.state.session.msgbxno
          })
        .then(response => {
           console.log(response.data);
           msgdelivered = response.data.connect_status=="OK" ? true : false;
           this.setState({new_inmsg: "sent"});//, ()=>console.log(this.state.new_inmsg));
        })
        .catch((err) => {
            console.log("Unable to connect to the server.");
            this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
        })
*/        
    }

    startSession = () => {
        if(!this.session_initiated){
            this.session_initiated = true;
            console.log('Connecting to server...');
            //axios.post('http://localhost:8000/startsession?username=' + this.state.username + '&userID=' + this.userID + '&chatgroupfilter=' + this.chatfilter + '&msg=' + this.state.new_outmsg)
            //API.post(this.itrakacadAPI, '/startsession?username=' + this.state.username + '&userID=' + this.userID + '&chatgroupfilter=' + this.chatfilter + '&msg=' + this.state.new_outmsg)
/*            post({
                apiName: this.itrakacadAPI,
                path: '/startsession?username=' + this.state.username + '&userID=' + this.userID + '&chatgroupfilter=' + this.chatfilter + '&msg=' + this.state.new_outmsg
              })
            .then(response => {
               console.log(response.data);
                if(response.data.connect_status=="success"){
                    var sessioncopy = {
                        msgbxno: response.data.boxno,
                        session_no: response.data.session_no,
                        id: response.data.session_id,
                        start_time: response.data.start_time,
                        end_time: '',
                    };
                    this.setState({ session: sessioncopy });
                    this.agents = response.data.users;
                    //this.setState({agentname:response.data.users[0]});
                    /*this.session_open = true;
                    this.session_ended = false;*/
/*                }
                else{
                    console.log(response.data + ": " + "Unable to connect to chat agent.");
                    this.setState({new_inmsg: "Error starting session."});//, ()=>console.log(this.state.new_inmsg));
                    this.session_initiated = false;
                }
            })
            .catch((err) => {
                console.log("Unable to connect to the server.");
                this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
                this.session_initiated = false;
            })
*/        }
    }

    endSession = () => {
        console.log('Ending current session. Pls wait...');
        //axios.post('http://localhost:8000/endsession?session_no=' + this.state.session.session_no)
        //API.post(this.itrakacadAPI, '/endsession?session_no=' + this.state.session.session_no)
/*        post({
            apiName: this.itrakacadAPI,
            path: '/endsession?session_no=' + this.state.session.session_no
          })
        .then(response => {
           console.log(response.data);
            if(response.data.connect_status=="success"){
                var sessioncopy = {...this.state.session, end_time:response.data.end_time}
                this.setState({ session: sessioncopy });
                this.session_initiated = false;
                this.session_check_initiated = false;
                this.session_open = false;
                this.session_ended = true;
                console.log(response.data.msg);
            }
            else{
                console.log("Unable to end session.");
                this.setState({new_inmsg: "Could not end session."});//, ()=>console.log(this.state.new_inmsg));
            }
        })
        .catch((err) => {
            console.log("Unable to connect to the server.");
            this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
        })
*/    }

    joinSession = (name,user_id,sess_no,sess_id,st_time,users,msg,comp_restart) => {
        var sessioncopy = {
            msgbxno: '',
            session_no: sess_no,
            id: sess_id,
            start_time: st_time,
            end_time: '',
        };
        this.setState({ session: sessioncopy });
        this.agents = users;
        this.setState({agentname:users[0]});
        console.log('Connecting to server...');
        //axios.post('http://localhost:8000/joinsession?username=' + name + '&userID=' + user_id + '&session_no=' + sess_no + '&session_id=' + sess_id + '&msg=' + msg + '&comp_restart=' + comp_restart)
        //API.post(this.itrakacadAPI, '/joinsession?username=' + name + '&userID=' + user_id + '&session_no=' + sess_no + '&session_id=' + sess_id + '&msg=' + msg + '&comp_restart=' + comp_restart)
/*        post({
            apiName: this.itrakacadAPI,
            path: '/joinsession?username=' + name + '&userID=' + user_id + '&session_no=' + sess_no + '&session_id=' + sess_id + '&msg=' + msg + '&comp_restart=' + comp_restart
          })
        .then(response => {
           console.log(response.data);
           if(response.data.connect_status=="success"){
                var sessioncopy = {...this.state.session, msgbxno:response.data.boxno};
                this.setState({ session: sessioncopy });
                this.session_open = true;
                this.session_ended = false;
                console.log("You have sucessfully joined the livechat session.");
                this.setState({new_inmsg: "Chat open"});//, ()=>console.log(this.state.new_inmsg));
            }
            else{
                console.log(response.data + ": Unable to join session.");
                this.setState({new_inmsg: "No chat"});//, ()=>console.log(this.state.new_inmsg));
            }
        })
        .catch((err) => {
            console.log("Unable to connect to the server.");
            this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
        })
*/    }
    
    componentDidMount = () => {
        console.log("Live chat mounted.");
        if(!this.session_check_initiated){
            this.session_check_initiated = true;//checking for session... Don't check again until session ends if any.
            //axios.get('http://localhost:8000/checksession?userID=' + this.userID)
            //API.get(this.itrakacadAPI, '/checksession?userID=' + this.userID)
/*            get({
                apiName: this.itrakacadAPI,
                path: '/checksession?userID=' + this.userID
              })
            .then(response => {
               console.log(response.data);
               if(response.data.session_requested){
                    this.joinSession(this.state.username,this.userID,response.data.session_no,response.data.session_id,response.data.start_time,response.data.users,"Hi. How may I help?",true)
                    console.log("Attempting to join a livechat session.");
                }
                else{
                    console.log(response.data + ": No session available or you are not requested to join any session at this time.");
                    this.setState({new_inmsg: "No chat"});//, ()=>console.log(this.state.new_inmsg));
                    this.session_check_initiated = false;
                }
            })
            .catch((err) => {
                console.log("Unable to connect to the server.");
                this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
                this.session_check_initiated = false;
            })
*/        }
    }

    shouldComponentUpdate = () => {
        //console.log(this.comp_shd_update? "Component should update." : "Component should not update.");
        return this.comp_shd_update;
    }

    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        //console.log("previous msg: "+prevState.new_outmsg);
        //console.log("Current msg counter value: "+this.msg_counter);
        return prevState;
    }
//'/session_request_status'
    componentDidUpdate = () => {
        console.log("Component updated.");
        if (!this.session_open) {
            if(this.session_initiated){               
                //axios.get('http://localhost:8000/session_request_status?session_no=' + this.state.session.session_no + '&session_id=' + this.state.session.id)
                //API.get(this.itrakacadAPI, '/session_request_status?session_no=' + this.state.session.session_no + '&session_id=' + this.state.session.id)
/*                get({
                    apiName: this.itrakacadAPI,
                    path: '/session_request_status?session_no=' + this.state.session.session_no + '&session_id=' + this.state.session.id
                  })
                .then(response => {
                   console.log(response.data);
                   if(response.data.session_timeout){
                        console.log("Session " + this.state.session.session_no + " has been removed.");
                        this.session_initiated = false;
                   }else if(response.data.session_open){
                            this.session_open = true;
                            this.session_ended = false;
                            this.agents = response.data.users;
                            this.setState({agentname:response.data.users[1]});
                            this.setState({new_inmsg: "Chat open"});//, ()=>console.log(this.state.new_inmsg));
                            //this.session_initiated = false;
                        }else{
                            this.setState({new_inmsg: "Not open"});//, ()=>console.log(this.state.new_inmsg));
                        }   
                })
                .catch((err) => {
                    console.log("Unable to connect to the server.");
                })
*/            }else {
                if(!this.session_check_initiated){
                    this.session_check_initiated = true;//checking for session... Don't check again until session ends if any.
                    //axios.get('http://localhost:8000/checksession?userID=' + this.userID)
                    //API.get(this.itrakacadAPI, '/checksession?userID=' + this.userID)
/*                    get({
                        apiName: this.itrakacadAPI,
                        path: '/checksession?userID=' + this.userID
                      })
                    .then(response => {
                       console.log(response.data);
                       if(response.data.session_requested){
                            this.joinSession(this.state.username,this.userID,response.data.session_no,response.data.session_id,response.data.start_time,response.data.users,"Hi. How can I help?",false);
                            console.log("Attempting to join a livechat session.");
                        }
                        else{
                            console.log(response.data + ": No session available or you are not requested to join any session at this time.");
                            this.setState({new_inmsg: "No session"});//, ()=>console.log(this.state.new_inmsg));
                            this.session_check_initiated = false;
                        }
                    })
                    .catch((err) => {
                        console.log("Unable to connect to the server.");
                        this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
                        this.session_check_initiated = false;
                    })
*/                }
            }

        }
        else {
            //axios.get('http://localhost:8000/newmsg?session_no=' + this.state.session.session_no + '&session_id=' + this.state.session.id + '&bxno=' + this.state.session.msgbxno)
            //API.get(this.itrakacadAPI, '/newmsg?session_no=' + this.state.session.session_no + '&session_id=' + this.state.session.id + '&bxno=' + this.state.session.msgbxno)
/*            get({
                apiName: this.itrakacadAPI,
                path: '/newmsg?session_no=' + this.state.session.session_no + '&session_id=' + this.state.session.id + '&bxno=' + this.state.session.msgbxno
              })
            .then(response => {
               console.log(response.data);
               if(response.data.connect_status=="OK"){
                    let newmsgcollection = response.data.msgcollection;
                    this.handleInMsg(newmsgcollection);
                    console.log("Messages updated from server.");
                }
                else if(response.data.connect_status=="No message"){
                    console.log(response.data + ": No message available at this time.");
                    this.setState({new_inmsg: "No msg"});//, ()=>console.log(this.state.new_inmsg));
                }else if(response.data.connect_status=="Invalid session."){
                    this.session_initiated = false;
                    this.session_check_initiated = false;
                    this.session_open = false;
                    this.session_ended = true;
                    console.log(response.data + ": This chat session has ended.");
                    this.setState({new_inmsg: "Session ended."});//, ()=>console.log(this.state.new_inmsg));
                }
            })
            .catch((err) => {
                console.log("Unable to connect to the server.");
                this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
            })
*/        }
    }

    componentWillUnmount = () => {
        console.log("This App will unmount.");
    }

    render() { //<p><h1>Creating the Chat App!</h1></p>
        console.log("Rendering...");
        return (
            < div className='chat-bot-container'>           
                <div className='chat-header'>
                    <div className='user-img-container'>
                        <img className="user-img" src='uni-img3.jpg' />
                        <img className="marker-img" src="gps-trak1.jpg" />
                    </div>                                        
                    <span>{this.state.agentname}</span>
                </div>
                <div className='chat-body'>                   
                    {this.session_header()}
                    {this.msgBody()}          
                    {this.session_endnote()}         
                </div>
                <div id="userchat-form" className="userchat-content" >
                        <textarea type="text" placeholder="Write your message here!" rows={'3'}
                            name="chatmsg"
                            id = "msg-field"
                            onChange={this.handleChange}
                            onKeyDown={this.handlekeypress}
                        />
                        <img className='submit-icon' src={sendicon} onClick={this.handleSubmit} />                                                                    
                </div>
            </div>
        );
    }


    /*const [inputs, setInputs] = useState({});
    const [checked, setChecked] = useState(false);
    const [user_valid, setUserValid] = useState(false);

    <div className='msg-wrapper'>
                        <div className='out-msg-container'>
                            <div className='out-msg'>
                                <span>{this.state.sentmsg.msg}</span>   
                                <span>: {this.msg_counter}</span>
                                <div className='msgtime'><sub>{this.state.sentmsg.msg_time}</sub></div>                        
                            </div>
                            <img className="marker-icon" src={sendicon} />                       
                        </div>
                    </div>                   
                    <div className='msg-wrapper'>
                        <div className='in-msg-container'>
                            <img className="marker-icon" src={sendicon} />  
                            <div className='in-msg'>
                                <span>{this.state.recvdmsg.msg}</span>
                                <span>: {this.msg_counter}</span>  
                                <div className='msgtime'><sub>{this.state.recvdmsg.msg_time}</sub></div>                          
                            </div>                                             
                        </div>
                    </div>
    */
}

 
export default LiveChatApp;