import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import TermCalApp from './CalApp';
import axios from "axios"; 
//import { withAuthenticator } from '@aws-amplify/ui-react';
//import {API} from 'aws-amplify'

import { post } from 'aws-amplify/api'
import { get } from 'aws-amplify/api'
//import awsconfig from './aws-exports'
//import LiveChatApp from './LiveChat';
import { Amplify } from 'aws-amplify';
//import { generateClient } from 'aws-amplify/api';
import awsconfig from './amplifyconfiguration.json';

//axios.defaults.withCredentials = true;

Amplify.configure(awsconfig);
//const API = generateClient();

const itrakacadAPI = "api9f6ae8ba";
//const path = '/sessions/32';
const itrakapiName = 'itrakeduapi'; 
const itrakpath = '/checkregusersession';
//Amplify.configure(awsconfig);
//API.configure(aws_exports);

function LaunchCalApp() {
  removeLogin();
  //document.getElementById('root').innerHTML = "<div><TermCalApp cal_size=3/></div>";
}

/*
function TermCalApp(cal_size) {   
  const termCal = [];
      termCal.push(
          <div className="calendar-container">{CalApp()}</div>
      );
  return termCal;
}

function CalApp() {
  const daysOfMth = 31;
  const months = ['May', 'June', 'July'];
  const monthCal = [];
  for (let i = 1; i <= 3; i++) {
      monthCal.push(
          <div>
              <div className="month-title"><h5>{months[i-1]}</h5></div>
              <div className="cal-wrapper">{wkHeader()}{appMthRecord(daysOfMth)}</div>
          </div>
      );
  }
  return monthCal;
}

function wkHeader() {
  const wkDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const wk_title = [];
  for (let i = 0; i < wkDays.length; i++) {
      wk_title.push(
          <div className="wk-days">{wkDays[i]}</div>
      ); 
  }
  return wk_title;
}
function appMthRecord(days_per_mnth) {
  
  
  const calCard = [];

  for (let day = 1; day <= days_per_mnth; day++) {
      calCard.push(
          <div id="jan012024" className="cal-note">
              <button className="date-btn">{day}</button>
              <div className="indicators-c">
                  <div className="test-indicator"></div>
                  <div className="assignment-indicator"></div>
                  <div className="exam-indicator"></div>
                  <div className="extra-cur-indicator"></div>
                  <div className="info-indicator"></div>
              </div>
          </div>
      );
  }
//document.getElementById("root").innerHTML = monthCal;//
return calCard;
}
*/

/*
class App extends React.Component{
  constructor() {
      super();
       this.daysOfMth = 31;
       this.monthCal = [];
  }

  appMonthCal() {
      this.monthCal.push(
          <div className="calendar-container">
              <div id="jan2024" className="cal-wrapper">{this.appMthRecord}</div></div>);
      return this.monthCal;
  }

  appMthRecord() {
      const calCard = [];
  /*   Array.from(
         { length: daysOfMth }, (_, day) => (
        
             <div id="jan012024" className="cal-note">
                 <button className="date-btn">{day}</button>
                 <div className="indicators-c">
                     <div className="test-indicator"></div>
                     <div className="assignment-indicator"></div>
                     <div className="exam-indicator"></div>
                     <div className="extra-cur-indicator"></div>
                     <div className="info-indicator"></div>
                 </div>
             </div>
         
             )
     );
 
     monthCal.push(
         <div className="calendar-container">
             <div id="jan2024" className="cal-wrapper">);*//*

      for (let day = 1; day <= this.daysOfMth; day++) {
          calCard.push(
              <div id="jan012024" className="cal-note">
                  <button className="date-btn">{day}</button>
                  <div className="indicators-c">
                      <div className="test-indicator"></div>
                      <div className="assignment-indicator"></div>
                      <div className="exam-indicator"></div>
                      <div className="extra-cur-indicator"></div>
                      <div className="info-indicator"></div>
                  </div>
              </div>
          );
      }
  //document.getElementById("root").innerHTML = monthCal;// 
  return calCard;


  /*
     <div className="App">This is my first React App!
       <header className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <p>
           Edit <code>src/App.js</code> and save to reload.
         </p>
         <a
           className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn React
         </a>
       </header>
     </div>*//*
  }

  render() {
      return (
          < div >
              <p><h1>This is the Calendar Page!</h1></p>
          </div >
      );
  }
}*/

function App() {
  return (
      < div >
          <p><h1>This is the New Calendar Page!</h1></p>
      </div>
  );
}

/***Internal Scripts for HomePage ***/
function removeLogin() {
  document.getElementById("login").style.display = "none";
}

function removeSignUp() {
  document.getElementById("signUp").style.display = "none";
}

function removeRFQ() {
  document.getElementById("RFQ").style.display = "none";
}

function removeLicense() {
  document.getElementById("license").style.display = "none";
}

function removeConfirm() {
  document.getElementById("confirm").style.display = "none";
}

function removePricing() {
  document.getElementById("pricing").style.display = "none";
}

function removeRecorder() {
  document.getElementById("recorder").style.display = "none";
}

let displayLogin = () => document.getElementById("login").style.display = "flex";

let displaySignUp = () => document.getElementById("signUp").style.display = "flex";

let displayRFQ = () => document.getElementById("RFQ").style.display = "flex";

let displayLicense = () => document.getElementById("license").style.display = "flex";

let displayPricing = () => document.getElementById("pricing").style.display = "flex";

let displayConfirm = () => document.getElementById("confirm").style.display = "flex";

let displayRecorder = () => document.getElementById("recorder").style.display = "flex";

