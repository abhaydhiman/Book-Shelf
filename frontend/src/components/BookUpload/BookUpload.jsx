// src/UploadBook.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


const BookUpload = () => {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        summary: '',
        pdf: null,
    });

    const [uploadStatus, setUploadStatus] = useState(null); // Track upload status
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type === 'file' ? event.target.files[0] : value;
        // console.log(newValue);
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the file
        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('author', formData.author);
        formDataObj.append('genre', formData.genre);
        formDataObj.append('summary', formData.summary);
        formDataObj.append('pdf', formData.pdf); // Append the PDF file to the form data

        try {
            // Send the bookData to the backend using Axios with the FormData object
            const response = await axios.post('http://127.0.0.1:8000/users/upload_book/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                },
            });

            console.log('Book upload successful:', response.data);

            setUploadStatus('success');
            setShowModal(true);

            // Clear input fields after successful upload
            setFormData({
                title: '',
                author: '',
                genre: '',
                summary: '',
                pdf: formData.pdf,
            });
        } catch (error) {
            console.error('Error uploading book:', error);
            setUploadStatus('error'); // Set upload status to 'error' if upload fails
            setShowModal(true); // Show the modal with the error message
        }
    };


    return (
        <div className="container mt-4">
            <h1>Upload Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="summary" className="form-label">Summary</label>
                    <textarea
                        className="form-control"
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pdf" className="form-label">Upload PDF</label>
                    <input
                        type="file"
                        className="form-control"
                        id="pdf"
                        name="pdf"
                        accept=".pdf"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Upload</button>
                    <Link to="/display" className="btn btn-secondary mt-2">Cancel</Link>
                </div>
            </form>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {uploadStatus === 'success' && <p>Upload successful!</p>}
                    {uploadStatus === 'error' && <p>Upload failed. Please try again.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookUpload;
