// JavaScript source code//import Component from 'react';
import React, { Component } from 'react';
//import sendicon from './sendicon.jpg';
import exam2icon from './exam2-icon.png';
import test2icon from './test2-icon.png';
import assignment2icon from './assigment2-icon.png';
import extracur2icon from './extra-cur2-icon.png';
import news2icon from './news2-icon.png';
import greenupicon from './green-uparrow.jpg';
import reddownicon from './red-downarrow.jpg';
import orangerighticon from './orange-rightarrow.jpg';
import axios from "axios";
//import Amplify, {API} from 'aws-amplify';
import { post } from 'aws-amplify/api';
import { get } from 'aws-amplify/api';

//axios.defaults.withCredentials = true;

class PerformanceApp extends React.Component {
    constructor(props) {
        super(props);
        this.schTeacherReq = this.schTeacherReq.bind(this);
        this.homeTeacherReq = this.homeTeacherReq.bind(this);
        this.printResult = this.printResult.bind(this);
        this.genResult = this.genResult.bind(this);
        this.schTeacherReqForm = this.schTeacherReqForm.bind(this);
        this.homeTeacherReqForm = this.homeTeacherReqForm.bind(this);
        this.printResultForm = this.printResultForm.bind(this);
        this.genResultForm = this.genResultForm.bind(this);
        this.examTestPerf = this.examTestPerf.bind(this);
        this.assignmentPerf = this.assignmentPerf.bind(this);
        this.extraCurrPerf = this.extraCurrPerf.bind(this);
        this.newsPerf = this.newsPerf.bind(this);
        this.examTestPerfComp = this.examTestPerfComp.bind(this);
        this.assignmentPerfComp = this.assignmentPerfComp.bind(this);
        this.extraCurrPerfComp = this.extraCurrPerfComp.bind(this);
        this.newsPerfComp = this.newsPerfComp.bind(this);
        this.perfDisplayView = this.perfDisplayView.bind(this);
        this.performanceAppContent = this.performanceAppContent.bind(this);
        this.performanceDisplay = this.performanceDisplay.bind(this);
        this.eventsDisplay = this.eventsDisplay.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlekeypress = this.handlekeypress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateMsgServer = this.updateMsgServer.bind(this);

        this.itrakacadAPI = "api9f6ae8ba";
        this.path = '\sessions';
        this.comp_shd_update = true;
        this.userID = this.props.userID;
        this.student_id = this.props.student_id;
        this.headerText = this.props.headerText;
        this.view_date =  new Date(this.props.perf_view_date);
        this.acad_sess = this.props.acad_sess;
        this.acad_term = this.props.acad_term;
        this.acad_week = this.props.acad_week;
        this.day = this.props.headerText;
        this.eventTitle = this.props.headerText;
        this.displayView = this.props.dispView;
        this.perf_requested = false;
        this.day_perf = [];
        this.term_perf = [];
        this.perf_trend = [];
        this.day_asgmt = [];
        this.term_asgmt = [];
        this.asgmt_perf_trend = [];
        this.day_xtra_cur = [];
        this.term_xtra_cur = [];
        this.xtra_cur_perf_trend = [];
        this.day_news = [];
        this.news_perf_trend = [];
        this.reqSrc = 'ext';
        this.detailsView = "";
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
        this.state = {dispView: "", perfLoaded:false};
        this.perf_data_counter = 0;
        this.perf_disp_msg = '';
        /*this.state = {  new_inmsg: "",
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
        console.log(this.props.name + ": " + this.props.userID);
        console.log(this.state.username);*/        
    }
    removePerfData = () =>{
        document.getElementById("perf_data").style.display = "none";
    }
    
    displayPerfData = () => {
        document.getElementById("perf_data").style.display = "flex";
    }

    //update unsubmitted outmsg from UI component here
    handleChange = (event) => {
        /*const new_msg = event.target.value;
        this.comp_shd_update = false;
        this.shouldComponentUpdate();
        this.setState({new_outmsg: new_msg}, ()=>console.log(this.state.new_outmsg));
        */
    }

    handlekeypress = (event) => {
        /*if (event.key === "Enter") {
            if (document.getElementById('msg-field').value != '') {
                this.handleSubmit(event);
            }
        }*/
    }
    //update submitted outmsg locally and on the server
    handleSubmit = (event) => {
       /* if(event.target.typeof==='submit') event.preventDefault();
        document.getElementById('msg-field').value = '';
        */
    }

