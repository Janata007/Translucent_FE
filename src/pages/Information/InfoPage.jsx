import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../../layout/Header/HeaderLoggedIn";
import Main from "../../layout/Main/Main";
import Footer from "../../layout/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/icon-white.png";
import "./InfoPage.css";
import { ROUTES } from "../../constants/ROUTES";


const InfoPage = () => {
  const { token } = useAuth();
  let navigate = useNavigate();
  return (
    <div className="info-div">
      <HeaderLoggedIn />
      <Main>
        <ul>
      <div className="content-wrap">
     <img src={logo} className="bg-icon" alt="logo"></img>
    <p>Hello <br/>
    This app is made as a graduation thesis depicting the use of microservice applications. Thank you 
    for showing interest and checking it out! Feel free to explore and break it, bugs are upsetting but not
    unwelcomed. Thank you to my mentor for the support and patience with this project ! <br/> <br/>
    Owner: Jana Markovikj <br/>
    Email: jana.markovikj@students.finki.ukim.mk <br/>
    Mentor: Sasho Gramatikov
    </p>
     </div>
     <button
          type="button"
          className="form-button"
          onClick={() => navigate(ROUTES.HOME)}>
          Return to Home
       </button>
       </ul>
      </Main>
      <Footer />
    </div>
  );
};
export default InfoPage;
