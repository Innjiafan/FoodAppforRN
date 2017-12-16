/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//es6
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

//es5
var Icon = require('react-native-vector-icons/Ionicons');


var List = React.createClass({
  render:function(){
    return (
      <View style = {styles.container} >
        <Text>列表页面</Text>

      </View>
      );
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
});

module.exports = List;