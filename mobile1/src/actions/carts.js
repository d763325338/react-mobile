// 添加购物车的时候应该把整个产品对象当成参数传递进去
export const addToCart = (data) =>{
    return {
        type   : 'ADDTOCARTS',
        payload: data
    }
}