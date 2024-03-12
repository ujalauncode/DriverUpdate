import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import giphy from "../Image/giphy.gif";
import ScanRegistry from "./ScanRegistry";
import { invoke } from '@tauri-apps/api/tauri';
import "../component/StartScan.css"
import face from "../Image/face.gif"

export default function StartScan({ value = 0 }) {
  const [driverData, setDriverData] = useState([]);
  const [currentIndexs, setCurrentIndexs] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const fileListRef = useRef();
  const [cleanerStatus, setCleanerStatus] = useState("status");
  const [isScanning, setIsScanning] = useState(true);
  const [scanInterval, setScanInterval] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);
  const [showPopover, setShowPopover] = useState(true);
  const [alertShown, setAlertShown] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState('rgb(0, 0, 0)'); // Initial background color

  useEffect(() => {
    const getRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    };
    const timeout = setTimeout(() => {
      setBackgroundColor(getRandomColor()); // Set random color
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  let intervalId;

  useEffect(() => {
    if (redirectPath) {
      history.push(redirectPath);
    }
  }, [redirectPath, history]);
  useEffect(() => {
    console.log("useEffect running");
    fetchData();
  }, []);
  useEffect(() => {
    if (!isScanning) {
      clearInterval(scanInterval);
    }
  }, [isScanning, scanInterval]);

  

  const handleRedirect = (status, delay) => {
      setTimeout(() => {
          setCleanerStatus(status);  
        //   if (!alertShown) {
        //     alertShown = true;
        //     const confirmed = window.confirm("Redirecting to another page. Click OK to continue or Cancel to stay.");
        //     if (!confirmed) {
        //     }
        // }       
      }, delay);
  };
  
  

  const fetchData = async () => {
    console.log("fetch data running");
    try {
      const response = await invoke('mine_driver');
      const newDriverData = JSON.parse(response);
      setTimeout(() => {
        setShowPopover(false);
      }, 200);
      
      setDriverData(newDriverData);
      console.log(newDriverData)
      setCurrentIndexs(0);
      console.log("get driver route");
        const intervalId = setInterval(() => {
        if (isScanning) {
          setPercentage((prevPercentage) =>
            Math.min(prevPercentage + 100 / newDriverData.length, 100)
          );
          setCurrentIndexs((prevIndex) => prevIndex + 1);
            if (currentIndexs >= newDriverData.length) {
            clearInterval(intervalId);
            setPercentage(100);
          }
        }
      },100);
      setScanInterval(intervalId);
      console.log("first interval id =", intervalId);
  
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const scrollToFileEnd = () => {
    const fileList = fileListRef.current;
    if (fileList) {
      fileList.scrollTop = fileList.scrollHeight;
    }
  };
  const handleScanToggle = () => {
    setIsScanning((prevIsScanning) => !prevIsScanning);
  };


  return cleanerStatus === "status" ? (
    <>
      <div className="StartScan flex justify-content-between">
        <div>
          <img src={giphy} alt="" className="imageofscan mr-3" />
        </div>
        <div>
          <div className="progress">
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${percentage}%` }} aria-valuenow={percentage}aria-valuemin="0"  aria-valuemax="100"
            >
              <span>{percentage.toFixed()}%</span>
            </div>
          </div>
          <span className="ml-16 text-xs mt-16">
            {currentIndexs < driverData.length && (
              <p className="dat">{driverData[currentIndexs].DeviceName}</p>
            )}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <div
          ref={fileListRef}
          style={{ height: "222px", overflowY: "auto" }}
          className="backupregistry1 tableclasses"
        >
          <table className="table table-hover tablescan">
            <thead className="table-secondary fixed	 ">
              <tr className="headdesign">
                <th scope="col" colSpan="1">
                  DriverName
                </th>
                <th scope="col">Version</th>
              </tr>
            </thead>
            <tbody
              className="overflow-y-scroll"
              style={{ maxHeight: "160px", overflowY: "auto" }}
            >
              {Array.isArray(driverData) && driverData.slice(0, currentIndexs + 1).map((driver, index) => {
               
                return (
                  <tr key={index}>
                    <th scope="row">{driver.DeviceName}</th>
                    <th scope="row">{driver.DriverVersion}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div id="pagescanbottom" className="fixed-bottom">
        <button className="btn btn-light designbtnbackup1 px-4" onClick={handleScanToggle}>
          {isScanning ? "Stop Scan" : "Start Scan"}
        </button>
      </div>
      {handleRedirect("scan-registry", 18000)}

      {showPopover && (
      <div className="exclusion-maintesting222" style={{backgroundColor: backgroundColor,transition: 'background-color 1s ease',}}>
      <div className="minenewpop ml-2 mt-4">
        <div className="flex justify-content-evenly">       
      <img src={face} alt="" />
        <div className="  mt-2 text-xs pt-4">
          <h1 className="font-extrabold text-black text-xs">WAIT............</h1>
          <br />
          <h2 className=" text-black text-xs font-bold">
            Scanning system  drivers 
          </h2>
        </div>
        </div>
      </div>
    </div>
      )}
    </>
  ) : (
    <ScanRegistry />
  );
}
