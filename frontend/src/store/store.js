import {configureStore} from "@reduxjs/toolkit";
import rootreducer from "./reducer/reducer.js";

const store = configureStore({
    reducer: rootreducer
})

export default store