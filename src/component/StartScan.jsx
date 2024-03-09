import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import giphy from "../Image/giphy.gif";
import ScanRegistry from "./ScanRegistry";
import { invoke } from '@tauri-apps/api/tauri';
import "../component/StartScan.css"

export default function StartScan({ value = 0 }) {
  const [driverData, setDriverData] = useState([]);
  const [currentIndexs, setCurrentIndexs] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const fileListRef = useRef();
  const [cleanerStatus, setCleanerStatus] = useState("status");
  const [isScanning, setIsScanning] = useState(true);
  const [scanInterval, setScanInterval] = useState(null);
  const [initialInterval, setInitialScanInterval] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);
  const [driverInfo, setDriverInfo] = useState('');
  const [alertShown, setAlertShown] = useState(false);

  let intervalId;
  // const invoke = window.__TAURI__.invoke

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
          // invoke("tauri", "open", {
          //     uri: "scan-registry",
          //     webviewId: "webview",
          // });
          
          // if (!alertShown) {
          //     alertShown = true;
          //     const confirmed = window.confirm("Redirecting to another page. Click OK to continue or Cancel to stay.");
          //     if (!confirmed) {
          //         // Handle cancellation, if needed
          //     }
          // }
          
      }, delay);
  };
  
  

  const fetchData = async () => {
    console.log("fetch data running");
    try {
      const response = await invoke('mine_driver');
      const newDriverData = JSON.parse(response);

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
            handleRedirect("scan-registry", 1000);
          }
        }
      },100);
      setScanInterval(intervalId);
      console.log("first interval id =", intervalId);
  
      // Clear interval when component unmounts
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
                    {/* <th scope="row">{driver.DriverStatus}</th> */}
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
      {handleRedirect("scan-registry", 19000)}
    </>
  ) : (
    <ScanRegistry />
  );
}
