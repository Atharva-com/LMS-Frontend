import { styles } from '@/app/styles/style';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/orderApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]})

type Props = {
    setOpen: any;
    data: any;
    user: any;
}

const CheckOutForm: FC<Props> = ({ setOpen, data, user }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>("")
    const [loadUser, setLoadUser] = useState(false)
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation()
    const { } = useLoadUserQuery({ skip: loadUser ? false : true })
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        })
        if (error) {
            setMessage(error.message)
            setIsLoading(false)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment Success")
            setOpen(false)
            setIsLoading(false)
            createOrder({ courseId: data._id, payment_Info: paymentIntent })
        }

    }

    useEffect(() => {
        if (orderData) {
            if (orderData.success === true) {
                setLoadUser(true)
                socketId.emit('notification', {
                    title: "New Order",
                    message: `You have a new order from ${data.name}`, 
                    userId: user._id
                })
                toast.success("Course purchased successfully. Check confirmation mail")
                redirect(`/course-access/${data._id}`)
            }
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [orderData, error, data])


    return (
        <form onSubmit={handleSubmit} id='payment-form'>
            <LinkAuthenticationElement id='link-authentication-element' />
            <PaymentElement id='payment-element' />
            <button disabled={isLoading || !stripe || !elements} id='submit' className='mt-4'>
                <span id='button-text' className={`${styles.button} mt-2 !h-[35pxx]`}>
                    {isLoading ? 'Paying...' : "Pay Now"}
                </span>
            </button>

            {message && (
                <div className='text-[red] font-poppins pt-2'>
                    {message}
                </div>
            )}
        </form>
    )
}

export default CheckOutForm