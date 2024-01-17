import React, { FC, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../../../app/styles/style'
import { useRegisterMutation } from '../../../redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { HashLoader, SyncLoader } from 'react-spinners'

type Props = {
  setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email!").required("Please Enter your email!"),
  password: Yup.string().min(6).required("Please Enter your password!")

})

const SignUp: FC<Props> = ({ setRoute }) => {

  const [show, setShow] = useState(false)
  const [register, { data, error, isLoading }] = useRegisterMutation()
  useEffect(() => {
    if (data?.success === true) {
      const message = data?.message || "Registration successful"
      toast.success(message)
      setRoute("Verification")
    } else if (data?.success === false) {
      toast.error(data?.message || "Registration failed")
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [data, error])


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    }
  })

  const { errors, touched, handleSubmit, handleChange, values } = formik
  return (
    <div className='w-full'>

      <h1 className={`${styles.title}`}>
        Join to Learning
      </h1>

      {/* login form */}
      <form onSubmit={handleSubmit}>

        <div className='mb-3'>
          {/* email */}
          <label htmlFor="name" className={`${styles.label}`}>
            Enter your Name
          </label>

          <input type="text" name="name" id="name"
            placeholder='John Doe'
            className={`${styles.input} ${touched.name && errors.name && 'border-red-500'}`}
            value={values.name}
            onChange={handleChange}
          />

          {touched.name && errors.name && <p className={`text-red-500 pt-0 block`}>{errors.name}</p>}
        </div>

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

        {touched.email && errors.email && <p className={`text-red-500 pt-0 block`}>{errors.email}</p>}

        {/* password */}
        <div className='w-full mt-3 relative mb-1'>

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

        </div>

        {touched.password && errors.password && <p className={`text-red-500 pt-0 block`}>{errors.password}</p>}

        {/* submit button */}
        <div className="w-full mt-3">
          {isLoading ? <div className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] flex items-center justify-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}>
            <HashLoader color='#37a39a' size={30} className='mx-auto' />
          </div>
            : <input type="submit" value="Sign Up" className={`${styles.button}`} />}
        </div>

        <br />

        <h5 className='text-center pt-2 font-Poppins text-[14px] text-black dark:text-white'>Or join with</h5>

        {/* Login with Google or Github */}
        <div className='flex items-center justify-center my-2'>

          <FcGoogle size={30} className='cursor-pointer mr-2' />

          <AiFillGithub size={30} className='cursor-pointer ml-2 text-black dark:text-white' />

        </div>

        <h5 className='text-center pt-2 font-Poppins text-[14px] text-black dark:text-white'>
          Already have an account?{" "}
          <span className='dark:text-[#46e256] text-[crimson] pl-1 cursor-pointer' onClick={() => setRoute("Login")}>
            Sign in
          </span>
        </h5>
      </form>

    </div>
  )
}

export default SignUp