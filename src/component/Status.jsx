import React, { useState, useEffect, useRef } from "react";
import StartScan from "./StartScan";
import desktop from "../Image/desktop.png";
import WindowIcon from "@mui/icons-material/Window";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import intel from "../Image/intel.png";
import minewin from "../Image/minewin.png";
// import grapgics from "../Image/gragics.jpg"
import { invoke } from "@tauri-apps/api/tauri";

import giphy from "../Image/giphy.gif";
import graph from "../Image/graph.png"
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

function Status() {
  const [cleanerStart, setCleanerStart] = useState("status");
  const [systemInfo, setSystemInfo] = useState();
  const [error, setError] = useState(null);
  const [driverData, setDriverData] = useState([]);
  const [driverCount, setDriverCount] = useState(0);
  const [comparisonResult, setComparisonResult] = useState([]);
  const [lastScanDateTime, setLastScanDateTime] = useState(null);
  const [outdatedDriverCount, setOutdatedDriverCount] = useState(0);
  const [systemInformation, setSystemInformation] = useState();
  const [count, setCount] = useState();
  const [latestBackupDate, setLatestBackupDate] = useState('');
  const [d,setd]=useState([])
  const buttonRef = useRef(null);

  useEffect(() => {
    const startScanAutomatically = () => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    };
    startScanAutomatically();
  }, []);

const handleStartScan = () => {
    setCleanerStart("scan-registry");
  };

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await invoke("__cmd__testing");
        const diskInfoGB = Array.isArray(response.disk_info)
          ? response.disk_info.map((size) => `${size} GB`)
          : [];
        const memoryInfoGB = Array.isArray(response.memory_info)
          ? response.memory_info.map((size) => `${size} GB`)
          : [];
        const a = {
          cpu_info: response.cpu_info,
          os_info: response.os_info,
          disk_info: response.disk_info,
          memory_info: response.memory_info,
          video_controller_info: response.video_controller_info,
          product_id:response.product_id
        };
        setSystemInfo(a);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSystemInfo();
  }, []);

  useEffect(() => {
    axios.get('https://server-3-y44z.onrender.com/api/outdatedDrivers/count')
      .then(response => {
        setCount(response.data.count || 0);
      })
      .catch(error => {
        console.error('Error fetching outdated drivers count:', error);
        setCount(0);
      });
  }, []);
  
  useEffect(() => {
    async function fetchLatestBackupDate() {
      try {
        const response = await axios.get('https://server-3-y44z.onrender.com/backupdate');
        const data = response.data;
        // http://16.171.160.250:3000/backupdate
  
        if (data.sortedData && data.sortedData.length > 0) {
          const latestDate = data.sortedData[0].backupDate;
          setLatestBackupDate(latestDate);
        } else {
          setLatestBackupDate('No backup done yet');
        }
      } catch (error) {
        setError('Error fetching latest backup date');
      } finally {
        // setLoading(false);
      }
    }
  
    fetchLatestBackupDate();
  }, []);
  
  return cleanerStart === "status" ? (
    <>
      <div className="container-fluid">
        <div className="row">
          <div></div>
          <div className="col-12 col-lg-12 scan-container mx-2">
            <div>
              <button className="btn text-xs font-semibold btnofstatus">
                Status
              </button>
              <div className="scan-status ml-4">
                <div className="fix-section">
                  <div className="fix">
                  {count !== null && (
                    <h3 className="font-bold text-medium font-sans">
                      {count}  outdated driver found
                    </h3>
                  )}
                    <h6 className="text-xs font-medium">
                    Last Scan : {latestBackupDate}
                    </h6>

                    <h6 className="text-xs font-medium ">
                      Recommended Action:
                    </h6>
                    <a
                      className="text-sm font-medium "
                      href="https://cleanersite.netlify.app/checkout"
                    >
                      Upgrade to full version
                    </a>
                  </div>
                </div>
                <div className="recommented-section ml-16">
                  <h6 className="first recommented-section text-xs font-medium">
                    Driver Status
                  </h6>
                  <h5 className="font-semibold text-base font-sans mt-2">
                    Outdated
                    <i className="fa-solid fa-circle-info recom-i mx-1 text-black"></i>
                  </h5>
                </div>
              </div>
            </div>
            <div className="start-container">
              <h4 className="status-h4">
                Deep Scan clean, and optimize your registry to help boost the
                performance of your PC !
              </h4>
              <button
                className="button-scan mt-3 ml-16"
                role="button"
                onClick={(e) => setCleanerStart("scan-registry")}
              >
                Start Scan Now
              </button>
            </div>
          </div>
        </div>
        <div id="page2" className="fixed-bottom mb-3 ">
          <div className="right2">
            <img src={desktop} alt="" className="imgdesign" /><br/>
            {systemInfo && (
              <span className="font-bold text-xs text-black designpid">{systemInfo.product_id}</span>
            )}
          </div>
          
            <div>
              {systemInfo && (
                <div className="left2">
                  <div className="flex ">
                    <div className="ml-5">
                      <WindowIcon color="primary" className="box-icon " />
                    </div>
                    <div className="flex justify-content-between ">
                      <h6 className="text-black  ml-4 mt-2 ">
                        <div className="text-xs">System</div>{" "}
                        <h5 className="mr-3 text-sm font-semibold font-sans whitespace-nowrap	truncate-text">
                          {systemInfo.os_info}
                        </h5>
                      </h6>
                      <h6 className="text-black  ml-9 mt-2">
                        <div className="text-xs">Memory(RAM)</div>{" "}
                        <h5 className="ml-7 text-sm font-semibold font-sans">
   
                 {systemInfo.memory_info} GB
                        </h5>
                      </h6>
                      <h6 className="text-black  ml-9 mt-2">
                        <div className="text-xs whitespace-nowrap	">
                          Hard Drive{" "}
                        </div>{" "}
                        <h5 className="text-sm font-semibold font-sans whitespace-nowrap	">
                          {systemInfo && systemInfo.disk_info} GB
                        </h5>
                      </h6>
                    </div>
                  </div>
                  <ul className="ml-5">
                    <div className="flex mt-2">
                      <img src={intel} alt="" className="box-icon " />
                      <li className="text-black ">
                        <h6 className="disable text-xs">Processor</h6>{" "}
                        <h5 className="text-sm font-semibold font-sans whitespace-nowrap	">
                          {systemInfo.cpu_info
                         }
                        </h5>{" "}
                      </li>
                    </div>
                    <div className="flex mt-2">
                      <img src={graph} alt=""  className="box-icon "/>
                      <li className="text-black ">
                        <h6 className="text-xs">Graphics</h6>{" "}
                        <h5 className="text-sm font-semibold font-sans">
                          {systemInfo.video_controller_info}
                        </h5>{" "}
                      </li>
                    </div>
                  </ul>
                </div>
              )}
            </div>
         
        </div>
      </div>
    </>
  ) : (
    <StartScan />
  );
}

export default Status;
