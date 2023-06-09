import { Link } from 'react-router-dom';
import "./style.css";
import btn from "../../img/subscribebtn.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import fb from "../../img/fb.svg";
import insta from "../../img/insta.svg";
import linkedin from "../../img/in.svg";
import { fetchData } from '../../assets/api/dataFetching';
import { socialSliceAction } from '../../store/social-slice';
import axios from 'axios';
import Swal from 'sweetalert2';

function Footer() {
    const lang = useSelector(state => state.langReducer.lang);

    // const { setContextData , setGaleryText, data , setData , lang  } = useContext(GlobalContext);
    const data = useSelector(state => state.socialReducer.socialMedias);
    const dispatch = useDispatch();

    const clickEvent = (e) => {
        window.scrollTo(0, 0);
        // setContextData(e.target.innerText);
        window.localStorage.setItem('aboutText', e.target.innerText);
    }
    const [email, setEmail] = useState("");
    let postData = new FormData();
    postData.append('email',email);
  
    // Formdan-data çəkmək üçün lazım olacaq
    let handleSubmit = async (e) => {
      e.preventDefault();
      axios.post(`http://api-ddf.asdfghjkl.gov.az/api/${lang}/email`, postData)
      .then(function (response) {
        Swal.fire(
            `${!lang ? 'Abunə Olundu': 'Subscribed'}`,
            '',
            'success'
          )
      })
      .catch(function (error) {
        Swal.fire({
            icon: 'error',
            title:`${!lang ? 'Xəta Baş Verdi': 'An Error Occurred'}`,
            text: ''
          })
      });

      setEmail("");
    };


    const handleClick = () => {
        window.scrollTo(0, 0);
        // setGaleryText('Foto Qalereya');
    };

    useEffect(() =>{
    fetchData('az/socicalMedia').then(data => dispatch(socialSliceAction.getAllSocial(data.data[0])));
    },[dispatch]);


    return (
        <>
            <div className="home-news-row hr mr-b footer-direction">
                <div className='col-md-8'>
                    <ul className="footer-list footer-wrap">
                        <li>
                            <span>{!lang ? 'HAQQIMIZDA' : 'ABOUT US'}</span>
                            <ul>
                                <Link to="/about/history" onClick={clickEvent}><li>{!lang ? 'Tariximiz' : 'History'}</li></Link>
                                <Link to="/about/mission-vision" onClick={clickEvent}><li>{!lang ? 'Dəyər və Hədəflərimiz' : 'Values and Vision'}</li></Link>
                                <Link to="/about/management" onClick={clickEvent}><li>{!lang ? 'Rəhbərlik' : 'Management'}</li></Link>
                                <Link to="/about/supervisory" onClick={clickEvent}><li>{!lang ? 'Müşahidə Şurası' : 'Supervisory Board'}</li></Link>
                                <Link to="/about/structure" onClick={clickEvent}><li>{!lang ? 'Struktur' : 'Structure'}</li></Link>
                                <Link to="/about/legislation" onClick={clickEvent}><li>{!lang ? 'Qanunvericilik' : 'Legislation'}</li></Link>
                            </ul>
                        </li>
                        <li style={{ width: '122px' }}>
                            <span>{!lang ? 'SATINALMA' : 'PROCUREMENT'}</span>
                            <ul>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/purchase/purchase-announce"><li>{!lang ? 'Satınalma elanları' : 'Procurement announcements'}</li></Link>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/purchase/purchase-archive"><li>{!lang ? 'Satınalma arxivi' : 'Procurement archive'}</li></Link>
                            </ul>
                        </li>
                        <li>
                            <span>{!lang ? 'FƏALİYYƏT' : 'ACTIVITY'}</span>
                            <ul>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/mines"><li>{!lang ? 'Yataqlar' : 'Mines'}</li></Link>
                                {/* <Link onClick={() => window.scrollTo(0,0)} to="#"><li>KSM</li></Link> */}
                            </ul>
                        </li>
                        <li>
                            <span>{!lang ? 'MEDİA' : 'MEDIA'}</span>
                            <ul>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/media/news"><li>{!lang ? 'Xəbərlər' : 'News'}</li></Link>
                                <Link onClick={handleClick} to="/media/gallery/photos"><li>{!lang ? 'Qalereya' : 'Gallery'}</li></Link>
                            </ul>
                        </li>
                        <li>
                            <span>{!lang ? 'KARYERA' : 'CAREER'}</span>
                            <ul>
                                {/* <Link to="#"><li>Kadr siyasəti</li></Link> */}
                                <Link onClick={() => window.scrollTo(0, 0)} to="/vacancies"><li>{!lang ? 'Vakansiyalar' : 'Vacancies'}</li></Link>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/apply"><li>{!lang ? 'Müraciət' : 'Apply'}</li></Link>
                            </ul>
                        </li>
                        <li>
                            <span>{!lang ? 'ƏLAQƏ' : 'CONTACT'}</span>
                            <ul>
                                <li>+994125857788</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className='col-md-4'>
                    <div className="footer-contact">
                        <div className="suscribe-section">
                            <h3>{!lang ? 'Bildirişləri əldə et' : 'Get notifications'}</h3>
                            <div className="suscribe">
                                <form 
                                    onSubmit={handleSubmit} 
                                    method="POST" 
                                >
                                    <input 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        type="email" name="sub_email" 
                                        id="sub_email" 
                                        placeholder={!lang ? "E-mail ünvanınızı daxil edin" : "Enter your email adress"} 
                                        required 
                                    />
                                    <button type='submit'>
                                        <img src={btn} alt="subscribe Btn" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="footer-social-media">
                            <h3>{!lang ? 'Bizi izləməyi unutma' : "Don't forget to follow us"}</h3>
                            <ul className="social-icons">
                                <a target={'_blank'} rel="noreferrer" href={data.fb}><li><img src={fb} alt="Facebook icon" /></li></a>
                                <a target={'_blank'} rel="noreferrer" href={data.instagram}><li><img src={insta} alt="Instagram Icon" /></li></a>
                                <a target={'_blank'} rel="noreferrer" href={data.linkedin}><li><img src={linkedin} alt="Linkedin icon" /></li></a>
                                {/* <a href='#' style={{ pointerEvents: 'none' }} ><li><img src={yt} alt="Youtube Icon" /></li></a> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-news-row justify-content-start footer-wrap">
                <div className='copyright-item'>{!lang ? 'copyright@Daşkəsən Dəmir Filizi' : 'copyright@Dashkasan Iron Ore'}</div>
                <div className='copyright-item'>{!lang ? 'Bütün hüquqlar qorunur' : 'All rights reserved'}</div>
                <a href='https://www.butagrup.com.tr/' rel="noreferrer" target='_blank' className='copyright-item'>{!lang ? 'Buta Grup tərəfindən hazırlanmışdır' : 'Site by Buta Grup'}</a>
            </div>
        </>
    );
}

export default Footer;