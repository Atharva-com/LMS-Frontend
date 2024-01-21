import { styles } from '@/app/styles/style'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'

type Props = {}

const EditHero: FC<Props> = (props: Props) => {
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")

    const { data } = useGetHeroDataQuery("Banner", { refetchOnMountOrArgChange: true })
    console.log(data)
    useEffect(() => {
        if (data) {
            setImage(data?.layout?.banner?.image?.url)
            setTitle(data?.layout?.banner.title)
            setSubTitle(data?.layout?.banner.subTitle)
        }
    }, [data])

    const handleUpdate = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            setImage(reader.result as string)
        }

        reader.readAsDataURL(file)
    }

    const handleEdit = () => {
        const newData = {
            ...data,
            layout: {
                ...data?.layout,
                banner: {
                    ...data?.layout?.banner,
                    title,
                    subTitle,
                    image: {
                        ...data?.layout?.banner?.image,
                        url: image
                    }
                }
            }
        }

        console.log(newData)
    }

    return (
        <>

            <div className='w-full 1000px:flex items-center'>

                <div className='1000px:!w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10'>

                    <div className="relative flex items-center justify-end">
                        <img src={image} alt=""
                            className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]'
                        />

                        <input
                            type="file"
                            name=''
                            id='banner'
                            accept='image/*'
                            onChange={handleUpdate}
                            className='hidden'
                        />
                        <label htmlFor="banner" className='absolute bottom-0 right-0 z-20'>
                            <AiOutlineCamera
                                className='dark:text-white text-black text-[18px] cursor-pointer'
                            />
                        </label>
                    </div>
                </div>

                <div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]'>
                    <textarea
                        className='dark:text-white text-[#000000c7] resize-none text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-Poppins'
                        placeholder=''
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        rows={4}
                    ></textarea>

                    <br />

                    <textarea
                        className='dark:text-[#edfff4] text-[#000000c7] font-Josefin text-[18px] px-3 1500px:!w-[55%] 1100px:!w-[74%] font-[600]'
                        placeholder=''
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    ></textarea>

                    <br /><br />

                    <div
                        className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-[#000000c7] bg-[#cccccc34] ${data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image?.url !== image ? "!cursor-pointer !bg-[#42d383]" : "!cursor-not-allowed"
                            } !rounded absolute bottom-12 right-12`}

                        onClick={
                            data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image ? handleEdit : () => null
                        }
                    >
                        Save
                    </div>
                </div>

            </div>

        </>
    )
}

export default EditHero