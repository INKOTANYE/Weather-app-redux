import './App.css';
import React from 'react'
import LoginPage from './components/LoginPage'
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from 'react-router-dom'
import Container from './components/Container'
import ErrorPage from './components/ErrorPage'
import { useSelector} from "react-redux"

function App() {
  const key = useSelector((state) => state.cities.key)
  const apiKey = `${process.env.REACT_APP_API_KEY}`

  return (
    <div>
      <BrowserRouter>
          <Routes>
                <Route path="/" element={key===apiKey ? <Container/> : <LoginPage/>} />
                <Route path="/home" element={key===apiKey ? <Container/> : <LoginPage/>} />
                <Route path="*" element={<ErrorPage/>} />
          </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;
