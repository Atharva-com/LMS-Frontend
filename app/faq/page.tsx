"use client"

import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from '../components/About/About'
import Footer from '../components/Footer'
import Faq from '../components/FAQ/Faq'

type Props = {}

const Page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setactiveItem] = useState(3)
    const [route, setRoute] = useState("Login")

  return (
    <div>
        <Heading 
        title='FAQ - Learning'
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

        <Faq />

        <Footer />

    </div>
  )
}

export default Page