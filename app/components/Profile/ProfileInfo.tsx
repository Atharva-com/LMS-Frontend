import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import avatarDefault from '../../assests/images/avatar.png'
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../../../app/styles/style';
import { useEditProfileMutation, useUpdateAvatarMutation } from '../../../redux/features/user/userApi';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

type Props = {
    avatar: string | null;
    user: any;
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user?.name)
    const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
    const [loadUser, setLoadUser] = useState(false)
    const [editProfile, { isSuccess: success, error: profileError, isLoading }] = useEditProfileMutation()
    const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true })

    const imageHandler = async (e: any) => {
        const file = e.target.files[0]

        const fileReader = new FileReader()

        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                updateAvatar({ avatar: fileReader.result })
            }
        }

        fileReader.readAsDataURL(file)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (name !== "") {
            await editProfile({ name })
        }
    }

    useEffect(() => {
        if (isSuccess || success) {
            setLoadUser(true)
        }

        if (error || profileError) {
            console.log(error)
        }

        if (success) {
            toast.success("Profile updated successfully.")
        }
    }, [isSuccess, Error, profileError, success])

    return (
        <>

            <div className="w-full flex justify-center">

                <div className="relative">

                    <Image
                        src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                        alt=''
                        width={120}
                        height={120}
                        className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover'
                    />

                    <input type="file" name='' id='avatar' className='hidden' onChange={imageHandler} accept='image/png, image/jpg, image/jpeg, image/webp' />

                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[30px] absolute bottom-2 right-2 flex items-center justify-center bg-slate-900 rounded-full cursor-pointer">
                            <AiOutlineCamera size={20} className='z-1' />
                        </div>
                    </label>
                </div>
            </div>

            <br />
            <br />

            <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>

                    <div className='800px:w-[50%] m-auto block pb-4'>

                        <div className='w-[100%]'>

                            <label className='block'>Full Name</label>

                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        </div>

                        <div className='w-[100%] pt-2'>

                            <label className='block'>Email Address</label>

                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 cursor-not-allowed`}
                                readOnly
                                required
                                value={user?.email}
                            />

                        </div>

                        {isLoading ?
                        <div  className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] flex items-center justify-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}>
                            <HashLoader color='#37a39a' size={30} className='mx-auto' />
                        </div>
                            
                            : <input type="submit" value="Update Profile" required className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`} />}
                    </div>
                </form>

                <br />
            </div>

        </>
    )
}

export default ProfileInfo