import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetAllBookings() {

    async function GetAllBookings() {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
                withCredentials: true,
            });

            return response.data;


        }catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    const { data: bookings,  } = useQuery({
        queryKey: ['getAllBookings'],
        queryFn: GetAllBookings,

    });

    return {bookings};
}

export function useGetBookingsById(id) {

    async function GetBookingsById() {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/bookings/${id}`, {
                withCredentials: true,
            });

            return response.data;


        }catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    const { data: bookings,  } = useQuery({
        queryKey: ['getAllBookings', id],
        queryFn: GetBookingsById,
        enabled: !!id

    });

    return {bookings};
}