import json
import awsgi
import boto3
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

def handler(event, context):
  print('received event:')
  print(event)
  school = event['pathParameters']
  print(event['pathParameters'])
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!' + school)
  }

#aws-wsgi = "*"
#boto3 = "*"
#flask = "*"
#flask-cors = "*"
#pandas = "*"
#mysql-connector = "*"
#openpyxl = "*"