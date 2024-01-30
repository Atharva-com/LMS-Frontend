import React, { FC, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
}

const CourseContentList:FC<Props> = ({data, isDemo, activeVideo, setActiveVideo}) => {
  
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>())
  
  // find unique video sections
  const videoSections: string[] = [...new Set<string>(data?.map((item: any)=> item.videoSection))]

  // total count of videos from previous sections
  let totalCount: number = 0

  const toggleSections = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (visibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  }
  return (

    <div className={`mt-[15px] w-full ${!isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
        {
          videoSections.map((section: string, sectionIndex: number) => {
            const isSectionVisible = visibleSections.has(section);

            // filter videos by sections
            const sectionVideos: any[] = data.filter((item: any) => item.videoSection === section)
            
            const sectionVideoCount: number = sectionVideos.length
            const sectionVideoLength: number = sectionVideos.reduce((totalLength: number, item: any) => totalLength + item.videoLength, 0)
            
            // Starts index of the videos from the current section
            const sectionStartIndex: number = totalCount
            
            totalCount += sectionVideoCount
            
            const sectionContentHours: number = sectionVideoLength / 60
            
            return (
              <div key={sectionIndex} className={`${isDemo && 'border-b border-[#ffffff8e] pb-1 pt-2'}`}>
                  <div className="w-full flex">
                    {/* Render Video Section */}
                    <div className="w-full flex items-center justify-between">

                      <h2 className='text-[22px] text-black dark:text-gray-400 font-medium'>{section}</h2>

                      <button
                      className='mr-4 cursor-pointer text-black dark:text-white'
                      onClick={() => toggleSections(section)}
                      >
                        {
                          isSectionVisible ? (
                            <BsChevronUp size={20} />
                          ) : (
                            <BsChevronDown size={20} />
                          )
                        }
                      </button>
                    </div>
                  </div>

                  <h5 className='text-black dark:text-gray-500 font-light'>
                    {sectionVideoCount} Lessons {" "}
                    {sectionVideoLength > 60 ? sectionContentHours.toFixed(2) : sectionVideoLength} {" "}
                    {sectionVideoLength > 60 ? 'hours' : 'mins'}
                  </h5>
                  <br />
                  {isSectionVisible && (
                    <div className='w-full'>
                      {
                        sectionVideos.map((item: any, index: number) => {
                          const videoIndex: number = sectionStartIndex + index
                          const contentLength: number = item.videoLength / 60
                          return (
                            <div
                            key={index}
                            className={`w-full ${
                              videoIndex === activeVideo ? "bg-slate-600" : ""
                            } cursor-pointer transition-all p-2`}
                            onClick={() => isDemo ? null : setActiveVideo(videoIndex)}
                            >
                              <div className="flex items-center">
                                <div>
                                  <MdOutlineOndemandVideo size={25} color='#1cdada' />
                                </div>

                                <h1 className={`text-[19px] ml-3 inline-block break-words ${ videoIndex === activeVideo ? 'text-gray-200' : 'text-black'} font-normal dark:text-gray-200`}>
                                  {item.title}
                                </h1>
                              </div>

                              <h5 className={`pl-8  ${ videoIndex === activeVideo ? 'text-gray-400' : 'text-black'} dark:text-gray-500`}>
                                {item.videoLength > 60 ? contentLength.toFixed(2) :  item.videoLength} {" "}
                                {item.videoLength > 60 ? 'hours' : 'mins'}
                              </h5>
                            </div>
                          )
                        })
                      }
                    </div>
                  )}
              </div>
            )
          })
        }
    </div>
  )
}

export default CourseContentList