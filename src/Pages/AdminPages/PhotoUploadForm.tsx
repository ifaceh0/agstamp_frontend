import React, { useState, useRef } from 'react';
import axios from 'axios';

const PhotoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;
    
    // Basic validation
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // if (selectedFile.size > 10 * 1024 * 1024) { // 5MB limit
    //   setError('File size must be less than 10MB');
    //   return;
    // }

    setError(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setUploadResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/waveimg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials:true
      });

      setUploadResult(response.data.data);
      console.log('Upload successful:', response.data);
      
      // Reset form after successful upload
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFile(null);
      setPreviewUrl(null);
    } catch (err:any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Photo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose an image
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            disabled={isUploading}
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
            <div className="border rounded-md p-2 flex justify-center">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-60 max-w-full object-contain"
                onLoad={() => URL.revokeObjectURL(previewUrl)}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {uploadResult && (
          <div className="p-3 bg-green-50 text-green-700 rounded-md">
            <p>Upload successful!</p>
            <p className="text-sm mt-1">Image URL: {uploadResult.url}</p>
          </div>
        )}

        <div className="flex space-x-3">
          {file && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isUploading}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={!file || isUploading}
            className={`flex-1 py-2 px-4 rounded-md text-white font-medium ${
              !file || isUploading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhotoUpload;