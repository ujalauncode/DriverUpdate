import React, { useEffect, useRef } from 'react';

import GridViewIcon from '@mui/icons-material/GridView';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import settinglogo1 from "../Image/settinglogo1.png"
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import { invoke } from '@tauri-apps/api/tauri';
import '../component/StartScan.css'
import { appWindow } from '@tauri-apps/api/window'



export default function Navbar() {
  const titleBarRef = useRef(null);

  const closeWindow = () => {
  
    window.open('', '_self', '');
    window.close();
  };
 

  const minimizeApp = () => {
    if (appWindow && appWindow.minimize) {
      appWindow.minimize(); // Call your Tauri API method to minimize the window
    } else {
      console.error('Tauri API not available or minimize method not defined.');
    }
  };
  



  return (
    <>
 <div data-tauri-drag-region className="container-fluid" id="titlebar" ref={titleBarRef}>
 <nav className="navbar navbar-expand-lg bg-body-tertiary nb">
  <div className="container-fluid d-flex justify-between">

    <div className='flex'>
    <img src={settinglogo1} alt="" className='logodesign' />
    <a className="navbar-brand navdesign" href="#">   Advanced Driver Update</a>

    </div>
    <div className='mr-5'>
    
  
      <GridViewIcon fontSize="medium" className="nav-icon" />
      <BusinessCenterIcon fontSize="medium" className="nav-icon" />

      <MinimizeIcon  fontSize="medium" className="nav-icon1" onClick={minimizeApp}/>
      <CloseIcon  fontSize="small" color="secondary"  className="nav-icon11" onClick = {closeWindow} />
    </div>   
  </div>
</nav>
 </div>
      
    </>
  )
}
 