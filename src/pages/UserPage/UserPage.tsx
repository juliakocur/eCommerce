import './UserPage.scss';
import PersonalAccount from '../../components/PesonalAccount/PersonalAccount';
import imgAccountPage from '../../shared/assets/images/imgAccountPage.png';

const UserPage = () => {
  return (
    <div className="wrapperPersonalAccount">
      <div className="innerPageAccount">
        <PersonalAccount />
        <img src={imgAccountPage} alt="" />
      </div>
    </div>
  );
};

export default UserPage;
