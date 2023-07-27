import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import BookDisplay from "./components/BookDisplay/BookDisplay";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import BookUpload from "./components/BookUpload/BookUpload";
import "./App.css";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/display' element={<BookDisplay />}/>
          <Route exact path='/details/:bookId' element={<BookDetails />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/signup' element={<Signup />}/>
          <Route exact path='/upload' element={<BookUpload />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
