import './UserPage.scss';
import PersonalAccount from '../../components/PesonalAccount/PersonalAccount';
import imgAccountPage from '../../shared/assets/images/imgAccountPage.png';

const UserPage = () => {
  return (
    <div className="innerPageAccount">
      <PersonalAccount />
      <img src={imgAccountPage} alt="" />
    </div>
  );
};

export default UserPage;
