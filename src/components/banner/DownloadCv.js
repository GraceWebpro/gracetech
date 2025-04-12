import React from 'react'
//import { GiSaveArrow } from "react-icons/gi";
import { Link } from 'react-router-dom';

const DownloadCv = () => {
  return (
    <div>
        
        <Link
               to="projects"
               className="cv-btn"
             >
            <span>View Our Work</span>
            </Link>
       
    </div>
  )
}

export default DownloadCv
