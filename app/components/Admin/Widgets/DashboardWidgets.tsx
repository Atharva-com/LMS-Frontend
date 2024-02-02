import React, { FC, useEffect, useState } from 'react'
import UsersAnalytics from '../Analytics/UsersAnalytics'
import { BiBorderLeft } from 'react-icons/bi'
import { PiUsersFourLight } from 'react-icons/pi'
import { Box, CircularProgress } from '@mui/material'
import OrderAnalytics from '../Analytics/OrderAnalytics'
import AllInvoices from '../Order/AllInvoices'
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'

type Props = {
    open?: boolean
    value?: number
}

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                value={value}
                size={45}
                thickness={4}
                color={value && value > 99 ? 'info' : 'error'}
                style={{ zIndex: open ? -1 : 1 }}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        </Box>
    )
}

const DashboardWidgets: FC<Props> = ({ open }) => {
    const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>()
    const [UserComparePercentage, setUserComparePercentage] = useState<any>()
    const { data, isLoading } = useGetUsersAnalyticsQuery({})
    const { data: ordersData, isLoading: OrdersLoading } = useGetOrdersAnalyticsQuery({})

    console.log(data, ordersData)

    useEffect(() => {
        if (isLoading && OrdersLoading) {
            return
        } else {
            if (data && ordersData) {
                if (data.success === true && ordersData.success === true) {
                    const usersLastTwoMonths = data.user.last12Months.slice(-2)
                    const ordersLastTwoMonths = ordersData.order.last12Months.slice(-2)

                    if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
                        const usersCurrentMonth = usersLastTwoMonths[1].count
                        const usersPreviousMonth = usersLastTwoMonths[0].count
                        const ordersCurrentMonth = ordersLastTwoMonths[1].count
                        const ordersPreviousMonth = ordersLastTwoMonths[0].count
                        const totalUsersPercentage =usersPreviousMonth !== 0 ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 : 100
                        const totalSalesPercentage = ordersPreviousMonth !== 0 ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100

                        setUserComparePercentage({
                            currentMonth: usersCurrentMonth,
                            previousMonth: usersPreviousMonth,
                            percentChange: totalUsersPercentage
                        })
                        setOrdersComparePercentage({
                            currentMonth: ordersCurrentMonth,
                            previousMonth: ordersPreviousMonth,
                            percentChange: totalSalesPercentage
                        })
                    }
                }

            }
        }
    }, [data, ordersData, isLoading, OrdersLoading])


    return (
        <div className='min-h-screen mb-8'>

            <div className='grid grid-cols-[75%,25%]'>

                <div className='p-8'>
                    <UsersAnalytics isDashboard={true} />
                </div>

                <div className='pt-[80px] pr-8'>

                    <div className='w-full dark:bg-[#111C43] bg-gray-300 rounded-sm shadow'>

                        <div className="flex items-center p-5 justify-between">

                            <div>
                                <BiBorderLeft className='dark:text-[#45CBA0] text-[#000] text-[30px]' />

                                <h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                    {ordersComparePercentage?.currentMonth}
                                </h5>

                                <h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    Sales Obtained
                                </h5>
                            </div>

                            <div>
                                <CircularProgressWithLabel value={
                                    ordersComparePercentage?.percentChange > 0 ? ordersComparePercentage?.percentChange.toFixed(2) : 0
                                    } open={open} />
                                <h5 className='text-center pt-4 dark:text-[#fff] text-black'>
                                    {
                                        ordersComparePercentage?.percentChange > 0 ? (
                                            <span className='text-green-500'>
                                                +{ordersComparePercentage?.percentChange.toFixed(2)}%
                                            </span>
                                        ) : (
                                            <span className='text-red-500'>
                                                -{ordersComparePercentage?.percentChange.toFixed(2)}%
                                            </span>
                                        )
                                    }
                                </h5>
                            </div>
                        </div>

                    </div>

                    <div className="w-full dark:bg-[#111C43] bg-gray-300 rounded-sm shadow my-8">
                        <div className="flex items-center p-5 justify-between">
                            <div>
                                <PiUsersFourLight className='dark:text-[#45CBA0] text-[#000] text-[30px]' />

                                <h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                    {UserComparePercentage?.currentMonth}
                                </h5>

                                <h5 className='py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    New Users
                                </h5>

                            </div>

                            <div>
                                <CircularProgressWithLabel value={
                                    UserComparePercentage?.percentChange > 0 ? UserComparePercentage?.percentChange.toFixed(2) : 0
                                } open={open} />
                                <h5 className='text-center pt-4 dark:text-[#fff] text-black'>
                                    {
                                        UserComparePercentage?.percentChange > 0 ? (
                                            <span className='text-green-500'>
                                                +{UserComparePercentage?.percentChange.toFixed(2)}%
                                            </span>
                                        ) : (
                                            <span className='text-red-500'>
                                                -{UserComparePercentage?.percentChange.toFixed(2)}%
                                            </span>
                                        )
                                    }
                                </h5>
                            </div>
                        </div>


                    </div>



                </div>

            </div>

            <div className='grid grid-cols-[65%,35%] mt-[-20px]'>

                <div className='dark:bg-[#111C43] w-[94%] mt-[30px] shadow-sm m-auto'>
                    <OrderAnalytics isDashboard={true} />
                </div>

                <div className="p-5">
                    <h5 className='dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3'>
                        Recent Transactions
                    </h5>

                    <AllInvoices isDashboard={true} />
                </div>

            </div>

        </div>
    )
}

export default DashboardWidgets