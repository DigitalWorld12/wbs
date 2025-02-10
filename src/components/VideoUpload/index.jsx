import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState('')
  const [videoSize, setVideoSize] = useState('')
  const [videoDuration, setVideoDuration] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024)
      setVideoSize(`${fileSizeInMB.toFixed(2)} MB`)
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      const videoElement = document.createElement('video')
      videoElement.preload = 'metadata'
      videoElement.src = URL.createObjectURL(file)
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration
        if (duration > 32) {
          toast.warn('Video should be less than 32 seconds.')
          setVideoFile(null)
          setVideoPreview('')
          setVideoSize('')
          setVideoDuration('')
        } else {
          setVideoDuration(`${duration.toFixed(2)} seconds`)
        }
      }
    }
  }

  const handleFileUpload = async () => {
    if (videoFile) {
      setIsLoading(true)
      try {
        const formData = new FormData()
        formData.append('video', videoFile)
        toast.success('Video uploaded successfully!')
      } catch (error) {
        toast.error('Failed to upload video.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeletePreview = () => {
    setVideoFile(null)
    setVideoPreview('')
    setVideoSize('')
    setVideoDuration('')
  }

  return (
    <div>
      <ToastContainer className="tost" />

      {isLoading && <p>Loading...</p>}
      <input type="file" accept="video/*" onChange={handleFileInputChange} />
      {videoPreview && (
        <div>
          <video
            style={{
              borderRadius: '10px',
              boxShadow: 'revert',
            }}
            src={videoPreview}
            controls
          ></video>
          <p>Size: {videoSize}</p>
          <p>Duration: {videoDuration}</p>
          <button onClick={handleFileUpload}>Upload</button>
          <button onClick={handleDeletePreview}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default VideoUpload
