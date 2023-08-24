import '../FormRegistration/FormRegistration.scss';
import './PersonalAccount.scss';
import plus from '../../shared/assets/icons/plus.svg';
const PersonalAccount = () => {
  return (
    <div>
      <div className="titlePersonalAccount">Personal account</div>
      <div className="aboutAccount">About user</div>
      <form className="formRegistr">
        <div className="nameContainer">
          <div className="wrapperField">
            <div className="descriptionUser">
              <div>Name</div>
              <div>change</div>
            </div>

            <input
              className="shortInput inputRegistr"
              name="name"
              type="text"
            />
          </div>

          <div className="wrapperField">
            <div className="descriptionUser">
              <div>Surname</div>
              <div>change</div>
            </div>

            <input
              className="shortInput inputRegistr"
              name="surname"
              type="text"
            />
          </div>
        </div>
        <div className="wrapperField">
          <div className="descriptionUser">
            <div>Birthday</div>
            <div>change</div>
          </div>

          <input className="inputRegistr" name="birthday" type="date" />
        </div>
        <div className="wrapperField">
          <div className="descriptionUser">
            <div>Email</div>
            <div>change</div>
          </div>

          <input className="inputRegistr" name="email" type="text" />
        </div>

        <h2 className="titleAddress">
          Address <span>change</span>
        </h2>

        <div className="addressContainer">
          <div className="wrapperField">
            <div className="descriptionUser">Country</div>
            <input className=" countryField shortInput select inputRegistr"></input>
          </div>

          <div className="wrapperField">
            <div className="descriptionUser">City</div>

            <input
              className="shortInput inputRegistr"
              name="city"
              type="string"
            />
          </div>

          <div className="wrapperField">
            <div className="descriptionUser">Street</div>

            <input
              className="shortInput inputRegistr"
              name="street"
              type="string"
            />
          </div>

          <div className="wrapperField">
            <div className="subTitleRegistr">Postal code</div>

            <input
              className="shortInput inputRegistr"
              name="postcode"
              type="string"
            />
          </div>
        </div>
        <button className="btnAddressAdd">
          {' '}
          <img src={plus} alt="Add" /> Add address
        </button>
      </form>
    </div>
  );
};

export default PersonalAccount;
