// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import book1 from '../../images/book1.jpg';
import book2 from '../../images/book2.jpg';
import book3 from '../../images/book3.jpg';

const Home = () => {
    return (
        <div className="container-fluid px-0">

            {/* Main Content */}
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="display-4">Welcome to Book Discoveria</h1>
                        <p className="lead">
                            Discover a vast collection of books, read reviews, and share your favorite titles with other book enthusiasts.
                        </p>
                        <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
                    </div>
                    <div className="col-md-6">
                        <img src={book1} className="img-fluid" alt="Bookshelf" />
                    </div>
                </div>
            </div>

            {/* Featured Books */}
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Featured Books</h2>
                    <div className="row">
                        {/* Add featured book cards here */}
                        <div className="col-md-4">
                            <div className="card">
                                <img src={book1} className="card-img-top" alt="Book 1" />
                                <div className="card-body">
                                    <h5 className="card-title">Book Title 1</h5>
                                    <p className="card-text">A short description of the book goes here.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={book2} className="card-img-top" alt="Book 2" />
                                <div className="card-body">
                                    <h5 className="card-title">Book Title 2</h5>
                                    <p className="card-text">A short description of the book goes here.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <img src={book3} className="card-img-top" alt="Book 3" />
                                <div className="card-body">
                                    <h5 className="card-title">Book Title 3</h5>
                                    <p className="card-text">A short description of the book goes here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* User Testimonials */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">User Testimonials</h2>
                    <div className="row">
                        {/* Add user testimonial cards here */}
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">
                                        "Book Discoveria has opened up a whole new world of books for me. I love the diverse collection and the engaging community of readers."
                                    </p>
                                    <p className="card-text"><em>- John Doe</em></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">
                                        "I can't imagine my life without Book Discoveria. It's my go-to platform for finding new books and sharing my reading experiences."
                                    </p>
                                    <p className="card-text"><em>- Jane Smith</em></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Details */}
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Discover More</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-center">
                                <i className="fa fa-book fa-3x mb-3" aria-hidden="true"></i>
                                <h4>Extensive Book Collection</h4>
                                <p>Explore a vast collection of books from various genres and authors.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <i className="fa fa-users fa-3x mb-3" aria-hidden="true"></i>
                                <h4>Connect with Readers</h4>
                                <p>Join a thriving community of book enthusiasts to discuss your favorite reads.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center">
                                <i className="fa fa-heart fa-3x mb-3" aria-hidden="true"></i>
                                <h4>Love Your Reading Journey</h4>
                                <p>Rediscover the joy of reading and unlock new worlds with every page.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-3 bg-dark text-white text-center">
                <p>&copy; {new Date().getFullYear()} Book Discoveria. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
