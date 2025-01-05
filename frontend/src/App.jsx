import {Route, Routes} from "react-router";
import AppLayout from "./ui/layouts/AppLayout.jsx";
import Register from "./features/auth/Register.jsx";
import Login from "./features/auth/Login.jsx";
import AddHotel from "./features/hotels/AddHotel.jsx";
import MyHotels from "./features/hotels/MyHotels.jsx";
import EditHotel from "./features/hotels/EditHotel.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import SearchHotels from "./features/hotels/SearchHotels.jsx";
import DetailHotel from "./features/hotels/DetailHotel.jsx";
import Booking from "./features/hotels/Booking.jsx";
import MyBookings from "./features/bookings/MyBookings.jsx";
import DetailBookingPage from "./features/bookings/DetailBookingPage.jsx";
import Home from "./features/Home.jsx";



function App() {
    return (
       <Routes>
           <Route element={<AppLayout/>}>
               <Route path={'/'} element={<Home/>}/>
               <Route path={'/auth/login'} element={<Login/>}/>
               <Route path={'/auth/register'} element={<Register/>}/>
               <Route path={'/search'} element={<SearchHotels/>}/>
               <Route path={'/hotel/:id'} element={<DetailHotel/>}/>
               <Route path={'/hotel/:id/booking'} element={<Booking/>}/>
               <Route element={<ProtectedRoute/>}>
                   <Route path={'/me/my-bookings/:id'} element={<DetailBookingPage/>}/>
                   <Route path={'/me/my-bookings'} element={<MyBookings/>}/>
                   <Route path={'/me/add-hotel'} element={<AddHotel/>}/>
                   <Route path={'/me/my-hotels'} element={<MyHotels/>}/>
                   <Route path={'/me/edit/:id'} element={<EditHotel/>}/>
               </Route>
           </Route>
       </Routes>
    );
}

export default App;