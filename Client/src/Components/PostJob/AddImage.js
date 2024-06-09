import React from 'react'
import { useState, useEffect } from 'react'
import { storage } from '../../Utils/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function AddImage(props) {

    const [imageUploads, setImageUploads] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const uploadImages = () => {
        if (imageUploads == null || imageUploads.length === 0) return

        const uploadPromises = imageUploads.map(file => {
            const uniqueFileName = `${file.name}-${v4()}`
            const imageRef = ref(storage, `newJobImages/${uniqueFileName}`)
            return uploadBytes(imageRef, file).then(() => getDownloadURL(imageRef))
        })

        Promise.all(uploadPromises)
            .then((downloadURLs) => {
                setImageUrls(downloadURLs)
                setUploadSuccess(true)
            })
            .catch(error => {
                console.error("Error uploading images:", error)
                alert("Error uploading some images. Check the console for more details.")
            })
    }

    useEffect(() => {
        if (imageUrls.length > 0) {
            props.onImageListChange({
                imageUrls
            })
        }
    }, [imageUrls, props])
    
  return (
      <div>
        <div className='flex pl-2 mt-4 mb-4'>
                <label for='img' className='w-36'>Add an image:</label>
                <input
                    type='file'
                    id='img'
                    name='img'
                    accept='image/*'
                    multiple
                  onChange={(e) => {
                      setImageUploads(Array.from(e.target.files))
                      setUploadSuccess(false)
                  }}
                    className='border border-solid border-black flex-1 '
              />
              <button type="button" onClick={uploadImages} className='ease-in duration-200 bg-gray-400 hover:bg-gray-500 rounded-lg ml-2 w-16'>Upload</button>
          </div>
          <div>
              {imageUploads.map((file, index) => (
                  <p key={index}>{file.name}{uploadSuccess ? " uploaded successfully" : "" }</p>
              ))}
          </div>
    </div>
  )
}

export default AddImage