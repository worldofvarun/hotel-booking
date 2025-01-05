import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {useNavigate} from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function usePayment(navigate) {
    const { onSuccessPayment } = useOnSuccessPayment();
    const { onFailedPayment } = useOnFailedPayment();

    const makePayment = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/hotels/payment`, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            console.error("Payment failed:", error);
            throw new Error("Payment request failed");
        }
    };

    const { mutateAsync: makeBooking, isLoading } = useMutation(makePayment, {
        onSuccess: (data) => {
            const order = data.order;
            if (order?.id) {
                const options = createRazorpayOptions(order, navigate, onSuccessPayment);
                if (window.Razorpay) {
                    const razorpay = new window.Razorpay(options);
                    razorpay.on("payment.failed", async (response) => {
                        await onFailedPayment(response);
                    });
                    razorpay.open();
                } else {
                    console.error("Razorpay SDK not loaded");
                }
            }
        },
    });

    return { makeBooking, isLoading };
}

function createRazorpayOptions(order, navigate, onSuccessPayment) {
    return {
        key: mport.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        description: "Test Payment",
        order_id: order.id,
        handler: async (response) => {
            await onSuccessPayment(response);
            navigate("/me/my-bookings");
        },
        prefill: {
            name: `${order.user.firstName} ${order.user.lastName}`,
            email: order.user.email,
        },
        theme: {
            color: "#3399cc",
        },
    };
}


export function useOnSuccessPayment() {
    const makeSuccessPayment = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/hotels/payment/success`, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const { mutateAsync: onSuccessPayment, isLoading } = useMutation(makeSuccessPayment, {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.error(error),
    });

    return { onSuccessPayment, isLoading };
}


export function useOnFailedPayment() {
    const makeFailedPayment = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/hotels/payment/failed`, data, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const { mutateAsync: onFailedPayment, isLoading } = useMutation(makeFailedPayment, {
        onSuccess: (data) => console.log(data),
        onError: (error) => console.error(error),
    });

    return { onFailedPayment, isLoading };
}
