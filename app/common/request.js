/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 //对请求的封装
var queryString = require('query-string');
var _ = require('lodash');
var request = {};
var config = require('./config');

request.get = function(url,param){
	if(param){
		url += '?' + queryString.stringify(param);
	}

	return fetch(url)
		.then(response => response.json())
		.then(responseJson => responseJson)
}

request.post = function(url , body){
	var options = _.extend(config,header,{
		body: JSON.stringify(body)
	});

	return fetch(url,options)
		.then(response => response.json())
		.then(responseJson => responseJson)
}
 
module.exports = request