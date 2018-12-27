'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var payload=require('./Models/staticData');
var app=express();

const errorData=require('./Models/staticData.js');
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var path=require("path");
app.post('/webhook',function(req,res){
    console.log('Received a post request');
    if (!req.body)   return res.sendStatus(400)
    res.setHeader('Content-Type','application/json');
   //console.log('here is the post request from dialogflow');
    console.log(req.body);
    console.log('Get error type parameter from DailogFlow'+req.body.queryResult.parameters['error_type']);
    var error=req.body.queryResult.parameters['error_type'];
    var w= getErrors(error);
    //var resultRetun= getErrors(error); //json schema parse from the payload which we have
    let response=" ";
    let responseObj={
                         "fulfillmentText" : response,
                         "fulfillmentMessages":[{"text": {"text": [w]}}],
                         "source":""
    }
    console.log('Here is the response to dialogflow');
    console.log(responseObj);
    return res.json(responseObj);
    })
function getErrors(errorType)
{
  console.log(errorType);
let resp=payload.errors[errorType];
console.log(resp);
  return resp;
}
app.listen(port, function () {
    console.log("Server is up and running...");
    console.log(port);
});
