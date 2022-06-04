import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'

const Banner = ({showBanner, setShowBanner, bannerPhrase}) => {
  
  useEffect(()=>{
    if(showBanner){
      const timer = setTimeout(()=>{
        setShowBanner(false);
      }, 5000)

      return ()=>{
        clearTimeout(timer)
      }
    }
  },[showBanner])

  return (
    <div className='fixed-top' >
      <Alert 
        show={showBanner}
        onClose={()=>setShowBanner(false)} 
        dismissible 
        variant={bannerPhrase === 'Password copied successfully!' ? 'success' : 'danger'}>
          {bannerPhrase}</Alert>
      
    </div>
  )
}

export default Banner
