import React,{Component} from 'react';
import { ListView,NavBar, Icon } from 'antd-mobile';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import {NavLink} from 'react-router-dom'

export default class Tabs2 extends Component{
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource,
      list: [],
      page: 1
    };
  }

  makeRemoteRequest = ()=>{
    axios({
      url   : `http://localhost:3000/news?_page=${this.state.page}&_limit=5&_sort=id&_order=desc`,
      method: 'get'
    }).then(res=>{
      this.setState({
        list: [...this.state.list, ...res.data],
        page: this.state.page + 1
      })
    })
  }

  componentDidMount (){
    this.makeRemoteRequest();
  }

  onEndReached = (event)=>{
    this.makeRemoteRequest();
  }
  renderRow = (rowData,sectionID,rowID)=>{
    var newsDetailUrl = `/news/${rowData.id}`
    return (
      <NavLink to={newsDetailUrl} replace>

        <div key={rowID} style={{ padding: '0 15px' }}>
        <Card >
               <Card.Header
                title={rowData.title}
                thumb={rowData.img}
                thumbStyle={{height:"100px"}}
              />
            </Card>
        </div>
      </NavLink>
    )
  }
  render() {
    return (
      <ListView
        dataSource = {this.state.dataSource.cloneWithRows(this.state.list)}
        renderRow  = {(rowData, sectionID, rowID, highlightRow) => this.renderRow(rowData,sectionID,rowID)}
        style      = {{
          height  : document.documentElement.clientHeight - 50,
          overflow: 'auto',
        }}
        onEndReached          = {this.onEndReached}
        onEndReachedThreshold = {10}
      />
    );
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     news: {}
  //   }
  // }

  // componentDidMount(){
  //   axios({
  //     url   : `http://localhost:3000/news`,
  //     method: 'get'
  //   }).then(res=>{
  //     //console.log(res.data);
  //    const news = res.data
  //    this.setState(
  //      {news}
  //    );
  //   })
  // }
  // render(){
  //   var productDetailUrl = `/news/${rowData.id}`
  //   return (
  //     <div>

  //     {Array.from(this.state.news).map((val,i)=> (
  //       <Card >
  //       <Card.Header
  //         title={val.title}
  //         thumb={val.img}
  //         thumbStyle={{height:"100px"}}
  //       />
  //     </Card>
  //     ))}
  //     </div>
  //   )
  //     }
    }

