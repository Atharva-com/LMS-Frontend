import Heading from '@/app/utils/Heading'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React, { FC, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import Header from '../Header'
import CourseDetails from './CourseDetails'
import { loadStripe } from '@stripe/stripe-js'
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/orderApi'

type Props = {
    id: string
}

const CourseDetailsPage: FC<Props> = ({ id }) => {
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetCourseDetailsQuery(id)
    const { data: config } = useGetStripePublishableKeyQuery({})
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation()
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {

        if (config) {
            const publishableKey: any = config?.publishableKey;
            setStripePromise(loadStripe(publishableKey))
        }

        if (data?.success === true) {
            const amount = Math.round(data.course.price * 100)

            createPaymentIntent(amount)
        }
    }, [data])

    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData?.client_secret)
        }
    }, [paymentIntentData])

    return (
        <>
            {
                isLoading ?
                    <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
                    : (
                        <div>
                            <Heading
                                title={data.course.name + "- Learning"}
                                description="It is a platform for students to learn."
                                keywords={data?.course?.tags}
                            />

                            <Header
                                route={route}
                                setRoute={setRoute}
                                open={open}
                                setOpen={setOpen}
                            />

                            {
                                stripePromise && (
                                    <CourseDetails
                                        data={data.course}
                                        stripePromise={stripePromise}
                                        clientSecret={clientSecret}
                                        setRoute={setRoute}
                                        setOpen={setOpen}
                                    />
                                )
                            }

                        </div>
                    )

            }
        </>
    )
}

export default CourseDetailsPage