import json
import awsgi
import boto3
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

DB_BASE_ROUTE = "/updateDB/students/{school}/{session}/{class}"
FILE_BASE_ROUTE = "/updateFile/students/{school}/{session}/{class}"

app = Flask(__name__)
CORS(app)

@app.route(DB_BASE_ROUTE, methods=['POST'])
def postFileToDB():
  return jsonify(message="Students record file successfully written to database!", method="POST")

@app.route(DB_BASE_ROUTE, methods=['GET'])
def getFileToDB():
  return jsonify(message="Students record file successfully written to database!", method="GET")

@app.route(FILE_BASE_ROUTE, methods =['POST'])
def postDBToFile():
  return jsonify(message="Students data record successfully written to file!", method="POST")

@app.route(FILE_BASE_ROUTE, methods=['GET'])
def getDBToFile():
  return jsonify(message="Students data record successfully written to file!", method="GET")

def handler(event, context):
  print(jsonify(event))
  event['httpMethod'] = 'GET'#event['requestContext']['http']['method']
  event['path'] = 'updateDB/students/{school}/{session}/{class}'#event['requestContext']['http']['path']
  event['queryStringParameters'] = {}#event.get('queryStringParameters', {})
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

#aws-wsgi = "*"
#boto3 = "*"
#flask = "*"
#flask-cors = "*"
#pandas = "*"
#mysql-connector = "*"
#openpyxl = "*"