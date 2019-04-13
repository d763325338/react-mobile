import React,{Component} from 'react';
import axios from 'axios';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
export default class ProductDetail extends Component{

  constructor(props) {
    super(props);
    this.state = {
      posts: {}
    }
  }

  componentDidMount(){
    axios({
      url   : `http://localhost:3000/product/${this.props.match.params.id}`,
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
    //console.log(res.data);
    return (
      <div>
      <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
              <img style={{ height: '100px', marginRight: '15px' }} src={this.state.posts.img} alt="" />
              <div style={{ lineHeight: 2 ,width:'100%'}}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold',color:'#000'}}>{this.state.posts.text}</div>
                <div style={{ color:'#f40',marginRight: '15px'}}>
                <div style={{textAlign:'left'}}>
                <span style={{ fontSize: '30px', color: '#000'}}></span>¥ {this.state.posts.price}
                <Button type="primary" inline size="small" style={{ float:'right'}}>加入购物车</Button>
                </div>

                </div>
            </div>
              </div>

      </div>
    )
  }
}