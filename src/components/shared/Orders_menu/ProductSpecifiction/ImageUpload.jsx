import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ premadeProductId }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('premadeProductId', premadeProductId);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedImageUrl(response.data.imageUrl);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      // Optionally, inform the backend to delete the image from the server
      await axios.post('http://localhost:5000/api/remove-image', { imageUrl: uploadedImageUrl });
      
      setUploadedImageUrl('');
      setImage(null);
      alert('Image removed successfully!');
    } catch (error) {
      console.error('Error removing image', error);
      alert('Failed to remove image');
    }
  };

  return (
    <div className="p-2 bg-white border border-gray-300 text-center">
      <h2 className="text-xl font-bold mb-2 mt-2 ml-5 ">Upload Design</h2>
      <input type="file" onChange={handleImageChange} className="mb-4" />
      <button 
        onClick={handleUpload} 
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${uploading && 'opacity-50 cursor-not-allowed'}`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedImageUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Uploaded Design:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" className="mt-2 max-w-xs justify-center items-center" />
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none mt-2"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
