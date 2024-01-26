import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { BiSearch } from 'react-icons/bi'
import heroImg from '../../assests/images/hero.png'
import circleImg1 from '../../assests/images/circleImg1.svg'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'

type Props = {}

const Hero:FC<Props> = (props) => {
    const {data, refetch} = useGetHeroDataQuery("Banner", {refetchOnMountOrArgChange: true})
    console.log(data)
    return (

        <>
            <div className="w-full 1000px:flex items-center 1100px:px-12 800px:p-8 px-4">

                {/* hero Content */}
                <div className="1000px:w-[50%] 1100px:w-[60%] flex flex-col 1100px:items-start items-center 1000px:mt-[0px] text-center 1000px:text-left 1100px:mt-[-75px] mt-[30px]">


                    {/* heading */}
                    <h1 className="dark:text-white text-[#000000c7] text-[30px] w-full 1100px:text-[70px] font-[600] font-Josefin py-2 1100px:leading-[75px] 1500px:w-[78%]">
                        {data?.layout?.banner?.title}
                    </h1>

                    <br />

                    {/* tagline */}
                    <p className="dark:text-white text-[#000000c7] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78%]">
                    {data?.layout?.banner?.subTitle}
                    </p>

                    <br />

                    {/* SearchBar */}
                    <div className='1500px:w-[55%] 1100px:w-[78%] w-full h-[50px] bg-transparent relative'>

                        <input type="search" name="" id=""
                            placeholder='Search for Courses...'
                            className='bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-3 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[21px] font-[500] font-Josefin'
                        />

                        <div className='absolute flex items-center justify-center w-[40px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]'>
                            <BiSearch className="text-white" size={30} />
                        </div>
                    </div>

                    <br />

                    {/* display line */}
                    <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center'>

                        <Image src={circleImg1} alt="" className='rounded-full h-10 w-10 800px:flex hidden' />

                        <Image src={circleImg1} alt="" className='rounded-full ml-[-20px] h-10 w-10 800px:flex hidden' />

                        <Image src={circleImg1} alt="" className='rounded-full ml-[-20px] h-10 w-10 800px:flex hidden' />

                        <p className='font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]'>
                            5k+ People already connected us.{" "}

                            <Link rel='stylesheet' href="/courses" className='dark:text-[#46e256] text-[crimson]'>
                                View Courses
                            </Link>
                        </p>

                    </div>

                </div>

                {/* Hero Image */}
                <div className="1000px:w-[50%] 1100px:w-[50%] 1000px:px-12 1100px:p-0 flex 1100px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
                    <Image
                        src={data?.layout?.banner?.image?.url}
                        width="616"
                        height="617"
                        className={"object-contain 1100px:max-w-[90%] w-full 1500px:max-w-[85%] h-[auto] z-[10] 1100px:mix-blend-darken rounded-full bg-[#0d0e29] p-12"}
                        alt="Hero Illustration"
                        loading="eager"
                        priority
                    />
                </div>

            </div >
        </>

    )
}

export default Hero