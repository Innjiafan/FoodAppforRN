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
  View,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//es5
//var Icon = require('react-native-vector-icons/Ionicons');
console.log(Image);
var width = Dimensions.get('window').width;

var List = React.createClass({
  
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([ {
      "_id": "45000019860427293X",
      "thumb": "http://dummyimage.com/1200X600/f2799a)",
      "video": "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=66879&editionType=normal&source=aliyun"
    },
    {
      "_id": "640000200003179065",
      "thumb": "http://dummyimage.com/1200X600/79bdf2)",
      "video": "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=66879&editionType=normal&source=aliyun"
    }]),
    };
  },
  
   renderRow:function(row){
    return(
      //jsx
      <TouchableHighlight>
        <View style = {styles.item}>

          <Text style = {styles.title}>{row._id}</Text>
          <Image
           style={styles.thumb}
           source={{uri: row.thumb}}
          >
          <Icon 
            name = 'ios-play'
            size = {28}
            style = {styles.play}
          />
          </Image>

          <View style = {styles.itemFooter}>
            <View style = {styles.handleBox}>
              <Icon 
                name = 'ios-heart-outline'
                size = {28}
                style = {styles.up}
              />
              <Text style = {styles.handleText}>喜欢</Text>
            </View>
            <View style = {styles.handleBox}>
              <Icon 
                name = 'ios-chatboxes-outline'
                size = {28}
                style = {styles.commentIcon}
              />
              <Text style = {styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  render:function(){
    return (
      <View style = {styles.container} >
        <View style = {styles.header}>
          <Text style = {styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </View>
      );
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  header:{
    paddingTop:25,
    paddingBottom: 12,
    backgroundColor: '#ee735c',
  },
  headerTitle: {
    color:'#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },

  item:{
    width:width,
    marginBottom:10,
    backgroundColor: '#fff',
  },

  thumb:{
    width:width,
    height:width*0.5,
    resizeMode:'cover'
  },

  title:{
    padding: 10,
    fontSize: 18,
    color:'#333'
  },

  itemFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#eee'
  },

  handleBox:{
    padding: 10,
    flexDirection: 'row',
    width:width/2-0.5,
    justifyContent:'center',
    backgroundColor: '#fff',
  },

  play:{
    position: 'absolute',
    bottom:14,
    right:14,
    width:46,
    height:46,
    paddingTop:9,
    paddingLeft:18,
    backgroundColor: 'transparent',
    borderColor:"#fff",
    borderWidth:1,
    borderRadius:23,
    color:'#ed7b66'
  },

  handleText:{
    paddingLeft:12,
    fontSize:18,
    color:'#333'
  },

  up:{
    fontSize:22,
    color:'#333'
  },

  commentIcon:{
    fontSize:22,
    color:'#333'
  }

});

module.exports = List;