import './MainPage.scss';

const MainPage = () => {
  console.log(process.env.REACT_APP_PROJECT_KEY);
  return (
    <div className="mainPage">
      <h1>Main page</h1>
    </div>
  );
};

export default MainPage;
