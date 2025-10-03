import React from 'react'
import './Process.css'
import ProcessCard from './ProcessCard'

const WorkingProcess = () => {
  return (
    <div className='work-process'>
        <div className='pro-h' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent:'center' }} data-aos="fade-down">
              <div className='pro-bdr'></div>
              <h2 style={{ textAlign: 'center', fontFamily: 'Dancing Script, cursive, Arial, "sans-seriff"', color: '#0059ff' }}>Working Process</h2>
              <div className='pro-bdr'></div>
        </div>
        <p className='pro-title' data-aos="fade-up" data-aos-duration="500">Your Dream Website In Just Few Steps</p>
        <ProcessCard />
    </div>
  )
}

export default WorkingProcess
