import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Button } from '@mui/material'
import YouTube from 'react-youtube';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Trailer = ({location,movieId}) => {
    const [trailerView,setTrailerView] = useState([])
   

    const showTrailer = ()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId ? movieId: location?.state?.movie?.id}/videos?api_key=6a1d86e89fa2dd60deb87337daad9873&language=en-US`)
        .then(res=>res.json())
        .then((json) => {
          

          // Check if results array exists and is not empty
          const results = json.results || [];
          
    
          setTrailerView(results);
           
          })
          .catch((err) => {
            console.log(err)
          });
    }

     useEffect(()=>{
        showTrailer()
     })

    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

 
    return (
        <div>
          <Button variant='contained'sx={{color:'black',bgcolor:'white'}} onClick={openModal}>PLAY TRAILER</Button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>trailer</h2>
            
            <YouTube videoId={trailerView.length > 0 ? trailerView[0].key : ''} />

            
          </Modal>
        </div>
      );
}

export default Trailer