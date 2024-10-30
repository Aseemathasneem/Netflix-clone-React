import { Button } from '@mui/material'
import React,{ useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/setup'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer'


const Navbar = () => {
  const logout = async()=>{
   try {
     await signOut(auth)
     toast.success('logged out successfully',{
       theme:'dark'
     })
   } catch (err) {
     console.log(err)
   }
  }    

   const navigate = useNavigate()
   const [movies,setMovies]  = useState([])

   const getMovie = ()=>{
       try {
           fetch('https://api.themoviedb.org/3/discover/movie?api_key=6a1d86e89fa2dd60deb87337daad9873')
           .then(res=>res.json())
           .then(json =>setMovies(json.results)) 
       } catch (error) {
           console.log(error)
       }
        
     }
     const signinClick = ()=>{
       navigate("/signin")
     }
   
     useEffect(()=>{
       getMovie()
     },[])
 

      return (
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[4]?.poster_path})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '500px',
            width: '100%',
            
          }}
          
        >
        <ToastContainer  autoClose={2000}/>  
          <div style={{display:'flex',justifyContent:'space-between',padding:'20px'}}>
          <img style={{
              width: '80px',
              }}
         src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'alt='' /> 
         <div>
          {auth.currentUser?.emailVerified?<Button onClick={logout} variant='contained' color='error'sx={{height:'40px',marginLeft:'10px'}}>Logout</Button>
          :<Button onClick={signinClick}color='error'variant='contained'sx={{height:'40px'}}>Sign in</Button>}
         </div>
          </div>
          <div style={{padding:'20px'}}>
            <h1 style={{color:'#F1F1F1',fontFamily:'initial',fontSize:'70px'}}>{movies[4]?.original_title}</h1>
            <h3 style={{color:'#F1F1F1'}}>{movies[4]?.overview}</h3>
            <Trailer movieId={movies[4]?.id}/>
          </div>
          
        </div>
      )
}

export default Navbar