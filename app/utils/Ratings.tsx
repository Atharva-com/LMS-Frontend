import React, { FC } from 'react'
import { AiFillStar } from 'react-icons/ai';

type Props = {
    rating: number;
}

const Ratings:FC<Props> = ({rating}) => {
    const stars = []

    for(let i=0; i<=5; i++){

        if(i<=rating){
            stars.push(
                <AiFillStar key={i} color='#FFD700' className="mr-2 cursor-pointer" size={20} />
            )
        }else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(
                <AiFillStar key={i} color='#FFD700' className="mr-2 cursor-pointer" size={17} />
            )
        } else {
            stars.push(
                <AiFillStar key={i} color='#FFD700' className="mr-2 cursor-pointer" size={20} />
            )
        }
        

    }
  return (
    <div className='flex mt-1 ml-2 800px:mt-0 800px:ml-0'>{stars}</div>
  )
}

export default Ratings