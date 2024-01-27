import Heading from '@/app/utils/Heading';
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useState } from 'react'
import { HashLoader } from 'react-spinners';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';
import CourseContentList from './CourseContentList';

type Props = {
  id: string;
  user: any;
}

const CourseContent: FC<Props> = ({ id, user }) => {

  const { data: contentData, isLoading } = useGetCourseContentQuery(id)
  const [open, setOpen] = useState(false)
  const [route, setRoute] = useState("Login")
  const data = contentData?.content

  const [activeVideo, setActiveVideo] = useState(0)
  console.log(data)
  return (
    <>
      {
        isLoading ? (
          <div className={`w-full h-screen flex items-center justify-center `}>
            <HashLoader color='#37a39a' size={40} className='mx-auto' />
          </div>
        ) : (
          <>
            <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
            <div className='w-full grid 800px:grid-cols-10'>
              <Heading
                title={data[activeVideo]?.title}
                description="It is a platform for students to learn."
                keywords={data[activeVideo]?.tags}
              />

              <div className="col-span-7">
                <CourseContentMedia
                  user={user}
                  data={data}
                  id={id}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                />
              </div>

              <div className='hidden 800px:block 800px:col-span-3'>
                <CourseContentList
                  data={data}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default CourseContent