import { styles } from '@/app/styles/style';
import { useActivationMutation } from '../../../redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { VscWorkspaceTrusted } from 'react-icons/vsc'
import { useSelector } from 'react-redux';
import { HashLoader, SyncLoader } from 'react-spinners';

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
    const { token } = useSelector((state: any) => state.auth)
    const [activation, { isSuccess, error, isLoading, data }] = useActivationMutation()
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]
    console.log(data, isSuccess, error, isLoading)
    useEffect(() => {
        if (data?.success === true) {
            setRoute("Login")
            toast.success(data?.message)
        } else if (data?.success === false) {
            toast.error(data.message)
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any
                toast.error(errorData.data.message)
                setInvalidError(true)
            } else {
                console.log(error)
                toast.error("Something went wrong")
            }
        }
    }, [isSuccess, error])


    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
    })

    const VerificationHandler = async () => {
        const VerificationNumber = Object.values(verifyNumber).join("")
        if (VerificationNumber.length !== 4) {
            setInvalidError(true)
            return
        }
        await activation({ activation_Token: token, activation_Code: VerificationNumber })
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
                {isLoading ? <div className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] flex items-center justify-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}>
                    <HashLoader color='#37a39a' size={30} className='mx-auto' />
                </div>
                    :
                    <button onClick={VerificationHandler} className={`${styles.button}`}>
                        Verify OTP
                    </button>}
            </div>

            <br />

            <h5 className='text-center pt-2 font-Poppins text-[14px] text-black dark:text-white'>
                Go back to sign in?
                <span onClick={() => { setRoute("Login") }} className='text-[#2190ff] pl-1 cursor-pointer'>
                    Sign in
                </span>
            </h5>

        </div>
    )
}

export default Verification