import React from 'react'

export default function 
(props) {
  return (
        <button className='button' role="button" onClick={props.isRecording ? props.stopSpeechToText : props.startSpeechToText}>{props.isRecording ? 'Stop Recording' : 'Start Recording'}</button>
  )
}
