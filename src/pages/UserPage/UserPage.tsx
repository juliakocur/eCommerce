import PersonalAccount from '../../components/PesonalAccount/PersonalAccount';
import imgAccountPage from '../../shared/assets/images/imgAccountPage.png';

const UserPage = () => {
  return (
    <div className="wrapperRegistration">
      <PersonalAccount />
      <div className="sneakerContainer">
        <img className="sneakerImg" src={imgAccountPage} alt="" />
      </div>
    </div>
  );
};

export default UserPage;
