import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Login from './components/Login';
import BlogList from './components/BlogList';
import AddBlogs from './components/AddBlogs';
import SignupForm from './components/SignupForm';

function App() {
 

  return (
<>
    <header>
      <Header/>
    </header>
<main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/add" element={<AddBlogs />} />
      </Routes>
    </main>

    </>
  )
}

export default App
