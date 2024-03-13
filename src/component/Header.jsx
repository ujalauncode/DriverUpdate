import React, { useState, useEffect, useContext } from "react";
import Status from "./Status";
import ScanRegistry from "./ScanRegistry";
import Dafrag from "./Dafrag";
import BackupRegistry from "./BackupRegistry";
import Setting from "./Setting";
import RegisterPopupComponent from "./RegisterPopupComponent";
import Navbar from "./Navbar";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import HomeIcon2 from "../Image/HomeIcon2.png";
import search from "../Image/search.png";
import restore from "../Image/restore.png";
import Setting4 from "../Image/Setting4.png";
import keys from "../Image/keys.png";
import Buy from "./Buy";
import backk from "../Image/backk.png";
import { StatusContext } from "../context/StatusState";

function Header() {
  let ContextValue = useContext(StatusContext);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);

  // document.addEventListener('DOMContentLoaded', () => {
  //   setTimeout(()=>{
  //     invoke('close_splashscreen')
  //   } , 6_000)
  // })

  const handleRegisterNowClick = () => {
    ContextValue.updateCleanerStatus("");
    setRegisterPopupOpen(true);
  };

  useEffect(() => {
    document.body.classList.toggle("popup-open", isRegisterPopupOpen);

    console.log("ContextValue driverStatus =", ContextValue.driverStatus);

    return () => {
      document.body.classList.remove("popup-open");
    };
  }, [isRegisterPopupOpen, ContextValue.driverStatus]);

  const handleButtonClick = (status) => {
    if (status === "Register Now") {
      ContextValue.updateCleanerStatus("");
      setRegisterPopupOpen(true);
    } else {
      ContextValue.updateCleanerStatus(status);
      setRegisterPopupOpen(false);
    }
  };

  const buttonStyle = (status) => {
    return {
      backgroundColor: ContextValue.cleanerStatus === status ? "#ffffff" : "", // Set white background if active, otherwise default
      color: ContextValue.cleanerStatus === status ? "#000000" : "", // Set black text color if active, otherwise default
    };
  };

  return (
    <>
      <Navbar />

      {isRegisterPopupOpen && <div className="blur-overlay tops"></div>}
      <div
        className={`main-container ${isRegisterPopupOpen ? "header-blur" : ""}`}
      >
        <div
          className={`${
            ContextValue.driverStatus === true ? "" : "blur-sec"
          } col-12 col-lg-12 col-sm-12 col-md-12 mx-2 box-containers`}
        >
          <button
            className="box col-1 col-lg-2 col-sm-1 col-md-2 "
            style={buttonStyle("status")}
            onClick={(e) => {
              handleButtonClick("status");
            }}
          >
            <div className="box-items ">
              <img src={HomeIcon2} alt="" className="box-icon ml-9" />
              <h3 className="h3-box h3font">Status</h3>
            </div>
          </button>

          <div
            className="box col-1 col-lg-2 col-sm-1 col-md-2"
            style={buttonStyle("scan-registry")}
            onClick={(e) => {
              handleButtonClick("scan-registry");
            }}
          >
            <div className="box-items">
              <img src={search} alt="" className="box-icon ml-9" />
              <h3 className="h3-box h3font">Driver Scan</h3>
            </div>
          </div>

          <div
            className="box col-1 col-lg-2 col-sm-1 col-md-2"
            style={buttonStyle("defrag")}
            onClick={(e) => {
              ContextValue.updateCleanerStatus("defrag");
            }}
          >
            <div className="box-items">
              {/* <CloudSyncIcon className="box-icon" /> */}
              <img src={backk} alt="" className="box-icon ml-9" />

              <h3 className="h3-box h3font">Backup</h3>
            </div>
          </div>

          <div
            className="box col-1 col-lg-2 col-sm-1 col-md-2"
            style={buttonStyle("Backup")}
            onClick={(e) => {
              handleButtonClick("Backup");
            }}
          >
            <div className="box-items">
              <img src={restore} alt="" className="box-icon ml-9" />
              <h3 className="h3-box h3font">Restore</h3>
            </div>
          </div>

          <div
            className="box col-1 col-lg-2 col-sm-1 col-md-2"
            style={buttonStyle("Settings")}
            onClick={(e) => {
              handleButtonClick("Settings");
            }}
          >
            <div className="box-items">
              <img src={Setting4} alt="" className="box-icon ml-9 " />

              <h3 className="h3-box h3font">Settings</h3>
            </div>
          </div>
          <div
            className="box col-1 col-lg-2 col-sm-1 col-md-2"
            style={buttonStyle("")}
            onClick={handleRegisterNowClick}
          >
            <div className="box-items">
              <img src={keys} alt="" className="box-icon ml-9" />

              {/* <VpnKeyIcon className="box-icon" /> */}
              <h3 className="h3-box h3font">Register Now</h3>
            </div>
          </div>
        </div>

        {ContextValue.cleanerStatus === "status" && <Status />}
        {ContextValue.cleanerStatus === "scan-registry" && <ScanRegistry />}
        {ContextValue.cleanerStatus === "defrag" && <Dafrag />}
        {ContextValue.cleanerStatus === "Backup" && <BackupRegistry />}
        {ContextValue.cleanerStatus === "Settings" && <Setting />}
        {ContextValue.cleanerStatus === "buypage" && <Buy />}

        {isRegisterPopupOpen && (
          <RegisterPopupComponent onClose={() => setRegisterPopupOpen(false)} />
        )}
      </div>
    </>
  );
}

export default Header;
