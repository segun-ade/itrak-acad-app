import json
import awsgi
#import boto3
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4
import fileupdater as fDBWriter
#import pandas as pd
#import mysql.connector as mysql
#from openpyxl import load_workbook

DB_BASE_ROUTE = "/updateDB/students/{school}/{session}/{class}"
FILE_BASE_ROUTE = "/updateFile/students/{school}/{session}/{class}"
req_school = "Chamba"
req_session = "2003_04"
req_class = "Pry6"

app = Flask(__name__)
CORS(app)


@app.route(DB_BASE_ROUTE, methods=['POST'])
def postFileToDB():
  return jsonify(message="Students record file successfully written to database!", method="POST", school=req_school, session=req_session, student_class=req_class)

@app.route(DB_BASE_ROUTE, methods=['GET'])
def getFileToDB():
  fDBWriter.read_record_sheet("SENSYCAMv2_DHE updated.xlsm","SENSYCAMv2")
  return jsonify(message="Students record file successfully written to database!", method="GET", school=req_school, session=req_session, student_class=req_class)

@app.route(FILE_BASE_ROUTE, methods =['POST'])
def postDBToFile():
  fDBWriter.create_stdt_workbook("-class performance",False,False,34547,req_school,"*","*")
  #create_stdt_workbook("-class performance",True,False,34547,'BRT0002A',"*","*")
  #create_stdt_workbook("-student performance",True,False,34547,'CHF0003T','adeypatb0003',"*")
  #create_stdt_workbook("-admin record",False,False,63628,'MSB0001A',"*","*")
  fDBWriter.create_stdt_workbook("-class attendance",False,False,59405,'MSB0001A',"*","*")
  fDBWriter.create_stdt_workbook("-class attendance",True,False,59405,'MSB0001A',"*","*")
  #create_stdt_workbook("-school form",False,True,0,'MSB0001A',"*","*")
  #create_stdt_workbook("-school record",True,True,0,'MSB0001A',"*","*")
  #create_stdt_workbook("-schools form",False,True,0,"*","*","*")
  #create_stdt_workbook("-schools record",True,True,0,"*","*","*")
  return jsonify(message="Students data record successfully written to file!", method="POST", school=req_school, session=req_session, student_class=req_class)

@app.route(FILE_BASE_ROUTE, methods=['GET'])
def getDBToFile():
  fDBWriter.update_record_sheet("MSB0001A-class attendance.xlsx","Attendance",record_data)
  return jsonify(message="Students data record successfully written to file!", method="GET", school=req_school, session=req_session, student_class=req_class)

def handler(event, context):
  print(event)
  global req_school
  global req_class
  global req_session
  req_school = event['pathParameters']['school']
  req_class = event['pathParameters']['class']
  req_session = event['pathParameters']['session']
  global record_data
  record_data = 'school: '+req_school+', session: '+req_session+', class: '+req_class
  print(record_data)
  event['httpMethod'] = event['httpMethod']
  event['path'] = event['resource']#'updateDB/students/{school}/{session}/{class}'
  if event['queryStringParameters']=='None':
    event['queryStringParameters']={}
  else:
    event['queryStringParameters'] = event['queryStringParameters']
  return awsgi.response(app, event, context) 

#def handler(event, context):
#  print('received event:')
#  print(event)
#  #school = event['pathParameters']
#  #print(event['pathParameters'])
#  return {
#      'statusCode': 200,
#      'headers': {
#          'Access-Control-Allow-Headers': '*',
#          'Access-Control-Allow-Origin': '*',
#          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
#      },
#      'body': json.dumps('Hello from your new Amplify Python lambda! Welcome to iTrak!')
#  }