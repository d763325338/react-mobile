import React from 'react'
import style from '../main.css'
import { connect } from 'react-redux';
import { increase,decrease,fetchList,addToCart } from '../actions'
import ListItem from './listItem'

const mapStateToProps = (state)=>{
    return {
        counter : state.counter.counter,
        counter1: state.counter.counter1,
        lists   : state.counter.lists,
        total   : state.counter.total,
        carts   : state.carts
    }
}



class Counter extends React.Component{
    changePage = (page) =>{
        this.props.fetchList({page: page});
    }
    showPageList(){
        var jsx = [];
        if(this.props.total >0){
            var pages = Math.ceil(this.props.total / 5)
            for(let i=1;i<=pages;i++){
                jsx.push(<span key={i} style={{ padding: 5}} onClick={()=>this.changePage(i)}>{i}</span>)
            }
        }
        return jsx;
    }
    showList(){
        var lists = this.props.lists;
        if(!lists){
            return <li>暂无数据</li>
        }

        var jsx = [];
        for(var i=0;i<lists.length;i++){
            jsx.push(<ListItem key={i} product={lists[i]} addToCart={this.props.addToCart}/>)
        }
        return jsx;
    }

    render(){
        const {counter,counter1,lists,carts,increase,decrease,fetchList,addToCart} = this.props;



        return (
            <div>
                Counter: {counter}
                <br/>
                Counter1: {counter1}
                <br/>
                {this.showPageList()}
                {this.showList()}
                <br/>
                <button onClick={increase}>increase</button>
                <button onClick={decrease}>decrease</button>
            </div>
        )
    }


    componentDidMount(){
        this.props.fetchList();
    }
}
const CounterContainer = connect(mapStateToProps,{increase,decrease,fetchList,addToCart})(Counter);
export default CounterContainer;