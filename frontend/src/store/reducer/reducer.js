import {combineReducers} from "@reduxjs/toolkit";
import searchReducer from "../slice/search.js";

const rootreducer = combineReducers({
    search: searchReducer
})

export default rootreducer;