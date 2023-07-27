// src/Login.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignup = () => {
        navigate("/signup");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const backendUrl = `${API_BASE_URL}/users/login/`;

        axios
            .post(backendUrl, {username: formData.username,
                password: formData.password,
            })
            .then((response) => {
                console.log("done");
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/display');
            })
            .catch((error) => {
                console.error('Login failed: ', error.response.data);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="username"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
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
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <p className="text-center mt-3">Don't have an account? <a href="#" onClick={handleSignup}>Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
