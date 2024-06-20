import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Main from "../../layout/Main/Main";
import Footer from "../../layout/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/icon-white.png";
import "./InfoPage.css";


const InfoPage = () => {
  const { token } = useAuth();
  let navigate = useNavigate();
  return (
    <div>
      <HeaderLoggedIn />
      <Main>
      <div className="main-section">
     {/* <img src={logo} className="bg-icon" alt="logo"></img> */}
    <p>Hello <br/>
    This app is made as a graduation thesis depicting the use of microservice applications. Thank you 
    for showing interest and checking it out! Feel free to explore and break it, bugs are upsetting but not
    unwelcomed. <br/> <br/>
    Owner: Jana Markovikj <br/>
    Email: jana.markovikj@students.finki.ukim.mk
    </p>
     </div>
      </Main>
      <Footer />
    </div>
  );
};
export default InfoPage;
