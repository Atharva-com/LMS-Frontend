import { styles } from '@/app/styles/style';
import React, { FC, useRef, useState } from 'react'
import { Toast } from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'

type Props = {
    setRoute: (route: string) => void;
}
type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = ({ setRoute }) => {
    const [invalidError, setInvalidError] = useState(false)
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    })

    const VerificationHandler = async () => {
        console.log('test')
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)
        setVerifyNumber({
            ...verifyNumber,
            [index]: value
        })
        if (value === "" && index > 0) {
            inputRefs[index - 1].current?.focus()
        } else if (value.length === 1 && index < 3) {
            inputRefs[index + 1].current?.focus()
        }
    }
    return (
        <div>
            <h1 className={`${styles.title}`}>
                Verify Your Account
            </h1>
            <br />
            <div className="w-full flex items-center justify-center mt-2">

                <div className='w-[80px] h-[80px] rounded-full bg-[#497Df2] flex items-center justify-center'>

                    <VscWorkspaceTrusted size={40} />

                </div>

            </div>

            <br />

            <div className='m-auto flex items-center justify-around'>

                {
                    Object.keys(verifyNumber).map((key, index) => {
                        return (
                            <input
                                key={key}
                                ref={inputRefs[index]}
                                type="number"
                                maxLength={1}
                                placeholder=''
                                className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError ? 'shake border-red-500' : 'dark:border-white border-[#0000004a]'}`}
                                value={verifyNumber[key as keyof VerifyNumber]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        )

                    })
                }

            </div>

            <br />

            <div className='w-full flex justify-center'>
                <button onClick={VerificationHandler} className={`${styles.button}`}>
                    Verify OTP
                </button>
            </div>

            <br />

            <h5 className='text-center pt-2 font-Poppins text-[14px] text-black dark:text-white'>
                Go back to sign in?
                <span onClick={() => setRoute("Login")} className='text-[#2190ff] pl-1 cursor-pointer'>
                    Sign in
                </span>
            </h5>

        </div>
    )
}

export default Verification