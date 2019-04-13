import React,{Component} from 'react';
import { ListView,NavBar, Icon,Grid } from 'antd-mobile';
import axios from 'axios'
import {NavLink} from 'react-router-dom'

export default class Tabs3 extends React.Component {

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
      url   : `http://localhost:3000/product?_page=${this.state.page}&_limit=5&_sort=id&_order=desc`,
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
  render(){
    return (
      <div>
      <NavBar mode= "dark">产品</NavBar>
      </div>
    )
  }
  // 渲染每一行
  renderRow = (rowData,sectionID,rowID)=>{
    var productDetailUrl = `/product/${rowData.id}`
    return (
      <NavLink to={productDetailUrl}>

        <div key={rowID} style={{ padding: '0 15px' }}>
            <div
              style={{
                lineHeight  : '50px',
                color       : '#888',
                fontSize    : 18,
                borderBottom: '1px solid #F6F6F6',
              }}
            >{rowData.name}</div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
              <img style={{ height: '100px', marginRight: '15px' }} src={rowData.img} alt="" />
              <div style={{ lineHeight: 2 ,width:'100%'}}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold',color:'#000'}}>{rowData.text}</div>
                <div
                style={{ color:'#f40',marginRight: '15px'}}
                ><span style={{ fontSize: '30px', color: '#000'}}>{rowData.price.number}</span>¥ {rowData.price}</div>
              </div>
            </div>
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
}
