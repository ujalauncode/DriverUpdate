import axios from "axios";
import { get, setDriver } from "mongoose";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Danger from "../Image/png-transparent-danger-sign-danger-mark-yellow-removebg-preview.png";
import Clock from "../Image/icons8-clock-50.png";
import Calendar from "../Image/icons8-calendar-50.png";
import Computer from "../Image/icons8-desktop-50.png";
import Logo from "../Image/money-back-in-60-days-guarantee-badge-golden-medal-vector-20372626-removebg-preview.png";
import { invoke } from "@tauri-apps/api/tauri";

export default function BackupRegistry() {
  const [backupType, setBackupType] = useState(null);
  const [backupDate, setBackupDate] = useState([]);
  const [result, setResult] = useState("");
  const [show, setShow] = useState();
  const [hide, setHide] = useState();
  const [latestBackupDates, setLatestBackupDates] = useState([]);
  const [deleteButtonStyle, setDeleteButtonStyle] = useState({
    display: "none",
  });
  const [mydriver, setmydriver] = useState([]);

  const handleFocus = (event) => {
    const rect = event.target.getBoundingClientRect();
    setDeleteButtonStyle({
      display: "block",
    });
  };

  useEffect(() => {
    async function fetchBackupDates() {
      try {
        const responseProductID =  await invoke("__cmd__testing");
        const productID = responseProductID.product_id;
        const response = await axios.get(`https://server-3-y44z.onrender.com/backupdate/${productID}`);

        setLatestBackupDates(response.data.sortedData);
      } catch (error) {
        console.log("Error fetching backup dates: " + error.message);
      }
    }
    fetchBackupDates();
  }, []);

  const handleDelete = async (id) => {
    console.log("handle delete func id =", id);
    try {
      await axios.delete(`https://server-3-y44z.onrender.com/backupdate/${id}`);

      let filterArray = latestBackupDates.filter((date) => date._id !== id);
      console.log(filterArray);

      setLatestBackupDates(filterArray);
    } catch (error) {
      console.error("Error deleting backup date:", error);
    }
  };

  const handleload = async () => {
    if (!show) {
      setShow(true);
    }
  };

  // useEffect(() => {
  //   const getdrivers = async () => {
  //     try {
  //       const responseProductID =  await invoke("__cmd__testing");
  //       const productID = responseProductID.product_id;
  //       console.log('Product ID:', productID);
  //       const response= await axios.get(`https://server-3-y44z.onrender.com/api/outdatedDrivers/${productID}`);
  //       const driverinfo = await response.data;
  //       console.log("my driver =", driverinfo);
  //       setmydriver(driverinfo);
  //     } catch (error) {
  //       console.log("this is errorr", error);
  //     }
  //   };
  //   getdrivers();
  // }, []);

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const responseProductID = await invoke("__cmd__testing");
        const productID = responseProductID.product_id;
        console.log('Product ID:', productID);
        const response = await axios.get(`https://server-3-y44z.onrender.com/api/outdatedDrivers/${productID}`);
        const driverInfo = await response.data;
        console.log("my driver =", driverInfo);
        setmydriver(driverInfo);
      } catch (error) {
        console.log("this is error", error);
      }
    };
    getDrivers();
  }, []);

  return (
    <>
      <div className="backupregistry">
        <div className="backupregistrySecond">Restore Drivers</div>
      </div>
      <div className="backupseconddiv">
        RedClean pro provides complete backup and restore support. To return to
        any previous
      </div>
      <div className="backupregistry11">
        <div className="backupregistry2">
          <div className="backupregistrySecond">Restore Drivers</div>
        </div>
        <ul className="grid">
          <div className="">
            {latestBackupDates && latestBackupDates.map((i, index) => {
              console.log("i =", i);
              const uniqueId = `option${index + 1}`;
              return (
                <li
                  className="text-black flex justify-content-between input-container"
                  key={i._id}
                >
                  <input
                    type="radio"
                    className="btn-check myInput"
                    name="options-base"
                    id={uniqueId}
                    autoComplete="off"
                    onFocus={handleFocus}
                    checked
                  />
                  <label
                    className="btn text-xs font-semibold"
                    htmlFor={uniqueId}
                  >
                    AdvanceDriverUpdateBacku- {i.backupDate}
                  </label>
                  <button
                    id="deleteButton"
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(i._id)}
                  >
                    {" "}
                    <DeleteIcon />
                  </button>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
      <div className="fullbackupandpartial">
        <div className="fullbackuppartialbackupbutton">REBOOT</div>
      </div>
      <div className="newofbackup  ">
        <div class="form-check ml-16 fontofoption1 mt-3">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Create complete backup of all system drivers
          </label>
        </div>
        <div class="form-check ml-16 fontofoption1 ">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Create complete backup of the specific drivers
          </label>
        </div>
      </div>

      <div
        id="pagescanbottom2"
        className="fixed-bottom  mb-3 flex justify-content-end"
      >
        <button
          className="btn btn-light designbtn111 mr-2 px-10	 "
          onClick={handleload}
        >
          Load Backup
        </button>
      </div>

      {show && (
        <div className="exclusion-main1">
          <div className="container-darfrag testing-class">
            <div className="lastScreenResult">
              <div className="lastScreenResultSecond text-sm">
                Creating Backup of All Drivers
              </div>
            </div>
            <div className="tbwidth tableclasses1  ">
              <table class="table table-hover ">
                <thead className="table-secondary fixed  newto">
                  <tr className="mynewheaddesign flex">
                    <th scope="col">
                      <div class="form-check">
                        <span
                          className="form-check-label font-bold"
                          htmlFor="allselect"
                        >
                          Driver Detail
                        </span>
                      </div>
                    </th>
                    <th scope="col" colspan="1" className="dobold">
                      Version
                    </th>
                    <th scope="col">Uninstall</th>
                  </tr>
                </thead>
                <tbody>
                  {mydriver &&
                    mydriver.map((d, i) => {
                      if (d.DeviceName) {
                        return (
                          <tr key={i}>
                            <th scope="row">
                              <span className="text-xs">{d.DeviceName}</span>
                            </th>
                            <td colSpan="1">
                              <span className="text-xs">{d.DriverVersion}</span>
                            </td>
                            <td className="font-bold text-xs text-blue-500 underline setdriverinfor ml-20">
                            {d.outdated ? null : (
            <span onClick={(e) => setHide(true)}>
              Uninstall Update
            </span>
          )}
                            </td>
                          </tr>
                        );
                      } else {
                        return null; // Render nothing if DeviceName is not found
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="pagescanbottom21"
            className="fixed-bottom  mb-3 flex justify-content-end bg-gray-100"
          >
            <button
              className="btn btn-light designbtn1 border-black	text-black mr-3 "
              onClick={(e) => setShow(false)}
            >
              Finish
            </button>
          </div>
        </div>
      )}

      {hide && (
        <div className="exclusion-main">
          <h1
            style={{ marginLeft: "54px", marginTop: "12px" }}
            className="font-extrabold"
          >
            <b>uninstall update of  all updated drivers in minutes</b>
          </h1>
          <div onClick={(e) => setHide(false)}>
            <span className="close"></span>
          </div>
          <div className="New-box">
            <div className="row ">
              <div className="flex justify-content-between">
                <img src={Danger} alt="File Explorer" className="boxicons" />
                <div className="popdata">
                  <h4 className="font-extrabold">
                    1 Drivers Selected For Uninstall Update!
                  </h4>
                  <p className="font-medium text-xs mt-1">
                    To uninstall update of drivers click on Purchase Now button.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h5
            style={{ marginLeft: "34px", marginTop: "22px" }}
            className="text-xs"
          >
            Advanced Driver Updater can quickly and easily update these drivers
            to restore optimum
            <br></br>performance to your PC.If you want to delete update may be your system can faced problems
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
    </>
  );
}
