import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer:FC<Props> = ({videoUrl, title}) => {

  const [videoData, setvideoData] = useState({
    otp: '',
    playbackInfo: ""
  })

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}getVdoCipherOTP`, {videoId: videoUrl}).then((res)=> {setvideoData(res.data);});
  }, [])
  
  return (
    <div style={{paddingTop: '56.25%', position: 'relative', overflow: "hidden"}}>

      {
        videoData.otp && videoData.playbackInfo !== "" && (
          <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=${process.env.PLAYER_ID}`}
          width="90%"
          height="100%"
          allowFullScreen = {true}
          allow="encrypted-media"
          style={{position: 'absolute', top: 0, left: 0, border: 0, width: "100%", height: "100%"}}
        ></iframe>
        )
      }

    </div>
  )
}

export default CoursePlayer