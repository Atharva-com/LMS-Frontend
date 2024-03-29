import React, { FC } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { HashLoader } from 'react-spinners'
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import { styles } from '@/app/styles/style'

type Props = {
    isDashboard: boolean
}

const UsersAnalytics: FC<Props> = ({isDashboard}) => {
    ChartJS.register(...registerables);
    const { data, isLoading } = useGetUsersAnalyticsQuery({})
    const analyticsData: any = []

    data && data.user.last12Months.forEach((item: any) => {
        analyticsData.push(item.count)

    })

    const analyticsLabels: any = []

    data && data.user.last12Months.forEach((item: any) => {
        analyticsLabels.push(item.month)

    })


    const lineData = {
        labels: analyticsLabels, // Use solve indices as x-axis labels
        datasets: [
            {
                label: 'Courses analytics',
                data: analyticsData,
                tension: 0.1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 0, 0, 0.2)',       // Red
                    'rgba(0, 255, 0, 0.2)',       // Green
                    'rgba(0, 0, 255, 0.2)',       // Blue
                    'rgba(255, 255, 0, 0.2)',     // Yellow
                    'rgba(255, 0, 255, 0.2)',     // Magenta
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 0, 0)',             // Red
                    'rgb(0, 255, 0)',             // Green
                    'rgb(0, 0, 255)',             // Blue
                    'rgb(255, 255, 0)',           // Yellow
                    'rgb(255, 0, 255)',           // Magenta
                ],
                hoverBackgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 0, 0)',             // Red
                    'rgb(0, 255, 0)',             // Green
                    'rgb(0, 0, 255)',             // Blue
                    'rgb(255, 255, 0)',           // Yellow
                    'rgb(255, 0, 255)',
                ],
                hoverBorderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 0, 0, 0.2)',       // Red
                    'rgba(0, 255, 0, 0.2)',       // Green
                    'rgba(0, 0, 255, 0.2)',       // Blue
                    'rgba(255, 255, 0, 0.2)',     // Yellow
                    'rgba(255, 0, 255, 0.2)',
                ],
                borderWidth: 1,
                pointRadius: 5,
            },
        ],
    };

    const lineOptions = {
        scales: {
            x: {
                ticks: {
                    color: '#fff', 
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: '#111827', 
                },
                border: {
                    color: '#fff'
                  }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#fff', 
                    font: {
                        size: 12,
                    },
                    stepSize: 1,
                },
                grid: {
                    color: '#111827',
                },
                border: {
                    color: '#fff'
                  }
            },
        },
        

    };
    return (
        <>
            {
                isLoading ?
                    <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
                    :
                    (
                        <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] bg-slate-600 shadow-sm pb-5 rounded-sm"}`}>

                            <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
                                <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
                                    Users Analytics
                                </h1>

                                <p className={`${styles.label} px-5`}>
                                    Last 12 months analytics Data
                                </p>
                            </div>

                            <div className='w-full flex items-center justify-center'>

                                <div className={`w-full h-full m-auto  ${isDashboard ? '800px:h-[400px] 800px:w-[750px]' : '800px:w-[900px] 800px:h-[600px]'}`}>
                                    <Line data={lineData} options={lineOptions} />
                                </div>

                            </div>

                        </div>
                    )
            }
        </>
    )
}

export default UsersAnalytics