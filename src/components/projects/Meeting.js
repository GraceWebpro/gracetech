import React from 'react';
import meetImg from '../../assets/meet.png'

const Meeting = () => {
  return (
    <div className='meeting'>
        <div className='meet-left'>
            <div className='proj-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent:'center' }} data-aos="fade-down">
                <div className='proj-bdr'></div>
                <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, "sans-seriff"', color: '#0059ff' }}>Need a Project?</h2>
         
            </div>
            <div className='exp-div-display'>
                <div className='exp-div'  data-aos="zoom-in-up" data-aos-duration="500">
                    <h3>Let's Work Together. Fix A Meeting
                    </h3>
                    
                </div>  
                <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                   <div className='img-div'>
                      <img src={meetImg} alt='skill' className='img-bub' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Bubble</strong> </p>
                      <h5>95%</h5>
                    </div>
                  </div>
                  <div className='skill-div' data-aos="zoom-in-up" data-aos-duration="500">
                   <div className='img-div'>
                      <img src={meetImg} alt='skill' className='img-bub' />
                    </div>
                    <div style={{ flexDirection: 'column' }}>
                      <p><strong>Bubble</strong> </p>
                      <h5>95%</h5>
                    </div>
                  </div>
            </div>

           
           
        </div>
      
            <imp src={meetImg} alt='Meeting Image' className='meet-img' />
     
            
    </div>
  )
}

export default Meeting