function HomePage() {

  const [inputs, setInputs] = useState({});
  const [reginputs, setRegInputs] = useState({});
  const [RFQinputs, setRFQInputs] = useState({});
  const [licenseinputs, setLicenseInputs] = useState({});
  const [recorderinputs, setRecorderInputs] = useState({});
  const [confirminputs, setConfirmInputs] = useState({});
  const [pricinginputs, setPricingInputs] = useState({});
  const [rem_login, setRemLoginChecked] = useState(false);
  const [RFQ_autorenew, setRFQAutoChecked] = useState(false);
  const [promo_sub, setLicensePromoChecked] = useState(false);
  const [user_valid, setUserValid] = useState(false);
  const [username, setUserName] = useState('User1');

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({ ...values, [name]: value }));
  }

  const handleCheckChange = (event) => {
      setRemLoginChecked(event.target.checked);
  }

const handleRFQCheckChange = (event) => {
    setRFQAutoChecked(event.target.checked);
  }

const handleLicenseCheckChange = (event) => {
    setLicensePromoChecked(event.target.checked);
  }

  useEffect(()=>{
   /*   axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkregusersession', {withCredentials: true})
          .then(response => {
             console.log(response.data);
             alert(JSON.stringify(response.data));
             if(response.data.user_valid == true) {
                 alert("Welcome, " + response.data.userID + ": You are still logged in.");
                 setUserValid(true);
                 setUserName(response.data.userID);
                 setInputs({"userid":response.data.userID});
                 //setUserName(userid);
             }else{
                 alert(response.data+": Pls log in!");
                 setUserValid(false);
             } 
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert("Server Error! Unable to process your request at this time, pls try again later.");
          })*/
     /* try {
        const apimesg = get({
          apiName: itrakacadAPI,
          path: '/check_reg_user_session'
        });
        const response = await apimesg.response;
      } catch (error) {
      }*/
    const checkuser = async () => {
        try {
                console.log("Welcome, Checking session data...");
///            alert("Welcome, Checking session data...");
        const {body} = await get({
            apiName: itrakapiName, //'itrakeduapi';
            path: itrakpath // '/checkregusersession'
        }).response;
        //const response = await resp.response;
        const response = await body.json();
        const resp = JSON.stringify(response);
        //const response = await API.get(itrakapiName,itrakpath);
        //const response = await client.get()
        console.log(resp);
        console.log(response);
///        alert(resp);
///        alert(response.user_valid);
        //alert(JSON.parse(response).data.user_valid);
        //alert(JSON.parse(response.body));
        if(response.user_valid == true) {
            alert("Welcome, " + response.session.userID + ": You are still logged in.");
            setUserValid(true);
            setUserName(response.session.userID);
            setInputs({"userid":response.session.userID});
            //setUserName(userid);
        }else{
            alert("User_valid: " + response.user_valid +". Pls log in!");
            setUserValid(false);
        }
    
        } catch (error) {
            console.log('GET call failed: ', error);
///            alert ('GET call failed: ' + error)
        }
     }
     alert("Application loading. Pls wait...");
     const cur_date = new Date();
     setRecorderInputs(values => ({ ...values, ['term_begins']: cur_date }));
     checkuser()
     .catch((error) => {
        console.log(error);
      });

      }, []
  )

        /*: {
                    apiName: string,
                    path: String,
                    headers: {[key: string]: any},
                    queryParams: {[key: string]: any}
                }
                const handleGet = async ({
                    apiName,
                    path,
                    headers,
                    queryParams
                }) => {
                    const response = await get({
                        apiName,
                        path,
                        options: {
                            headers,
                            queryParams,
                        }
                    }).response;
                }*/

                    /*       .then(response => {
          console.log(response.data);
          //alert(response.data);
          if(response.data.user_valid == true) {
               alert("Welcome, " + response.data.userID + ": You are still logged in.");
               setUserValid(true);
               setUserName(response.data.userID);
               setInputs({"userid":response.data.userID});
               //setUserName(userid);
          }else{
               alert(response.data+": Pls log in!");
               setUserValid(false);
          }  
       })
      .catch((error) => {
        console.log('GET call failed: ', JSON.parse(error.response.body));
      })
*/

  const handleSubmit = (event,username) => {
      event.preventDefault();
      const userid = inputs.userid;
      const pwd = inputs.password;
      //alert(pwd);
      axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkreguser?rem_login=' + rem_login + '&user_id=' + userid + '&pwd=' + pwd + '&debugging=' + true)
      //API.get(itrakacadAPI, '/check_reg_user?user_id=' + userid + '&pwd=' + pwd + '&rem_login=' + rem_login)
/*      get({
        apiName: itrakacadAPI,
        path: '/check_reg_user?user_id=' + userid + '&pwd=' + pwd + '&rem_login=' + rem_login,
      })*/
      .then(response => {
         console.log(response);
///         alert(JSON.stringify(response));
         if(response.data.user_valid == true) {
              alert("You have been successfully logged in.");
              if(response.data.userid=='itrak-admin2511'){
                displayPricing();
              } else if(response.data.userid=='itrak-admin2601'){
                displayConfirm();
              } else {
                setUserValid(true);
                setUserName(userid);
              }          
         }else{
              alert("Invalid login details.")//alert(JSON.stringify(response));
              setUserValid(false);
         }  
      })
      .catch((err) => {
          console.log("Unable to connect to the server.");
          alert(err+": Server Error! Unable to process your request at this time, pls try again later.");
      })
      //alert(userid + ", " + pwd + ", " + username);
      /*if ((userid == "adeyolu03") && (pwd == "myid123#")) {
          setUserValid(true,()=>alert("User is logged on"));
          setUserName("Adeyemi, Oluwasegun S.");
      }else if ((userid == "glotech247") && (pwd == "myid247#")) {
          setUserValid(true,()=>alert("User is logged on"));
          setUserName("Oluwasegun, Gloria C.");
      }else if ((userid == "itechmaster22") && (pwd == "itech22")) {
          setUserValid(true,()=>alert("User is logged on"));
          setUserName("iTrak Admin");
      }
      else {
          setUserValid(false,()=>alert("Invalid User"));
      }*/

      //alert(user_valid ? "User is logged on" : "Invalid User");
  }

  const handleRegInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setRegInputs(values => ({ ...values, [name]: value }));
  }

  const handleRFQInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setRFQInputs(values => ({ ...values, [name]: value }));
  }

  const handleLicenseInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setLicenseInputs(values => ({ ...values, [name]: value }));
  }

  const handlePricingInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setPricingInputs(values => ({ ...values, [name]: value }));
  }

  const handleConfirmInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setConfirmInputs(values => ({ ...values, [name]: value }));
  }

  const handleRecorderInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setRecorderInputs(values => ({ ...values, [name]: value }));
  }

  const handleUserRegSubmit = (event) => {
      event.preventDefault();
      const email_addr = reginputs.email_addr;
      const pwd = reginputs.pwd;
      const pwd2 = reginputs.pwd2;
      const user_type = reginputs.user_type;
      const lic_status = reginputs.lic_status || "";
      const lic_expire_date = reginputs.lic_expire_date || "";
      
      if(pwd != pwd2){
          alert("Password mismatch! Pls check your entries and try again!");
      }else{
            //'https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkreguser?rem_login='
          axios.post('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/newuser?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type + '&lic_status=' + lic_status + '&lic_expire_date=' + lic_expire_date)
          //API.post(itrakacadAPI, '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type)
/*          post({
            apiName: itrakacadAPI,
            path: '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type
          })*/
          .then(response => {
             console.log(response.data);
///             alert(response.data);
             if(response.data=="OK") {
                  alert("You have been successfully registered! \nPlease check your email for next steps.");
                  removeSignUp();
             }else if(response.data=="Invalid email"){
                  alert("Invalid email! Pls check your email address and try again!");
             }  
             else {
                  alert("Registration Error! Pls check your inputs and try again! \nIf the problem persists, pls contact us.");
             }  
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert(err + ": Server Error! Unable to process your request at this time, pls try again later.\nIf the problem persists, pls contact us.");
          })
      }
  }

  const handleUserRFQSubmit = (event) => {
      event.preventDefault();
      const email_addr = RFQinputs.email_addr;
      const school = RFQinputs.school;
      const school_email = RFQinputs.school_email;
      const phone_no = RFQinputs.phone_no;    
      const studentsNo = RFQinputs.studentsNo;
      const duration = RFQinputs.duration ? RFQinputs.duration : 4;
      const autorenew = RFQ_autorenew; 
      const service = 'rfq'; 
      if(email_addr==''||school==''||school_email==''||phone_no==''||studentsNo==''){
          alert("Pls enter required details!");
      }else{
            //'https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkreguser?rem_login='
          axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/newuser?email_addr=' + email_addr + '&school=' + school + '&school_email=' + school_email + '&phone_no=' + phone_no + '&students_no=' + studentsNo + '&duration=' + duration + '&autorenew=' + autorenew + '&service=' + service)
          //API.post(itrakacadAPI, '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type)
/*          post({
            apiName: itrakacadAPI,
            path: '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type
          })*/
          .then(response => {
             console.log(response.data);
             //alert(response.data);
             if(response.data=="OK") {
                  alert("RFQ has been submitted successfully! \nPlease check your email for next steps.");
                  removeRFQ();
             }else if(response.data=="Invalid email"){
                  alert("Invalid email! Pls check your email address and try again!");
             }  
             else {
                  alert("Submission Error! Pls check your inputs and try again! \nIf the problem persists, pls contact us.");
             }   
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert(err + ": Server Error! Unable to process your request at this time, pls try again later.\nIf the problem persists, pls contact us.");
          })
      }
      //alert("RFQ has been submitted successfully!");
  }

  const handleRecorderSubmit = (event) => {
      
      event.preventDefault();
      const email_addr = recorderinputs.email_addr;
      const school_id = recorderinputs.school_id;
      const school_email = recorderinputs.school_email;
      const session_id = recorderinputs.reg_no;   
      const term = recorderinputs.term;
      const term_begins = recorderinputs.term_begins;
      const password = recorderinputs.password; 
      const service = 'recorder'; 
      if(email_addr==''||school_id==''||school_email==''||session_id==''||term==''||term_begins==''||password==''){
          alert("Pls enter ALL required details to access the  App!");
      }else{
          axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/newuser?email_addr=' + email_addr + '&school_id=' + school_id + '&school_email=' + school_email + '&session_id=' + session_id + '&term=' + term + '&term_begins=' + term_begins + '&password=' + password + '&service=' + service)
          .then(response => {
             console.log(response.data);
             //alert(response.data);
             if(response.data.status=="OK") {
                alert("Request has been submitted! \nPlease click below link to download the  Result Recording App.");
                  removeRecorder();
                  //setRegInputs(values => ({ ...values, ['email_addr']: response.data.student_id }));
                  //setRegInputs(values => ({ ...values, ['user_type']: response.data.user_category }));
                  //setRegInputs(values => ({ ...values, ['lic_status']: response.data.lic_status }));
                  //setRegInputs(values => ({ ...values, ['lic_expire_date']: response.data.lic_expire_date }));
                  //displaySignUp();

             }else if(response.data=="Invalid email"){
                  alert("Invalid email! Pls check your email address and try again!");
             }  
             else {
                  alert("Submission Error! Pls check your inputs and try again! \nIf the problem persists, pls contact us.");
             }   
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert(err + ": Server Error! Unable to process your request at this time, pls try again later.\nIf the problem persists, pls contact us.");
          })
      }
  }

  const handleUserLicenseSubmit = (event) => {
      //alert("Pls click OK.");
      event.preventDefault();
      const email_addr = licenseinputs.email_addr;
      //alert(email_addr);
      const school_id = licenseinputs.school_id;
      //alert(school_id);
      const school_email = licenseinputs.school_email;
      //alert(school_email); 
      const reg_no = licenseinputs.reg_no;   
      //alert(reg_no); 
      const names = licenseinputs.names;
      //alert(names); 
      const class_id = licenseinputs.class_id// ? RFQinputs.duration : 4;
      //alert(class_id); 
      const promo = promo_sub; 
      //alert(promo); 
      const service = 'license'; 
      //alert("Pls click OK to proceed.");
      if(email_addr==''||school_id==''||school_email==''||reg_no==''||names==''||class_id==''){
          alert("Pls enter ALL required details to activate the student's license!");
      }else{
            //alert("Pls click OK to continue.");
            //'https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkreguser?rem_login='
          axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/newuser?email_addr=' + email_addr + '&school_id=' + school_id + '&school_email=' + school_email + '&reg_no=' + reg_no + '&names=' + names + '&class_id=' + class_id + '&promo_sub=' + promo + '&service=' + service)
          //API.post(itrakacadAPI, '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type)
/*          post({
            apiName: itrakacadAPI,
            path: '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type
          })*/
          .then(response => {
             console.log(response.data);
             //alert(response.data);
             if(response.data.status=="OK") {
                //  alert("You have been successfully registered! \nPlease check your email for next steps.");
                  alert("You have been successfully registered! \nPlease create a strong password to access your account after now.");
                  removeLicense();
                  setRegInputs(values => ({ ...values, ['email_addr']: response.data.student_id }));
                  setRegInputs(values => ({ ...values, ['user_type']: response.data.user_category }));
                  setRegInputs(values => ({ ...values, ['lic_status']: response.data.lic_status }));
                  setRegInputs(values => ({ ...values, ['lic_expire_date']: response.data.lic_expire_date }));
                  displaySignUp();

             }else if(response.data=="Invalid email"){
                  alert("Invalid email! Pls check your email address and try again!");
             }  
             else {
                  alert("Submission Error! Pls check your inputs and try again! \nIf the problem persists, pls contact us.");
             }   
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert(err + ": Server Error! Unable to process your request at this time, pls try again later.\nIf the problem persists, pls contact us.");
          })
      }
      //alert("RFQ has been submitted successfully!");
  }

    const handlePricingSubmit = (event) => {
      //alert("Pls click OK.");
      event.preventDefault();
      const account_no = pricinginputs.account_no;
      const bank_name = pricinginputs.bank_name;
      const bank_swift = pricinginputs.bank_swift || '';
      const bank_sort = pricinginputs.bank_sort || '';   
      const naira_per_dollar = pricinginputs.naira_per_dollar;
      const storage_cost = pricinginputs.storage_cost
      const monthly_cost = pricinginputs.monthly_cost
      const annual_discount = pricinginputs.annual_discount; 
      const service = 'pricing'; 
      //alert("Pls click OK to proceed.");
      if(account_no==''||bank_name==''||naira_per_dollar==''||monthly_cost==''||annual_discount==''){
          alert("Pls enter ALL required details to record new pricing!");
      }else{
            //alert("Pls click OK to continue.");
            //'https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/checkreguser?rem_login='
          axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/newuser?account_no=' + account_no + '&bank_name=' + bank_name + '&bank_swift=' + bank_swift + '&bank_sort=' + bank_sort + '&naira_per_dollar=' + naira_per_dollar + '&storage_cost=' + storage_cost + '&monthly_cost=' + monthly_cost + '&annual_discount=' + annual_discount + '&service=' + service)
          //API.post(itrakacadAPI, '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type)
/*          post({
            apiName: itrakacadAPI,
            path: '/new_user?email_addr=' + reginputs.email_addr + '&pwd=' + reginputs.pwd + '&user_type=' + reginputs.user_type
          })*/
          .then(response => {
             console.log(response.data);
             alert(response.data);
             if(response.data.status=="OK") {
                //  alert("You have been successfully registered! \nPlease check your email for next steps.");
                  alert(response.data.message);
                  removePricing();
                /*  setRegInputs(values => ({ ...values, ['email_addr']: response.data.student_id }));
                  setRegInputs(values => ({ ...values, ['user_type']: response.data.user_category }));
                  setRegInputs(values => ({ ...values, ['lic_status']: response.data.lic_status }));
                  setRegInputs(values => ({ ...values, ['lic_expire_date']: response.data.lic_expire_date }));
                  displaySignUp();*/

             }
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert(err + ": Server Error! Unable to process your request at this time, pls try again later.\nIf the problem persists, pls contact us.");
          })
      }
      //alert("RFQ has been submitted successfully!");
  }

      const handleConfirmSubmit = (event) => {
      //alert("Pls click OK.");
      event.preventDefault();
      const email_addr = confirminputs.email_addr;
      //alert(email_addr);
      const school_id = confirminputs.school_id;
      //alert(school_id);
      const school_email = confirminputs.school_email || '';
      //alert(school_email); 
      const service = 'confirm'; 
      //alert("Pls click OK to proceed.");
      if(email_addr==''||school_id==''||school_email==''){
          alert("Pls enter ALL required details to update license!");
      }else{
            //alert("Pls click OK to continue.");
          axios.get('https://xgveut6n4i.execute-api.us-east-1.amazonaws.com/dev/newuser?email_addr=' + email_addr + '&school_id=' + school_id + '&school_email=' + school_email + '&service=' + service)
          .then(response => {
             console.log(response.data);
             //alert(response.data);
             if(response.data.status=="OK") {
                //  alert("You have been successfully registered! \nPlease check your email for next steps.");
                  alert(response.data.message);
                  removeConfirm();
             }
          })
          .catch((err) => {
              console.log("Unable to connect to the server.");
              alert(err + ": Server Error! Unable to process your request at this time, pls try again later.\nIf the problem persists, pls contact us.");
          })
      }
  }

  if (user_valid){
      //alert(inputs.userid + ", " + username + ", " + checked);
      return (<TermCalApp cal_size="4" userID={inputs.userid} username={username} />);//(<LiveChatApp mtype="medium-classic" size="83" />);
  }
  else    
      return (
      <div>
          <div id="landing_page">

              <section id="nvb12" className="navbar">
                  <nav id="nvbc12" className="navbar-container">
                      <div id="nvbw12" className="navbar-wrapper">
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
                                                              <a className="sub-link-item" onClick={displayLicense}>Purchase License</a>
                                                              <a className="sub-link-item" onClick={displayLicense}>Renew License</a>
                                                              <a className="sub-link-item" onClick={displayRecorder}>Recorder App</a>
                                                              <div className="sub-link2">
                                                                  <a className="sub-link-item">Request Quotes - RFQ</a>
                                                                  <div className="sub-link-menu2">
                                                                      <a className="sub-link-item" onClick={displayRFQ}>RFQ - Int. Students</a>
                                                                      <a className="sub-link-item" onClick={displayRFQ}>RFQ - Ext. Students</a>
                                                                      <a className="sub-link-item" onClick={displayRFQ}>RFQ - Company</a>
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
                                      <a id="nav-sign-up" className="nav-link" onClick={displaySignUp}>Sign-Up</a>
                                  </div>
                                  <div className="nav-item">
                                      <a id="nav-rfq" className="nav-link" onClick={displayRFQ}>RFQ</a>
                                  </div>
                              </div>
                          </div>
                          <div className="button-container">
                              <button onClick={displayLogin}>Login</button>
                          </div>
                      </div>
                  </nav>

              </section>

              <section className="hero-section">
                  <div className="hero-container">
                      <h1>
                          Improve your Academic Performance
                          <strong style={{ color: "blue" }}> by 100% plus</strong>
                      </h1>
                      <div className="hero-logo">
                          <img src="track-perf.png" className="logo-style" />
                          <p className="medium-text">
                              iTrak Educational Software is an academic booster and performance tracker application for every level of education
                              and professional training. It is also a One-Stop storage solution for Academic records and official transcripts for
                              learning institutions.
                          </p>
                          <img src="grad-cap.jpg" className="logo-style" />
                      </div>

                      <br />
                      <a onClick={displaySignUp}>
                          <i> Click Here to <b>Register</b> or use below link to access iTrak App portal if you are already a user.</i>
                      </a>
                      <button onClick={displayLogin}>Login Here to Access iTrak Academic App</button>

                      <img src="itrak-banner.png" id="hero-img" className="logo-style" />
                  </div>
              </section>
              <section className="feature-left" id="iTrak-description">
                  <div className="feature-container">
                      <div className="advert-panel">
                          <h1 className="header-style">iTrak Updates</h1>
                          <img src="itrakacad-bgnd.png" className='side-panel-img'/>
                      </div>
                      <div className="feature-wrapper">

                          <h1 className="header-style2">iTrak Educational app</h1>
                          
                          <h1 className="header-style3">Performance Tracker &amp; Booster</h1>
                          
                          <img src="uni-img6.jpg" />
                          <p>
                              Increase your performance in any course with ease using iTrak Educational Software on your device
                              anywhere and anytime. Get real-time updates on your child's or ward's academic performance and request
                              teaching assistance from anywhere in the world.
                          </p>

                          
                          <p>
                              iTrak is used by both students and parents. Parents can monitor their child's school activities and performance
                              for proper follow-up and assistance.
                          </p>
                       
                          <p>
                              Teachers and school administrators equally use iTrak to automate their academic results processing and storage
                              (in the cloud), and also get software assistance for their internal operations with iTrak.
                          </p>
                          
                          <button className="launch-btn" onClick={displayLogin}>Launch iTrak Now</button>

                      </div>
                      <div className="chat-panel">
                          <h1 className="header-style">Chat or Email Us</h1>
                          <img src="itrakacad-bgnd.png" className='side-panel-img'/>
                          <a href='mailto:info@itraktech.com'>email: info@itraktech.com</a>
                      </div>
                  </div>
              </section>
              <section className="feature-grid">
                  <div className="feature-grid-container">
                      <div className="features">
                          <h1 className="header-style2">iTrak Educational App is ready to help you!</h1>
                          <h1 className="header-style3">Register and launch iTrak app today for <em style={{ color: "blue" }}>an amazing experience</em></h1>
                          <p className="header-style4">
                              Request teaching assistance for yourself or your child in any subject or professional course and get connected to both online
                              and offline proven and capable teachers in your location for an amazing academic boosting experience. <br />
                              Explore some of the powerful features of <a href="#feature1">iTrak Educational App</a> below.
                          </p>
                      </div>
                      <div className="feature-item" id="feature1">
                          <img src="realtime.png" />
                          <h1>Real-time Updates</h1>
                          <p className="header-style4">
                              Get live updates on your child's performance in both academic and extra-curricular activities in their school without
                              waiting for the school's open day session or end-of-term reports.
                          </p>
                      </div>
                      <div className="feature-item" id="feature2">
                          <img src="livechat.png" />
                          <h1>Quick Feedback &amp; Live Chat </h1>
                          <p className="header-style4">
                              Have a chance to talk with your child's school teachers and admin once there is need to raise a concern or appreciate
                              their effort.
                          </p>
                      </div>
                      <div className="feature-item" id="feature3">
                          <img src="gen-result.png" />
                          <h1>Super-fast Final Grade Results Generation</h1>
                          <p className="header-style4">
                              Get your students results computed, and generate course, semester or term reports in seconds after final exams
                              using our AI-powered iTrak academic software.
                          </p>
                      </div>
                  </div>
              </section>
              <section className="testimonial-section">
                  <div className="feedback-container">
                      <div style={{textAlign:"center"}}>
                          <h1>Application Benefits</h1>
                          <p>
                            <h3>
                                 What are you waiting for? Register today and be part of the new era of intelligent student performance tracking and analysis for full time benefits!
                            </h3>
                          </p>
                      </div>

                      <div className="testimonials">
                          <div className="testimonial-item">
                              <img src="analytics.png" />
                              <div>
                                  <h1>AI Analytics</h1>
                                  <p>Students Benefits</p>
                              </div>
                              <p>
                                  Use iTrak AI analytics to review and understand your IQ level and areas that require improvement in your studies.
                                  Shortly, you would be <strong style={{ color: "blue" }}>100% plus</strong> better.<br />
                                  <br />
                                  <br />
                                  <br />
                              </p>
                              <a onClick={displaySignUp}>
                                <em> Register Now </em> 
                              </a>
                              <a onClick={displayLogin}>
                                <em> Login </em>
                              </a>
                          </div>
                          <div className="testimonial-item">
                              <img src="award.png" />
                              <div>
                                  <h1>Award Winners School</h1>
                                  <p>Teachers Benefits</p>
                              </div>
                              <p>
                                  Use iTrak software in your school to share live updates on students performance with their parents real-time,
                                  and guess what? It works like magic..<br />Your students will soon become national award winners due to parents support
                                  through proper performance visibility and quick feedbacks to the school.<br />While waiting any longer? Click below links to register or login.
                              </p>
                              <a onClick={displaySignUp}>
                                <em> Register Now </em> 
                              </a>
                              <a onClick={displayLogin}>
                                <em> Login </em>
                              </a>
                          </div>
                      </div>
                  </div>
              </section>
              <section className="footer-section">
                  <div className="footer-container">
                      <img src="itrak-logo.png" id="company-logo"/>
                      <div className="foot-links">
                          <a href="">Pricing</a>
                          <a href="">Terms &amp; Conditions</a>
                          <a href="">Refund Policy</a>
                          <a href="">Contact Us</a>
                          <a style={{cursor:"pointer", textDecoration:"underline"}} onClick={displayRFQ}>
                             <em> RFQ </em> 
                          </a>
                          <a style={{cursor:"pointer", textDecoration:"underline"}} onClick={displayLicense}>Purchase License</a>
                          <a href="">Renew License</a>
                          <a style={{cursor:"pointer", textDecoration:"underline"}} onClick={displayRecorder}>Recorder App</a>
                      </div>
                      <p>Copyright 2024 iTrak Software is a licensed product of iTrak Technology Company</p>
                  </div>
              </section>
          </div>

          <div id="login" className="login-window">
              <div className="login-container" onClick={removeLogin}></div>
              <div id="login-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>iTrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="login-form" className="login-content" onSubmit={handleSubmit}>

                      <h5>Sign In</h5>

                      <label for="userid" className="header-text">Username</label>
                      <span className="prompt-text">Enter 4-3-1 ID or registerd e-mail address</span>
                      <input type="text" placeholder="4-3-1 ID" id="userid"
                          name="userid"
                          value={inputs.userid || ""}
                          onChange={handleChange}
                      />

                      <label for="password" className="header-text">Password</label>
                      <span className="prompt-text">Enter Password</span>
                      <input type="password" placeholder="***********" id="password"
                          name="password"
                          value={inputs.password || ""}
                          onChange={handleChange}
                      />

                      <div className="checkbox container">
                          <input type="checkbox" id="autofill-check"
                              name="autofill_check"
                              value="autofill"
                              onChange={handleCheckChange}
                          />
                          <label for="autofill-check" className="prompt-text">Remember me</label>
                      </div>

                      <button type="submit" onClick={LaunchCalApp}>Sign In</button>

                      <a href="" className="prompt-text">Need help signing in?</a>
                  </form>
              </div>
          </div>
          <div id="signUp" className="sign-up-window">
              <div className="login-container" onClick={removeSignUp}></div>
              <div id="reg-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>iTrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="register-form" className="login-content" onSubmit={handleUserRegSubmit}>

                      <h5>Sign Up</h5>

                      <label for="username-r" className="header-text">Username</label>
                      <span className="prompt-text">Enter valid e-mail address</span>
                      <input type="text" placeholder="E-mail address" id="user-email" 
                          name="email_addr"
                          value={reginputs.email_addr || ""}                                                        
                          onChange={handleRegInputChange}                                                                                                                
                      />

                      <label for="password-r" className="header-text">Password</label>
                      <span className="prompt-text">Enter Password</span>
                      <input type="password" placeholder="***********" id="user-pwd" 
                          name="pwd"
                          value={reginputs.pwd || ""}                                                        
                          onChange={handleRegInputChange} 
                      />

                      <label for="password2-r" className="header-text">Confirm Password</label>
                      <span className="prompt-text">Re-enter Password</span>
                      <input type="password" placeholder="***********" id="user-pwd2" 
                          name="pwd2"
                          value={reginputs.pwd2 || ""}                                                        
                          onChange={handleRegInputChange} 
                      />

                      <label for="user-type" className="header-text">User Category</label>
                      <span className="prompt-text">Select User Type</span>
                      <select id="user-type" className="select-user"
                          name="user_type"
                          value={reginputs.user_type || ""}                                                        
                          onChange={handleRegInputChange} 
                      >
                          <option value="student">Student</option>
                          <option value="ext-student">External Student</option>
                          <option value="parent">Parent</option>
                          <option value="teacher">Teacher</option>
                          <option value="ext-teacher">External Teacher</option>
                          <option value="admin">School Admin</option>
                          <option value="professional">Professional</option>
                          <option value="company-rep">Company Rep</option>
                          <option value="vendor">Company Vendor</option>
                          <option value="logistics">Logistics/Transportation</option>
                          <option value="commerce">e-Commerce</option>
                          <option value="construction">Domestic/Construction</option>
                      </select>
                      <div className="checkbox container">
                          <input type="checkbox" id="autofill-check-r" 
                              name="autofill_check"
                              value="autofill"
                              onChange={handleCheckChange}
                          />
                          <label for="autofill-check-r" className="prompt-text">Remember me</label>
                      </div>

                      <button type="submit">Register</button>

                      <a href="" className="prompt-text">Unable to register?</a>
                  </form>
              </div>
          </div>
          <div id="RFQ" className="sign-up-window">
              <div className="login-container" onClick={removeRFQ}></div>
              <div id="reg-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>ITrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="RFQ-form" className="login-content" onSubmit={handleUserRFQSubmit}>

                      <h5>Request For Quote</h5>

                      <label for="username-r" className="header-text">Username </label>
                      <span className="prompt-text">If School Admin: Enter School Email </span>
                      <input type="text" placeholder="Enter your registered e-mail address" id="user-email" 
                          name="email_addr"
                          value={RFQinputs.email_addr || ""}                                                        
                          onChange={handleRFQInputChange}                                                                                                                
                      />

                      <label for="phone_no" className="header-text">Phone No</label>
                      <input type="text" placeholder="Enter your Phone No" id="school" 
                          name="phone_no"
                          value={RFQinputs.phone_no || ""}                                                        
                          onChange={handleRFQInputChange} 
                      />

                      <label for="school" className="header-text">School</label>
                      <input type="text" placeholder="Enter Name of School" id="school" 
                          name="school"
                          value={RFQinputs.school || ""}                                                        
                          onChange={handleRFQInputChange} 
                      />

                      <label for="school_email" className="header-text">School Email</label>
                      <span className="prompt-text">If School Admin: Enter same email above</span>
                      <input type="text" placeholder="Enter Email Address of the School" id="school_email" 
                          name="school_email"
                          value={RFQinputs.school_email || ""}                                                        
                          onChange={handleRFQInputChange} 
                      />

                      <label for="studentsNo" className="header-text">No of Students</label>
                      <input type="text" placeholder="Enter number of students for the license" id="studentsNo" 
                          name="studentsNo"
                          value={RFQinputs.studentsNo || ""}                                                        
                          onChange={handleRFQInputChange} 
                      />

                      <label for="duration" className="header-text">License Period</label>
                      <select id="duration" className="select-user"
                          name="duration"
                          value={RFQinputs.duration || ""}                                                        
                          onChange={handleRFQInputChange} 
                      >
                          <option value="4">4 Months - One Term</option>
                          <option value="12">12 Months - One Session</option>

                      </select>
                      <div className="checkbox container">
                          <input type="checkbox" id="RFQ_autorenew" 
                              name="RFQ_autorenew"
                              value="RFQ_autorenew"
                              onChange={handleRFQCheckChange}
                          />
                          <label for="RFQ_autorenew" className="prompt-text">Autorenew License</label>
                      </div>

                      <button type="submit">Submit RFQ</button>

                      <a href="info@itraktech.com" className="prompt-text">Any questions? Contact us.</a>
                  </form>
             </div>
          </div>
          <div id="license" className="sign-up-window">
              <div className="login-container" onClick={removeLicense}></div>
              <div id="reg-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>ITrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="license-form" className="login-content" onSubmit={handleUserLicenseSubmit}>

                      <h5>Activate Student License</h5>

                      <label for="username-r" className="header-text">Parent's Username</label>
                      <input type="text" placeholder="Enter parent's registered e-mail address" id="user-email" 
                          name="email_addr"
                          value={licenseinputs.email_addr || ""}                                                        
                          onChange={handleLicenseInputChange}                                                                                                                
                      />

                      <label for="names" className="header-text">Student's Names - (Last First Middle)</label>
                      <input type="text" placeholder="Format - (Lastname Firstname Middlename)" id="names" 
                          name="names"
                          value={licenseinputs.names || ""}                                                        
                          onChange={handleLicenseInputChange} 
                      />

                      <label for="reg_no" className="header-text">Student's Reg No</label>
                      <input type="text" placeholder="Enter Student's Reg No" id="reg_no" 
                          name="reg_no"
                          value={licenseinputs.reg_no || ""}                                                        
                          onChange={handleLicenseInputChange} 
                      />

                      <label for="school_email" className="header-text">School Email</label>
                      <input type="text" placeholder="Enter Email Address provided by the school" id="school_email" 
                          name="school_email"
                          value={licenseinputs.school_email || ""}                                                        
                          onChange={handleLicenseInputChange} 
                      />

                      <label for="school_id" className="header-text">School ID</label>
                      <input type="text" placeholder="Enter School ID provided by the school" id="school_id" 
                          name="school_id"
                          value={licenseinputs.school_id || ""}                                                        
                          onChange={handleLicenseInputChange} 
                      />

                      <label for="class_id" className="header-text">Student's Class ID</label>
                      <input type="text" placeholder="Enter Class ID provided by the school" id="class_id" 
                          name="class_id"
                          value={licenseinputs.class_id || ""}                                                        
                          onChange={handleLicenseInputChange} 
                      />

                      <div className="checkbox container">
                          <input type="checkbox" id="promo_sub" 
                              name="promo_sub"
                              value="promo_sub"
                              onChange={handleLicenseCheckChange}
                          />
                          <label for="promo_sub" className="prompt-text">Subscribe to promotional updates.</label>
                      </div>

                      <button type="submit">Activate License</button>

                      <a href="info@itraktech.com" className="prompt-text">Any questions? Contact us.</a>
                  </form>
              </div>
          </div>
          <div id="pricing" className="sign-up-window">
              <div className="login-container" onClick={removePricing}></div>
              <div id="reg-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>ITrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="pricing-form" className="login-content" onSubmit={handlePricingSubmit}>

                      <h5>Record New Pricing</h5>

                      <label for="account_no" className="header-text">Account No</label>
                      <input type="text" placeholder="Account No" id="account_no" 
                          name="account_no"
                          value={pricinginputs.account_no || ""}                                                        
                          onChange={handlePricingInputChange}                                                                                                                
                      />

                      <label for="bank_name" className="header-text">Bank Name</label>
                      <input type="text" placeholder="Bank Name" id="bank_name" 
                          name="bank_name"
                          value={pricinginputs.bank_name || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <label for="bank_swift" className="header-text">Bank Swift Code</label>
                      <input type="text" placeholder="Enter Bank Swift Code" id="bank_swift" 
                          name="bank_swift"
                          value={pricinginputs.bank_swift || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <label for="bank_sort" className="header-text">Bank Sort Code</label>
                      <input type="text" placeholder="Enter Bank Sort Code" id="bank_sort" 
                          name="bank_sort"
                          value={pricinginputs.bank_sort || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <label for="naira_per_dollar" className="header-text">Naira Per Dollar</label>
                      <input type="text" placeholder="Enter Exchange Rate - NGN/USD" id="naira_per_dollar" 
                          name="naira_per_dollar"
                          value={pricinginputs.naira_per_dollar || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <label for="storage_cost" className="header-text">User Monthly Storage Cost</label>
                      <input type="text" placeholder="Enter User Monthly Cost" id="storage_cost" 
                          name="storage_cost"
                          value={pricinginputs.storage_cost || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <label for="monthly_cost" className="header-text">User Monthly Cost</label>
                      <input type="text" placeholder="Enter User Monthly Cost" id="monthly_cost" 
                          name="monthly_cost"
                          value={pricinginputs.monthly_cost || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <label for="annual_discount" className="header-text">Annual Subscription Discount</label>
                      <input type="text" placeholder="Enter Annual Subscription Discount" id="annual_discount" 
                          name="annual_discount"
                          value={pricinginputs.annual_discount || ""}                                                        
                          onChange={handlePricingInputChange} 
                      />

                      <button type="submit">Submit Pricing</button>

                      <a href="info@itraktech.com" className="prompt-text">Any questions? Contact us.</a>
                  </form>
              </div>
          </div>
          <div id="confirm" className="sign-up-window">
              <div className="login-container" onClick={removeConfirm}></div>
              <div id="reg-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>ITrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="confirm-form" className="login-content" onSubmit={handleConfirmSubmit}>

                      <h5>Confirm User Payment</h5>

                      <label for="email_addr" className="header-text">Parent's Username</label>
                      <input type="text" placeholder="Enter parent's e-mail address  from RFQ" id="email_addr" 
                          name="email_addr"
                          value={confirminputs.email_addr || ""}                                                        
                          onChange={handleConfirmInputChange}                                                                                                                
                      />

                      <label for="school_email" className="header-text">School Email</label>
                      <input type="text" placeholder="Enter School Email Address from RFQ" id="school_email" 
                          name="school_email"
                          value={confirminputs.school_email || ""}                                                        
                          onChange={handleConfirmInputChange} 
                      />

                      <label for="school_id" className="header-text">School ID</label>
                      <input type="text" placeholder="Enter School ID from RFQ" id="school_id" 
                          name="school_id"
                          value={confirminputs.school_id || ""}                                                        
                          onChange={handleConfirmInputChange} 
                      />

                      <button type="submit">Confirm Payment</button>

                      <a href="info@itraktech.com" className="prompt-text">Any questions? Contact us.</a>
                  </form>
              </div>
          </div>
          <div id="recorder" className="sign-up-window">
              <div className="login-container" onClick={removeRecorder}></div>
              <div id="reg-w" className="login-wrapper">
                  <div className="login-header">
                      <h1>ITrak Technology Company</h1>
                      <img src="itrak-logo.png" id="company-logo"/>
                  </div>
                  <form id="recorder-form" className="login-content" onSubmit={handleRecorderSubmit}>

                      <h5>Request Recorder App</h5>

                      <label for="email_addr" className="header-text">Username</label>
                      <input type="text" placeholder="Enter a registered email address" id="email_addr" 
                          name="email_addr"
                          value={recorderinputs.email_addr || ""}                                                        
                          onChange={handleRecorderInputChange}                                                                                                                
                      />

                      <label for="password" className="header-text">Password</label>
                      <input type="password" placeholder="***********" id="password"
                          name="password"
                          value={recorderinputs.password || ""}
                          onChange={handleRecorderInputChange}
                      />

                      <label for="school_email" className="header-text">School Email</label>
                      <input type="text" placeholder="Enter School Email Address" id="school_email" 
                          name="school_email"
                          value={recorderinputs.school_email || ""}                                                        
                          onChange={handleRecorderInputChange} 
                      />

                      <label for="school_id" className="header-text">School ID</label>
                      <input type="text" placeholder="Enter School ID" id="school_id" 
                          name="school_id"
                          value={recorderinputs.school_id || ""}                                                        
                          onChange={handleRecorderInputChange} 
                      />

                      <label for="session_id" className="header-text">Session ID (YYYY-YYYY)</label>
                      <input type="text" placeholder="Current Session ID: e.g. 2025-2026" id="session_id" 
                          name="session_id"
                          value={recorderinputs.session_id || ""}                                                        
                          onChange={handleRecorderInputChange} 
                      />

                      <label for="term" className="header-text">Term (1st, 2nd or 3rd)</label>
                      <input type="text" placeholder="Current Term: e.g. 2nd" id="term" 
                          name="term"
                          value={recorderinputs.term || ""}                                                        
                          onChange={handleRecorderInputChange} 
                      />

                      <label for="term_begins" className="header-text">Term Begins</label>
                      <input type="date" min="2025-01-01" id="term_begins" 
                          name="term_begins"
                          value={recorderinputs.term_begins || ""}                                                        
                          onChange={handleRecorderInputChange} 
                      />

                      <button type="submit">Submit Request</button>

                      <a href="info@itraktech.com" className="prompt-text">Any questions? Contact us.</a>
                  </form>
              </div>
          </div>

      </div>
  );
}
export default HomePage;

/*                       <label for="class_id" className="header-text">Student's Class ID</label>
                      <select id="class_id" className="select-user"
                          name="class_id"
                          value={licenseinputs.class_id || ""}                                                        
                          onChange={handleLicenseInputChange} 
                      >
                          <option value="JSS1">JSS1</option>
                          <option value="JSS2">JSS2</option>

                      </select>
*/