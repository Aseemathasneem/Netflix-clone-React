import React from 'react'
import { signInWithPopup } from "firebase/auth"
import { Button } from '@mui/material'
import { auth, googleAuth } from '../firebase/setup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {

    const navigate = useNavigate()
    const googleSignin = async()=>{
        try {
            await signInWithPopup(auth,googleAuth)
            setTimeout(()=>{
              auth.currentUser?.emailVerified && navigate('/')
            },2000)

        toast.success('Signed in successfully')   

        } catch (err) {
            console.error(err)
        }
      
    }
    
  return (
    <div style={{backgroundColor:'#181818',height:'100vh',padding:'20px'}}>
      <ToastContainer autoClose={2000}/>
        <img style={{
          width: '80px',
          }}src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'alt=''/>
        <div style={{position:'fixed',left:'45%',top:'35%'}}>
        <Button onClick={googleSignin} variant='contained'color='error'>Sign in with Google</Button>
        <br/>
        
        <h2 style={{color:'white'}}>Let's start <br /> to explore movies <br/>from here.</h2>
        
        
        </div>
        
    </div>
  )
}

export default Signin