console.log('function starts');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = function(event, context, callback){
    console.log('processing event: ' + JSON.stringify(event, null, 2));

    let currentMonth = new Date().getMonth() + 1 ;
    let currentYear = new Date().getFullYear();

    let params =  {
        Item: {
            date: Date.now(),
            author: event.author ? event.author : "Anonymous",
            Tip: event.tip,
            Category: event.category,
            MonthAttribute: currentMonth,
            YearAttribute: currentYear,
            YearMonthAttribute: currentYear + "-" + currentMonth
        },

        TableName: 'CodingTips'
    };

    docClient.put(params, function(err,data){
        if(err) {
            callback(err, null);
        }else{
            callback(null, data);
        }
    });

};