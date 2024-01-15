import React, { FC, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../../../app/styles/style'

type Props = {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Please Enter your email!"),
    password: Yup.string().min(6).required("Please Enter your password!")

})

const Login: FC<Props> = ({ setRoute }) => {

    const [show, setShow] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log(email, password)
        }
    })

    const { errors, touched, handleSubmit, handleChange, values } = formik
    return (
        <div className='w-full'>

            <h1 className={`${styles.title}`}>
                Login with Learning
            </h1>

            {/* login form */}
            <form onSubmit={handleSubmit}>

                {/* email */}
                <label htmlFor="email" className={`${styles.label}`}>
                    Enter your email
                </label>

                <input type="email" name="email" id="email"
                    placeholder='loginemail@gmail.com'
                    className={`${styles.input} ${touched.email && errors.email && 'border-red-500'}`}
                    value={values.email}
                    onChange={handleChange}
                />

                {touched.email && errors.email && <p className={`text-red-500 pt-2 block`}>{errors.email}</p>}

                {/* password */}
                <div className='w-full mt-5 relative mb-1'>

                    <label htmlFor="password" className={`${styles.label}`}>
                        Enter your password
                    </label>

                    <input type={!show ? "password" : "text"} name="password" id="password"
                        placeholder='password!0%'
                        className={`${styles.input} ${touched.password && errors.email && 'border-red-500'}`}
                        value={values.password}
                        onChange={handleChange}
                    />

                    {!show ?
                        (
                            <AiOutlineEye className='absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShow(true)} />
                        )
                        :
                        (
                            <AiOutlineEyeInvisible className='absolute bottom-3 right-2 z-1 cursor-pointer' size={20} onClick={() => setShow(false)} />
                        )
                    }

                    {touched.password && errors.password && <p className={`text-red-500 pt-2 block`}>{errors.password}</p>}
                </div>

                {/* submit button */}
                <div className="w-full mt-5">
                    <input type="submit" value="Login" className={`${styles.button}`} />
                </div>

                <br />

                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>Or join with</h5>

                {/* Login with Google or Github */}
                <div className='flex items-center justify-center my-3'>

                    <FcGoogle size={30} className='cursor-pointer mr-2' />

                    <AiFillGithub size={30} className='cursor-pointer ml-2 text-black dark:text-white' />

                </div>

                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                    Don&apos;t have an account?{" "}
                    <span className='dark:text-[#46e256] text-[crimson] pl-1 cursor-pointer' onClick={() => setRoute("Sign-up")}>
                        Register
                    </span>
                </h5>
            </form>

        </div>
    )
}

export default Login