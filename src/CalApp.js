// JavaScript source code
import { useState } from 'react';
import './App.css';
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import LiveChatApp from './LiveChat';
import sendicon from './sendicon.jpg';
import axios from "axios";
//import Amplify, {API} from 'aws-amplify'
import { post } from 'aws-amplify/api';
import { get } from 'aws-amplify/api';
import PerformanceApp from './PerformanceApp';
import NewsApp from './NewsApp';
import UpEventsApp from './UpEventsApp';
import EmailApp from './EmailApp';
import TeacherRequestApp from './TeacherRequestApp';
import DocPrint from './DocPrint';
import ResultApp from './ResultApp';
//var CanvasJSReact = require('@canvasjs/react-charts');
let perf_day = 1;

//axios.defaults.withCredentials = true;

//const itrakacadAPI = "api9f6ae8ba";
//const path = '\sessions';

/*
function LaunchCalApp() {
    removeLogin();
    //document.getElementById('root').innerHTML = "<div><TermCalApp cal_size=3/></div>";
}*/

function TermCalApp(props) {
    const [startchat, setStartChat] = useState(false);
    const [view_perf, setViewPerf] = useState(false);
    const [attendance_table, setAttendTable] = useState([]);
    const [session_id, setSessionID] = useState('');
    const [cal_loaded, setCalLoaded] = useState(false);
    const [view_date, setViewDate] = useState('');
    const [acad_term, setAcadTerm] = useState('');
    const [acad_week, setAcadWeek] = useState(1);
    const [up_events, setUpEvents] = useState(false);
    const [news_pubs, setNewsPubs] = useState(false);
    const [perf_HeaderText, setPerfHeaderText] = useState(1);
    const [perf_viewType, setPerfViewType] = useState('performance');
    const [contentView, setContentView] = useState('calendar');
    const [targ_date, setTargDate] = useState(new Date());
    const [student_id, setStudentID] = useState(props.userID);//useState('oluwsupo0001');
    const termCal = [];
    //let attendance_table = [];
    let acad_wk = 0;
    let vperf = false;
    let vcal = false;
    //let targ_date = new Date();
    let attended_school = false;

    let contentApp = () => {
        if(contentView=='performance') return (<PerformanceApp headerText={perf_HeaderText} perf_view_date={view_date} student_id={student_id} acad_sess={session_id} acad_term={acad_term} acad_week={acad_week} dispView={perf_viewType} perfCallBack={removePerformance}/>) ;
        else if(contentView=='print-result') return (<PerformanceApp headerText={perf_HeaderText} dispView="print_result" perfCallBack={removePerformance}/>);
        else if(contentView=='gen-result') return (<PerformanceApp headerText={perf_HeaderText} dispView="gen_result" perfCallBack={removePerformance}/>);
        else if(contentView=='hm_tch_req') return (<PerformanceApp headerText={perf_HeaderText} dispView="hm_tch_req" perfCallBack={removePerformance}/>);
        else if(contentView=='sch_tch_req') return (<PerformanceApp headerText={perf_HeaderText} dispView="sch_tch_req" perfCallBack={removePerformance}/>);
        else if(contentView=='feedback-email') return (<PerformanceApp headerText={perf_HeaderText} perf_view_date='' dispView="feedback" perfCallBack={removePerformance}/>);
        else if(up_events) return (<UpEventsApp/>);
        else if(news_pubs) return (<NewsApp/>);
        else if(contentView=='calendar') return (<CalApp/>);
        /*
        if(view_perf) return (<PerformanceApp day={perf_HeaderText} perfCallBack={viewPerformance}/>);
        else if(print_result) return (<DocPrint/>);
        else if(gen_result) return (<ResultApp/>);
        else if(hm_tch_req) return (<TeacherRequestApp/>);
        else if(sch_tch_req) return (<TeacherRequestApp/>);
        else if(fdbk_email) return (<EmailApp/>);
        else if(up_events) return (<UpEventsApp/>);
        else if(news_pubs) return (<NewsApp/>);
        else return (<CalApp/>);*/
    }

    let appMthRecord= (days_per_mnth,start_day,yr,mth) => {

        const calCard = [];
        const mthEvents = ['Maths','Eng','Geo','Phy','Chem','Bio','Sports','Play','Visit','Rev','','','Rev','Visit','Maths','Eng','Geo','Phy','Chem','Bio','Sports','Play','Visit','Rev','','','Rev','Visit'];
    
        for (let day = 1; day <= start_day; day++) {
            calCard.push(
                <div id="jan012024" className="cal-note">

                </div>
            );
        }

        for (let day = 1; day <= days_per_mnth; day++) {
            let btn_date = yr + '-' + mth + '-'+ day;

            //let cal_date = new Date(btn_date);
            if((attendance_table.length>0)&&(acad_wk<attendance_table.length)){
                const daysInMth = [31,28,31,30,31,30,31,31,30,31,30,31];
                let wk_start = new Date (attendance_table[acad_wk].week_start);
                let wk_end = new Date (attendance_table[acad_wk].week_end);
                let wk_dates = [];
                let wkyr = wk_start.getFullYear();
                let wkmth = wk_start.getMonth() + 1;
                let wkdate = wk_start.getDate();
                for (let index = 0; index < 6; index++) {
                    if (wkdate > daysInMth[wkmth-1]){
                        wkdate = 1;
                        wkmth++;
                    }
                    wk_dates[index] = wkyr + '-' + wkmth + '-' + wkdate;
                    wkdate++;   
                }
                //let start_date = wk_start.getFullYear() + '-' + (wk_start.getMonth() + 1) + '-' + wk_start.getDate();
                let end_date = wk_end.getFullYear() + '-' + (wk_end.getMonth() + 1) + '-' + wk_end.getDate();
                if (parseInt(btn_date)<parseInt(wk_dates[0])){
                    attended_school = false;
                }else if (btn_date==wk_dates[0]){
                    attended_school = (attendance_table[acad_wk].sunday=='Y') ? true : false;
                }else if (btn_date==wk_dates[1]){
                    attended_school = (attendance_table[acad_wk].monday=='Y') ? true : false;
                }else if (btn_date==wk_dates[2]){
                    attended_school = (attendance_table[acad_wk].tuesday=='Y') ? true : false;
                }else if (btn_date==wk_dates[3]){
                    attended_school = (attendance_table[acad_wk].wednesday=='Y') ? true : false;
                }else if (btn_date==wk_dates[4]){
                    attended_school = (attendance_table[acad_wk].thursday=='Y') ? true : false;
                }else if (btn_date==wk_dates[5]){
                    attended_school = (attendance_table[acad_wk].friday=='Y') ? true : false;
                }else if (btn_date==(end_date)){
                    attended_school = (attendance_table[acad_wk].saturday=='Y') ? true : false;
                    acad_wk++;
                }else {
                    attended_school = false;
                }
            }else{
                attended_school = false;
            }

            if(attended_school){
                calCard.push(
                    <div id="jan012024" className="cal-note">
                        <button className="date-btn" onClick={viewPerformance} title={acad_wk} value={btn_date}>{day}</button>
                        <div className="indicators-e">                   
                            <button className="event-btn" onClick={viewEvents}>{mthEvents[day-1]}</button>
                        </div>
                        <div className="indicators-c">                   
                            <div className="assignment-indicator"></div>
                            <div className="exam-indicator"></div>
                            <div className="extra-cur-indicator"></div>
                            <div className="info-indicator"></div>
                        </div>
                    </div>
                );/*<div className="test-indicator"></div>*/
            }else{
                calCard.push(
                    <div id="jan012024" className="cal-note">
                        <button className="no-attend-date-btn" onClick={noviewPerformance} title={acad_wk} value={btn_date}>{day}</button>
                        <div className="indicators-e">                   
                            <button className="event-btn" onClick={viewEvents}>{mthEvents[day-1]}</button>
                        </div>
                        <div className="indicators-c">                   
                            <div className="assignment-indicator"></div>
                            <div className="exam-indicator"></div>
                            <div className="extra-cur-indicator"></div>
                            <div className="info-indicator"></div>
                        </div>
                    </div>
                );
            }

        }
        //document.getElementById("root").innerHTML = monthCal;//
        return calCard;
    }

    let CalApp = () => {
        const daysOfMth = [31,28,31,30,31,30,31,31,30,31,30,31];
        const months = ['Jan', 'Feb', 'Mar', 'Apr','May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthCal = [];
        let term_months_start = 0;
        let cur_date = new Date(targ_date);
        let yr = cur_date.getFullYear();
        let mth = cur_date.getMonth()+1;
        let day = cur_date.getDate();
        //let attend_date = cur_date.toLocaleDateString();
        let attend_date = yr + '-' + mth + '-' + day;
        let term = '1st';
        if((9<=mth)&&(mth<=12)) {
            term = '1st';
            term_months_start = 8;//Sep
        }
        else if((1<=mth)&&(mth<=4)) {
            term = '2nd';
            term_months_start = 0;//Jan
        }
        else if((5<=mth)&&(mth<=8)) {
            term = '3rd';
            term_months_start = 4;//May
        }
        acad_wk = 0;
        let disp_size = parseInt(props.cal_size)  + parseInt(term_months_start) ;//can change this later if needed for larger display.
        console.log(attend_date);
        if(cal_loaded){
            for (let i = term_months_start; i < disp_size; i++) {
                let mth = i + 1;
                let month_start_date = new Date(yr + '-' + mth + '-01');
                let month_start_day = month_start_date.getDay();
                console.log('day: '+month_start_day+' Date: '+month_start_date);
                monthCal.push(
                    <div>
                        <div className="month-title"><h5>{months[i]}</h5></div>
                        <div className="cal-wrapper">{wkHeader()}{appMthRecord(daysOfMth[i],month_start_day,yr,mth)}</div>
                    </div>
                );
            }
            return monthCal;
        }else if(!cal_loaded){
            //let student_id = 'oluwsupo0001';
            axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkstdtattendance?attend_date=' + attend_date + '&stdt_id=' + student_id + '&term=' + term)
            //API.get(itrakacadAPI, '/check_stdt_attendance?attend_date=' + attend_date + '&stdt_id=' + student_id + '&term=' + term)
/*            get({
                apiName: itrakacadAPI,
                path: '/check_stdt_attendance?attend_date=' + attend_date + '&stdt_id=' + student_id + '&term=' + term
              })*/
            .then(response => {
                console.log(response.data);
                //alert(response.data);
                if(response.data.status == 'OK') {
                    //alert("Attendance record found!");
                    console.log("Session ID: "+response.data.session_id);
                    console.log("First Attendance Record: "+response.data.attendance_table[0].week_end);
                    setAttendTable(response.data.attendance_table);
                    setSessionID(response.data.session_id);
                    setAcadTerm(term);
                    setCalLoaded(true);
                }
                else if(response.data.status == 'ERR') {
                    alert(response.data.details);
                    setCalLoaded(true);
                }else{
                    alert(response.data.details+": Connection Error!.");
                    setCalLoaded(true);
                }  
            })
        }
    }
    
    let chatSection = () => {
        return (
            <div>
                <div className="cal-chat-panel">
                    <div className="section-header">
                        <h3>Setup & Links</h3>
                    </div>
                    <div className="link-option" onClick={viewCalendarInput}>
                        <p>Attendance Page</p>
                    </div>
                    <div className='link-data-row' id='calinput'>
                        <div><label>Date:</label></div>
                        <input type='date' id='cdate'/>
                        <button className='mark-btn' onClick={viewCalendar}>View</button>
                    </div>
                    <div className="link-option" onClick={viewPerfAppInput}>
                        <p>View Performance</p>
                    </div>
                    <div className='link-data-row' id='perfinput'>
                        <div><label>Date:</label></div>
                        <input type='date' id='pdate'/>
                        <button className='mark-btn' onClick={viewPerfApp}>View</button>
                    </div>
                    <div className="link-option" onClick={printResult}>
                        <p>Print Result</p>
                    </div>
                    <div className="link-option" onClick={genResult}>
                        <p>Generate Result</p>
                    </div>
                    <div className="link-option" onClick={hmTeacherReq}>
                        <p>Home Teacher Request</p>
                    </div>
                    <div className="link-option" onClick={schTeacherReq}>
                        <p>School Teacher Request</p>
                    </div>
                    <div className="link-option" onClick={chatSession}>
                        <p>Live Chat</p>
                    </div>
                    <div className="link-option" onClick={feedbackEmail}>
                        <p>Feedback Email</p>
                    </div>
                    <div className="link-option">
                        <p>Upcoming Events</p>
                    </div>
                    <div className="link-option">
                        <p>News & Publications</p>
                    </div>  
                </div>
            </div>
            );
    }

    let viewPerformance = (event) => {
        let headerText = event.target.innerHTML;
        let btn_click_date = event.target.value;
        let btn_acad_wk = event.target.title;
        let wk = parseInt(btn_acad_wk) + 1;
        setViewDate(btn_click_date);
        setAcadWeek(wk);
        setPerfViewType('performance');
        setPerfHeaderText(headerText);
        setContentView('performance');
        /*
        if(!view_perf) setPerfDay(headerText);
        setViewPerf(view_perf?false:true);*/
    }

    let noviewPerformance = (event) => {
        let headerText = event.target.innerHTML;
        let btn_click_date = event.target.value;
        setViewDate(btn_click_date);
        setPerfViewType('no-attendance');
        setPerfHeaderText(headerText);
        setContentView('performance');
        /*
        if(!view_perf) setPerfDay(headerText);
        setViewPerf(view_perf?false:true);*/
    }

    let viewPerfApp = (event) => {
        let tg_date = document.getElementById('pdate').value;
        if(tg_date != '') setTargDate(tg_date); 
        else setTargDate(new Date());  
        setPerfViewType('performance');
        setPerfHeaderText('1');//use current date
        setContentView('performance');
        /*
        if(!view_perf) setPerfDay(headerText);
        setViewPerf(view_perf?false:true);*/
    }

    let viewPerfAppInput = (event) => {
        document.getElementById('calinput').style.display='none';
        vcal = false;
        if(vperf){
            document.getElementById('perfinput').style.display='none';
            vperf = false;
        }else{
            document.getElementById('perfinput').style.display='grid';
            vperf = true;
        }    
    }

    let viewCalendarInput = (event) => {
        document.getElementById('perfinput').style.display='none';
        vperf = false;
        if(vcal){
            document.getElementById('calinput').style.display='none';
            vcal = false;
        }else{
            document.getElementById('calinput').style.display='grid';
            vcal = true;
        }
    }

    let viewCalendar = (event) => {
        let tg_date = document.getElementById('cdate').value;
        if(tg_date != '') setTargDate(tg_date);  
        else setTargDate(new Date());     
        setContentView('calendar');
        setCalLoaded(false);
    }

    let schTeacherReq = (event) => {
        setPerfHeaderText('1');//use current date
        setContentView('sch_tch_req');
    }

    let hmTeacherReq = (event) => {
        setPerfHeaderText('1');//use current date
        setContentView('hm_tch_req');
    }
   
    let printResult = (event) => {
        setPerfHeaderText('1');//use current date
        setContentView('print-result');
    }

    let genResult = (event) => {
        setPerfHeaderText('1');//use current date
        setContentView('gen-result');
    }

    let feedbackEmail = (event) => {
        setPerfHeaderText('1');//use current date
        setContentView('feedback-email');
    }

    let viewEvents = (event) => {
        let headerText = event.target.innerHTML;
        setPerfViewType('events');
        setPerfHeaderText(headerText);
        setContentView('performance');
        /*
        if(!view_perf) setPerfDay(headerText);
        setViewPerf(view_perf?false:true);*/
    }

    let removePerformance = (event) => {
        let headerText = event.target.innerHTML;
        setContentView('calendar');
        setCalLoaded(false);
        /*
        if(!view_perf) setPerfDay(headerText);
        setViewPerf(view_perf?false:true);*/
    }

    let wkHeader = () => {
        const wkDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        const wk_title = [];
        for (let i = 0; i < wkDays.length; i++) {
            wk_title.push(
                <div className="wk-days">{wkDays[i]}</div>
            );
        }
        return wk_title;
    }

    //alert(props.userID + ": " + props.cal_size);
    const chatSession = (event) => {
        setStartChat(startchat?false:true);
    }

    termCal.push(navSection());
    
    termCal.push(
        <div className="content-area">
            {chatSection()}
            <div>
                <div className="cal-header">
                    <h1>School Attendance Dashboard</h1>
                    <p className="header-style4">
                        Daily attendance record for <strong>{props.username}</strong> is shown in the dashboard below. 
                    </p>
                    <p> You can view the academic and non-academic
                        performance details of any day by clicking on the date button in the calendar.
                        Get live updates on your child's performance in both academic and extra-curricular activities in their school without
                        waiting for the school's open day session or end-of-term reports.
                    </p>
                </div>
                <div className="calendar-container">
                    {contentApp()}                   
                </div>
                {chartSection()}
            </div>           
        </div>
    );
    //let userchat = new LiveChatApp({mtype:"small_size", size:"13"});
    //termCal.push(userchat.render())
    if(startchat){
        termCal.push(<LiveChatApp userID={props.userID} name={props.username}/>);
    }
    termCal.push(
        <div>
            <img className='chat-icon' src={sendicon} onClick={chatSession} /> 
        </div>
    );
    //termCal.push(chartSection());
    termCal.push(footerSection());

    return termCal;
}

/***Internal Scripts for navSection ***/
/*function removeLogin() {
    document.getElementById("login").style.display = "none";
}

function removeSignUp() {
    document.getElementById("signUp").style.display = "none";
}*/

let displayLogout = () => {
    axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/removeregusersession')
    //API.get(itrakacadAPI, '/remove_reg_user_session')
/*    get({
        apiName: itrakacadAPI,
        path: '/remove_reg_user_session'
      })*/
    .then(response => {
        console.log(response.data);
        alert(response.data);
        if(response.data == true) {
             alert("You have been logged out.");
             window.location = "";
             //setUserValid(true);
             //setUserName(userid);
        }else{
             console.log(response.data+": No user session available. User is login out.");
             window.location = "";
             //setUserValid(false);
        }  
     })   
    //document.getElementById("login").style.display = "flex";
    
}

let displaySignUp = () => document.getElementById("signUp").style.display = "flex";

function navSection() {
    /* <div id="landing_page"> </div>*/
    return (
        
            <section id="nvb13" className="navbar">
                <nav id="nvbc13" className="navbar-container">
                    <div id="nvbw13" className="navbar-wrapper">
                        <div id="lgc12" className="logo-container">
                            <a id="lglk12" href="">
                                <img id="company-logo" src="itrak-logo.png" />
                            </a>
                        </div>
                        <div id="nvc12" className="nav-container">
                            <div id="nvm12" className="nav-menu">
                                <div className="nav-item">
                                      <div className="sub-link">
                                          <a className="nav-link" id="abt-us">About Us</a>
                                          <div className="sub-link-menu">
                                              <div className="sub-link2">
                                                  <a className="sub-link-item">iTrak Technology Company</a>
                                                  <div className="sub-link-menu2">
                                                      <a className="sub-link-item">iTrak Educational App</a>
                                                      <a className="sub-link-item">iTrak Industrial Process Control</a>
                                                      <a className="sub-link-item">iTrak Autonomous Machines</a>
                                                      <a className="sub-link-item">iTrak Power Solutions</a>
                                                  </div>
                                              </div>
                                              <a className="sub-link-item">iTrak Business Segments</a>
                                              <div className="sub-link2">
                                                  <a className="sub-link-item">Contact Us @iTraktech</a>
                                                  <div className="sub-link-menu2">
                                                      <div className="sub-link2">
                                                          <a className="sub-link-item">iTrak Educational App</a>
                                                          <div className="sub-link-menu2">
                                                              <a className="sub-link-item">Purchase License</a>
                                                              <a className="sub-link-item">Renew License</a>
                                                              <div className="sub-link2">
                                                                  <a className="sub-link-item">Request Quotes - RFQ</a>
                                                                  <div className="sub-link-menu2">
                                                                      <a className="sub-link-item">RFQ - Int. Students</a>
                                                                      <a className="sub-link-item">RFQ - Ext. Students</a>
                                                                      <a className="sub-link-item">RFQ - Company</a>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <a className="sub-link-item">iTrak Industrial Process Control</a>
                                                      <a className="sub-link-item">iTrak Autonomous Machines</a>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="sub-link">
                                          <a id="products" className="nav-link">Products</a>
                                          <div className="sub-link-menu">
                                              <div className=" = sub-link2">
                                                  <a className="sub-link-item">iTrak Educational App</a>
                                                  <div className="sub-link-menu2">
                                                      <a className="sub-link-item">Internal Student Management Software</a>
                                                      <a className="sub-link-item">External Student Management Software</a>
                                                      <a className="sub-link-item">E-Learning Laboratory</a>
                                                  </div>
                                              </div>
                                              <div className="sub-link2">
                                                  <a className="sub-link-item">iTrak Industrial Process Control</a>
                                                  <div className="sub-link-menu2">
                                                      <a className="sub-link-item">iTrak Robotics App</a>
                                                      <a className="sub-link-item">iTrak Process Control</a>
                                                      <a className="sub-link-item">iTrak Power Solutions</a>
                                                  </div>
                                              </div>
                                              <a className="sub-link-item">iTrak Autonomous Machines</a>
                                          </div>
                                      </div>
                                  </div>
                                <div className="nav-item">
                                    <a id="nav-sign-up" className="nav-link" onClick={displaySignUp}>Contact Us</a>
                                </div>
                            </div>
                        </div>
                        <div className="button-container">
                            <button onClick={displayLogout}>Logout</button>
                        </div>
                    </div>
                </nav>

            </section>
       
        );
}

function footerSection() {
    return (
            <section className="footer-section">
                <div className="footer-container">
                    <img src="itrak-logo.png" id="company-logo" />
                    <div className="foot-links">
                        <a href="">Pricing</a>
                        <a href="">Terms &amp; Conditions</a>
                        <a href="">Refund Policy</a>
                        <a href="">Contact Us</a>
                    </div>
                    <p>Copyright 2024 iTrak Software is a licensed product of iTrak Technology Company</p>
                </div>
            </section>
        );
}

function chartSection() {
    return (
            <section className="feature-grid">
                <div className="chart-grid-container">
                    
                    <div className="feature-item" id="feature1">
                        
                        {barchartCanvas()}
                        <h1>Real-time Updates</h1>
                        <p className="header-style4">
                            Get live updates on your child's performance in both academic and extra-curricular activities in their school without
                            waiting for the school's open day session or end-of-term reports.
                        </p>
                    </div>
                    <div className="feature-item" id="feature2">
                        
                        {piechartCanvas()}
                        <h1>Quick Feedback &amp; Live Chat </h1>
                        <p className="header-style4">
                            Have a chance to talk with your child's school teachers and admin once there is need to raise a concern or appreciate
                            their effort.
                        </p>
                    </div>
                    <div className="feature-item" id="feature1">
                        
                        {linechartCanvas()}
                        <h1>Real-time Updates</h1>
                        <p className="header-style4">
                            Get live updates on your child's performance in both academic and extra-curricular activities in their school without
                            waiting for the school's open day session or end-of-term reports.
                        </p>
                    </div>
                    <div className="feature-item" id="feature2">
                        
                        {multichartCanvas()}
                        <h1>Quick Feedback &amp; Live Chat </h1>
                        <p className="header-style4">
                            Have a chance to talk with your child's school teachers and admin once there is need to raise a concern or appreciate
                            their effort.
                        </p>
                    </div>
                </div>
            </section>
        );
}



function barchartCanvas() {
    
/** */    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;
/** */
    const options = {
        animationEnabled: true,
        exportEnabled: false,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
            text: "Weekly Attendance Chart"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //"bar", "line", "area", "pie", etc
            //indexLabel: "{y}", //shows y value on all Data Points
            indexLabelFontColor: "5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { x: 10, y: 71 },
                { x: 20, y: 55 },
                { x: 30, y: 50 },
                { x: 40, y: 65 },
                { x: 50, y: 71 },
                { x: 60, y: 68 },
                { x: 70, y: 38 },
                { x: 80, y: 92, indexLabel: "Highest" },
                { x: 90, y: 54 },
                { x: 100, y: 60 },
                { x: 110, y: 21 },
                { x: 120, y: 49 },
                { x: 130, y: 36 },
            ]
        }]
    }
    return (
        //<div></div>
/* */       <div>
            <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref}*/
                /*containerProps = {{ width: '100%',height: '300px' }}*/
