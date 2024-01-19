import { styles } from '@/app/styles/style';
import React, { FC } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from 'react-hot-toast';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequistes: { title: string }[];
    setPrerequistes: (prerequistes: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequistes, setPrerequistes, active, setActive }) => {
    return (
        <div className='w-[95%] sm:w-[90%] 800px:w-[80%] m-auto mt-24 block'>

            {/* benefits */}
            <div>
                <label className={`${styles.label} text-[20px]`}>
                    What are the benefits for students in this course?
                </label>

                <br />

                {
                    benefits.map((benefit: any, index: number) => {
                        return (
                            <input
                                key={index}
                                type='text'
                                name='benefit'
                                className={`${styles.input} my-2`}
                                placeholder='You will be able to build fullStack applications...'
                                value={benefit.title}
                                required
                                onChange={(e) => {
                                    const newBenefits = [...benefits]
                                    newBenefits[index].title = e.target.value
                                    setBenefits(newBenefits)
                                }}
                            />
                        )
                    })
                }

                <AddCircleIcon
                    className='cursor-pointer w-[30px] my-[10px]'
                    onClick={() => {
                        setBenefits([...benefits, { title: "" }])
                    }}
                />
            </div>

            {/* prerequisites */}
            <div>
                <label className={`${styles.label} text-[20px]`}>
                    What are the prerequisites for starting this course?
                </label>

                <br />

                {
                    prerequistes.map((prerequiste: any, index: number) => {
                        return (
                            <input
                                key={index}
                                type='text'
                                name='prerequiste'
                                className={`${styles.input} my-2`}
                                placeholder='You need basic knowledge of MERN...'
                                value={prerequiste.title}
                                required
                                onChange={(e) => {
                                    const newPrerequistes = [...prerequistes]
                                    newPrerequistes[index].title = e.target.value
                                    setPrerequistes(newPrerequistes)
                                }}
                            />
                        )
                    })
                }

                <AddCircleIcon
                    className='cursor-pointer w-[30px] my-[10px]'
                    onClick={() => {
                        setPrerequistes([...prerequistes, { title: "" }])
                    }}
                />
            </div>

            <div className='flex justify-between mt-8 gap-4'>
                <button
                    className={`${styles.button} !w-fit`}
                    onClick={() => {
                        setActive(active - 1)
                    }}
                >
                    Prev
                </button>

                <button
                    className={`${styles.button} !w-fit`}
                    onClick={() => {
                        if (benefits[benefits.length - 1].title !== "" && prerequistes[prerequistes.length - 1].title !== "") {
                            setActive(active + 1)
                        } else {
                            toast.error('Please fill all the fields.')
                        }
                    }}
                >
                    Next
                </button>
            </div>

        </div>
    )
}

export default CourseData