"use client"

import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from '../components/About/About'
import Footer from '../components/Footer'

type Props = {}

const Page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setactiveItem] = useState(2)
    const [route, setRoute] = useState("Login")

  return (
    <div>
        <Heading 
        title='About us - Learning'
        description='Learning is a platform for studying online sustainably .'
        keywords='learning, online, study, education, sustainable'
         />

        <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
        />

        <About />

        <Footer />

    </div>
  )
}

export default Page