import { styles } from '@/app/styles/style';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/orderApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    setOpen: any;
    data: any;
}

const CheckOutForm:FC<Props> = ({setOpen, data}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>("")
    const [loadUser, setLoadUser] = useState(false)
    const [ createOrder, {data: orderData, error} ] = useCreateOrderMutation()
    const {} = useLoadUserQuery({skip: loadUser ? false : true})
    const [isLoading, setIsLoading] = useState(false)
console.log(orderData)
    const handleSubmit  = async (e: any) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }

        setIsLoading(true)

        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        })
        console.log(paymentIntent, error)
        if(error){
            setMessage(error.message)
            setIsLoading(false)
        } else if (paymentIntent && paymentIntent.status === "succeeded"){
            setMessage("Payment Success")
            setIsLoading(false)
            createOrder({courseId: data._id, payment_Info: paymentIntent})
            setOpen(false)
        }
        
    }

    useEffect(() => {
      if(orderData){
        setLoadUser(true)
        redirect(`/course-access/${data._id}`)
      }

      if(error){
        if("data" in error){
            const errorMessage = error as any;
            toast.error(errorMessage.data.message)
        }
      }
    }, [orderData, error])
    

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