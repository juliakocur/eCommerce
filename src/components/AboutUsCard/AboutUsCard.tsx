import { IDeveloperProps } from '../../shared/types/index';
import './AboutUsCard.scss';
import nameLogo from '../../shared/assets/icons/nameLogo.svg';

const AboutUsCard = ({ developer }: IDeveloperProps) => {
  return (
    <div className="developerCard">
      <div className="developerImg">
        <img src={developer.image} alt="photo" />
      </div>
      <div className="nameWrapper">
        <a href={developer.git} className="roundLogo">
          <img className="nameLogo" src={nameLogo} alt="logo" />
        </a>
        <div className="developerJobName">
          <div className="developerName">{developer.name}</div>
          <div className="developerJob">Developer</div>
        </div>
      </div>
      <div className="developerText">{developer.text}</div>
    </div>
  );
};
export default AboutUsCard;
