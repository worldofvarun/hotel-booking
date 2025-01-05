import {isError, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAppContext} from "../../context/AppContext.jsx";
import {useNavigate} from "react-router";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetUser() {
    async function getUser() {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            credentials: 'include'
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    const { data: me } = useQuery({
        queryKey: ['getUser'],
        queryFn: getUser,
    });

    return {me};
}

export function useCreateHotel () {
    const {showToast} = useAppContext();
    const navigate = useNavigate();
    const createHotel = async (formData) => {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();

    }

    const {mutateAsync: addMyHotel, isLoading} = useMutation(createHotel, {
        onSuccess:() => {
            showToast({type: "SUCCESS", message: "Hotel created successfully."})
            navigate("/me/my-hotels");
        }
    })



    return {addMyHotel, isLoading};
}

export function useGetMyHotels () {
    const getMyHotels = async () => {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
            method: 'GET',
            credentials: "include",
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['getMyHotels'],
        queryFn: getMyHotels,
        retry: false,
    });

    return {data, isLoading, isError}
}

export function useGetHotelById (id) {

    async function getHotelById () {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
            method: 'GET',
            credentials: "include",
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    const {data, isLoading, isError} = useQuery({
        queryKey: ['getHotelById', id],
        queryFn: getHotelById,
        retry: false,
        enabled: !!id,
    });

    return {data, isLoading, isError}
}

export function useUpdateHotelById(id) {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const updateHotel = async (formData) => {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
            method: "PUT",
            credentials: "include",
            body: formData,
        })

        if (!response.ok){
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    const {mutateAsync: updateHotelById, isError, isLoading} = useMutation(updateHotel, {
        onSuccess: () => {
            queryClient.invalidateQueries(['getHotelById'])
            showToast({type: "SUCCESS", message: "Hotel updated successfully."})

        },
        onError: (error) => {
          showToast({type: "ERROR", message: "Hotel updated failed"})
        }
    })

    return {updateHotelById, isLoading, isError}
}

export function useSearchHotels (query) {
    async function searchHotels () {
        const queryParams = new URLSearchParams();
        queryParams.append("destination", query.destination);
        queryParams.append("checkIn", query.checkIn);
        queryParams.append("checkOut", query.checkOut);
        queryParams.append("childCount", query.childCount);
        queryParams.append("adultCount", query.adultCount)
        queryParams.append('sorting', query.sorting || '');
        query.ratings?.forEach((star) => {
            queryParams.append("ratings", star);
        })

        query.types?.forEach((type) => {
            queryParams.append("types", type);
        })

        query.facilities?.forEach((facility) => {
            queryParams.append("facilities", facility);
        })



        const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
                method: "GET",

        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ['search', query],
        queryFn: searchHotels,
        retry: false,
    })

    return {data, isLoading, isError, refetch}
}

export function useGetHotelDetails (id) {
    async function getHotelDetails () {
        const response = await fetch(`${API_BASE_URL}/api/hotels/${id}`, {
            method: 'GET'
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json();
    }

    const {data} = useQuery({
        queryKey: ['getHotelDetails', id],
        queryFn: getHotelDetails,
        enabled: !!id
    })

    return {data}
}

export function useGetAllHotels(){
    async function GetAllHotels () {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/hotels`, {})
            return response.data;
        }catch (error) {
            throw new Error(error.message);
        }
    }

    const {data: getAllHotels} = useQuery({
        queryKey: ['GetAllHotels'],
        queryFn: GetAllHotels

    })

    return {getAllHotels}
}
