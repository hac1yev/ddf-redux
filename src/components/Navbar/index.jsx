import React, { Suspense, useState } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../img/logo.png";
import logo_en from '../../img/logo_en.png';
import { useDispatch, useSelector } from "react-redux";
import { langSliceAction } from "../../store/lang-slice";
import search from '../../img/search.png';
import { searchSliceAction } from "../../store/search-slice";

function Navbar(props) {
  const lang = useSelector(state => state.langReducer.lang);
  const dispatch = useDispatch();
  const [menu,setMenu] = useState(false);
  const [searchIcon,setSearchIcon] = useState(false);
  const { pathname } = useLocation();

  // Axtarılan məlumatın innerText-nin qlobal state-ə atılması 
  const getSearchValue = (e) =>{
    const searcInput = document.querySelector('.search-input')
    window.localStorage.setItem('searchText',searcInput.value);
    dispatch(searchSliceAction.getAllStructure(searcInput.value));
  }

  // Menu itemlərə kliklənən zaman onların innerText-nin qlobal state-ə atılması
  const getContextData = (e) => {
    document.querySelector(".responsive-menu").style.top = "-100vh";
    setMenu(true);
  };

  const handleGaleryContext = (e) => {
    // setGaleryText(e.target.innerText);
  };

  // Dil dəyişməsi zamanı innerText-nin qlobal state-ə göndərilməsi 
  const getChangeLang = (e) => {
    dispatch(langSliceAction.replaceLang());
    window.localStorage.setItem('lang', lang ? false : true);
    window.location.reload();
  }

  // useEffect(() => {
  //   const active = document.getElementById('active');
  //   setNavTitle(active?.innerText);
  // }, []);

  // Dil dəyişməsi zammanı hansı dil olduğunu yoxlayan funksiya

  const getSearchItem = () => {
    if (!searchIcon) {
      document.querySelector(".search-form").style.top = "0px"
      document.querySelector(".search-close-btn").style.top = "50px"
      setSearchIcon(true)
      document.querySelector(".responsive-menu").style.top = "-100vh"
      setMenu(true)
    } else {
      document.querySelector(".search-form").style.top = "-100vh"
      document.querySelector(".search-close-btn").style.top = "-100vh"
      setSearchIcon(false)
    }
  }

  // Responsive Menu
  const getChangeMenu = (e) => {
    if (menu) {
      setMenu(false)
      document.querySelector(".responsive-menu").style.top = "0px"

    } else {
      document.querySelector(".responsive-menu").style.top = "-100vh"
      setMenu(true)
    }
  }

  return (
    <Suspense fallback='Loading...'>
      <div className="nav-bar-custom nav-gradient">
        <nav style={{ maxWidth: '940px', width: '100%', padding: '0 10px' }}>
          <div className="responsive-logo d-flex">
            <div className="logo">
              <Link to="/">
                <img className="logo-img" src={!lang ? logo : logo_en} alt="Logo" />
              </Link>
            </div>
            <button className="responsive-btn" 
            onClick={getChangeMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
          <div className="responsive-menu">
            <button className="close-btn" 
            onClick={getChangeMenu}
            > <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg></button>
            <ul className="menu-list">
              <li className="main-page-li">
                <Link to="/" id={pathname === "/" ? "active" : ""}>
                  {!lang ? "Ana Səhifə" : 'Home Page'}
                </Link>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/about/history"
                >
                  {!lang ? "Haqqımızda " : 'About us'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/about/history"
                    onClick={getContextData}
                  >
                    {!lang ? "Tariximiz " : 'History'}
                  </Link>
                  <Link
                    to="/about/mission-vision"
                    onClick={getContextData}
                  >
                   {!lang ? "Dəyər və Hədəflərimiz" : 'Values and Vision'}
                  </Link>
                  <Link
                    to="/about/management"
                    onClick={getContextData}
                  >
                   {!lang ? "Rəhbərlik" : 'Management'}
                  </Link>
                  <Link
                    to="/about/supervisory"
                    onClick={getContextData}
                  >
                    {!lang ? "Müşahidə Şurası" : 'Supervisory Board'}
                  </Link>
                  
                  <Link
                    to="/about/audit"
                    onClick={getContextData}
                  >
                   {!lang ? "Maliyyə və Audit" : 'Finance and Audit'}
                  </Link>
                  <Link
                    to="/about/structure"
                    onClick={getContextData}
                  >
                   {!lang ? "Struktur" : 'Structure'}
                  </Link>
                  <Link
                    to="/about/legislation"
                    onClick={getContextData}
                  >
                    {!lang ? "Qanunvericilik" : 'Legislation'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/mines"
                >
                  {!lang ? "Fəaliyyət" : 'Activity'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/mines"
                    id={pathname === "/mines" ? "active" : ""}
                  >
                    {!lang ? "Yataqlar" : 'Mines'}
                  </Link>
                  {/* <Link
                    to="#!"
                  >
                    Statistika
                  </Link> */}
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/purchase"
                  id={pathname === "/purchase" ? "active" : ""}
                >
                  {!lang ? "Satınalma" : 'Procurement'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/purchase/purchase-announce"
                    id={pathname === "/purchase/purchase-announce" ? "active" : ""}
                  >
                    {!lang ? "Satınalma elanları" : 'Procurement announcements'}
                  </Link>
                  <Link
                    to="/purchase/purchase-archive"
                    id={pathname === "/purchase/purchase-archive" ? "active" : ""}
                  >
                    {!lang ? "Satınalma arxivi" : 'Procurement archive'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/media"
                  id={pathname === "/media" ? "active" : ""}
                >
                  {!lang ? "Media" : 'Media'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/media/news"
                    id={pathname === "/media/news" ? "active" : ""}
                  >
                    {!lang ? "Xəbərlər" : 'News'}
                  </Link>
                  <Link
                    to="/media/gallery/photos"
                    onClick={handleGaleryContext}
                    id={pathname === "/media/gallery/photos" ? "active" : ""}
                  >
                    {!lang ? "Qalereya" : 'Gallery'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/career"
                  id={pathname === "/career" ? "active" : ""}
                >
                  {!lang ? "Karyera" : 'Career'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/vacancies"
                    id={pathname === "/vacancies" ? "active" : ""}
                  >
                    {!lang ? "Vakansiyalar" : 'Vacancies'}
                  </Link>
                  <Link
                    to="/apply"
                    id={pathname === "/apply" ? "active" : ""}
                  >
                    {!lang ? "Müraciət" : 'Apply'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/contact"
                  id={pathname === "/contact" ? "active" : ""}
                >
                  {!lang ? "Əlaqə  " : 'Contact'}
                </Link>
              </li>
            </ul>
            <button 
              className="search-btn" 
              onClick={getSearchItem}
            >
              <img src={search} alt="search icon" />
            </button>
            <div className="page-lang">
              <span>{!lang ? 'AZE' : 'ENG'}</span>
              <ul className="lang-option">
                <li onClick={getChangeLang}>{!lang ? 'ENG' : 'AZE'}</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container heading-all-container">
        <p className="heading-title">{props.title}</p>
      </div> 
      <form action="/search" className="search-form">
        <input onChange={getSearchValue} type="text" className="search-input" placeholder="Axtarış..." />
        <Link to={'/search'} onClick={getSearchValue} className="search-btn" style={{ marginLeft: '15px', width: '30px' }}><img style={{ width: '100%' }} src={search} alt="search icon" /></Link>
      </form>

      <button className="search-close-btn" onClick={getSearchItem}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
      </button>
    </Suspense>
  );
}

export default Navbar;