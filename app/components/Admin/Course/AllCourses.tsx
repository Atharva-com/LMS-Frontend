"use client"

import React, { FC, useEffect, useState } from 'react'
import {DataGrid} from "@mui/x-data-grid"
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { FiEdit2 } from 'react-icons/fi'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import {format} from 'timeago.js'
import { HashLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import { styles } from '@/app/styles/style'

type Props = {}

const AllCourses:FC<Props> = (props: Props) => {
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(false)
    const [isCourseId, setIsCourseId] = useState("")
    const [deleteCourse, {isLoading:courseLoading, error, data: courseData}] = useDeleteCourseMutation({})
    const  {isLoading, data} = useGetAllCoursesQuery({})

    const columns = [
        {field: "id", headerName: "ID", flex: 0.5},
        {field: "title", headerName: "Course Title", flex: 1},
        {field: "ratings", headerName: "Ratings", flex: .3},
        {field: "purchased", headerName: "Purchased", flex: .3},
        {field: "created_at", headerName: "Created At", flex: .5},
        {
            field: "",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                    <Button>
                        <FiEdit2 className='dark:text-white text-black' size={20 } />
                    </Button>
                    </>
                )
            }
        },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                    <Button onClick={() => {
                            setOpen(!open)
                            setIsCourseId(params.row.id)
                        }}>
                        <AiOutlineDelete className='dark:text-white text-black' size={20 } />
                    </Button>
                    </>
                )
            }
        }
    ]

    const rows: any = [
        
    ]

    {
        data && data.courses.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: format(item.createdAt)
            })
        });
    }
    const handleDelete = async () => {
        const id = isCourseId
        await deleteCourse(id)
    }

    useEffect(() => {
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.message)
            }
        }

        if (courseData?.success === true) {
            toast.success(courseData.message)
            setActive(false)
        } else if (courseData?.success === false) {
            toast.error(courseData.message)
            setActive(false)
        }
    }, [courseData, error])

  return (
    <div className='mt-[100px]'>

        {
            isLoading ? 
            <div className={`flex items-center justify-center w-full h-[50vh]`}>
                    <HashLoader color='#37a39a' size={60} className='mx-auto' />
                </div>
            :
            <Box m="20px">

            <Box
            m="40px 0 0 0"
            height="80vh"
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
                }
            }}
            >
                
                <DataGrid checkboxSelection rows={rows} columns={columns} />
            

                {
                            open && (
                                <Modal
                                    open={active}
                                    onClose={() => setActive(!active)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white  dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                        <h1 className={`${styles.title}`}>
                                            Are you sure you want to delete this course?
                                        </h1>

                                        <div className="flex w-full items-center justify-between mb-6 mt-4">

                                            <div className={`${styles.button} bg-[#57c7a3] !w-[120px] h-[30px]`} onClick={() => setOpen(false)}>
                                                Cancel
                                            </div>

                                            <div className={`${styles.button} bg-[#d63f3f] !w-[120px] h-[30px]`} onClick={handleDelete}>
                                                Delete
                                            </div>

                                        </div>
                                    </Box>
                                </Modal>
                            )
                        }
            </Box>

        </Box>
        }

    </div>
  )
}

export default AllCourses