"use client"

import React, { FC, useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, Modal } from '@mui/material'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { FiEdit2 } from 'react-icons/fi'
import { format } from 'timeago.js'
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi'
import { HashLoader } from 'react-spinners'
import { styles } from '@/app/styles/style'
import toast from 'react-hot-toast'

type Props = {
    isTeam: boolean
}

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { theme, setTheme } = useTheme()
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('admin')
    const [open, setOpen] = useState(false)
    const [isUserId, setIsUserId] = useState("")
    const [ deleteUser, {isLoading: deleteUserLoading, data: deleteUserData, error: deleteError }] = useDeleteUserMutation({})
    const {isLoading, data, refetch } = useGetAllUsersQuery({}, {refetchOnMountOrArgChange: true})
    const [updateUserRole, { isLoading: updateLoading, data: updateData, error: updateError }] = useUpdateUserRoleMutation()

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: .5 },
        { field: "email", headerName: "Email", flex: .7 },
        { field: "role", headerName: "Role", flex: .3 },
        { field: "courses", headerName: "Purchased Courses", flex: .3 },
        { field: "created_at", headerName: "Joined At", flex: .4 },
        {
            field: "",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => {
                            setOpen(!open)
                            setIsUserId(params.row.id)
                        }}>
                            <AiOutlineDelete className='dark:text-white text-black' size={20} />
                        </Button>
                    </>
                )
            }
        },
        {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <a href={`mailto: ${params.row.email}`}>
                            <AiOutlineMail className='dark:text-white text-black' size={20} />
                        </a>
                    </>
                )
            }
        }
    ]

    const rows: any = []

    if (isTeam) {
        const newData = data && data.users.filter((item: any) => item.role === 'admin')
        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        }); 
    } else {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        });
    }

    const handleSubmit = async () => {
        await updateUserRole({ email, role })
    }

    const handleDelete = async () => {
        const id = isUserId
        await deleteUser(id)
    }

    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any
                toast.error(errorMessage.data.message)
            }
        }

        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any
                toast.error(errorMessage.data.message)
            }
        }

        if (updateData?.success === true) {
            refetch()
            toast.success(updateData.message)
            setActive(false)
        } else if (updateData?.success === false) {
            toast.error(updateData.message)
            setActive(false)
        }

        if( deleteUserData?.success === true) {
            refetch() 
            toast.success(deleteUserData.message)
            setOpen(false)
        } else if (deleteUserData?.success === false) {
            toast.error(deleteUserData.message)
            setOpen(false)
        }
    }, [updateError, updateData, deleteUserData, deleteError])


    return (
        <div className='mt-[100px]'>

            {isLoading || updateLoading || deleteUserLoading ?
                <div className={`flex items-center justify-center w-full h-[50vh]`}>
                    <HashLoader color='#37a39a' size={60} className='mx-auto' />
                </div>

                :

                <Box m="20px">

                    {isTeam && <div className="w-full flex justify-end">
                        <div className={`${styles.button} !w-[200px] !rounded-[10px] h-[35px] dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]`} onClick={() => setActive(!active)}>
                            Add New Member
                        </div>
                    </div>}

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
                            active && (
                                <Modal
                                    open={active}
                                    onClose={() => setActive(!active)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white  dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                        <h1 className={`${styles.title}`}>
                                            Add New Member
                                        </h1>

                                        <div className="mt-4">

                                            <input type="email" name="name" id="name"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='JohnDoe123@gmail.com'
                                                className={`${styles.input}`}
                                            />

                                            <select name="" id="" value={role} className={`${styles.input} !mt-6`} onChange={() => setRole(role)} >
                                                <option value="admin" className='dark:text-black dark:bg-white bg-slate-800 text-white'>Admin</option>
                                                <option value="user" className='dark:text-black dark:bg-white bg-slate-800 text-white'>User</option>
                                            </select>

                                            <br />

                                            <div className={`${styles.button} my-6 !h-[30px]`} onClick={handleSubmit}>
                                                Submit
                                            </div>

                                        </div>
                                    </Box>
                                </Modal>
                            )
                        }


                        {
                            open && (
                                
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(!open)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white  dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                        <h1 className={`${styles.title}`}>
                                            Are you sure you want to delete this user?
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

export default AllUsers