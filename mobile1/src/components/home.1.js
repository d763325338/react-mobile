import React,{Component} from 'react';
import store from '../store'
import {fetchList} from '../actions/counter'
export default class Home extends Component{
  tryIt =()=>{
    this.props.fetchList()
  }
  render(){
    return (
      <div>
        Home
        <button onClick={this.tryIt}>Dispatch</button>
      </div>
    )
  }
}