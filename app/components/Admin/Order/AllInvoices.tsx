import React, { FC, useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Box } from '@mui/material'
import { useTheme } from 'next-themes'
import { useGetAllOrderQuery } from '@/redux/features/orders/orderApi'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { AiOutlineMail } from 'react-icons/ai'
import { HashLoader } from 'react-spinners'

type Props = {
    isDashboard?: boolean
}

const AllInvoices: FC<Props> = ({ isDashboard }) => {
    const { theme, setTheme } = useTheme()
    const { data, isLoading } = useGetAllOrderQuery({})
    const { data: userData } = useGetAllUsersQuery({})
    const { data: coursesData } = useGetAllCoursesQuery({})

    const [orderData, setOrderData] = useState([])
console.log(data)
    useEffect(() => {

        if (data) {
            if (data?.success === true) {
                const temp = data.orders.map((item: any) => {
                    const user = userData?.users.find(
                        (user: any) => user._id === item.userId
                    )
                    const course = coursesData?.courses.find(
                        (course: any) => course._id === item.courseId
                    )
                    return {
                        ...item,
                        userName: user?.name,
                        userEmail: user?.email,
                        title: course?.name,
                        price: course?.price,
                    }
                })

                setOrderData(temp)
            }
        }

    }, [data, userData, coursesData])

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : .5 },
        ...(isDashboard ? [] : [
            { field: "userEmail", headerName: "Email", flex: 1 },
            { field: "title", headerName: "Course Title", flex: 1 },
        ]),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard ? [
            { field: "createdAt", headerName: "Date", flex: 0.5 },
        ]
            : [
                {
                    field: " ", headerName: "Email", flex: 0.2, renderCell: (params: any) => {
                        return (
                            <a href={`mailto: ${params.row.userEmail}`}>
                                <AiOutlineMail className='dark:text-white text-black' size={20} />
                            </a>
                        )
                    }
                },
            ]),
    ]

    const rows: any = [

    ]

    orderData && orderData.forEach((item: any) => {
        rows.push({
            id: item._id,
            userName: item.userName,
            userEmail: item.userEmail,
            title: item.title,
            price: item.price,
            createdAt: item.createdAt,
        })
    })

    return (
        <div className={!isDashboard ? 'mt-[40px]' : 'mt-[0px]'}>

            {
                isLoading ?
                    <div className={`w-full h-screen flex items-center justify-center `}>
                        <HashLoader color='#37a39a' size={40} className='mx-auto' />
                    </div>
                    :
                    <Box m={isDashboard ? "0" : "40px 30px 0 30px"}>
                        <Box
                            m={isDashboard ? "0" : "40px 0 0 0"}
                            height={isDashboard ? "35vh" : "90vh"}
                            overflow={"hidden"}
                            sx=
                            {{
                                '& .MuiDataGrid-root': {
                                    border: 'none ',
                                    outline: 'none ',
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? '#fff' : '#000',
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? '#fff' : '#000',
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? '#fff' : '#000',
                                    borderBottom:
                                        theme === "dark" ? '1px solid #ffffff30 !important' : '1px solid #ccc !important',
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? '#fff' : '#000',
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? '#fff' : '#000',
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? '#3e4396' : '#A4A9FC',
                                    borderBottom: "none",
                                    color: theme === "dark" ? '#fff' : '#000',
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? '#1F2A40' : '#F2F0F0',
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: theme === "dark" ? '#3e4396' : '#A4A9FC',
                                    borderBottom: "none",
                                    color: theme === "dark" ? '#fff' : '#000',
                                },
                                "& .MuiCheckbox-root": {
                                    color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: "#fff !important",
                                },
                            }}
                        >
                            <DataGrid
                                checkboxSelection={isDashboard ? false : true}
                                components={isDashboard ? {} : { Toolbar: GridToolbar }}
                                rows={rows}
                                columns={columns}
                            />
                        </Box>
                    </Box>
            }

        </div>
    )
}

export default AllInvoices