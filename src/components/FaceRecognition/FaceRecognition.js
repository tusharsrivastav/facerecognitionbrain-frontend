import React from 'react'
import './faceRecognition.css'

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className='center mt4 wrapper'>
      <div className='relative'>
        <img id='input-image' alt='' src={imageUrl} width='400px' height='auto'></img>
        <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    </div>
  )
}

export default FaceRecognition