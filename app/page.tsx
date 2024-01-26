"use client"

import React, { FC, useState } from "react"
import Heading from "./utils/Heading"
import Header from "./components/Header"
import Hero from "./components/Route/Hero"
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import Faq from "./components/FAQ/Faq"
import Footer from "./components/Footer"

interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("Login")
  return (
    <>
      <Heading
        title="Learning Platform"
        description="It is a platform for students to learn."
        keywords="Programming, MERN, Development, Redux, Flutter."
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />

      <Hero />

      <Courses />

      <Reviews />

      <Faq />

      <Footer />
    </>
  )
}

export default Page