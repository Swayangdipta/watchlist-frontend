import React, { useState ,useEffect} from 'react'
import {BiLoaderCircle} from 'react-icons/bi'
import {Navigate} from 'react-router-dom'
import { authenticate, isAuthenticated, loginUser, registerUser } from './helper/authApiCalls';
import {toast} from 'react-toastify'


const Auth = ({type="login"}) => {

  const [checkPassword,setCheckPassword] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const [internalFormType,setInternalFormType] = useState(type)

  const [inputs,setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isRedirected,setIsRedirected] = useState(false);

  const {name,email,password,confirmPassword} = inputs;

  const verifyPassword = () => {
    if(password === confirmPassword){
      setCheckPassword(true)
    }else{
      setCheckPassword(false)
    }
  }

  const resetForm = () => {
    setInputs({
      ...inputs,
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  const login = () => (
    <>
      <label htmlFor="Email" className="content__label">Email <span className="color__red">*</span></label>
      <input value={email} onChange={e=> handleChange("email")(e)} type="email" className="content__inputs" name="Email" placeholder='Your Email' />

      <label htmlFor="Password" className="content__label">Password <span className="color__red">*</span></label>
      <input value={password} onChange={e=> handleChange("password")(e)} type="password" className="content__inputs" name="Password" placeholder='Your Password'/>
        <p onClick={e=> {
          setInternalFormType('register')
          resetForm()
        }} style={{
          fontSize: '0.8em',
          textDecoration: 'underline',
          color: '#00ffad',
          cursor: "pointer"
        }} className="content__label">Don't have an account? Register.</p>
    </>
  )

  const register = () => (
    <>
      <label htmlFor="Name" className="content__label">Name <span className="color__red">*</span></label>
      <input type="text" value={name} onChange={e=> handleChange("name")(e)} name="Name" className="content__inputs" placeholder='Your Name' />

      <label htmlFor="" className="content__label">Email <span className="color__red">*</span></label>
      <input type="email" value={email} onChange={e=> handleChange("email")(e)} name="" className="content__inputs" placeholder='Your Email' />

      <label htmlFor="" className="content__label">Password <span className="color__red">*</span></label>
      <input type="password" value={password} onChange={e=> handleChange("password")(e)} name="" className="content__inputs" placeholder='New Password' />

      <label htmlFor="" className="content__label">Confirm Password <span className="color__red">*</span></label>
      <input type="password" value={confirmPassword} onChange={e=> handleChange("confirmPassword")(e)} name="" className="content__inputs" placeholder='Re Enter Password'/>
      {checkPassword ? ('') : (<p style={{
        fontSize: "0.7em",
        color: "red"
      }} className='content__label auth__validation'>Password did not matched</p>)}
      <p onClick={e=> {
        setInternalFormType('login')
        resetForm()
      }} style={{
          fontSize: '0.8em',
          textDecoration: 'underline',
          color: '#00ffad',
          cursor: "pointer"
        }} className="content__label">Already have an account? Login.</p>
    </>
  )

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    let auth = '';
    if(internalFormType === "login"){
      auth = {
        email,
        password
      }
    }else{
      auth = {
        name,
        email,
        password
      }
    }

    if(internalFormType === 'login'){
      loginUser(auth,(data)=>{
        if(data && !data.error && data.name !== 'AxiosError'){
            toast.success("Authentication Success!",{theme: 'dark'});
            authenticate(data)
            setIsRedirected(true)
            setIsLoading(false)
        }else{
            toast.error(data?.error,{theme: 'dark'});
            setIsLoading(false)
        }
      })
    }else{
      registerUser(auth,(data)=>{
        if(data && !data.error){
            toast.success("Registration Success. Login now!",{theme: 'dark'});
            setInternalFormType('login')
            setIsLoading(false)
        }else{
            toast.error(data?.error,{theme: 'dark'});
            setIsLoading(false)
        }
      })
    }
}

const handleChange = inp => e => {
  setInputs({...inputs,[inp]: e.target.value})
}

  useEffect(()=>{
    verifyPassword()
  },[confirmPassword])

  return (
    <div className='login__page'>
      {
        isAuthenticated() && (<Navigate to="/home" />)
      }
      {
        isRedirected && (<Navigate to="/home" />)
      }
      <div className="auth__form__container content__form__wrapper">
      <div className="content__form__kinda__header"></div>
      <h2 className="create__content__title">{internalFormType === 'login' ? ("Login") : ("Register")}</h2>
        <form className="auth__form content__form">
          {
            internalFormType === "login" ? (login()) : (register())
          }
        <button onClick={handleSubmit} type="submit" className='content__submit__btn pointer__cursor'>{
            isLoading ? (<BiLoaderCircle/>) : internalFormType === 'login' ? ("Login") : ("Register")
        }</button>
        </form>
      </div>
    </div>
  )
}

export default Auth