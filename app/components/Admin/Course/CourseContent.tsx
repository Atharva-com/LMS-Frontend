import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: (e: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseContent: FC<Props> = ({ courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit, active, setActive, }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  )
  const [activeSection, setActiveSection] = useState(1)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
  }

  const handleCollapseToggle = (index: number) => {
    const newIsCollapsed = [...isCollapsed]
    newIsCollapsed[index] = !newIsCollapsed[index]
    setIsCollapsed(newIsCollapsed)
  }

  const handleRemoveLink = (linkIndex: number, index: number) => {
    const newCourseContentData = [...courseContentData]
    newCourseContentData[index].links.splice(linkIndex, 1)
    setCourseContentData(newCourseContentData)
  }

  const newContentHandler = (item: any) => {
    if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
      toast.error("Please fill all the fields!")
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection
        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection
        }
      }
      const newCourseContentData = [...courseContentData]
      newCourseContentData.push({
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      })
      setCourseContentData(newCourseContentData)
    }
  }

  const AddNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields of previous section!")
    } else {
      setActiveSection(activeSection + 1)
      const newCourseContentData = [...courseContentData]
      newCourseContentData.push({
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      })
      setCourseContentData(newCourseContentData)
    }
  }
  return (
    <div className='w-[95%] sm:w-[90%] 800px:w-[80%] m-auto mt-24 p-3'>

      <div className='flex justify-between items-center'>

        <h1 className='text-2xl font-bold'>Course Content</h1>

        <button className='bg-blue-500 text-white px-3 py-1 rounded-md' onClick={handleCourseSubmit}>Save</button>

      </div>

      <div className='mt-5'>
        <form onSubmit={handleSubmit}>
          {
            courseContentData.map((item: any, index: number) => {

              const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection
              return (
                <>
                  <div
                    className={`w-full dark:bg-[#cdc8c817] bg-gray-200 p-4 ${showSectionInput ? "mt-10" : "mb-0"
                      }`} key={index}
                  >
                    {
                      showSectionInput && (
                        <>
                          <div className='flex w-full items-center'>
                            <input
                              type="text"
                              className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"
                                } font-Poppins cursor-pointer dark:text-white text-black outline-none bg-transparent`}
                              value={item.videoSection}
                              onChange={(e) => {
                                const newCourseContentData = [...courseContentData]
                                newCourseContentData[index].videoSection = e.target.value
                                setCourseContentData(newCourseContentData)
                              }}
                            />

                            <BsPencil className='cursor-pointer dark:text-white text-black' />
                          </div>

                          <br />

                        </>
                      )
                    }

                    {/* buttons for deleting the section and collapsing them */}
                    <div className='flex w-full items-center justify-between my-0'>
                      {
                        isCollapsed[index] ? (
                          <>
                            {
                              item.title ? (
                                <p className='font-Poppins dark:text-white text-black'>
                                  {index + 1}. {item.title}
                                </p>
                              ) :
                                <>
                                </>
                            }
                          </>
                        ) : (
                          <>

                          </>
                        )
                      }

                      {/* arrow button for collapsed video content */}
                      <div className={`flex items-center ${!item.title || !isCollapsed[index] ? 'w-full' : ''} justify-end`}>

                        <AiOutlineDelete
                          className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                            }`}

                          onClick={() => {
                            if (index > 0) {
                              const newCourseContentData = [...courseContentData]
                              newCourseContentData.splice(index, 1)
                              setCourseContentData(newCourseContentData)
                            }
                          }}
                        />

                        <MdOutlineKeyboardArrowDown
                          fontSize="large"
                          className='dark:text-white text-black cursor-pointer'
                          style={{
                            transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                          onClick={() => handleCollapseToggle(index)}
                        />

                      </div>
                    </div>

                    {
                      !isCollapsed[index] && (
                        <>
                          {/* video title */}
                          <div className='my-3'>
                            <label className={styles.label}>
                              Video Title
                            </label>

                            <input
                              type="text"
                              className={`${styles.input}`}
                              placeholder='Project Plan...'
                              value={item.title}
                              onChange={(e) => {
                                const newCourseContentData = [...courseContentData]
                                newCourseContentData[index].title = e.target.value
                                setCourseContentData(newCourseContentData)
                              }}
                            />
                          </div>

                          {/* video url */}
                          <div className='my-3'>
                            <label className={styles.label}>
                              Video Url
                            </label>

                            <input
                              type="text"
                              className={`${styles.input}`}
                              placeholder='https://www.youtube.com/watch?...'
                              value={item.videoUrl}
                              onChange={(e) => {
                                const newCourseContentData = [...courseContentData]
                                newCourseContentData[index].videoUrl = e.target.value
                                setCourseContentData(newCourseContentData)
                              }}
                            />
                          </div>

                          {/* video description */}
                          <div className='my-3'>
                            <label className={styles.label}>
                              Video Description
                            </label>

                            <textarea
                              rows={8}
                              cols={30}
                              className={`${styles.input} !h-min py-2`}
                              placeholder='the video specifies and related properties...'
                              value={item.description}
                              onChange={(e) => {
                                const newCourseContentData = [...courseContentData]
                                newCourseContentData[index].description = e.target.value
                                setCourseContentData(newCourseContentData)
                              }}
                            />
                            <br />
                          </div>


                          {/* Links section */}
                          {
                            item?.links.map((link: any, linkIndex: number) => {
                              return (<div className="mb-3 block" key={linkIndex}>
                                <div className="w-full flex items-center justify-between">
                                  <label className={`${styles.label}`}>
                                    Link {linkIndex + 1}
                                  </label>

                                  {linkIndex === 0 ? null : <AiOutlineDelete
                                    className={`text-red-600 text-[20px] ${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                                      }`}
                                    onClick={() => {
                                      handleRemoveLink(linkIndex, index)
                                    }}
                                  />}
                                </div>

                                {/* link title */}
                                <input
                                  type="text"
                                  className={`${styles.input}`}
                                  placeholder='Source Code...(Link title)'
                                  value={link.title}
                                  onChange={(e) => {
                                    console.log(courseContentData[index].links[linkIndex].title)
                                    const newCourseContentData = [...courseContentData]
                                    newCourseContentData[index].links[linkIndex].title = e.target.value
                                    setCourseContentData(newCourseContentData)
                                  }}
                                />

                                {/* link Url */}
                                <input
                                  type="text"
                                  className={`${styles.input}`}
                                  placeholder='Source Code Url...(Link URL)'
                                  value={link.url}
                                  onChange={(e) => {
                                    const newCourseContentData = [...courseContentData]
                                    newCourseContentData[index].links[linkIndex].url = e.target.value
                                    setCourseContentData(newCourseContentData)
                                  }}
                                />
                              </div>)
                            })
                          }

                          {/* add link button */}
                          <div className='flex justify-end'>
                            <button
                              className='bg-blue-500 text-white px-3 py-1 rounded-md flex items-center'
                              onClick={() => {
                                const newCourseContentData = [...courseContentData]
                                newCourseContentData[index].links.push({
                                  title: "",
                                  url: "",
                                })
                                setCourseContentData(newCourseContentData)
                              }}
                            >
                              <BsLink45Deg className='mr-2' /> Add Link
                            </button>
                          </div>
                        </>
                      )
                    }

                    <br />

                    {/* add new content */}
                    {
                      index === courseContentData.length - 1 && (
                        <div>
                          <p
                            onClick={() => {
                              newContentHandler(item)
                            }}
                            className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                          >
                            <AiOutlinePlusCircle className='mr-2' /> Add New Content
                          </p>
                        </div>
                      )
                    }

                  </div>
                </>
              )
            })
          }

          <br />

          {/* Add new Section */}
          <div className='flex items-center text-[20px] dark:text-white text-black cursor-pointer' onClick={() => AddNewSection()}>
            <AiOutlinePlusCircle className='mr-2' /> Add New Section
          </div>

        </form>

        <br />

        {/* prev next button */}
        <div className='flex justify-between mt-8 gap-4'>
          <button
            className={`${styles.button} !w-fit`}
            onClick={() => {
              setActive(active - 1)
            }}
          >
            Prev
          </button>

          <button
            className={`${styles.button} !w-fit`}
            onClick={(e: any) => {
              if (courseContentData[courseContentData.length - 1].title === "" || courseContentData[courseContentData.length - 1].description === "" || courseContentData[courseContentData.length - 1].videoUrl === "" || courseContentData[courseContentData.length - 1].links[0].title === "" || courseContentData[courseContentData.length - 1].links[0].url === "") {
                toast.error("Section can't be empty.")
              } else {
                setActive(active + 1)
                handleCourseSubmit(e)
              }
            }}
          >
            Next
          </button>
        </div>

        <br />
      </div>
    </div>
  )
}

export default CourseContent