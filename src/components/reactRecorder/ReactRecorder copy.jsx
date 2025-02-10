import axios from 'axios'
import localStorage from 'local-storage'
import React from 'react'
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import styles from '../../../styles/ProfileCard.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OPTIONS = {
  fileName: 'test-filename',
  mimeType: 'video/mp4',
  width: 560,
  height: 389,
  disableLogs: true,
  audio: true,
}
const ReactRecorder = () => {
  const recordWebcam = useRecordWebcam(OPTIONS)

  const getRecordingFile = async () => {
    const blob = await recordWebcam.getRecording()
    const file = new File([blob], 'Testing file.mp4', { type: 'video/mp4' })
    try {
      const formData = new FormData()
      formData.append('video_file', file)
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_URL + '/api/artist/first_video_record',

          formData,
          {
            headers: {
              Authorization:
                'Bearer ' + localStorage.get('loginAuth')?.authorisation?.token,
            },
          },
        )
        .then((response) => {
          toast.success('Video uploaded successfully!')
          router.push({
            pathname: '/artist_service_charges',
          })
        })
        .catch((error) => {
          toast.error(error)
        })
    } catch (error) {
      toast.error('Failed to upload video.')
    }
  }

  return (
    <div>
      <ToastContainer className="tost" />

      <p
        className={styles.Order_CompleteVideo_Record_paragraph}
        style={{ color: 'white' }}
      >
        Camera status: {recordWebcam.status}
      </p>
      <div>
        <button
          disabled={
            recordWebcam.status === 'OPEN' ||
            recordWebcam.status === 'RECORDING' ||
            recordWebcam.status === 'PREVIEW'
          }
          onClick={recordWebcam.open}
        >
          Open camera
        </button>
        <button
          disabled={recordWebcam.status === 'CLOSED'}
          onClick={recordWebcam.close}
        >
          Close camera
        </button>
        <button
          disabled={
            recordWebcam.status === 'CLOSED' ||
            recordWebcam.status === 'RECORDING' ||
            recordWebcam.status === 'PREVIEW'
          }
          onClick={recordWebcam.start}
        >
          Start recording
        </button>
        <button
          disabled={recordWebcam.status !== 'RECORDING'}
          onClick={recordWebcam.stop}
        >
          Stop recording
        </button>
        <button
          disabled={recordWebcam.status !== 'PREVIEW'}
          onClick={recordWebcam.retake}
        >
          Retake
        </button>
        <button
          disabled={recordWebcam.status !== 'PREVIEW'}
          onClick={recordWebcam.download}
        >
          Download
        </button>
        <button
          disabled={recordWebcam.status !== 'PREVIEW'}
          onClick={getRecordingFile}
        >
          Upload
        </button>
      </div>
      <video
        ref={recordWebcam.webcamRef}
        className={styles.Order_CompleteVideo_Record_Video}
        style={{
          display: `${
            recordWebcam.status === 'OPEN' ||
            recordWebcam.status === 'RECORDING'
              ? 'block'
              : 'none'
          }`,
        }}
        autoPlay
      />
      <video
        ref={recordWebcam.previewRef}
        className={
          styles.Order_CompleteVideo_Record_Video_previewRef_width_height
        }
        style={{
          display: `${recordWebcam.status === 'PREVIEW' ? 'block' : 'none'}`,
        }}
        autoPlay
        controls
        loop
      />
    </div>
  )
}
export default ReactRecorder
