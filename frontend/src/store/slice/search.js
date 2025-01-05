import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    destination: sessionStorage.getItem('destination') || "",
    adultCount: sessionStorage.getItem('adultCount') || "",
    childCount: sessionStorage.getItem('childCount') || "",
    checkIn: sessionStorage.getItem('checkIn'),
    checkOut: sessionStorage.getItem('checkOut'),
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            const {destination, adultCount, childCount, checkIn, checkOut} = action.payload;

            state.destination = destination;
            state.adultCount = adultCount;
            state.childCount = childCount;
            state.checkIn = checkIn;
            state.checkOut = checkOut;

            sessionStorage.setItem("destination", destination);
            sessionStorage.setItem("adultCount", adultCount);
            sessionStorage.setItem("childCount", childCount);
            sessionStorage.setItem("checkIn", checkIn);
            sessionStorage.setItem("checkOut", checkOut);
        },

        setDate: (state, action) => {
            const {checkIn, checkOut} = action.payload;
            state.checkIn = checkIn;
            state.checkOut = checkOut;
            sessionStorage.setItem("checkIn", checkIn);
            sessionStorage.setItem("checkOut", checkOut);
        },

        clearSearch: (state, action) => {
            sessionStorage.removeItem("destination");
            sessionStorage.removeItem("adultCont")
            sessionStorage.removeItem("childCount");
            sessionStorage.removeItem("checkIn");
            sessionStorage.removeItem("checkOut")
        }


    }
})

export const {setSearch, clearSearch, setDate} = searchSlice.actions;

export default searchSlice.reducer;