import React, { FC, useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography } from '@mui/material'
import "react-pro-sidebar/dist/css/styles.css"
import {
  HomeOutlineIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  SettingsIcon,
  ExitToAppIcon,
  ManageHistoryIcon,
  QuizIcon,
  WebIcon,
  WysiwygIcon,
} from './Icon'
import avatarDefault from "../../../assests/images/avatar.png"
import { useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      icon={icon}
      active={selected === title}
      onClick={() => setSelected(title)}
    >
      <Typography className='!text-[16px] !font-Poppins'> {title} </Typography>
      <Link href={to} />
    </MenuItem>
  )
}

type Props = {}

const AdminSidebar: FC<Props> = (props: Props) => {

  const { user } = useSelector((state: any) => state.auth)
  const [logout, setLogout] = useState(false)
  const [selected, setSelected] = useState('Dashboard')
  const { theme, setTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme === 'dark' ? "#111C43 !important" : "#fff !important"
            }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "3px 35px 3px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== 'dark' && "#000"
            }`,
        },
      }}
      className='!bg-white dark:bg-[#111C43]'
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: 'fixed',
          height: '100vh',
          top: 0,
          left: 0,
          width: isCollapsed ? '0%' : '16%',
        }}
      >
        <Menu iconShape='square'>
          {/* logo and Menu Icon */} 
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <ArrowForwardIosIcon />
              ) : undefined
            }
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href='/'>
                  <h3 className='text-[25px] font-Poppins uppercase dark:text-white text-black'>
                    Learning
                  </h3>
                </Link>
                <IconButton className='inline-block' onClick={() => setIsCollapsed(!isCollapsed)}>
                  <ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >

                <Image
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  alt="avatar"
                  width={100}
                  height={100}
                  style={{
                    width: "5rem",
                    height: "5rem",
                    cursor: "pointer",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #5b6fe6"
                  }}
                />

              </Box>

              <Box textAlign="center">
                <Typography className='!text-[20px] text-black dark:text-[#ffffffc1]' variant='h4' sx={{ m: "10px 0 0 0" }}>
                  {user?.name}
                </Typography>

                <Typography className='!text-[20px] text-black dark:text-[#ffffffc1]' variant='h6' sx={{ m: "10px 0 0 0" }}>
                  ~ {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/admin/dashboard'
              icon={<HomeOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-Poppins !font-[400]'
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Data"}
            </Typography>

            <Item
              title='Users'
              to='/admin/users'
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Invoices'
              to='/admin/invoices'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-Poppins !font-[400]'
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Content"}
            </Typography>

            <Item
              title='Create Course'
              to='/admin/create-course'
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Live Course'
              to='/admin/live-course'
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-Poppins !font-[400]'
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Customization"}
            </Typography>

            <Item
              title='Hero'
              to='/admin/hero'
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='FAQ'
              to='/admin/faq'
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Categories'
              to='/admin/categories'
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-Poppins !font-[400]'
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>

            <Item
              title='Manage Team'
              to='/admin/manage-team'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-Poppins !font-[400]'
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Analytics"}
            </Typography>

            <Item
              title='Courses Analytics'
              to='/admin/courses-analytics'
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Orders Analytics'
              to='/admin/orders-analytics'
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title='Users Analytics'
              to='/admin/users-analytics'
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-Poppins !font-[400]'
              sx={{ m: "15px 0 5px 25px" }}
            >
              {!isCollapsed && "Extras"}
            </Typography>

            <Item
              title='Settings'
              to='/admin/settings'
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box >
  )
}

export default AdminSidebar