import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import '../assets/css/Galery.css';

const Galery = () => {
    const lang = useSelector(state => state.langReducer.lang);
    const { pathname } = useLocation();

    // useEffect(() => {
    //     const active = document.getElementById("active");
    //     setNavTitle(active);
    // }, [pathname]);

    const handleVideoGalery = (e) => {
        // setGaleryText(e.target.innerText);
        // window.localStorage.setItem('galeryText', e.target.innerText);
    };

    return (
        <>
        <div className="heading-all">
            <div className="container heading-all-container header-bg-respon">
            <Navbar title={!lang ? 'Qalereya' : 'Gallery'} />
            </div>
        </div>
        <div className="galery">
            <div className="container galery-container">
            <div className="row galery-row">
                <div className="galery-header">
                <h3 style={{ marginTop: "15px" }}>{!lang ? 'Qalereya' : 'Gallery'} </h3>
                <div className="galery-tabs">
                    <Link
                        to="photos"
                        onClick={handleVideoGalery}
                        className={
                            // (galeryText === "Foto Qalereya" || galeryText === 'Photo Gallery' || galeryText === "Qalereya") ? "active" : "disactive"
                            pathname === '/media/gallery/photos' ? 'galery-link active' : 'galery-link'
                        }
                    >
                      {!lang ? 'Foto Qalereya' : 'Photo Gallery'}
                    </Link>
                    <Link
                        to="videos"
                        onClick={handleVideoGalery}
                        className={
                            // (galeryText === "Video Qalereya" || galeryText === "Video Gallery") ? "active" : "disactive"
                            pathname === '/media/gallery/videos' ? 'galery-link active' : 'galery-link'
                        }
                    >
                     {!lang ? 'Video Qalereya' : 'Video Gallery'}
                    </Link>
                </div>
                <Outlet />
                </div>
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

export default Galery;