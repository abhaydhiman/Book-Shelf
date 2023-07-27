// src/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleLogin = () => {
        navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const backendUrl = `${API_BASE_URL}/users/signup/`;
        console.log("hkfasjdfhkjadshfk", backendUrl);
        axios
            .post(backendUrl, formData)
            .then((response) => {
                console.log('Signup successful!', response);
                navigate('/display')
            })
            .catch((error) => {
                console.error('Signup failed:', error.response);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Sign Up</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-5">
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <p className="text-center mt-3">Already have an account? <a href='#' onClick={handleLogin}>Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
