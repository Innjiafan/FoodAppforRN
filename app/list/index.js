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
  Dimensions,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var request = require('../common/request.js');
var config = require('./../common/config.js');
//es5
//var Icon = require('react-native-vector-icons/Ionicons');
//console.log(Image);
var width = Dimensions.get('window').width;
//缓存列表所有数据

var cachedResults = {
  nextPage: 1,
  items: [],
  total:0
}


var List = React.createClass({
  
  getInitialState() { 

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      isLoadingTail: false,
      dataSource: ds.cloneWithRows([
          {
            "_id": "810000200302217430",
            "thumb": "http://dummyimage.com/1280X720/f279e9)",
            "video": "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=66879&editionType=normal&source=aliyun",
            "title": "Oxbbl Livisq"
          },
          {
            "_id": "210000197511251612",
            "thumb": "http://dummyimage.com/1280X720/79f2d7)",
            "video": "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=66879&editionType=normal&source=aliyun",
            "title": "Arqp Okoogj"
          },
          {
            "_id": "420000199506157312",
            "thumb": "http://dummyimage.com/1280X720/f2b479)",
            "video": "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=66879&editionType=normal&source=aliyun",
            "title": "Edlpdnci Fsf"
          }
        ]),
      animating: true,
    };
  },

  //组件加载完成
  componentDidMount(){
    this._fetchData(1);
  },
  //获取异步数据
  _fetchData(page) {
    var that = this;
    // return fetch('http://rap2api.taobao.org/app/mock/data/7150')
    this.setState({
      isLoadingTail:true
    });

    request.get(config.api.base+config.api.list,{
      accessToken: 'abcee',
      page: page
    })
      .then(data => {
         // console.log(responseJson.success);
        // console.log(this.state.dataSource);
         if(data.success){
          var items = cachedResults.items.slice();
          items = items.concat(data.data);
          cachedResults.items = items ;
          cachedResults.total = data.total;

          setTimeout(function(){
              that.setState({
                isLoadingTail:false,
                dataSource: that.state.dataSource.cloneWithRows(
                cachedResults.items)
              });
          },2000)
         };
      })
      .catch(error => {
        this.setState({
              isLoadingTail:false
          });
        console.error(error);
      });
  },
  
   _renderRow(row){
    return(
      //jsx
      <TouchableHighlight>
        <View style = {styles.item}>

          <Text style = {styles.title}>{row.title}</Text>
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

  _hasMore(){
    return cachedResults.items.length !== cachedResults.total;
  },

  _fetchMoreData(){
    if(!this._hasMore() || this.state.isLoadingTail){
      return;
    };

    var page = cachedResults.nextPage;

    this._fetchData(page);
  },

  //底部下拉数据提示信息
  _renderFooter(){
      if(!this._hasMore()){
        return(
          <View style = {styles.loadingMore}>
            <Text style = {styles.loadingText}>没有更多了</Text>
          </View>
        );

      };

      return (
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.loadingMore, {height: 80}]}
          size="large"
        />
      );
  },

  render(){
    return (
      <View style = {styles.container} >
        <View style = {styles.header}>
          <Text style = {styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          enableEmptySections={true}
          automaticallyAdjustContentInsets ={false}
          onEndReached = {this._fetchMoreData}
          //dp
          onEndReachedThreshold={20}
          renderFooter = {this._renderFooter}
        />
      </View>
      );
  }
});
const styles = StyleSheet.create({
  container: {
    flex:1,
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
    height:width*0.56,
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
  },

  loadingMore:{
    marginVertical:20
  },

  loadingText:{
    color:'#777',
    textAlign: 'center',
  },


});

module.exports = List;