/** */            />
            {
                /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart
                 properties and methods*/
/** */            }
        </div>
/**/    );
}

function linechartCanvas() {

/** */    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
                            animationEnabled: true,
                        theme: "light2",
                        title:{
                            text: "Absenteeism Chart"
	                    },
                        axisX:{
                            valueFormatString: "DD MMM",
                        crosshair: {
                            enabled: true,
                        snapToDataPoint: true
		                    }
	                    },
                        axisY: {
                            title: "Number of Visits",
                        includeZero: true,
                        crosshair: {
                            enabled: true
		                    }
	                    },
                        toolTip:{
                            shared:true
	                    },
                        legend:{
                            cursor:"pointer",
                        verticalAlign: "bottom",
                        horizontalAlign: "left",
                        dockInsidePlotArea: true,
                        itemclick: toogleDataSeries
	                    },
                        data: [{
                            type: "line",
                        showInLegend: true,
                        name: "Total Visit",
                        markerType: "square",
                        xValueFormatString: "DD MMM, YYYY",
                        color: "#F08080",
                        dataPoints: [
                        {x: new Date(2017, 0, 3), y: 650 },
                        {x: new Date(2017, 0, 4), y: 700 },
                        {x: new Date(2017, 0, 5), y: 710 },
                        {x: new Date(2017, 0, 6), y: 658 },
                        {x: new Date(2017, 0, 7), y: 734 },
                        {x: new Date(2017, 0, 8), y: 963 },
                        {x: new Date(2017, 0, 9), y: 847 },
                        {x: new Date(2017, 0, 10), y: 853 },
                        {x: new Date(2017, 0, 11), y: 869 },
                        {x: new Date(2017, 0, 12), y: 943 },
                        {x: new Date(2017, 0, 13), y: 970 },
                        {x: new Date(2017, 0, 14), y: 869 },
                        {x: new Date(2017, 0, 15), y: 890 },
                        {x: new Date(2017, 0, 16), y: 930 }
                                ]
	                        },
                            {
                            type: "line",
                        showInLegend: true,
                        name: "Unique Visit",
                        lineDashType: "dash",
                        dataPoints: [
                        {x: new Date(2017, 0, 3), y: 510 },
                        {x: new Date(2017, 0, 4), y: 560 },
                        {x: new Date(2017, 0, 5), y: 540 },
                        {x: new Date(2017, 0, 6), y: 558 },
                        {x: new Date(2017, 0, 7), y: 544 },
                        {x: new Date(2017, 0, 8), y: 693 },
                        {x: new Date(2017, 0, 9), y: 657 },
                        {x: new Date(2017, 0, 10), y: 663 },
                        {x: new Date(2017, 0, 11), y: 639 },
                        {x: new Date(2017, 0, 12), y: 673 },
                        {x: new Date(2017, 0, 13), y: 660 },
                        {x: new Date(2017, 0, 14), y: 562 },
                        {x: new Date(2017, 0, 15), y: 643 },
                        {x: new Date(2017, 0, 16), y: 570 }
                                ]
                            }
                        ]
                    };
                  /*     chart.render();

                       
                        //chart.render();/**/


    return (//<div></div>
/** */        <div>
            <CanvasJSChart options={options}
            /* onRef = {ref => this.chart = ref}*/
            /*containerProps = {{ width: '100%',height: '300px' }}*/
/** */            />
            {
                /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart
                 properties and methods*/
/** */            }
        </div>
/**/    );
}
function toogleDataSeries(e) {
/** */    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
/**/}
function piechartCanvas() {

/** */    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;
       
    const options = {
                            exportEnabled: true,
                        animationEnabled: true,
                        title:{
                            text: "Punctuality Chart"
	                    },
                        legend:{
                            cursor: "pointer",
                        itemclick: explodePie
	                    },
                        data: [{
                            type: "pie",
                        showInLegend: true,
                        toolTipContent: "{name}: <strong>{y}%</strong>",
                        indexLabel: "{name} - {y}%",
                        dataPoints: [
                        {y: 26, name: "School Aid", exploded: true },
                        {y: 20, name: "Medical Aid" },
                        {y: 5, name: "Debt/Capital" },
                        {y: 3, name: "Elected Officials" },
                        {y: 7, name: "University" },
                        {y: 17, name: "Executive" },
                        {y: 22, name: "Other Local Assistance"}
                        ]
	                    }]
                    }
                       /* chart.render();
    }*/

                        
                       /* e.chart.render();

    }/**/
            
    return (//<div></div>
/* */       <div>
            <CanvasJSChart options={options}
            /* onRef = {ref => this.chart = ref}*/
            /*containerProps = {{ width: '100%',height: '300px' }}*/
/** */            />
            {
                /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart
                 properties and methods*/
/** */            }
        </div>
/**/    );
}

