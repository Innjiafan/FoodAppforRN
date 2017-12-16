/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//es6
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

//es5
var Icon = require('react-native-vector-icons/Ionicons');

var List = require('./app/list/index.js');
console.log(List);
var Video = require('./app/video/index.js');
var Mine = require('./app/mine/index.js');
console.log(Video);
console.log(Mine);
//console.log(Icon);
var fdApp = React.createClass({
  // statics: {
  //   title: '<TabBarIOS>',
  //   description: 'Tab-based navigation.',
  // },

  // displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'list',
      notifCount: 0,
      presses: 0,
    };
  },

  render: function() {
    return (
       <TabBarIOS >
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName = 'ios-videocam'
          selected={this.state.selectedTab === 'list'}
          onPress={() => {
            this.setState({
              selectedTab: 'list',
            });
          }}>
          <List />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-pint-outline'
          selectedIconName = 'ios-pint'
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'edit'}
          onPress={() => {
            this.setState({
              selectedTab: 'edit',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          <Video />
        </Icon.TabBarItem>
       <Icon.TabBarItem
          iconName='ios-person-outline'
          selectedIconName = 'ios-person'
          selected={this.state.selectedTab === 'mine'}
          onPress={() => {
            this.setState({
              selectedTab: 'mine',
            });
          }}>
          <Mine />
        </Icon.TabBarItem>
      </TabBarIOS>
      
    );
  },

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('fdApp', () => fdApp);
