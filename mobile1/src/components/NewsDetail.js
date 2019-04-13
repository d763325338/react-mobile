import React,{Component} from 'react';
import axios from 'axios';
import { Card,Button, WhiteSpace, WingBlank } from 'antd-mobile';
export default class NewsDetail extends Component{

  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    }
  }

  componentDidMount(){
    axios({
      url   : `http://localhost:3000/news/${this.props.match.params.id}`,
      method: 'get'
    }).then(res=>{
      //console.log(res.data);
     const posts = res.data
     this.setState(
       {posts}
     );
    })
  }
  render(){
    return(
      <div>
      <div
        style={{
          marginTop:'20px',
          lineHeight: '25px',
          color: '#000',
          fontSize: 22,
          borderBottom: '1px solid #F6F6F6',
        }}
      >{this.state.posts.title}
      </div>

      <div dangerouslySetInnerHTML={{ __html: this.state.posts.content }}  />

      </div>
    )
              }
}