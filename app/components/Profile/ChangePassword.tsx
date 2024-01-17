import { styles } from '@/app/styles/style'
import { useUpdatePasswordMutation } from '../../../redux/features/user/userApi'
import React, { FC, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import toast from 'react-hot-toast'

type Props = {}

const ChangePassword: FC<Props> = (props) => {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [updatePassword, {isSuccess, error, isLoading}] = useUpdatePasswordMutation()

    const passwordChangeHandler =async (e: any) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            toast.error("Password does not match")
        } else {
           await updatePassword({ oldPassword, newPassword })
        }
    }

    useEffect(() => {
      if(isSuccess) {
        toast.success("Password updated successfully")
      }

      if (error) {
        if ("data" in error) {
          const errorData = error as any
          toast.error(errorData.data.message)
        }
      }
    }, [isSuccess, error]);
    
    return (
        <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>

            <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] dark:text-[#fff] text-black pb-2'>
                Change Password
            </h1>

            <div className='w-full'>

                <form
                    onSubmit={passwordChangeHandler}
                    className='flex flex-col items-center'
                >
                    <div className='w-[100%] 800px:w-[60%] mt-5'>

                        <label className='block pb-2 dark:text-[#fff] text-black '>Enter Your old Password</label>

                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-[#fff] text-black`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className='w-[100%] 800px:w-[60%] mt-2'>

                        <label className='block pb-2 dark:text-[#fff] text-black'>Enter Your new Password</label>

                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-[#fff] text-black`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className='w-[100%] 800px:w-[60%] mt-2'>

                        <label className='block pb-2 dark:text-[#fff] text-black'>Confirm Password</label>

                        <input
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-[#fff] text-black`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {isLoading ?
                        <div className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] flex items-center justify-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}>
                            <HashLoader color='#37a39a' size={30} className='mx-auto' />
                        </div>

                        :
                        <input type="submit" value="Update Password" required className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`} />
                    }
                </form>
            </div>

        </div>
    )
}

export default ChangePassword