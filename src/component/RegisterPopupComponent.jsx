import React, { useState } from "react";
import lock from "../Image/locker.png";
import key from "../Image/key.png";

export default function RegisterPopupComponent({ onClose }) {
  const [userDetail, setuserDetail] = useState("");
  console.log("userDetail :", userDetail);
  const handleClose = () => {
    onClose();
    window.location.href = "/";
  };

  const handlelincenskey = async () => {
    try {
      const response = await fetch(
        "https://poo-vqx1.onrender.com/getlicenseKey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userDetail.email,
            licenseKey: userDetail.licenseKey,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("licenseKey", JSON.stringify(data));
        window.alert("Data is Correct");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch data");
        window.alert("Data is not  Correct");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup-content">
          <div className="registernowbody">
            <div className="registernowfistpara">
              <p>Thank you for Trying Advance Driver Update!</p>
            </div>
            <div className="marqueeinpopup">
              Please Contact our Support 8447990060.
            </div>

            <div className="registernowalreadyhavekey">
              <div className="registernowalreadyhavekeypartone">
                <div className="registernowimg">
                  <img src={lock} alt="" srcset="" />
                </div>
              </div>
              <div className="registernowalreadyhavekeyparttwo">
                <p>Want to register yourself</p>
                <div className="registernowalreadyhavekeyparttwoin">
                  <div>
                    {" "}
                    If you didn't register yet , please enter it in the form
                    below and click <span className="spanw">Register Now</span>
                  </div>
                  <div className="registernowinput">
                    <div className="registernowinputfirst">
                      <label htmlFor="">Enter Your Email Address :</label>
                      <input
                        onChange={(e) =>
                          setuserDetail({
                            ...userDetail,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="email"
                        name="email"
                        class="form-control"
                        required
                      />
                      {/* <label htmlFor="">License Key :</label>
                      <input
                        onChange={(e) =>
                          setuserDetail({
                            ...userDetail,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        name="licenseKey"
                        required
                      /> */}
                      <div className="registernowinputfirstbutton">
                        <button onClick={handlelincenskey}>Register Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="registernowalreadyhavekey">
              <div className="registernowalreadyhavekeypartone">
                <div className="registernowimg">
                  <img src={key} alt="" srcset="" />
                </div>
              </div>
              <div className="registernowalreadyhavekeyparttwo">
              
                <div className="registernowalreadyhavekeyparttwoin">
                  <div>
                    <div>
                      We recommended that you upgrade to the full version of{" "}
                      <span
                        style={{
                          color: "rgb(246, 134, 55)",
                          fontWeight: "600",
                        }}
                      >
                        Advance Driver Update
                      </span>{" "}
                    </div>
                    <div>
                      to update all your drivers of your PC , other benefit may
                      include faster startup and{" "}
                    </div>
                    <div> greater stability of your system </div>
                  </div>
                  <div className="registernowinput">
                    <div className="registernowinputfirst">
                      <div className="registernowinputfirstbuttonbuynow">
                        <button className="registernowinputfirstbuttona">
                          <a
                            target="blank"
                            href="https://cleanersite.netlify.app/checkout"
                          >
                            Buy Now
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="popupclosebtn" onClick={handleClose}>
          <i
            class="fa-solid fa-rectangle-xmark"
            style={{ color: "#0e5ce1" }}
          ></i>
        </span>
      </div>
    </>
  );
}
