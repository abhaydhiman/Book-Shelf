import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadButton.css';

const UploadButton = () => {
    const navigate = useNavigate();

    const handleUpload = (e) => {
        navigate('/upload');
    };
    return (
        <button onClick={handleUpload} className="upload-button">Upload Book</button>
    );
};

export default UploadButton;