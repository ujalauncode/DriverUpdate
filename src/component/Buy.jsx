import React from "react";
import '../component/Model.css'

const Buy = () => {


  const [selectedPlan, setSelectedPlan] = useState(" Yearlyplan");
  const MONTHLYPRICE = "YourMonthlyPrice"; // Replace with actual values
  const YEARLYPRICE = "YourYearlyPrice"; // Replace with actual values
  const MONTHLYCART = "YourMonthlyCartLink"; // Replace with actual values
  const YEARLYCART = "YourYearlyCartLink"; // Replace with actual values
  useEffect(() => {
    // Initial setup
    document.getElementById("imgRadio1").src =
      "https://cdn.systweak.com/website/rightbackup/images/radio_off.png";
    document.getElementById("imgRadio2").src =
      "https://cdn.systweak.com/website/rightbackup/images/radio_on.png";
    document.getElementById("Monthlyplan").checked = false;
    document.getElementById("Yearlyplan").checked = true;
    setSelectedPlan("Yearlyplan");
    // ... other initial setup code
  }, []);
  const changeRadio = (radioid) => {
    if (radioid === "1") {
      document.getElementById("imgRadio1").src =
        "https://cdn.systweak.com/website/rightbackup/images/radio_on.png";
      document.getElementById("imgRadio2").src =
        "https://cdn.systweak.com/website/rightbackup/images/radio_off.png";
      document.getElementById("Monthlyplan").checked = true;
      document.getElementById("Yearlyplan").checked = false;
      setSelectedPlan("Monthlyplan");
      // ... other monthly plan code
    } else {
      document.getElementById("imgRadio1").src =
        "https://cdn.systweak.com/website/rightbackup/images/radio_off.png";
      document.getElementById("imgRadio2").src =
        "https://cdn.systweak.com/website/rightbackup/images/radio_on.png";
      document.getElementById("Monthlyplan").checked = false;
      document.getElementById("Yearlyplan").checked = true;
      setSelectedPlan("Yearlyplan");
      // ... other yearly plan code
    }
    // Update cart link based on the selected plan
    const cartLink = selectedPlan === "Monthlyplan" ? MONTHLYCART : YEARLYCART;
    document.querySelector(".addtocart").setAttribute("href", cartLink);
  };
  return (
    <>
    <header className="logo-col">
      <div className="container">
        {" "}
        <span className="logo-icon">
          {" "}
        
        </span>{" "}
      </div>
    </header>
    <main className="price-page">
      <section className="price-row">
        <div className="container">
          <div className="ctn-otr-col">
            <aside className="left-bar">
              <div className="money-back-logo">
                <img
                  src="https://cdn.systweak.com/website/rightbackup/images/money-back-logo.jpg"
                  width={163}
                  height={163}
                  alt="Money Back Gaurantee"
                  title="Money Back Gaurantee"
                />{" "}
              </div>
              <div className="appesteem-logo middel-space">
                {" "}
                <a href="javascript:void(0)">
                  {" "}
               
                </a>{" "}
              </div>
              <div className="mdl-logo-otr">
                <div
                  className="google-safe-browsing middel-space02"
                  title="Google Safe Browsing"
                  alt="Google Safe Browsing"
                >
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                 
                  </a>{" "}
                </div>
                <div className="trustpilot-logo middel-space02">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                   
                  </a>{" "}
                </div>
              </div>
              
            </aside>
            <article className="right-bar">
              <div className="act-col">
                <div className="act-lt-ctn ml-28">
                  <h1 className="head-title">Act now!</h1>
                  <p>
                    Buy Backup before{" "}
                    <b>
                    </b>{" "}
                    at our special <span className="actplan">yearly</span>{" "}
                    price of{" "}
                    <span className="actplanprice">INR&nbsp;1245</span> 
                    <a
                      href="javascript:void(0);"
                      className="show_rb_popup"
                      style={{ position: "relative", top: 3 }}
                      title="Right Backup"
                    >
                      <img
                        src="https://cdn.systweak.com/content/wp/systweak_com/tooltip1.png"
                        style={{ outline: "none", border: "none" }}
                        alt="Info"
                        width={15}
                      />
                    </a>
                  </p>
                </div>
                <div className="rt-1tb-col">
                  {" "}
                  {/* <img
                    src="https://cdn.systweak.com/website/rightbackup/images/rt-icon.jpg"
                    width={178}
                    height={134}
                    alt="Right Backup"
                  /> */}
                  {/* <div className="tb1-st-title">*1TB Online Storage</div> */}
                </div>
              </div>
              <div className="get1tb-backup">
                Get 1TB Backup space at lowest possible price
              </div>
              <div className="price-box-outer">
                <div className="price-box-inner">
                  <div id="boxmonthly" className="price-box-col">
                    <div className="radio-btn-col">
                      <img
                        src="https://cdn.systweak.com/website/rightbackup/images/radio_off.png"
                        id="imgRadio1"
                        onClick={() => changeRadio("1")}
                        style={{ cursor: "pointer" }}
                      />
                      <input
                        type="radio"
                        name="idRadioSelectPlan"
                        id="Monthlyplan"
                        defaultValue="Monthlyplan"
                        size={30}
                        style={{ visibility: "hidden", display: "none" }}
                      />
                    </div>
                    <div className="plan-tm-title">1 Month</div>
                    <div className="price-title">INR&nbsp;1245</div>
                    <div className="active-arrow-bt-title">
                      <img
                        src="https://cdn.systweak.com/website/rightbackup/images/new-tip.png"
                        width={22}
                        height={18}
                        alt="tip"
                      />
                    </div>
                  </div>
                  <div className="or-devider-col"> Or </div>
                  <div id="boxyearly" className="price-box-col active">
                    {/* <div className="popular-strp">
                      <img
                        src="https://cdn.systweak.com/website/rightbackup/images/popular_0.png"
                        width={74}
                        height={74}
                        alt="Popular"
                      />
                    </div> */}
                    <div className="radio-btn-col">
                      <img
                        src="https://cdn.systweak.com/website/rightbackup/images/radio_on.png"
                        id="imgRadio2"
                        onClick={() => changeRadio("2")}
                        style={{ cursor: "pointer" }}
                      />
                      <input
                        type="radio"
                        name="idRadioSelectPlan"
                        id="Yearlyplan"
                        defaultValue="Yearlyplan"
                        size={30}
                        style={{ visibility: "hidden", display: "none" }}
                      />
                    </div>
                    <div className="plan-tm-title">1 Year</div>
                    <div className="price-title">INR&nbsp;12400</div>
                    
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              <div className="clearfix" />
              <div className="addtocart-top">
                {/* https://store.payproglobal.com/checkout?products[1][id]=64103&products[2][id]=64072&products[2][promo-id]=12249&&x-source=rbsite&x-medium=newbuild&x-campaign=rbsite&x-content=NagNotEnoughSpace1&x-lip=&x-pxl=RB_DEF_PIXEL&x-bdts=12072023%2019%3A39%3A21&x-instdts=12012024%2019%3A14%3A44&x-affiliate=&utm_source=rbsite&utm_medium=newbuild&utm_campaign=rbsite&utm_content=NagNotEnoughSpace1&lip=&pxl=RB_DEF_PIXEL&bdts=12072023%2019%3A39%3A21&instdts=12012024%2019%3A14%3A44&affiliate=&isreg=0&isexpired=0&dis=20&space=92175897781&pname=RightBackup&firstinstall=0&langcode=en&pver=2.1.1001.154&macid=-6931833982937979472&instdatetime=&productid=10929&pid=10929&os=MicrosoftWindows11HomeInsiderPreviewSingleLanguage&ram=8.00GB&model=MiNoteBook14&procr=Intel(R)Core(TM)i5-10210UCPU%401.60GHz&ibv=0&iev=11&offertype=1&sn=rbsetup_rbsite-rbsite%20(2).exe&x-uid=3046429 */}
                <div className="cart-btn-col mrgn-tp-20 tracking_section a">
                  {" "}
                  <a
                    href="https://cleanersite.netlify.app/checkout"
                    data-action="price_addtoshopping"
                    data-btn="Add to Shopping Cart"
                    className="addtocart "
                    id="buynow"
                    onclick="send_ga_tracking('Price', 'Price_addtoshoppigcart');IsPopupNotShow(); "
                    title="Add to Shopping Cart"
                  >
                    {" "}
                    <img
                      className="scr-icon ml-28"
                      src="https://cdn.systweak.com/website/rightbackup/images/button_en.jpg"
                      width={277}
                      height={64}
                      alt="button"
                    />{" "}
                  </a>{" "}
                </div>
                <div className="no-risk-text-col">
                  {" "}
                  <span className="break-block">
                    No-Risk, Money Back Guarantee
                  </span>{" "}
                  <span className="break-block">
                    Immediate Download after Purchase,
                  </span>{" "}
                  <span className="break-block">
                    World Class Customer Support.
                  </span>{" "}
                </div>
              </div>
              <div className="clearfix" />
              <div className="allpurchase-title">
                All purchases include award winning Systweak Disk Analyzer PRO{" "}
                <span>LIFETIME FREE</span>{" "}
              </div>
              <div className="pc-problems-col top-pc-prblm">
                <h3 className="head-title"> Award-winning Right Backup </h3>
                <ul>
                  <li>Automatically backup files to the cloud</li>
                  <li>Access files anywhere you go</li>
                  <li>Easily Share files with anyone</li>
                  <li>
                    Restore files quickly even if your Device breaks down
                  </li>
                  <li>
                    For Windows 10, 8.1, 8 &amp; 7 SP1(32 &amp; 64 bit) and
                    iPhone, iPad and Android
                  </li>
                </ul>
              </div>
              <div className="pc-problems-col">
                <h3 className="head-title">
                  {" "}
                  With Disk Analyzer Pro you can:{" "}
                </h3>
                <ul>
                  <li>Detailed disk space consumption reports</li>
                  <li>
                    Search for unwanted files with your own search criteria
                  </li>
                  <li>Find and delete junk and temporary files.</li>
                  <li>Locate largest folders and oldest files</li>
                  <li>Integrated File Explorer and Viewer</li>
                  <li>Export disk space reports to external file formats</li>
                </ul>
              </div>
              {/* <div className="notice-col">
                <h3 className="head-title ">IMPORTANT NOTICE!</h3>
                <p>
                  {" "}
                  This offer is valid if you buy{" "}
                  <a className="addtocart" onclick="IsPopupNotShow(); ">
                    Right Backup
                  </a>{" "}
                  before <b>Tuesday, January 16, 2024</b> - so don't miss out
                  on this incredible opportunity.{" "}
                </p>
                <p>
                  {" "}
                  Backup all your documents, photos, music and other important
                  stuff on cloud. Stay safe in case of unfortunate data loss!{" "}
                </p>
                <p className="fair-usage">
                  *{" "}
                  <a target="_blank" href="/privacy-policy/#fairPolicy">
                    Fair Usage Policy
                  </a>{" "}
                  is applicable for all purchases
                </p>
              </div> */}
              <div className="cart-btn-col cart-col02 tracking_section a">
                {" "}
                <a
                  href="#"
                  data-action="price_addtoshopping2"
                  className="addtocart"
                  id="buynow"
                  data-btn="Add to Shopping Cart2"
                  onclick="send_ga_tracking('Price', 'Price_addtoshoppigcart2');IsPopupNotShow(); "
                  title="Add to Shopping Cart"
                >
                  {" "}
                  <img
                    className="scr-icon"
                    src="https://cdn.systweak.com/website/rightbackup/images/button_en.jpg"
                    width={277}
                    height={64}
                    alt="button"
                  />{" "}
                </a>
                <div className="divider" />
                
              </div>
             
            </article>
            <div className="clearfix" />
          </div>
        </div>
      </section>
      <div
        style={{
          zIndex: 110,
          position: "fixed",
          filter: "alpha(opacity=70)",
          backgroundColor: "#000",
          width: "100%",
          display: "none",
          height: "102%",
          top: 0,
          left: 0,
          MozOpacity: ".65",
          opacity: ".65",
        }}
        id="idOpacityDiv"
      ></div>
      <div
        style={{
          zIndex: 200,
          position: "fixed",
          border: "solid 0px #cf4cf4",
          boxShadow: "0 5px 3px rgba(0, 0, 0, 0.3)",
          margin: "auto",
          width: 759,
          display: "none",
          height: 630,
          top: 0,
          left: "50%",
          marginLeft: "-380px",
          background:
            'url("https://cdn.systweak.com/website/rightbackup/images/price_RB20per_en.jpg")',
          backgroundRepeat: "no-repeat",
        }}
        id="idPopupDiv"
        className="offer_link_change_dis tracking_section"
      >
        <table
          border={0}
          cellSpacing={0}
          cellPadding={0}
          width={699}
          align="center"
        >
          <tbody>
            <tr style={{ height: 45 }}>
              <td></td>
              <td align="right" />
            </tr>
          </tbody>
        </table>
        <a
          href="https://store.payproglobal.com/checkout?products[1][id]=64103&products[2][id]=64072&products[2][promo-id]=12249&coupon-code-to-add=20-per-rb&x-source=rbsite&x-medium=newbuild&x-campaign=rbsite&x-content=NagNotEnoughSpace1&x-lip=&x-pxl=RB_DEF_PIXEL&x-bdts=12072023%2019%3A39%3A21&x-instdts=12012024%2019%3A14%3A44&x-affiliate=&utm_source=rbsite&utm_medium=newbuild&utm_campaign=rbsite&utm_content=NagNotEnoughSpace1&lip=&pxl=RB_DEF_PIXEL&bdts=12072023%2019%3A39%3A21&instdts=12012024%2019%3A14%3A44&affiliate=&isreg=0&isexpired=0&dis=20&space=92175897781&pname=RightBackup&firstinstall=0&langcode=en&pver=2.1.1001.154&macid=-6931833982937979472&instdatetime=&productid=10929&pid=10929&os=MicrosoftWindows11HomeInsiderPreviewSingleLanguage&ram=8.00GB&model=MiNoteBook14&procr=Intel(R)Core(TM)i5-10210UCPU%401.60GHz&ibv=0&iev=11&offertype=1&sn=rbsetup_rbsite-rbsite%20(2).exe&x-uid=3046429"
          data-btn="AddtoShoppingcart50per"
          data-coupon="20per-glb"
          data-action="cart"
          className="ref-pp"
          onclick="send_ga_tracking('Price_win', 'DiscountLink'); IsPopupNotShow(); send_ga_tracking('Price_win', 'CheckoutLinkBottom'); createCookie('RBpricec','buynowaducookie',365);  "
        >
          <div
            style={{
              margin: "auto",
              width: 699,
              border: "solid 0px red",
              height: 400,
              top: 0,
            }}
          >
            <table border={0} cellSpacing={0} cellPadding={0} width={699}>
              <tbody>
                <tr style={{ height: 101 }}>
                  <td valign="top"></td>
                </tr>
                <tr style={{ height: 134 }}>
                  <td />
                </tr>
                <tr style={{ height: 85 }}>
                  <td valign="top" className="BigBlackBoldText">
                    <table
                      border={0}
                      cellSpacing={0}
                      cellPadding={0}
                      align="center"
                      width={335}
                      style={{ marginTop: 38 }}
                      className="price-space"
                    >
                      <tbody>
                        <tr>
                          <td className="BigBlackBoldText">
                            INR&nbsp;
                            <span
                              style={{ textDecoration: "line-through" }}
                              className="BigBlackBoldText"
                            >
                              12400
                            </span>
                          </td>
                          <td className="BigBlackBoldText">
                            INR&nbsp; 9920 Only
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      style={{
                        padding: 0,
                        height: 40,
                        border: "solid 0px red",
                        marginTop: 245,
                        verticalAlign: "text-top",
                        textAlign: "left",
                      }}
                      className="footer-popup-text"
                    >
                      <p
                        className="popupfootertext"
                        style={{
                          textDecoration: "none",
                          margin: 7,
                          fontSize: 14,
                          color: "#ffff",
                          padding: 0,
                          border: "solid 0px red",
                        }}
                      >
                        This offer is valid if you buy Right Backup before{" "}
                        <b>Tuesday, January 16, 2024</b> - so don't miss out
                        on this incredible opportunity.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </a>
      </div>
    </main>
   
    {/* Modal */}
    <div className="info-modal-bg" style={{ display: "none" }} />
    <div className="info-modal" id="rbinfo" style={{ display: "none" }}>
      <div className="info-modal-inner">
        {/* Modal content*/}
        <div className="info-modal-content">
          <h1>Why do I need Right Backup?</h1>
          <div className="modal-outer">
            <div className="modal-left">
              <p>
                Right Backup solves all the storage and data security issues
                you face. Using this online cloud storage program, you can
                save your files, photos, and videos in one place seamlessly.
                Moreover, you can avoid losing crucial data and access it from
                any device anywhere. The online storage solution helps sync,
                backup, and restore data on multiple platforms. <br />
                <br />
                <span className="remembertxt">
                  This one-year license will be billed annually at a
                  discounted price.
                </span>{" "}
                We'll email you before each renewal. You may cancel your
                subscription at any time by sending us an email at{" "}
                <a
                  style={{ color: "#337ab7", font: "outline" }}
                  href="mailto:support@rightbackup.com"
                >
                  {" "}
                  support@rightbackup.com
                </a>
                .
              </p>
              <br />
              <p style={{ width: 549 }}>
                <b>Remember -</b> 2 minutes of your time could save you from
                losing data and dealing with the low storage space issues.
                With Right Backup sync, backup and restore data easily on the
                cloud.
              </p>
            </div>
            <div className="modal-right">
              <img
                src="https://cdn.systweak.com/website/rightbackup/images/right-backup.png"
                width={100}
              />
            </div>
          </div>
          <div className="footer-modal">
            <a className="modal-bottom-close" href="javascript:void(0)">
              Close
            </a>
          </div>
        </div>
        <a className="info-close">X</a>
      </div>
    </div>
  </>
  );
};

export default Buy;
