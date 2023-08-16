import './RegistrationPage.scss';
import sneaker from '../../shared/assets/images/sneaker.png';
import FormRegistration from '../../components/FormRegistration/FormRegistration';

const RegistrationPage = () => {
  return (
    <div className="wrapperRegistration">
      <div className="wrapperForm">
        <div className="title">Registration</div>
        <FormRegistration />
      </div>
      <div className="sneakerContainer">
        <img className="sneakerImg" src={sneaker} alt="" />
      </div>
    </div>
  );
};

export default RegistrationPage;
