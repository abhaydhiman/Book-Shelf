import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import UploadButton from '../UploadButton/UploadButton';
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function BookDisplay() {
  // Sample book data - Replace this with your actual book data
  const navigate = useNavigate();

  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/users/book_list/`);
          setBooks(response.data);
      } catch (error) {
          console.error('Error fetching books:', error);
      }
  };

  const BookCard = ({ book }) => {
    const { id, title, author, genre, rating } = book;

    return (
      <div className="card" onMouseOver={() => { setBookId(id) }} onMouseOut={() => { setBookId('') }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Author: {author}</p>
          <p className="card-text">Genre: {genre}</p>
          <p className="card-text">Rating: {rating}</p>
          <div className="row">
            <div className="col-md-6" style={{ textAlign: "center" }}>
              <Button variant="primary" onClick={() => handleQuickView(book)}>View Details</Button>
            </div>
            <div className="col-md-6" style={{ textAlign: "center" }}>
              <Button variant="primary" onClick={handleNavigation}>Open</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    console.log(bookId);
    navigate(`/details/${bookId}`);
  }

  // const [books] = useState([
  //   {
  //     id: '1',
  //     title: 'Book 1',
  //     author: 'Author 1',
  //     genre: 'Fiction',
  //     rating: 4.5,
  //     summary: 'This is the summary of Book 1...',
  //     cover: 'https://example.com/book1.jpg',
  //     reviews: [
  //       {
  //         name: 'User 1',
  //         rating: 5,
  //         reviewText: 'This book was amazing! Highly recommended!',
  //       },
  //       {
  //         name: 'User 2',
  //         rating: 4,
  //         reviewText: 'Enjoyed reading this book. Good storyline!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     title: 'Book 2',
  //     author: 'Author 2',
  //     genre: 'Mystery',
  //     rating: 4.0,
  //     summary: 'This is the summary of Book 2...',
  //     cover: 'https://example.com/book2.jpg',
  //     reviews: [
  //       {
  //         name: 'User 3',
  //         rating: 4,
  //         reviewText: 'Liked the mystery in this book!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '3',
  //     title: 'Book 3',
  //     author: 'Author 3',
  //     genre: 'Science Fiction',
  //     rating: 4.8,
  //     summary: 'This is the summary of Book 3...',
  //     cover: 'https://example.com/book3.jpg',
  //     reviews: [
  //       {
  //         name: 'User 4',
  //         rating: 5,
  //         reviewText: 'A fantastic sci-fi adventure!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '4',
  //     title: 'Book 4',
  //     author: 'Author 4',
  //     genre: 'Romance',
  //     rating: 3.9,
  //     summary: 'This is the summary of Book 4...',
  //     cover: 'https://example.com/book4.jpg',
  //     reviews: [
  //       {
  //         name: 'User 5',
  //         rating: 4,
  //         reviewText: 'A heartwarming love story!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '5',
  //     title: 'Book 5',
  //     author: 'Author 5',
  //     genre: 'Thriller',
  //     rating: 4.2,
  //     summary: 'This is the summary of Book 5...',
  //     cover: 'https://example.com/book5.jpg',
  //     reviews: [],
  //   },
  //   {
  //     id: '6',
  //     title: 'Book 6',
  //     author: 'Author 6',
  //     genre: 'Fantasy',
  //     rating: 4.7,
  //     summary: 'This is the summary of Book 6...',
  //     cover: 'https://example.com/book6.jpg',
  //     reviews: [
  //       {
  //         name: 'User 6',
  //         rating: 5,
  //         reviewText: 'Epic fantasy with captivating characters!',
  //       },
  //       {
  //         name: 'User 7',
  //         rating: 4,
  //         reviewText: 'A must-read for fantasy lovers!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '7',
  //     title: 'Book 7',
  //     author: 'Author 7',
  //     genre: 'Historical Fiction',
  //     rating: 4.4,
  //     summary: 'This is the summary of Book 7...',
  //     cover: 'https://example.com/book7.jpg',
  //     reviews: [
  //       {
  //         name: 'User 8',
  //         rating: 4,
  //         reviewText: 'Great historical context!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '8',
  //     title: 'Book 8',
  //     author: 'Author 8',
  //     genre: 'Self-Help',
  //     rating: 4.9,
  //     summary: 'This is the summary of Book 8...',
  //     cover: 'https://example.com/book8.jpg',
  //     reviews: [],
  //   },
  //   {
  //     id: '9',
  //     title: 'Book 9',
  //     author: 'Author 9',
  //     genre: 'Horror',
  //     rating: 3.7,
  //     summary: 'This is the summary of Book 9...',
  //     cover: 'https://example.com/book9.jpg',
  //     reviews: [
  //       {
  //         name: 'User 9',
  //         rating: 4,
  //         reviewText: 'Creepy and thrilling!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '10',
  //     title: 'Book 10',
  //     author: 'Author 10',
  //     genre: 'Science Fiction',
  //     rating: 4.1,
  //     summary: 'This is the summary of Book 10...',
  //     cover: 'https://example.com/book10.jpg',
  //     reviews: [],
  //   },
  //   {
  //     id: '11',
  //     title: 'Book 11',
  //     author: 'Author 11',
  //     genre: 'Mystery',
  //     rating: 4.3,
  //     summary: 'This is the summary of Book 11...',
  //     cover: 'https://example.com/book11.jpg',
  //     reviews: [],
  //   },
  //   {
  //     id: '12',
  //     title: 'Book 12',
  //     author: 'Author 12',
  //     genre: 'Romance',
  //     rating: 4.6,
  //     summary: 'This is the summary of Book 12...',
  //     cover: 'https://example.com/book12.jpg',
  //     reviews: [
  //       {
  //         name: 'User 10',
  //         rating: 5,
  //         reviewText: 'Beautiful love story!',
  //       },
  //       {
  //         name: 'User 11',
  //         rating: 4,
  //         reviewText: 'Romantic and heartfelt!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '13',
  //     title: 'Book 13',
  //     author: 'Author 13',
  //     genre: 'Fiction',
  //     rating: 4.2,
  //     summary: 'This is the summary of Book 13...',
  //     cover: 'https://example.com/book13.jpg',
  //     reviews: [
  //       {
  //         name: 'User 12',
  //         rating: 4,
  //         reviewText: 'A thought-provoking story!',
  //       },
  //     ],
  //   },
  //   {
  //     id: '14',
  //     title: 'Book 14',
  //     author: 'Author 14',
  //     genre: 'Thriller',
  //     rating: 4.0,
  //     summary: 'This is the summary of Book 14...',
  //     cover: 'https://example.com/book14.jpg',
  //     reviews: [],
  //   },
  //   {
  //     id: '15',
  //     title: 'Book 15',
  //     author: 'Author 15',
  //     genre: 'Fantasy',
  //     rating: 4.9,
  //     summary: 'This is the summary of Book 15...',
  //     cover: 'https://example.com/book15.jpg',
  //     reviews: [
  //       {
  //         name: 'User 13',
  //         rating: 5,
  //         reviewText: 'An enchanting world!',
  //       },
  //       {
  //         name: 'User 14',
  //         rating: 5,
  //         reviewText: 'Incredible fantasy adventure!',
  //       },
  //     ],
  //   },
  // ]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Relevance');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // Number of books to display per page

  const filteredBooks = selectedGenre === 'All'
    ? books
    : books.filter(book => book.genre === selectedGenre);

  const searchedBooks = searchQuery === ''
    ? filteredBooks
    : filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedBooks = selectedSort === 'Relevance'
    ? searchedBooks
    : selectedSort === 'Rating'
      ? [...searchedBooks].sort((a, b) => b.rating - a.rating)
      : [...searchedBooks].sort((a, b) => a.title.localeCompare(b.title));

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleQuickView = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const uniqueGenres = [...new Set(books.map(book => book.genre))];

  // State for the Quick View Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="container mt-4">
      <UploadButton />
      <h1 className="mb-4">Book Shelf</h1>

      {/* Search Bar */}
      <div className="row my-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3">
          <select className="form-control" value={selectedGenre} onChange={handleGenreChange}>
            <option value="All">All Genres</option>
            {/* <option value="Fiction">Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Mystery">Mystery</option> */}


            {uniqueGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
            {/* Add more genre options here */}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control" value={selectedSort} onChange={handleSortChange}>
            <option value="Relevance">Sort by Relevance</option>
            <option value="Rating">Sort by Rating</option>
            <option value="Title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Book Cards */}
      <div className="row">
        {currentBooks.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Book pagination">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick View Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Author:</strong> {selectedBook?.author}</p>
          <p><strong>Genre:</strong> {selectedBook?.genre}</p>
          <p><strong>Rating:</strong> {selectedBook?.rating}</p>
          <p><strong>Summary:</strong> {selectedBook?.summary}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDisplay;
