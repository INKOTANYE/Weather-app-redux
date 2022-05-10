import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { setKey } from "../redux/cities/citiesSlice"
import {AiFillEyeInvisible} from "react-icons/ai"
import {AiFillEye} from "react-icons/ai"

function LoginPage() {

const navigate = useNavigate();
const [input, setInput] = useState("")
const [show, setShow] = useState(false)
const [control, setControl] = useState(false)
const key = useSelector((state) => state.cities.key)
const dispatch = useDispatch()


useEffect(() => {  
    sessionStorage.setItem('key', (input))
  },[input])

const apiKey = `${process.env.REACT_APP_API_KEY}`
console.log(apiKey);

const goToHomePage = (e) => {
    e.preventDefault()
    if (!input) return;
    dispatch(setKey(input))
    if (key===apiKey) {
        navigate("/home")
        setControl(false)
    }
    else{
        setControl(true)
    }
}

const handleEyeClick = () => {
  input && setShow(!show)
}

  return (
    <div className='login-container'>
        <h1 className='header'>API Key</h1>
        <form className="login">
          <span>
            <input type={show ? "text" : "password"} value={input} placeholder="API Key" onChange = {(e) => setInput(e.target.value)}/>  
            <span className='eyeIcon' onClick={handleEyeClick}> {!input ? <AiFillEye/> : (show ? <AiFillEyeInvisible/> : <AiFillEye/> )}</span>
          </span> 
          <button onClick = {goToHomePage}>Login</button>
               {control && <div>The key is not correct. Please try again...</div>}           
        </form>  
    </div>
  )
}

export default LoginPage