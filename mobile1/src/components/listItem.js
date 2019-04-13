import React from 'react'

const ListItem  = (props) =>{
    const {name,img,text,time,price} = props.product;
    return (
        <li>
            产品名称: {name}
            <br/>
            产品图片: <img src={img} />
            <br/>
            产品介绍: {text}
            <br/>
            发布时间: {time}
            <br/>
            产品价格: {price.number}
            <button onClick={(product)=>props.addToCart(props.product)}>加入购物车</button>
        </li>
    )
}

export default ListItem;