function explodePie(e) {
/** */    if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
        e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
/***/}

function multichartCanvas() {

/** */    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        exportEnabled: false,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
            text: "Activity/Participation Chart"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //"bar", "line", "area", "pie", etc
            //indexLabel: "{y}", //shows y value on all Data Points
            indexLabelFontColor: "5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
                { x: 10, y: 71 },
                { x: 20, y: 55 },
                { x: 30, y: 50 },
                { x: 40, y: 65 },
                { x: 50, y: 71 },
                { x: 60, y: 68 },
                { x: 70, y: 38 },
                { x: 80, y: 92, indexLabel: "Highest" },
                { x: 90, y: 54 },
                { x: 100, y: 60 },
                { x: 110, y: 21 },
                { x: 120, y: 49 },
                { x: 130, y: 36 },
                ]
            },
            {
                type: "line",
                showInLegend: true,
                name: "Total Visit",
                markerType: "square",
                xValueFormatString: "DD MMM, YYYY",
                color: "#F08080",
                dataPoints: [
                    { x: 10, y: 71 },
                    { x: 20, y: 55 },
                    { x: 30, y: 50 },
                    { x: 40, y: 65 },
                    { x: 50, y: 71 },
                    { x: 60, y: 68 },
                    { x: 70, y: 38 },
                    { x: 80, y: 92, indexLabel: "Highest" },
                    { x: 90, y: 54 },
                    { x: 100, y: 60 },
                    { x: 110, y: 21 },
                    { x: 120, y: 49 },
                    { x: 130, y: 36 },
                ]
            }
        ]
    }
/**/    return (//<div></div>
/** */        <div>
            <CanvasJSChart options={options}
            /* onRef = {ref => this.chart = ref}*/
            /*containerProps = {{ width: '100%',height: '300px' }}*/
/** */            />
            {
                /*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart
                 properties and methods*/
/** */            }
        </div>
/**/    );
}
export default TermCalApp;