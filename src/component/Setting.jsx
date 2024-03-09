import React, { useEffect, useRef, useState } from "react";
import earth from "../Image/img.png";
import cut from "../Image/cut.png";
import search from "../Image/search.png";
import computer from "../Image/computer.png";
import people from "../Image/pepole.png";
import caiset from "../Image/caiset.png";
import setting from "../Image/setting.png";
import StartScan from "./StartScan";
import File from "../Image/file.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Setting({value}) {
  const [buttonType, setButtonType] = useState(value === "Scan" ? (value) :"General");
  const [cleanerStart, setCleanerStart] = useState("status");
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentTime, setCurrentTime] = useState(getCurrentTime);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile ? selectedFile.name : '');
  };;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime);
    }, 60000); 
    return () => clearInterval(intervalId);
  }, []);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const handleClickGeneral = () => {
    setButtonType("Select location");
  };
  const handleClickScan = () => {
    setButtonType("Scan");
  };
  const handleClickS=()=>{
    setButtonType("Scan Schedule");

  }
  const handlegen =()=>{
    setButtonType("General");

  }

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return cleanerStart === "status" ? (
    <>
      <div className="settingfirstbox">
        <div className="firstboxone ">
          <button className="text-xs" onClick={handleClickGeneral}>Select location</button>
          <button onClick={handleClickScan}>Scan Area</button>
          <button onClick={handleClickS}>Scan Schedule</button>
          <button onClick={handlegen}>General</button>
        </div>
      </div>
      {buttonType === "Select location" && (
        <div className="firstgeneral">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">               
                           <div className='Header'> Select location to save downloaded drivers </div>
                           <div className='row'>
                           <div className='col-lg-2 flex'>   
                                <img src={File} alt="File Explorer" className="imgedesign"/> 
                                <label type="text" className="inputdesign" placeholder="C/User/Onedrive/Document" > {selectedFile && <p>C/User/Onedrive/Document: {selectedFile.name}</p>}</label>
                                <div>
                                <label htmlFor="photo" className="plus-button mt-4">
                                <span className="fa-solid fa-ellipsis-vertical text-xl font-xs designset " onClick={handleButtonClick}>
                                  {/* <MoreVertIcon className="" /> */}</span>
                               </label>
                    <input type="file" directory="" webkitdirectory="" id="fileInput" name="photo" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none", visibility: "hidden" }}  required />                  
                   </div>                      
                           </div>
                   
                           </div>
                           <div className='Header' >
                              Select location to save backups copies of original drivers
                           </div>
                           <div className='row'>
                           <div className='col-lg-2 flex'>   
                                <img src={File} alt="File Explorer" className="imgedesign"/> 
                                <label type="text" className="inputdesign" placeholder="C/User/Onedrive/Document" >  {selectedFile && <p>C/User/Onedrive/Document: {selectedFile.name}</p>}</label>
                                <div>
                                <label htmlFor="photo" className="plus-button mt-4">
                                <span className="fa-solid fa-ellipsis-vertical text-xl font-xs designset " onClick={handleButtonClick}></span>
                               </label>
                    <input type="file" directory="" webkitdirectory="" id="fileInput" name="photo" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none", visibility: "hidden" }}  required/>
                   </div>

                           </div>
                           <div className='col-lg-10 fixed-bottom settingbot'>
                               <div className='mt-1'>
                               <button className="btn btn-success me-md-2 text-gray-500 text-xs font-bold px-10 designbtn111" type="button">Apply </button>
                               <button className="btn btn-secondary me-md-2 text-gray-500 text-xs font-bold px-10 designbtn111" type="button">Default</button>
   
                               </div>
   
                           </div>
                          
                           </div>
                           
                           
                          
   
                   </div>
        </div>
      )}
      {buttonType === "Scan" && (
        <div className="firstScan">
     <div>
                        <div className='Driver mt-1'>Driver Exclusion List</div>

                        <p className='hey'>The exclusion driver list refers to a compilation of individuals prohibited from operating vehicles due to factors such as
                            traffic violations, safety concerns, or legal issues. This list is maintained by authorities to enhance road safety and
                            minimize risks associated with negligent or irresponsible driving behavior. Inclusion on the exclusion driver list may result
                            from offenses like driving under the influence, reckless driving, or repeated traffic violations. The implementation of such a
                            list serves as
                            a preventative measure to protect public safety and uphold responsible conduct on the roads.</p>

                        <div className='driver-section'>
                            <div className='Driver1'>
                                Driver Name
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className='col-lg-10 fixed-bottom settingbot'>
                               <div className='mt-1'>
                               <button className="btn btn-success me-md-2 text-gray-500 text-xs font-bold px-4 newchanges" type="button">Remove Item </button>
                               <button className="btn btn-secondary me-md-2 text-gray-500 text-xs font-bold px-3 newchanges2" type="button">Remove All Item </button>
   
                               </div>
   
                           </div>
                    </div>
        </div>
      )}
         {buttonType === "Scan Schedule" && (
        <div className="firstgeneral">
          <div>
                        <div className='Header ' >
                            Configure automatic scanning schedule
                        </div>
                       
                        <span className="spanofsetting text-xs font-semibold mt-4"> Select type of schedule </span>
                        <div className="checkbox-group text-xs font-semibold">
                            <label><input type="radio" name="group1" defaultValue="option1" /> Run once </label>
                            <label><input type="radio" name="group1" defaultValue="option2" /> Every Week</label>
                            <label><input type="radio" name="group1" defaultValue="option3" /> Every Day</label>
                            <label><input type="radio" name="group1" defaultValue="option3" /> Do not schedule</label>
                        </div>
                        <div className='row'>
                        <div className="flex justify-content-between">
                        <div className='col-lg-5 mx-4  timedesign'>
                          <span className="font-semibold">The Date and Time to run</span>
                                <div className="border-1 border-black	" aria-label="Small select example">
                                <input type="date" className="ml-2" id="datepicker" name="datepicker"/>                                

                                </div>
                                <div className="border-1 border-black	" aria-label="Small select example" style={{ marginTop: '10px' }}>
                                <input type="time" className="ml-2" id="timepicker" name="timepicker" value={currentTime}/>

                                </div>
                            </div>
                          

                            <div className='col-lg-6 mr-4 daysdesign'>
                                <span className="span1 text-xs font-semibold"> Select the days of the week </span>
                                <div className="checkbox-group3">
                                    <div className="checkbox-group0">
                                        <label><input type="checkbox" name="group1" defaultValue="option1" /> Monday</label>
                                        <label><input type="checkbox" name="group1" defaultValue="option2" /> Tuesday</label>
                                        <label><input type="checkbox" name="group1" defaultValue="option3" /> Wednesday</label>
                                    </div>
                                    <div className="checkbox-group1">
                                        <label><input type="checkbox" name="group1" defaultValue="option2" /> Thursday</label>
                                        <label><input type="checkbox" name="group1" defaultValue="option3" /> Friday</label>
                                    </div>
                                    <div className="checkbox-group2">
                                        <label><input type="checkbox" name="group1" defaultValue="option1" /> Saturday</label>
                                        <label><input type="checkbox" name="group1" defaultValue="option2" /> Sunday</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                            <div className='row mx-1'>                               
                                <div className="spantag">
                                    <span>Scheduled As :</span>
                                    <span> Not Scheduled Yet</span>
                                </div>
                                <div className='col-lg-10 fixed-bottom settingbot'>
                               <div className='mt-1'>
                               <button className="btn btn-success me-md-2 text-gray-500 text-xs font-bold px-4" type="button">Apply </button>
                               </div>  
                           </div>
                            </div>
                        </div>
                    </div>
        </div>
      )}
     {buttonType === "General" && (
        <div className="firstgeneral">
          <div className="firstgeneralboxone">
            <div className="generalfirstbar">
              <div className="generalsecondbar">Language :</div>
            </div>
            <div className="generalsecondboxone">
              <div className="first">
                <div className="firstearth">
                  <img src={earth} alt="" srcset="" />
                </div>
              </div>
              <div className="second">
                <div className="secondPara">
                  Select the Preferred language :
                </div>
                <div className="secondinput">
                  <select className="selectinput" name="cars" id="cars">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="firstgeneralboxtwo">
            <div className="generalfirstbar">
              <div className="generalsecondbar">Program Control :</div>
            </div>
            <div className="generalsecondboxone">
              <div className="first">
                <div className="firstearth">
                  <img src={cut} alt="" srcset="" />
                </div>
              </div>
              <div className="second">
                <div className="secondPara">
                  Select the Preferred language :
                </div>
                <div className="secondinput">
                  <select className="selectinput" name="cars" id="cars">
                    <option value="volvo">Minimize Advance Driver Update to system tray </option>
                    <option value="saab">Exit Advance Driver Update</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="firstgeneralboxthird">
            <div className="generalfirstbar">
              <div className="generalsecondbar">StartUp Schedule :</div>
            </div>
            <div className="generalsecondboxone">
              <div className="first">
                <div className="firstearth">
                  <img src={search} alt="" srcset="" />
                </div>
              </div>
              <div className="second">
                <div className="secondinput checkbox">
                  <div className="secondinputpara">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label for="vehicle1">
                      Launch at Window startup ans start a registry scan
                    </label>
                  </div>
                  <div className="secondinputpara">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label for="vehicle1"> Product Message</label>
                  </div>
                  <div className="secondinputpara">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label for="vehicle1">
                      Show periodic update messages to optimize your pc
                    </label>
                  </div>
                  <div className="secondinputpara">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label for="vehicle1">Hide Notification</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="setting-btn fixed-bottom mb-2">
            <button className="applybtn scanspan button1 ">Apply</button>
          </div>

        
        </div>
      )}

    </>
  ) : (
    <StartScan />
  );
}
