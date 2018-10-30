'use strict';

const co = require('co');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const defaultResults = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

function* getRestaurants(count) {console.log('getrestaurant' + '-----' + 'called');
    let req = {
        TableName: tableName,
        Limit: count
    }
    console.log('req' + '-----' + req);

    let res = yield dynamodb.scan(req).promise();
    console.log('res' + '-----' + res);
    return res.Items;
}

module.exports.handler = co.wrap(function* (event, context, cb) {
    let restaurants = yield getRestaurants();
    let response = {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }

    cb(null, response);
})