    updateMsgServer = (msgnote) => {
        /*let msgdelivered = false;
        axios.post('http://localhost:8000/chatmsg?session_id=' + this.state.session.id + '&session_no=' + this.state.session.session_no + '&msg=' + msgnote + '&bxno=' + this.state.session.msgbxno)
        .then(response => {
           console.log(response.data);
           msgdelivered = response.data.connect_status=="OK" ? true : false;
           this.setState({new_inmsg: "sent"});//, ()=>console.log(this.state.new_inmsg));
        })
        .catch((err) => {
            console.log("Unable to connect to the server.");
            this.setState({new_inmsg: "error!"});//, ()=>console.log(this.state.new_inmsg));
        })*/
        
    }
    
    componentDidMount = () => {
        console.log("Live chat mounted.");
        
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
    ////'/session_request_status'
    componentDidUpdate = () => {
        console.log("Component updated.");
        this.reqSrc = 'ext';
        //this.perf_loaded = false;
    }

    componentWillUnmount = () => {
        console.log("This App will unmount.");
    }

    perfDisplayView = () => {
        this.displayView = "performance";
        this.reqSrc = 'int';
        this.setState({dispView: "performance"});
        this.setState({perfLoaded:false});
        this.perf_requested = false;
    }

    perfDetailsView = () => {
        this.displayView = "perf-details";
        this.detailsView = "all";
        this.reqSrc = 'int';
        this.setState({dispView: "perf-details"});
    }

    examDetailsView = () => {
        this.displayView = "perf-details";
        this.detailsView = "exams";
        this.reqSrc = 'int';
        this.setState({dispView: "exams"});
    }

    assignmentDetailsView = () => {
        this.displayView = "perf-details";
        this.detailsView = "assignment";
        this.reqSrc = 'int';
        this.setState({dispView: "assignment"});
    }

    extraCurrDetailsView = () => {
        this.displayView = "perf-details";
        this.detailsView = "extra-curr";
        this.reqSrc = 'int';
        this.setState({dispView: "extra-curr"});
    }

    newsDetailsView = () => {
        this.displayView = "perf-details";
        this.detailsView = "news";
        this.reqSrc = 'int';
        this.setState({dispView: "news"});
    }

    performanceAppContent = () => {
        if(this.displayView == 'performance') 
            return this.performanceDisplay();
        else if(this.displayView == 'events')
            return this.eventsDisplay();
        else if(this.displayView=='perf-details')
            return this.performanceDetails();
        else if(this.displayView=='feedback')
            return this.perfFeedback();
        else if(this.displayView == 'print_result') 
            return this.printResult();
        else if(this.displayView == 'gen_result')
            return this.genResult();
        else if(this.displayView=='hm_tch_req')
            return this.homeTeacherReq();
        else if(this.displayView=='sch_tch_req')
            return this.schTeacherReq();
    }

    perfFeedback = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.perfDisplayView}>Parent/Teacher Feedback</button>
                <div className="indicators-p">                 
                    {this.perfFeedbackForm()}
                </div>
            </div>            
        ); 
    }

    printResult = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.perfDisplayView}>View/Print Result</button>
                <div className="indicators-p">                 
                    {this.printResultForm()}
                </div>
            </div>            
        ); 
    }
 
    genResult = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.perfDisplayView}>Generate Result Sheet</button>
                <div className="indicators-p">                 
                    {this.genResultForm()}
                </div>
            </div>            
        ); 
    }
    
    homeTeacherReq = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.perfDisplayView}>Home Teacher Request</button>
                <div className="indicators-p">                 
                    {this.homeTeacherReqForm()}
                </div>
            </div>            
        ); 
    }
    
    schTeacherReq = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.perfDisplayView}>School Teacher Request</button>
                <div className="indicators-p">                 
                    {this.schTeacherReqForm()}
                </div>
            </div>            
        ); 
    }

    performanceDetailsContent = () => {
        if(this.detailsView == 'exams') 
            return (
                <div className="indicators-p">  
                    {this.examTestPerf()}                
                    {this.perfFeedbackForm()}
                </div>
            ); 
        else if(this.detailsView == 'assignment')
            return (
                <div className="indicators-p">  
                    {this.assignmentPerf()}                
                    {this.perfFeedbackForm()}
                </div>
            ); 
        else if(this.detailsView == 'extra-curr') 
            return (
                <div className="indicators-p">  
                    {this.extraCurrPerf()}                
                    {this.perfFeedbackForm()}
                </div>
            );  
        else if(this.detailsView == 'news')
            return (
                <div className="indicators-p">  
                    {this.newsPerf()}                
                    {this.perfFeedbackForm()}
                </div>
            );  
        else if(this.detailsView=='all')
            return (
                <div className="indicators-p">  
                    {this.examTestPerf()}
                    {this.assignmentPerf()}
                    {this.extraCurrPerf()} 
                    {this.newsPerf()}                
                    {this.perfFeedbackForm()}
                </div>
            ); 
    }

    performanceDetails = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.perfDisplayView}>Selected Performance Details/Feedback</button>
                {this.performanceDetailsContent()} 
            </div>            
        );
    }

    perfFeedbackForm = () => {
        return(
                    <div className="event-notes">
                        <div className='note-header'>
                            <img src = {assignment2icon}/>
                            <div> Performance Feedback Form</div>
                        </div>
                        <div className='note-data'>
                            <div className='form-data-row'>
                                <div><label>Message:</label></div>
                                <input type='text'/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Rate Performance:</label></div>
                                <select name='perfRating' style={{width:'130px'}}>
                                    <option>Below Expectation</option>
                                    <option>Meet Expectation</option>
                                    <option>Exceed Expectation</option>
                                </select>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='feedback-email' name='feedbackEmail'/>
                                <div><label for="feedback-email">Send via Email</label></div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='feedback-sms' name='feedbackSMS'/>
                                <div><label for="feedback-sms">Send via SMS</label></div>
                            </div>
                        </div>
                        <div className='note-footer'>
                            <button className='mark-btn'>Send Feedback</button>
                            <button className='delete-btn'>Reset</button>
                        </div>
                    </div>
        );
    }

    printResultForm = () => {
        return(
                    <div className="event-notes">
                        <div className='note-header'>
                            <img src = {assignment2icon}/>
                            <div> View & Print Result</div>
                        </div>
                        <div className='note-data'>
                            <div className='form-data-row'>
                                <div><label>Full Name:</label></div>
                                <input type='text'/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>School ID:</label></div>
                                <input type='text'/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Academic Session:</label></div>
                                <select name='perfRating' style={{width:'130px'}}>
                                    <option>2024/25</option>
                                    <option>2025/26</option>
                                    <option>2026/27</option>
                                </select>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Term:</label></div>
                                <select name='perfRating' style={{width:'130px'}}>
                                    <option>1st</option>
                                    <option>2nd</option>
                                    <option>3rd</option>
                                </select>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='feedback-email' name='feedbackEmail'/>
                                <div><label for="feedback-email">Receive a copy via Email</label></div>
                            </div>
                        </div>
                        <div className='note-footer'>
                            <button className='mark-btn'>View Result</button>
                            <button className='delete-btn'>Reset</button>
                        </div>
                    </div>
        );
    }

    genResultForm = () => {
        return(
        <div className="event-notes">
            <div className='note-header'>
                <img src = {assignment2icon}/>
                <div> Generate Result from Database</div>
            </div>
            <div className='note-data'>
                <div className='form-data-row'>
                    <div><label>Full Name:</label></div>
                    <input type='text'/>
                </div>
                <div className='form-data-row'>
                    <div><label>School ID:</label></div>
                    <input type='text'/>
                </div>
                <div className='form-data-row'>
                    <div><label>Academic Session:</label></div>
                    <select name='perfRating' style={{width:'130px'}}>
                        <option>2024/25</option>
                        <option>2025/26</option>
                        <option>2026/27</option>
                    </select>
                </div>
                <div className='form-data-row'>
                    <div><label>Term:</label></div>
                    <select name='perfRating' style={{width:'130px'}}>
                        <option>1st</option>
                        <option>2nd</option>
                        <option>3rd</option>
                    </select>
                </div>
                <div className='note-data-row'>
                    <input type='checkbox' id='feedback-email' name='feedbackEmail'/>
                    <div><label for="feedback-email">Enable Email Notification</label></div>
                </div>
            </div>
            <div className='note-footer'>
                <button className='mark-btn'>Generate Result</button>
                <button className='delete-btn'>Reset</button>
            </div>
        </div>
        );
    }

    homeTeacherReqForm = () => {
        return(
                    <div className="event-notes">
                        <div className='note-header'>
                            <img src = {assignment2icon}/>
                            <div> Request Home Lesson Teacher</div>
                        </div>
                        <div className='note-data'>
                            <div className='form-data-row'>
                                <div><label>Message:</label></div>
                                <input type='text'/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Teacher Category:</label></div>
                                <select name='perfRating' style={{width:'130px'}}>
                                    <option>Male Teacher</option>
                                    <option>Female Teacher</option>
                                    <option>Male/Female Teacher</option>
                                </select>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Subject:</label></div>
                                <select name='perfRating' style={{width:'130px'}}>
                                    <option>English</option>
                                    <option>Physics</option>
                                </select>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='feedback-email' name='feedbackEmail'/>
                                <div><label for="feedback-email">Enable SMS Notification</label></div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='feedback-sms' name='feedbackSMS'/>
                                <div><label for="feedback-sms">Enable Email Notification</label></div>
                            </div>
                        </div>
                        <div className='note-footer'>
                            <button className='mark-btn'>Submit Request</button>
                            <button className='delete-btn'>Reset</button>
                        </div>
                    </div>
        );
    }

    schTeacherReqForm = () => {
        return(
        <div className="event-notes">
            <div className='note-header'>
                <img src = {assignment2icon}/>
                <div> Request School Lesson Teacher</div>
            </div>
            <div className='note-data'>
                <div className='form-data-row'>
                    <div><label>Message:</label></div>
                    <input type='text'/>
                </div>
                <div className='form-data-row'>
                    <div><label>Teacher Category:</label></div>
                    <select name='perfRating' style={{width:'130px'}}>
                        <option>Male Teacher</option>
                        <option>Female Teacher</option>
                        <option>Male/Female Teacher</option>
                    </select>
                </div>
                <div className='form-data-row'>
                    <div><label>Subject:</label></div>
                    <select name='perfRating' style={{width:'130px'}}>
                        <option>English</option>
                        <option>Physics</option>
                    </select>
                </div>
                <div className='note-data-row'>
                    <input type='checkbox' id='feedback-email' name='feedbackEmail'/>
                    <div><label for="feedback-email">Enable SMS Notification</label></div>
                </div>
                <div className='note-data-row'>
                    <input type='checkbox' id='feedback-sms' name='feedbackSMS'/>
                    <div><label for="feedback-sms">Enable Email Notification</label></div>
                </div>
            </div>
            <div className='note-footer'>
                <button className='mark-btn'>Submit Request</button>
                <button className='delete-btn'>Reset</button>
            </div>
        </div>
        );
    }

    examTestPerf = () => {
        return(
                <div className="notes">
                    <div className='note-header' onClick={this.examDetailsView}>
                        <img src = {exam2icon}/>
                        <div> Exams / Tests</div>    
                    </div>    
                    <div className='note-data'>
                        {this.examTestPerfComp()}
                    </div>                                        
                </div>
        );
        /*return(
                <div className="notes">
                    <div className='note-header' onClick={this.examDetailsView}>
                        <img src = {exam2icon}/>
                        <div> Exams / Tests</div>    
                    </div>    
                    <div className='note-data'>
                        <div className='note-data-row'>
                            <input type='checkbox'/>
                            <div> Exam - English Lang</div>
                            <img src = {greenupicon}/>
                            <div style={{color:'green'}}>90%</div>
                        </div>
                        <div className='note-data-row'>
                            <input type='checkbox'/>
                            <div> Exam - Basic Sc.</div>
                            <img src = {greenupicon}/>
                            <div style={{color:'green'}}>80%</div>
                        </div>
                        <div className='note-data-row'>
                            <input type='checkbox'/>
                            <div> Test - Mathematics</div>
                            <img src = {reddownicon}/>
                            <div style={{color:'orange'}}>50%</div>
                        </div>
                        <div className='note-data-row'>
                            <input type='checkbox'/>
                            <div> Test - French</div>
                            <img src = {reddownicon}/>
                            <div style={{color:'red'}}>30%</div>
                        </div>
                    </div>                                        
                </div>
        ); */
    }

    examTestPerfComp = () => {
        let trendIcon;
        let score_color = '';
        const examTestComp = [];
        for (let index = 0; index < this.day_perf.length; index++) {
            if(this.perf_trend[index]=='up'){
                trendIcon = greenupicon;
            }else if(this.perf_trend[index]=='down'){
                trendIcon = reddownicon;
            }else if(this.perf_trend[index]=='same'){
                trendIcon = orangerighticon;
            }else if(this.perf_trend[index]=='none'){
                trendIcon = orangerighticon;
            }

            if (this.day_perf[index].score<50) {
                score_color = 'red';
            } else if (this.day_perf[index].score>=50 && this.day_perf[index].score<80) {
                score_color = 'orange';
            } else if (this.day_perf[index].score>=80) {
                score_color = 'green';
            }

            examTestComp.push(
                <div className='note-data-row'>
                    <input type='checkbox'/>
                    <div> {this.day_perf[index].assessment_type} - {this.day_perf[index].subject_id}</div>
                    <img src = {trendIcon}/>
                    <div style={{color:score_color}}>{this.day_perf[index].score}%</div>
                </div>
            );
        }
        return(    
            examTestComp
        );
    }

    assignmentPerf = () => {
        return(
                    <div className="notes">
                        <div className='note-header'  onClick={this.assignmentDetailsView}>
                            <img src = {assignment2icon}/>
                            <div> Assignment Note</div>
                        </div>
                        <div className='note-data'>
                            {this.assignmentPerfComp()}
                        </div>
                    </div>
        );
        /*        return(
                    <div className="notes">
                        <div className='note-header'  onClick={this.assignmentDetailsView}>
                            <img src = {assignment2icon}/>
                            <div> Assignment Note</div>
                        </div>
                        <div className='note-data'>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Eng Lang - Pg01/30</div>
                                <img src = {reddownicon}/>
                                <div style={{color:'orange'}}>75%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Basic Sc. - Pg23/02</div>
                                <img src = {greenupicon}/>
                                <div style={{color:'green'}}>85%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Maths - Pg48/12</div>
                                <img src = {reddownicon}/>
                                <div style={{color:'red'}}>20%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> C.R.K - Pg03/22</div>
                                <img src = {greenupicon}/>
                                <div style={{color:'green'}}>100%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Agric Sc. - Pg20/08</div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'grey'}}>--%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> F.Maths - Pg40/18</div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'grey'}}>--%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Biology - Pg03/22</div>
                                <img src = {greenupicon}/>
                                <div style={{color:'green'}}>90%</div>
                            </div>
                        </div>
                    </div>
        ); */
    }

    assignmentPerfComp = () => {
        let trendIcon;
        let score_color = '';
        const assignmentComp = [];
        for (let index = 0; index < this.day_asgmt.length; index++) {
            if(this.asgmt_perf_trend[index]=='up'){
                trendIcon = greenupicon;
            }else if(this.asgmt_perf_trend[index]=='down'){
                trendIcon = reddownicon;
            }else if(this.asgmt_perf_trend[index]=='same'){
                trendIcon = orangerighticon;
            }else if(this.asgmt_perf_trend[index]=='none'){
                trendIcon = orangerighticon;
            }

            if (this.day_asgmt[index].score<50) {
                score_color = 'red';
            } else if (this.day_asgmt[index].score>=50 && this.day_asgmt[index].score<80) {
                score_color = 'orange';
            } else if (this.day_asgmt[index].score>=80) {
                score_color = 'green';
            }

            assignmentComp.push(
                <div className='note-data-row'>
                    <input type='checkbox'/>
                    <div> {this.day_asgmt[index].subject_id} - pg{this.day_asgmt[index].page_no}/{this.day_asgmt[index].question_no}</div>
                    <img src = {trendIcon}/>
                    <div style={{color:score_color}}>{this.day_asgmt[index].score}%</div>
                </div>
            );
        }
        return(    
            assignmentComp
        );
    }

    extraCurrPerf = () => {
        return(
                    <div className="notes">
                        <div className='note-header'  onClick={this.extraCurrDetailsView}>
                            <img src = {extracur2icon}/>
                            <div> Extra-Curr Activity</div>
                        </div>
                        <div className='note-data'>
                            {this.extraCurrPerfComp()}
                        </div>
                    </div>
        );
        /*        return(
                    <div className="notes">
                        <div className='note-header'  onClick={this.extraCurrDetailsView}>
                            <img src = {extracur2icon}/>
                            <div> Extra-Curr Activity</div>
                        </div>
                        <div className='note-data'>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Chem Practical</div>
                                <img src = {greenupicon}/>
                                <div style={{color:'green'}}>90%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Cooking.</div>
                                <img src = {greenupicon}/>
                                <div style={{color:'green'}}>80%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Sports - BasketBall</div>
                                <img src = {reddownicon}/>
                                <div style={{color:'orange'}}>50%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Swimming</div>
                                <img src = {greenupicon}/>
                                <div style={{color:'red'}}>30%</div>
                            </div>
                        </div>
                    </div>
        ); */
    }

    extraCurrPerfComp = () => {
        let trendIcon;
        let score_color = '';
        const extraCurrComp = [];
        for (let index = 0; index < this.day_xtra_cur.length; index++) {
            if(this.xtra_cur_perf_trend[index]=='up'){
                trendIcon = greenupicon;
            }else if(this.xtra_cur_perf_trend[index]=='down'){
                trendIcon = reddownicon;
            }else if(this.xtra_cur_perf_trend[index]=='same'){
                trendIcon = orangerighticon;
            }else if(this.xtra_cur_perf_trend[index]=='none'){
                trendIcon = orangerighticon;
            }

            if (this.day_xtra_cur[index].score<50) {
                score_color = 'red';
            } else if (this.day_xtra_cur[index].score>=50 && this.day_xtra_cur[index].score<80) {
                score_color = 'orange';
            } else if (this.day_xtra_cur[index].score>=80) {
                score_color = 'green';
            }

            extraCurrComp.push(
                <div className='note-data-row'>
                    <input type='checkbox'/>
                    <div> {this.day_xtra_cur[index].title}</div>
                    <img src = {trendIcon}/>
                    <div style={{color:score_color}}>{this.day_xtra_cur[index].score}%</div>
                </div>
            );
        }
        return(    
            extraCurrComp
        );
    }

    newsPerf = () => {
        return(
                    <div className="notes">
                        <div className='note-header'  onClick={this.newsDetailsView}>
                            <img src = {news2icon}/>
                            <div> Announcement</div>
                        </div>
                        <div className='note-data'>
                        {this.newsPerfComp()}
                        </div>
                    </div>
        );
        /*        return(
                    <div className="notes">
                        <div className='note-header'  onClick={this.newsDetailsView}>
                            <img src = {news2icon}/>
                            <div> Announcement</div>
                        </div>
                        <div className='note-data'>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> <a href=''>Exam - Timetable</a> </div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'red'}}>0%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> <a href=''>School Timetable</a></div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'red'}}>0%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> <a href=''>Next PTA meeting</a></div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'red'}}>0%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> <a href=''>End-of-Year Party</a></div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'red'}}>0%</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> <a href=''>School Bus Students</a></div>
                                <img src = {orangerighticon}/>
                                <div style={{color:'red'}}>0%</div>
                            </div>
                        </div>
                    </div>
        ); */
    }

    newsPerfComp = () => {
        let trendIcon;
        let score_color = '';
        const newsComp = [];
        for (let index = 0; index < this.day_news.length; index++) {
            if(this.news_perf_trend[index]=='up'){
                trendIcon = greenupicon;
            }else if(this.news_perf_trend[index]=='down'){
                trendIcon = reddownicon;
            }else if(this.news_perf_trend[index]=='same'){
                trendIcon = orangerighticon;
            }else if(this.news_perf_trend[index]=='none'){
                trendIcon = orangerighticon;
            }

            if (this.day_news[index].score<50) {
                score_color = 'red';
            } else if (this.day_news[index].score>=50 && this.day_news[index].score<80) {
                score_color = 'orange';
            } else if (this.day_news[index].score>=80) {
                score_color = 'green';
            }

            newsComp.push(
                <div className='note-data-row'>
                    <input type='checkbox'/>
                    <div> <a href=''>{this.day_news[index].title}</a> </div>
                    <img src = {trendIcon}/>
                    <div style={{color:score_color}}>{this.day_news[index].score}%</div>
                </div>
            );
        }
        return(    
            newsComp
        );
    }

    performanceDisplay = () => {
        this.view_date =new Date(this.props.perf_view_date);
        let date_val = this.view_date.toString();
        if(!this.state.perfLoaded){
            if(!this.perf_requested){
                axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkstdtperformance?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                //API.get(this.itrakacadAPI, '/check_stdt_performance?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                /*get({
                    apiName: this.itrakacadAPI,
                    path: '/check_stdt_performance?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term
                  })*/
                .then(response => {
                    console.log(response.data);
                    //alert(JSON.stringify(response.data));
                    this.perf_data_counter++;
                    if(response.data.status == 'OK') {
                        this.day_perf = response.data.day_perf;
                        this.term_perf = response.data.term_perf;
                        this.perf_trend = response.data.perf_trend;
                        //this.perf_data_counter++;
                        if(this.perf_data_counter==4){
                            this.setState({perfLoaded:true});
                            this.perf_data_counter = 0;
                        }
                    }
                    else if(response.data.status == 'ERR') {
                        this.perf_disp_msg = response.data.details;
                        alert(response.data.details);
                    }else{
                        this.perf_disp_msg = response.data.details+": Connection Error!.";
                        alert(response.data.details+": Connection Error!.");
                    }  
                    if(this.perf_data_counter==4){
                        this.setState({perfLoaded:true});
                        this.perf_data_counter = 0;
                    }
                })
                axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkstdtassignment?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                //API.get(this.itrakacadAPI, '/check_stdt_assignment?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                /*get({
                    apiName: this.itrakacadAPI,
                    path: '/check_stdt_assignment?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term
                  })*/
                .then(response => {
                    console.log(response.data);
                    //alert(JSON.stringify(response.data));
                    this.perf_data_counter++;
                    if(response.data.status == 'OK') {
                        this.day_asgmt = response.data.day_asgmt;
                        this.term_asgmt = response.data.term_asgmt;
                        this.asgmt_perf_trend = response.data.asgmt_perf_trend;
                        //this.perf_data_counter++;
                        if(this.perf_data_counter==4){
                            this.setState({perfLoaded:true});
                            this.perf_data_counter = 0;
                        }
                    }
                    else if(response.data.status == 'ERR') {
                        this.perf_disp_msg = response.data.details;
                        alert(response.data.details);
                    }else{
                        this.perf_disp_msg = response.data.details+": Connection Error!.";
                        alert(response.data.details+": Connection Error!.");
                    }  
                    if(this.perf_data_counter==4){
                        this.setState({perfLoaded:true});
                        this.perf_data_counter = 0;
                    }
                })
                axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkstdtactivity?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                //API.get(this.itrakacadAPI, '/check_stdt_activity?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                /*get({
                    apiName: this.itrakacadAPI,
                    path: '/check_stdt_activity?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term
                  })*/
                .then(response => {
                    console.log(response.data);
                    //alert(JSON.stringify(response.data));
                    this.perf_data_counter++;
                    if(response.data.status == 'OK') {
                        this.day_xtra_cur = response.data.day_xtra_cur;
                        this.term_xtra_cur = response.data.term_xtra_cur;
                        this.xtra_cur_perf_trend = response.data.xtra_cur_perf_trend;
                        //this.perf_data_counter++;
                        if(this.perf_data_counter==4){
                            this.setState({perfLoaded:true});
                            this.perf_data_counter = 0;
                        }
                    }
                    else if(response.data.status == 'ERR') {
                        this.perf_disp_msg = response.data.details;
                        alert(response.data.details);
                    }else{
                        this.perf_disp_msg = response.data.details+": Connection Error!.";
                        alert(response.data.details+": Connection Error!.");
                    }  
                    if(this.perf_data_counter==4){
                        this.setState({perfLoaded:true});
                        this.perf_data_counter = 0;
                    }
                })
                axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkstdtnews?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                //API.get(this.itrakacadAPI, '/check_stdt_news?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term)
                /*get({
                    apiName: this.itrakacadAPI,
                    path: '/check_stdt_news?perf_date=' + this.props.perf_view_date + '&stdt_id=' + this.student_id + '&sess_id=' + this.acad_sess + '&term=' + this.acad_term
                  })*/
                .then(response => {
                    console.log(response.data);
                    //alert(JSON.stringify(response.data));
                    this.perf_data_counter++;
                    if(response.data.status == 'OK') {
                        this.day_news = response.data.day_news;
                        this.term_news = response.data.term_news;
                        this.news_perf_trend = response.data.news_perf_trend;
                        //this.perf_data_counter++;
                        if(this.perf_data_counter==4){
                            this.setState({perfLoaded:true});
                            this.perf_data_counter = 0;
                        }
                    }
                    else if(response.data.status == 'ERR') {
                        this.perf_disp_msg = response.data.details;
                        alert(response.data.details);
                    }else{
                        this.perf_disp_msg = response.data.details+": Connection Error!.";
                        alert(response.data.details+": Connection Error!.");
                    }  
                    if(this.perf_data_counter==4){
                        this.setState({perfLoaded:true});
                        this.perf_data_counter = 0;
                    }
                })
                this.perf_requested = true;
                this.perf_disp_msg = "Loading performance data. Pls wait...";
            }
            return(
                <div id="jan012024" className="perf-note">
                    <div className='date-header'>{date_val}</div>
                    <div className='perf-header'>
                        <button className="perf-view-btn" onClick={this.props.perfCallBack}>Day {this.day}</button>
                        <div className='perf-period'>{this.props.acad_sess} Academic Session</div>
                        <div className='perf-period'>{this.props.acad_term} Term</div>
                        <div className='perf-period'>Week {this.props.acad_week}</div>
                        <button className='perf-view-btn' onClick={this.perfDetailsView}>Review & Send Feedback</button>
                    </div>
                    <div className="indicators-p">                   
                        {this.perf_disp_msg}
                    </div>
                </div> 
            );
        }else {
            return (
                <div id="jan012024" className="perf-note">
                    <div className='date-header'>{date_val}</div>
                    <div className='perf-header'>
                        <button className="perf-view-btn" onClick={this.props.perfCallBack}>Day {this.day}</button>
                        <div className='perf-period'>{this.props.acad_sess} Academic Session</div>
                        <div className='perf-period'>{this.props.acad_term} Term</div>
                        <div className='perf-period'>Week {this.props.acad_week}</div>
                        <button className='perf-view-btn' onClick={this.perfDetailsView}>Review & Send Feedback</button>
                    </div>
                    <div className="indicators-p">                   
                        {this.examTestPerf()}
                        {this.assignmentPerf()}
                        {this.extraCurrPerf()}
                        {this.newsPerf()}
                    </div>
                </div>            
            );    
        }
    }

    eventsDisplay = () => {
        return (
            <div id="jan012024" className="perf-note">
                <button className="perf-date-btn" onClick={this.props.perfCallBack}>Event Scheduler Tag: {this.eventTitle}</button>
                <div className="indicators-p">                   
                    <div className="event-notes">
                        <div className='note-header'>
                            <img src = {exam2icon}/>
                            <div> Scheduled Task</div>
                        </div>
                        <div className='note-data'>
                            <div className='note-data-row-header'>
                                <input type='checkbox'/>
                                <div> Description</div>
                                <div> Start</div>
                                <div> End</div>
                                <div> Done</div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Revise English Lang</div>
                                <div> 1.00pm</div>
                                <div> 2.00pm</div>
                                <img src = {greenupicon}/>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Revise Basic Sc. and Study Mathematics later in the day to correct your previous mistakes in Maths.</div>
                                <div> - </div>
                                <div> - </div>
                                <img src = {greenupicon}/>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Revise Mathematics</div>
                                <div> 3.00pm</div>
                                <div> 4.00pm</div>
                                <img src = {reddownicon}/>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox'/>
                                <div> Revise French</div>
                                <div> 6.00pm</div>
                                <div> 7.00pm</div>
                                <img src = {reddownicon}/>
                            </div>
                        </div>
                        <div className='note-footer'>
                            <button className='mark-btn'>Mark As Completed</button>
                            <button className='delete-btn'>Delete Task(s)</button>
                        </div>
                    </div>
                    <div className="event-notes">
                        <div className='note-header'>
                            <img src = {assignment2icon}/>
                            <div> Create New Task</div>
                        </div>
                        <div className='note-data'>
                            <div className='form-data-row'>
                                <div><label for="task-email">Description:</label></div>
                                <input type='text'/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Start Time:</label></div>
                                <input type='time' name='taskTime' style={{width:'130px'}}/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>End Time:</label></div>
                                <input type='time' name='taskTime' style={{width:'130px'}}/>
                            </div>
                            <div className='form-data-row'>
                                <div><label>Change Tag:</label></div>
                                <input type='text' name='taskTime' style={{width:'130px'}}/>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='task-email' name='taskEmail'/>
                                <div><label for="task-email">Enable Email notification</label></div>
                            </div>
                            <div className='note-data-row'>
                                <input type='checkbox' id='task-sms' name='taskSMS'/>
                                <div><label for="task-sms">Enable SMS notification</label></div>
                            </div>
                        </div>
                        <div className='note-footer'>
                            <button className='mark-btn'>Add New Task</button>
                            <button className='delete-btn'>Reset</button>
                        </div>
                    </div>
                </div>
            </div>            
        );
    }

    render() { //<p><h1>Creating the Chat App!</h1></p>
        console.log("Rendering...");
        if (this.reqSrc=='ext') {
            this.displayView=this.props.dispView;           
        }
        return (
            <div>
                {this.performanceAppContent()}
            </div>
            
        );
    }
}

export default PerformanceApp;