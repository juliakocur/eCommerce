import './AboutUsPage.scss';
import { developers } from '../../shared/constants/Constants';
import AboutUsCard from '../../components/AboutUsCard/AboutUsCard';
import rslogo from '../../shared/assets/images/rslogo.png';

const AboutUsPage = () => {
  return (
    <div className="aboutUsPage">
      <div className="titleLogo">
        <h1 className="titleAboutUs">About us</h1>
        <a href="https://rs.school/">
          <img className="rslogo" src={rslogo} alt="logo" />
        </a>
      </div>
      <p className="projectDescription">
        We are a team of three novice front-end developers. Studying at the
        RSSchool, focus on results and a great desire to learn something new has
        rallied us into one strong and united team. Under the strict support of
        our mentor, we successfully completed all the tasks assigned to us,
        adopting invaluable experience and knowledgeWe worked closely with each
        other throughout the final project. To do this, we initially created a
        group in Discord, divided into several main sections, where we exchanged
        the necessary information, shared various links, and also created
        conferences. With the help of the Trello tool, we provided project
        management, which allowed us to organize our approach to solving
        problems by dividing them into subtasks and distributing them among
        themselves. All of this, as well as the incredible cohesion of our team,
        led us to create a successful product - the site that you are now
        watching on your screen.
      </p>
      <div className="developers">
        <AboutUsCard developer={developers[0]} />
        <AboutUsCard developer={developers[1]} />
        <AboutUsCard developer={developers[2]} />
      </div>
    </div>
  );
};

export default AboutUsPage;
