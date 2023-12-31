
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Carousel, Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BookDetails = () => {
  const { bookId } = useParams();
  const [books, setBooks] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userReview, setUserReview] = useState({
    name: '',
    reviewText: '',
    rating: 5,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/book_list/`);
      setBooks(response.data);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const currBook = books.find((bookItem) => bookItem.id === parseInt(bookId, 10) ? bookItem: null);

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setUserReview({
      ...userReview,
      [name]: value,
    });
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users/submit_review/`, {
        bookId: currBook.id,
        review: userReview,
      });

      setShowModal(true);

      const updatedBook = {
        ...currBook,
        reviews: [...currBook.reviews, userReview],
      };

      setBooks(books.map(book => book.id === currBook.id ? updatedBook : book));

      setUserReview({
        name: '',
        reviewText: '',
        rating: 5,
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const fileToDownload = currBook.pdf.split("/").pop();
      const response = await axios.get(`${API_BASE_URL}/users/download/${fileToDownload}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });

      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = fileToDownload;
      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  if (!currBook) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Book Details</h1>
      <div className="row">
        <div className="col-md-4">
          <img
            src={currBook.cover}
            alt={currBook.title}
            className="img-fluid rounded mb-4"
          />
          <br />
          <hr />
          <h5>Related Books</h5>
          <Carousel>
            {books
              .filter((relatedBook) => relatedBook.genre === currBook.genre && relatedBook.id !== currBook.id)
              .map((relatedBook) => (
                <Carousel.Item key={relatedBook.id}>
                  <img
                    src={relatedBook.cover}
                    alt={relatedBook.title}
                    className="img-fluid rounded mb-4"
                  />
                </Carousel.Item>
              ))}
          </Carousel>
        </div>
        <div className="col-md-8">
          <h2>{currBook.title}</h2>
          <p>By {currBook.author}</p>
          <p>Genre: {currBook.genre}</p>
          <p>Rating: {currBook.rating}</p>
          <h5>Summary</h5>
          <p>{currBook.summary}</p>

          <div className="mt-4">
            <Button onClick={handleDownload} variant="success">
              Download PDF
            </Button>
          </div>

          <div className="mt-4">
            <h3>Reviews</h3>
            {currBook.reviews.length === 0 && <p>No reviews yet. Be the first to write a review!</p>}
            <ul>
              {currBook.reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.name}</strong>
                  <p>Rating: {review.rating}</p>
                  <p>{review.reviewText}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* User Review Section */}
      <hr />
      <div className="row mt-4">
        <div className="col-md-8">
          {/* Show User Reviews */}

          <Card>
            <Card.Body>
              <h3>Write Your Review</h3>
              <Form onSubmit={handleSubmitReview}>
                <Form.Group controlId="userName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userReview.name}
                    onChange={handleReviewChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="userRating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    name="rating"
                    value={userReview.rating}
                    onChange={handleReviewChange}
                    required
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="userReviewText">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="reviewText"
                    value={userReview.reviewText}
                    onChange={handleReviewChange}
                    required
                  />
                </Form.Group>
                <Button type="submit">Submit Review</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Review Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your review has been successfully submitted!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDetails;
