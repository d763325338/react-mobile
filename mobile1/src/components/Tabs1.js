import React,{Component} from 'react';
import { Grid, Icon } from 'antd-mobile';
import { Carousel, WingBlank,SearchBar, Button, WhiteSpace, } from 'antd-mobile';
import { connect } from 'react-redux';
import { fetchCarsouelList } from '../actions'
import '../css/Tabs1.css';
import axios from 'axios';
import { string } from '_postcss-selector-parser@6.0.2@postcss-selector-parser';

const mapStateToProps = state=>{

  return {
    carousel: state.carousel
  }
}

class SearchBarExample extends React.Component {
  componentDidMount() {
    this.autoFocusInst.focus();
  }
  onChange= (value) => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
}
 class Tabs1 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      grid1: {},
      grid2: {}
    }
  }

  componentDidMount(){
    this.props.fetchCarsouelList();
    axios({
      url   : `http://localhost:3000/grid1`,
      method: 'get'
    }).then(res=>{
      console.log(res.data);
     const grid1 = res.data
     this.setState(
       {grid1}
     );
    })
    axios({
      url   : `http://localhost:3000/grid2`,
      method: 'get'
    }).then(res=>{
      console.log(res.data);
     const grid2 = res.data
     this.setState(
       {grid2}
     );
    })
  }

  render(){
    const {carousel} = this.props;
    return (
      <div>

      <SearchBar placeholder="请输入你想要搜索的产品名称" maxLength={8} style = {{ backgroundColor: '#108ee9' }}/>


        <WingBlank
        style = {{ margin:0 }}
        >
        <Carousel
        autoplay={true}
        infinite
        beforeChange = {(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange  = {index => console.log('slide to', index)}
      >
        {carousel.map(val => (
          <a
            key   = {val.id}
            href  = {val.url}

          >
            <img
              src   = {val.img}
              alt   = {val.title}
              style = {{ width: '100%', verticalAlign: 'top' }}
            />
          </a>
        ))}
      </Carousel>
        </WingBlank>

        <Grid data={

          Array.from(this.state.grid1).map((_val,i) => ({
            icon: String(_val.img),
            text: String(_val.name),
          }))
        } hasLine={false} />

        <Grid data={
          Array.from(this.state.grid2).map((_val,i) => ({
            icon: String(_val.img),
            name: String(_val.name),
          }))
        }
        columnNum={3}
        renderItem={dataItem => (
          <div style={{ padding: '12.5px' }}>
            <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
              <span>{dataItem.name}</span>
            </div>
          </div>
        )}
      />
      </div>
    )
  }
}

export default connect(mapStateToProps,{fetchCarsouelList})(Tabs1);
