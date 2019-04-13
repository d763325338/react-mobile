import counter from './counter'
import carts from './carts'
import carousel from './carousel'

import  { combineReducers } from 'redux'


export default combineReducers({
    carts,
    counter,
    carousel
})