import { set } from 'mongoose';
import React, { useState } from 'react'
// import StudentContext from './StudentContext'
import { createContext } from "react";


export const StatusContext = createContext();


const StudentState = (props) => {

    const [cleanerStatus, setCleanerStatus] = useState("status");
    const [driverStatus, setDriverStatus] = useState(true)

    const updateCleanerStatus = (status)=>{
      setCleanerStatus(status)
    }

    const updateDriverStatus = (status)=>{
        setDriverStatus(status)
    }
    

    return (
        <div>
          <StatusContext.Provider value={{cleanerStatus:cleanerStatus, updateCleanerStatus:updateCleanerStatus,driverStatus:driverStatus,updateDriverStatus:updateDriverStatus  }}>
            {props.children}
          </StatusContext.Provider>
        </div>
      )
    }
    
    export default StudentState;