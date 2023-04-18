import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../assets/css/PurchaseAnnounce.css";
import { useEffect } from "react";
import Pagination from "../components/Pagination/Pagination";
import kenar from '../img/rehberlik-sag.png';
import { fetchData } from "../assets/api/dataFetching";
import { useDispatch, useSelector } from "react-redux";
import { purchSliceAction } from "../store/purch-slice";

const PurchaseAnnounce = () => {
    // Context api-dəki qlobal state-lər
    // const { setPurchaseTitle , purchaseData, setPurchaseDesc, setPurchaseStartDate, setPurchaseEndDate, lang } = useContext(GlobalContext);

    const lang = useSelector(state => state.langReducer.lang);
    const purchaseData = useSelector(state => state.purchReducer.descriptions);
    const dispatch = useDispatch();

  // Satınalma itemlərinə kliklənən zaman uyğun itemin Satınalma Detal səhifəsinə yönləndirilməsi
    const handlePurchAnnounce = (title,desc,start_date,end_date) => {
      // setPurchaseTitle(title);
      // setPurchaseDesc(desc);
      // setPurchaseStartDate(start_date);
      // setPurchaseEndDate(end_date);
      // window.localStorage.setItem('purchDescription', desc);
      // window.localStorage.setItem('purchTitle', title);
      // window.localStorage.setItem('purchStartDate', start_date);
      // window.localStorage.setItem('purchEndDate', end_date);
    };

    let purchaseAnnounceData = [];

    useEffect(() => {
      fetchData(!lang ? `az/purchase` : `en/purchase`)
      .then(data => dispatch(purchSliceAction.getAllPurchs(data.data)));
    }, [lang,dispatch]);

    console.log(purchaseData)
    
    // Request zamanı gələn dataları Satınalma Elanları və Satınalma Arxivi şəklində iki Array-e ayırır
    for(let key in purchaseData) {
       if(purchaseData[key].is_archiv === 0){
        purchaseAnnounceData.push({...purchaseData[key]});
      }
    }

    // State-lər
    const [currentPage , setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(9)

    // Satınalma Elanları məlumatlarının pagination-la hissələrə ayrılması
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = purchaseAnnounceData.slice(indexOfFirstRecord,indexOfLastRecord);
    const nPages = Math.ceil(purchaseAnnounceData.length / recordsPerPage);

//     useEffect(() => {
//       window.localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
//     }, [purchaseData]);

  return (
    <>
      <div className="heading-all">
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Satınalma' : 'Procurement'} />
        </div>
      </div>
      <div className="announce">
      <img className="right-pic" src={kenar} alt="kenar" />
        <div className="container announce-container mb-4 pt-3">
          <div className="row">
            <div>
              <nav>
                <ul className="project-detail-heading-link">
                  <Link to={"/"} style={{ marginRight: "5px" }}>
                    {lang === 'az' ? 'Ana Səhifə' : 'Main Page'}
                  </Link>
                  <span style={{ margin: "0 10px" }}>&#8725;</span>
                  <Link style={{ marginRight: "10px" }} to={"/purchase"}>
                    {lang === 'az' ? 'Satınalma' : 'Procurement'}
                  </Link>
                  <span style={{ margin: "0 10px" }}>&#8725;</span>
                  <li style={{ color: '#000' }}>{lang === 'az' ? 'Satınalma Elanları' : 'Procurement Announcements'}</li>
                </ul>
              </nav>
            </div>
            <div className="col-12 d-flex justify-content-center mt-3">
              <h2 
                style={{ fontSize: "32px" }}
                data-aos="flip-left"
                data-aos-duration="1000"
              >
                {lang === 'az' ? 'Satınalma Elanları' : 'Procurement Announcements'}
              </h2>
            </div>
            <div className="row my-4 w-100 mx-0 purchase-announce-row">
              <div className="col-12 px-1">
                <div className="purchase-announce-table-header">
                  <div className="purchase-announce-competition-name">{lang === 'az' ? 'Müsabiqənin adı:' : 'Contest Name:'}</div>
                  <div className="purchase-announce-start">{lang === 'az' ? 'Başlama Tarixi:' : 'Start Date:'}</div>
                  <div className="purchase-announce-end">{lang === 'az' ? 'Son Müraciət Tarixi:' : 'End Date:'}</div>
                </div>
              </div>
            {currentRecords.map((item, index) => (
              <div className="col-12 px-1" key={item.id}>
                <div 
                  className="purchase-announce"
                  data-aos="zoom-in"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="1000"
                >
                  <Link
                    to={`/purchase/${item.id}`}
                    className="purchase-announce-item mb-2"
                    onClick={handlePurchAnnounce.bind(null, item.title, item.description, item.start_date, item.end_date)}
                  >
                    <div className="purch-left-side">
                      <div className="purchase-announce-img"></div>
                      <div className="purch-left-desc">
                        <span className="purchase-announce-number">
                          {index + 1}.&nbsp;
                        </span>
                        <span className="purchase-announce-title">
                          {item.title}
                        </span>
                      </div>
                    </div>
                    <div className="purch-right-side">
                      <div className="purch-right-side-1">
                        <span className="start-date">{lang === 'az' ? 'Başlama Tarixi:' : 'Start Date'}</span>
                        <span className="purchase-announce-start-date">
                          {item.start_date}
                        </span>
                      </div>
                      <div className="purch-right-side-2">
                        <span className="end-date">{lang === 'az' ? 'Son Müraciət Tarixi:' : 'End Date'}</span>
                        <span className="purchase-announce-end-date">
                        {item.end_date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
            </div>
            <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage } />
          </div>
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PurchaseAnnounce;
