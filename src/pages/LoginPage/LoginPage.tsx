import './LoginPage.scss';
import loginImg from '../../shared/assets/images/login.png';
import FormLogin from '../../components/FormLogin/FormLogin';

const LoginPage = () => {
  return (
    <div className="wrapperLogin">
      <div className="wrapperFormLogin">
        <div className="titleLogin">Login</div>
        <FormLogin />
      </div>
      <div className="loginImgContainer">
        <img className="sneakerLoginImg" src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
