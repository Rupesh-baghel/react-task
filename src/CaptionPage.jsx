



import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './App.css';

const Api_Key = "EnY00uQscTwvgPtkzhdnUeJ4FHyklR3XaPqnPsvKFcw";

const CaptionPage = () => {
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://api.unsplash.com/photos/${id}?client_id=${Api_Key}`)
      .then(response => {
        console.log(response.data);
        setImage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);


  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    if (croppedCanvas) {
      setCroppedImage(croppedCanvas.toDataURL());
    }
  };


  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = croppedImage || image.urls.full;
    link.download = `image-${id}.jpg`;
    link.click();
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Caption Page</h1>
        {image && (
          <div className="flex-container">
            <div className="image-container">

              <Cropper
                src={image.urls.full}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={16 / 9}
                aspectRatio={16 / 9}
                guides={false}
                ref={cropperRef}
              />
              <p>{image.alt_description}</p>
            </div>
            <div className="download-container">

              <label htmlFor="#">  Add caption <i class="fa-solid fa-angle-down"></i> </label>
              <textarea name="textarea" rows={20} id="" placeholder="Type your caption here..."></textarea>
              <button onClick={handleCrop}>Crop Image</button> &nbsp; &nbsp;
              <button onClick={handleDownload}>Download</button>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default CaptionPage;


