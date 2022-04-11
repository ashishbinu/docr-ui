import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function CameraScreen (props) {
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    let image = new Image();
    image.src = dataUri;

    // TODO : send to django

    const formData = new FormData();
    formData.append('imageFile', image);

    fetch('http://127.0.0.1:8000/', {
      method: 'POST',
      body: formData
    })
      .then().then(console.log("Got it"));

  }

  return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    />
  );
}

export default CameraScreen
