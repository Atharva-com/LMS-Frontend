import Image from 'next/image'
import React, { FC } from 'react'
import study from '../../assests/images/study.png'
import { styles } from '@/app/styles/style'
import ReviewCard from '../Review/ReviewCard'
import avatar from '../../assests/images/avatar1.jpg'
type Props = {}

const reviews = [
    {
        avatar: avatar,
        name: 'John Doe',
        profession: 'Software Engineer',
        rating: 4.5,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.'
    },
    {
        avatar: avatar,
        name: 'Jane Smith',
        profession: 'Graphic Designer',
        rating: 5.0,
        review: 'Nullam fermentum enim sit amet euismod finibus. Aliquam eget neque nec est malesuada finibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.'
    },
    {
        avatar: avatar,
        name: 'Michael Johnson',
        profession: 'Data Scientist',
        rating: 4.2,
        review: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.'
    },
    {
        avatar: avatar,
        name: 'Emily Brown',
        profession: 'Marketing Manager',
        rating: 4.8,
        review: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.'
    },
    {
        avatar: avatar,
        name: 'Michael Johnson',
        profession: 'Data Scientist',
        rating: 4.2,
        review: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.'
    },
    {
        avatar: avatar,
        name: 'Emily Brown',
        profession: 'Marketing Manager',
        rating: 4.8,
        review: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et aliquet libero.'
    }
];

const Reviews:FC<Props> = (props: Props) => {
  return (
    <div className='w-[90%] 800px:w-[85%] m-auto'>

        <div className="w-full 800px:flex items-center">

            <div className='800px:w-[50%] w-full'>

                <Image 
                 src={study}
                 alt=''
                 width={800}
                    height={800}
                 />

            </div>

            <div className='800px:w-[50%] w-full'>

                <h3 className={`${styles.title} 800px:!text-[35px]`}>
                    Our Students Are <span className='bg-gradient-to-r from-slate-500 to-sky-800 bg-clip-text text-transparent'>
                        Our Strength
                    </span>{" "}
                    <br /> See What They Say About Us
                </h3>

                <br />

                <p className={styles.label}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo et eum, exercitationem praesentium eaque perferendis eius? Dolorum molestias similique inventore accusantium deserunt! Ipsum recusandae facere sed, reprehenderit provident at possimus itaque corrupti doloremque quasi vel consequuntur totam nobis aliquam sapiente officiis similique veritatis fugiat reiciendis quae? Animi quis libero eum.
                </p>

            </div>

            <br />
            <br />
        </div>

        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 mb-12 border-0'>
                {
                    reviews && reviews.map((item, index) => (
                        <ReviewCard key={index} item={item} />
                    ))
                }
            </div>

    </div>
  )
}

export default Reviews