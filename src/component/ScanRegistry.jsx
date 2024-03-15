import Setting from "./Setting";
import React from 'react';
import { useEffect, useState, useContext } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Danger from "../Image/png-transparent-danger-sign-danger-mark-yellow-removebg-preview.png";
import Clock from "../Image/icons8-clock-50.png";
import Calendar from "../Image/icons8-calendar-50.png";
import Computer from "../Image/icons8-desktop-50.png";
import Logo from "../Image/money-back-in-60-days-guarantee-badge-golden-medal-vector-20372626-removebg-preview.png";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { invoke } from "@tauri-apps/api/tauri";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import check from "../Image/check.png";
import "../component/StartScan.css";
import { StatusContext } from "../context/StatusState";

export default function ScanRegistry() {
  let ContextValue = useContext(StatusContext);
  const [cleanerStart, setCleanerStart] = useState("status");
  const [exclusionStatus, setExclusionStatus] = useState(false);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const currentDate = new Date().toLocaleDateString();
  const [systemInformation, setSystemInformation] = useState();
  const [showdriver, setShowdriver] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [driversUpdated, setDriversUpdated] = useState(false);
  const [outdatedDriverCount, setOutdatedDriverCount] = useState(0);
  const [systemInfo, setSystemInfo] = useState();
  const [updatesuccessful, setupdatesuccessful] = useState();
  const [deviceName, setDeviceName] = useState();
  const [count, setCount] = useState(null);
  const [error, setError] = useState();
  const [DriverVersion, setDriverVersion] = useState();
  const [updateId, setUpdateId] = useState();
  const [loading, setLoading] = useState(true);
  const [updateDriverStatus, setUpdateDriverStatus] = useState(false);

  const handleupdateofdriver = (_id, DeviceName, DriverVersion) => {
    setUpdateDriverStatus(true);
    if (!hide) {
      setHide(true);
      setDeviceName(DeviceName);
      setDriverVersion(DriverVersion);
      setDriversUpdated(true);
      // handleUpdateDriverStatus(_id);
      setUpdateId(_id);
    }
  };

  useEffect(() => {
    if (isScanning) {
      const intervalId = setInterval(() => {
        setPercentage((prevPercentage) => {
          const nextPercentage = Math.min(prevPercentage + 1, 100);
          if (nextPercentage === 100) {
            clearInterval(intervalId);
            setUpdateCompleted(true);
          }
          return nextPercentage;
        });
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isScanning]);
  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await invoke("__cmd__testing");
        const a = {
          cpu_info: response.cpu_info,
          os_info: response.os_info,
          disk_info: response.disk_info,
          memory_info: response.memory_info,
          video_controller_info: response.video_controller_info,
          product_id: response.product_id,
        };
        setSystemInfo(a);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSystemInfo();
  }, []);

  const outdatedDriverNumbers = [
    20, 26, 32, 28, 37, 27, 40, 22, 18, 34, 24, 39, 17, 46, 38, 42, 33, 23, 21,
    26,
  ];

  const getRandomNumber = () => {
    const randomIndex = Math.floor(
      Math.random() * outdatedDriverNumbers.length
    );
    return outdatedDriverNumbers[randomIndex];
  };

  const [selectedNumber, setSelectedNumber] = useState(() => {
    const storedNumber = localStorage.getItem("selectedNumber");
    return storedNumber ? parseInt(storedNumber, 10) : getRandomNumber();
  });
  const postOutdatedDrivers = async (outdatedDrivers, productID) => {
    try {
      const res = await axios.post(
        "https://server-3-y44z.onrender.com/api/outdatedDrivers",
        { outdatedDrivers, productID }
      );
      ContextValue.updateDriverStatus(true);
      alert("outdated drivers stored");
      console.log("Outdated drivers stored in MongoDB:", res.data);
    } catch (error) {
      console.error("Error posting outdated drivers:", error);
      alert("Error posting outdated drivers", error);
    }
  };

  useEffect(() => {
    const fetchDataAndStoreOutdatedDrivers = async () => {
      ContextValue.updateDriverStatus(false);
      try {
        const responseProductID = await invoke("__cmd__testing");
        const productID = responseProductID.product_id;

        const responseDriver = await invoke("mine_driver");
        const driverinfo = JSON.parse(responseDriver);

        let outdatedDrivers = [];
        let updatedDrivers = [];

        driverinfo.forEach((driver, index) => {
          if (index + 1 <= selectedNumber) {
            outdatedDrivers.push({
              ...driver,
              DriverStatus: "Outdated",
              StatusColor: "#2a2a2a",
              StatusIcon: <ErrorIcon style={{ fontSize: "small" }} />,
              StatusTextWeight: "900",
            });
          } else {
            updatedDrivers.push({
              ...driver,
              DriverStatus: "Up to date",
              StatusColor: "#0C6B37",
              StatusIcon: <CheckIcon style={{ fontSize: "small" }} />,
              StatusTextWeight: "normal",
            });
          }
        });

        postOutdatedDrivers(outdatedDrivers, productID);
        setOutdatedDriverCount(outdatedDrivers.length);
        return { outdatedDrivers, updatedDrivers, productID };
      } catch (error) {
        console.error("Error fetching and storing driver information:", error);
      }
    };



    const fetchAndMergeDrivers = async () => {
      try {
        const { outdatedDrivers, updatedDrivers, productID } =
          await fetchDataAndStoreOutdatedDrivers();
        let mergedDrivers;

        // Merge drivers
        const res = await axios.get(
          `https://server-3-y44z.onrender.com/api/outdatedDrivers/${productID}`
        );

        const driversData = res.data;
        if(driversData.length>0){
          console.log("if driver response")
          mergedDrivers = [...driversData, ...updatedDrivers];
          setCount(driversData.length)
          mergedDrivers.sort((a, b) => a.DriverStatus.localeCompare(b.DriverStatus));
    
          setSystemInformation(mergedDrivers);
          setLoading(false);
        }
        
        else if(outdatedDrivers.length>0){
          mergedDrivers = [...outdatedDrivers, ...updatedDrivers];
          setCount(outdatedDrivers.length)

          mergedDrivers.sort((a, b) => a.DriverStatus.localeCompare(b.DriverStatus));
    
          setSystemInformation(mergedDrivers);
          setLoading(false);
        }
        console.log("Outdated Drivers Response:", driversData, outdatedDrivers);
       

      } catch (error) {
        console.error("Error fetching and merging drivers:", error);
      } finally {
        // Hide loading indicator here (e.g., setLoading(false))
      }
    };




    fetchAndMergeDrivers();
  }, [selectedNumber]);



    // const fetchAndMergeDrivers = async () => {
    //   try {
    //     const { outdatedDrivers, updatedDrivers, productID } = await fetchDataAndStoreOutdatedDrivers();
    
    //     const countRes = await axios.get(`https://server-3-y44z.onrender.com/api/outdatedDrivers/count/${productID}`);
    //     const count = countRes.data.count;
    
    //     const res = await axios.get(`https://server-3-y44z.onrender.com/api/outdatedDrivers/${productID}`);
    //     const driversData = res.data;
    
    //     const mergedDrivers = [...updatedDrivers, ...driversData];
    //     console.log("merge driver =", mergedDrivers);
    //     mergedDrivers.sort((a, b) => a.DriverStatus.localeCompare(b.DriverStatus));
    
    //     setCount(count);
    //     setSystemInformation(mergedDrivers);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching and merging drivers:", error);
    //     setError(true);
    //   } finally {
    //     // Hide loading indicator here (e.g., setLoading(false))
    //   }
    // };
    



  useEffect(() => {
    localStorage.setItem("selectedNumber", selectedNumber);
  }, [selectedNumber]);

  const handleSelect = (e) => {
    const { name, checked } = e.target;
    let tempDrivers;

    if (name === "allselect") {
      tempDrivers = systemInformation.map((driver) => {
        return { ...driver, ischecked: checked };
      });
    } else {
      tempDrivers = systemInformation.map((driver) =>
        driver.name === name ? { ...driver, ischecked: checked } : driver
      );
    }

    setSystemInformation(tempDrivers);
    const selectedOutdatedCount = tempDrivers.filter(
      (driver) => driver.ischecked && driver.DriverStatus === "Outdated"
    ).length;
    setSelectedCount(selectedOutdatedCount);
  };

  const updatedrive = () => {
    console.log("updateId =", updateId);
    if (!showdriver) {
      handleUpdateDriverStatus(updateId);
      setShowdriver(true);
      setIsScanning(true);
      setTimeout(() => {
        setShowdriver(false);
        setTimeout(() => {
          setupdatesuccessful(true);
        }, 100);
      }, 10000);
      setHide(false);
    }
  };

  const handleUpdateDriverStatus = async (_id) => {
    try {
      const response = await axios.put(
        `https://server-3-y44z.onrender.com/api/outdatedDrivers/${_id}`
      );
      if (response.status === 200) {
        console.log("Driver status updated successfully");
        fetchAndMergeDrivers();
        // removeUpdatedDriverFromLocalStorage(_id);
      } else {
        console.error("Failed to update driver status");
      }
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  const removeUpdatedDriverFromLocalStorage = (driverId) => {
    try {
      const mergedDriversString = localStorage.getItem("mergedDrivers");
      if (mergedDriversString) {
        let mergedDrivers = JSON.parse(mergedDriversString);
        mergedDrivers = mergedDrivers.filter(
          (driver) => driver._id !== driverId
        );
        localStorage.setItem("mergedDrivers", JSON.stringify(mergedDrivers));
      }
    } catch (error) {
      console.error("Error removing updated driver from local storage:", error);
    }
  };

  // useEffect((productID) => {
  //   const getd = async () => {
  //     try {
  //       const responseProductID = await invoke("__cmd__testing");
  //       const productID = responseProductID.product_id;
  //       axios
  //         .get(
  //           `https://server-3-y44z.onrender.com/api/outdatedDrivers/count/${productID}`
  //         )
  //         .then((response) => {
  //           const a = setCount(response.data.count);
  //           console.log("this is count", response.data.count);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching outdated drivers count:", error);
  //           setCount(0);
  //         });
  //     } catch (error) {
  //       console.error("Error invoking command:", error);
  //     }
  //   };
  //   getd();
  // }, []);
  const d = new Date();
  // useEffect(() => {
  //   const getd = async () => {
  //     try {
  //       const responseProductID = await invoke("__cmd__testing");
  //       const productID = responseProductID.product_id;
  //       axios
  //         .get(
  //           `https://server-3-y44z.onrender.com/api/outdatedDrivers/count/${productID}`
  //         )
  //         .then((response) => {
  //           const a = setCount(response.data.count);
  //           console.log("this is count", response.data.count);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching outdated drivers count:", error);
  //           setCount(0);
  //         });
  //     } catch (error) {
  //       console.error("Error invoking command:", error);
  //     }
  //   };
  //   getd();
  // }, []);
  


  return cleanerStart === "status" ? (
    <>
      <div
        className={`${
          updateDriverStatus === false ? "" : "blur-sec-driver"
        } container-fluid`}
      >
        <div className="row flex justify-content-center">
          <div className="col-12 col-lg-12 col-md-12 col-sm-12">
            <div className=" scantopoftable ">
              <div className="designspan font-black text-small">
                <WatchLaterIcon /> {count} Out-Of-Date Drivers Found
              </div>
              <button
                className="btn btn-light designbtn"
                onClick={(e) => setExclusionStatus(true)}
              >
                Update All
              </button>
            </div>
            {selectedCount > 0 && (
              <p className="text-xs mx-4 mt-1 font-bold">
                {selectedCount} Outdated driver(s) selected!
              </p>
            )}
            <div className="tbwidth tableclasses1  ">
              <table className="table table-hover ">
                <thead className="table-secondary fixed  newto">
                  <tr className="mynewheaddesign flex">
                    <th scope="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="allselect"
                          id="allselect"
                          name="allselect"
                          onChange={handleSelect}
                        />
                        <label
                          className="form-check-label font-bold"
                          htmlFor="allselect"
                        >
                          Driver Detail
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      colSpan="1"
                      className="dobold latestpadding"
                    >
                      Status
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {systemInformation &&
                    systemInformation.map((driver, i) => {
                      return (
                        <tr key={i.id}>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={`flexCheckDefault-${i}`}
                                name={driver.DeviceName}
                                checked={driver.ischecked}
                                onChange={handleSelect}
                                style={{
                                  display:
                                    driver.DriverStatus === "Up to date"
                                      ? "none"
                                      : "block",
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexCheckDefault-${i}`}
                              >
                                {driver.DeviceName}
                              </label>
                            </div>
                          </th>
                          <td colSpan="2" style={{ paddingLeft: "8rem" }}>
                            <br />
                            <span
                              className="text-xs font-black newoutdatedd "
                              style={{
                                color: driver.StatusColor,
                                fontWeight: driver.StatusTextWeight,
                              }}
                            >
                              {driver.DriverStatus}{" "}
                              {driver.DriverStatus === "Outdated" ? (
                                <ErrorIcon style={{ fontSize: "small" }} />
                              ) : (
                                <CheckIcon style={{ fontSize: "small" }} />
                              )}
                              {/* {driver.StatusIcon} */}
                            </span>
                            <br />
                            <span className="text-xs ">
                              {" "}
                              Version:{driver.DriverVersion}
                            </span>
                          </td>
                          <td>
                            {driver.DriverStatus === "Outdated" ? (
                              <span
                                className="font-bold text-xs text-blue-500 underline setdriverinfor "
                                onClick={() =>
                                  handleupdateofdriver(
                                    driver._id,
                                    driver.DeviceName,
                                    driver.DriverVersion
                                  )
                                }
                              >
                                Update Driver
                              </span>
                            ) : (
                              <span className="font-bold text-xs text-green-500"></span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="pagescanbottom" className="fixed-bottom ">
          <button
            className="btn btn-light designbtn1 "
            onClick={(e) => setShow(true)}
          >
            Learn More
          </button>
          <span className="mt-6 font-serif text-xs font-medium text-white">
            To Update all rest Drivers click on Update All
          </span>
          <button
            className="btn btn-light designbtn2"
            onClick={(e) => setExclusionStatus(true)}
          >
            Update All
          </button>
        </div>
      </div>
      {hide && (
        <div className="exclusion-main">
          <h1
            style={{ marginLeft: "54px", marginTop: "12px" }}
            className="font-extrabold"
          >
            <b>{deviceName} </b>
          </h1>
          <div onClick={(e) => setHide(false)}>
            <span
              className="close"
              onClick={(e) => setUpdateDriverStatus(false)}
            ></span>
          </div>
          <div className="flex justify-content-evenly">
            <div className="designupdate">
              <div className="design">
                <span className="font-bold">Driver Status</span>
                <br />
                <button className="btn btn-primary mt-2 text-xs rounded-md	">
                  OUTEDATED <WatchLaterIcon sx={{ fontSize: 15 }} />
                </button>
                <br />
              </div>

              <div className="mtgiven ">
                <span className="font-bold ml-2">Availble</span>
                <span className="flex justify-content-between text-xs mx-2 mt-4">
                  Version: <p>{DriverVersion}</p>
                </span>
                <br />
                <span className="flex justify-content-between text-xs mx-2">
                  Date: <p>......</p>
                </span>
              </div>
            </div>
            <div className="designupdate1">
              <h1 className="font-semibold">Register now to enjoy:</h1>
              <div className="mt-4 mb-9">
                <span className="font-thin text-sm mt-3 my-2">
                  <CheckCircleIcon color="primary" sx={{ fontSize: 15 }} />{" "}
                  Update drivers in one click
                </span>
                <br />
                <span className="font-thin text-sm">
                  <CheckCircleIcon color="primary" sx={{ fontSize: 15 }} />{" "}
                  Accelerated download
                </span>
                <br />
                <span className="font-thin mb-4 text-sm">
                  <CheckCircleIcon color="primary" sx={{ fontSize: 15 }} />{" "}
                  Largest driver database
                </span>
              </div>

              <p className="text-xs font-bold">Save time and manual effort</p>

              <div className="desbtn">
                <button
                  className="btn btn-light bg-green-700 mx-2 px-3 "
                  onClick={updatedrive}
                >
                  Update
                </button>
                <button className="btn btn-light bg-gray-400  px-3 ">
                  {" "}
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {exclusionStatus && (
        <div className="exclusion-main">
          <h1
            style={{ marginLeft: "54px", marginTop: "12px" }}
            className="font-extrabold"
          >
            <b>Update all your drivers in minutes</b>
          </h1>
          <div onClick={(e) => setExclusionStatus(false)}>
            <span className="close"></span>
          </div>
          <div className="New-box">
            <div className="row ">
              <div className="flex justify-content-between">
                <img src={Danger} alt="File Explorer" className="boxicons" />
                <div className="popdata">
                  <h4 className="font-extrabold">
                    {count} Outdated Drivers Found !
                  </h4>
                  <p className="font-medium text-xs mt-1">
                    To update outdated drivers clickon Purchase Now button.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h5
            style={{ marginLeft: "34px", marginTop: "22px" }}
            className="text-sm"
          >
            Advanced Driver Updater can quickly and easily update these drivers
            to restore optimum
            <br></br>performance to your PC
          </h5>
          <div className="row flex justify-content-between mt-3 mb-4">
            <div className="col-3 ml-8">
              <div>
                <img
                  src={Clock}
                  alt="File Explorer"
                  className="box-icon ml-6"
                />
              </div>
              <div className="text-xs font-semibold">
                <h6>
                  Easy to use , Safe <br /> and saves your time .{" "}
                </h6>{" "}
              </div>
            </div>

            <div className="col-3">
              <div>
                {" "}
                <img
                  src={Computer}
                  alt="File Explorer"
                  className="box-icon ml-6"
                />
              </div>
              <div className="text-xs font-semibold">
                <h6>
                  Get the most out <br /> of your PC
                </h6>{" "}
              </div>{" "}
            </div>
            <div className="col-3">
              <div>
                {" "}
                <img
                  src={Calendar}
                  alt="File Explorer"
                  className="box-icon ml-6"
                />
              </div>
              <div className="text-xs font-semibold">
                <h6>
                  Ensure Long lasting <br />
                  performance
                </h6>{" "}
              </div>{" "}
            </div>
          </div>
          <div className="footer bottom-0">
            <div className="row">
              <div className="flex justify-content-between ">
                <div className="flex">
                  <img src={Logo} alt="Logo" className="box-icon11" />
                  <span className=" font-serif text-xs font-medium text-white ml-1 mt-3">
                    60 Days Money Back Guarantee
                    <br />
                    No Questions Asked
                  </span>
                </div>
                <a
                  href="https://cleanersite.netlify.app/checkout"
                  className="btn btn-light bg-green-700 designbtn2 px-3"
                >
                  Purchase Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && (
        <div className="exclusion-main1">
          <div className="container-darfrag testing-class ">
            <div className="">
              <div className="lastScreenResultSecond2  ml-10">
                <span className="text-lg font-bold">
                  Updating the outdated drivers may increase the system speed
                </span>
                <p className="text-xs font-normal font-sans">
                  Advance Driver Updater's benefits can include faster
                  performance,increased startup speed,
                  <br /> and fewer issue message when regularly used
                </p>
              </div>
            </div>
            <div className="StartScan flex justify-content-between againedit">
              <table className="table table-bordered">
                <thead>
                  <th scope="col" className="pl-14">
                    Total Outdated Drivers
                  </th>
                  <th scope="col" className="pl-52">
                    Status
                  </th>
                </thead>
                <tbody>
                  <th scope="row" className="pl-14">
                    2 Outdated drivers
                  </th>
                  <th className="pl-52">Out-Dated</th>
                </tbody>
              </table>
            </div>
            <span className="text-xs pl-32">
              To update the remaining outdated drivers click{" "}
              <a className="underline">Purchase now</a>{" "}
            </span>
            <div className="footer2 bottom-0">
              <div className="row">
                <div className="flex justify-content-between ">
                  <div className="flex">
                    <img src={Logo} alt="Logo" className="box-icon112" />
                    <span className="  text-xs font-medium text-black ml-1 mt-2.5">
                      <span className="font-bold text-sm">
                        {" "}
                        Improve performance, or your money back
                      </span>
                      <br />
                      <span className="font-medium">
                        Rest assured, If you are not completely happy with the
                        product, contact us within 60 days of your purchase and
                        we will refund your money.{" "}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="pagescanbottomscan"
            className="fixed-bottom   flex justify-content-end bg-gray-100"
          >
            <button className="btn btn-light designbtn1 border-black text-black">
              View outdated driver
            </button>
            <a
              className="btn btn-light designbtn1 mr-2 border-black bg-yellow-700 text-white"
              href="https://cleanersite.netlify.app/checkout"
            >
              purchase Now{" "}
            </a>
          </div>
        </div>
      )}
      {/* for update popup  */}
      {showdriver && (
        <div id="" className="exclusion-maintesting">
          <div className="upedit">
            <h1 style={{ marginLeft: "10px" }} className="font-extrabold pt-2">
              <b className="text-white">Update all your drivers in minutes</b>
            </h1>
            {/* <div onClick={(e) => setShowdriver(false)}>
              <span className="closeagain "></span>
            </div> */}
          </div>
          <div className="minenewpop">
            <div className="flex place-content-evenly mt-2 text-xs pt-2">
              <span className=""> Device Name : {deviceName}</span>
            </div>
            <div className="StartScan flex justify-content-between">
              <div>
                <div className="progress11">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                  >
                    <span>{percentage.toFixed()}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="pagescanbottomscanagain"
            className="fixed-bottom   flex justify-content-end bg-gray-100"
          >
            <a
              className="btn btn-light designbtn10 mr-2 border-black bg-green-700 text-white px-3"
              href=""
              onClick={(e) => setShowdriver(false)}
            >
              Ok{" "}
            </a>
          </div>
        </div>
      )}
      {updatesuccessful && (
        <div className="exclusion-maintesting22">
          <div className="upedit22">
            <h1 style={{ marginLeft: "10px" }} className="font-extrabold pt-2">
              <b className="text-white">Update drivers has been updated</b>
            </h1>
          </div>
          <div className="minenewpop ml-2 mt-3 flex justify-content-evenly">
            <img src={check} alt="" className="mt-2 checksize" />

            <div className=" place-content-evenly mt-2 text-xs pt-2">
              <h1 className="font-bold text-black text-xs">SUCCESSFULL!!!</h1>
              <br />
              <span className=" text-black text-xs">
                You are now getting maximum benifit from the device
              </span>
            </div>
          </div>
          <div
            id="pagescanbottomscanagain22"
            className="fixed-bottom   flex justify-content-end bg-gray-100"
          >
            <a
              className="btn btn-light designbtn100 mr-2 border-black bg-green-700 text-white px-3"
              href=""
              onClick={(e) => {
                setupdatesuccessful(false);
                setUpdateDriverStatus(false);
              }}
            >
              Ok{" "}
            </a>
          </div>
        </div>
      )}
      {loading && (
        <div className="exclusion-maintesting22222">
          <div className="minenewpop ml-2 mt-4">
            <div className="">
              <div className="spinner-border ml-8" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <Setting value="Scan" />
  );
}
