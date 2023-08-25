import '../FormRegistration/FormRegistration.scss';
import './PersonalAccount.scss';
import plus from '../../shared/assets/icons/plus.svg';
import close from '../../shared/assets/icons/burger-close.svg';
import { useState } from 'react';

const PersonalAccount = () => {
  const [open, setOpen] = useState(false);
  const clickHandler = () => {
    setOpen(false);
  };
  return (
    <div className="wrapperFormPopup">
      <div className="wrapperForm">
        <div className="titlePersonalAccount">Personal account</div>
        <h2 className="aboutAccount">About user</h2>
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
                disabled
                value={'Simon'}
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
                value={'Pit'}
                disabled
              />
            </div>
          </div>
          <div className="wrapperField">
            <div className="descriptionUser">
              <div>Birthday</div>
              <div>change</div>
            </div>

            <input
              className="inputRegistr"
              name="birthday"
              type="date"
              value={'2013-10-22'}
              disabled
            />
          </div>
          <div className="wrapperField">
            <div className="descriptionUser">
              <div>Email</div>
              <div>change</div>
            </div>

            <input
              className="inputRegistr"
              name="email"
              type="text"
              disabled
              value={'6227968@gmail.com'}
            />
          </div>

          <h2 className="titleAddress">
            Address{' '}
            <span
              onClick={() => {
                setOpen(!open);
              }}
            >
              change
            </span>
          </h2>

          <div className="addressContainer">
            <div className="wrapperField">
              <div className="descriptionUser">Country</div>
              <input
                className=" countryField shortInput select inputRegistr"
                disabled
                value={'USA'}
              ></input>
            </div>

            <div className="wrapperField">
              <div className="descriptionUser">City</div>

              <input
                className="shortInput inputRegistr"
                name="city"
                type="string"
                disabled
                value={'NY'}
              />
            </div>

            <div className="wrapperField">
              <div className="descriptionUser">Street</div>

              <input
                className="shortInput inputRegistr"
                name="street"
                type="string"
                value={'Avenue 12'}
                disabled
              />
            </div>

            <div className="wrapperField">
              <div className="subTitleRegistr">Postal code</div>

              <input
                className="shortInput inputRegistr"
                name="postcode"
                type="string"
                value={'12563'}
                disabled
              />
            </div>
          </div>
          <button className="btnAddressAdd">
            <img src={plus} alt="Add" /> Add address
          </button>
        </form>
      </div>

      <div className={`popupAddress ${open ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupClose" onClick={() => clickHandler()}>
              <img src={close} alt="Close" />
            </div>
            <div className="popupCard">
              <h2 className="titleAddress">Change address</h2>

              <div className="addressContainer">
                <div className="wrapperField">
                  <div className="descriptionUser">Country</div>
                  <input
                    className=" countryField shortInput select inputRegistr"
                    disabled
                    value={'USA'}
                  ></input>
                </div>

                <div className="wrapperField">
                  <div className="descriptionUser">City</div>

                  <input
                    className="shortInput inputRegistr"
                    name="city"
                    type="string"
                    disabled
                    value={'NY'}
                  />
                </div>

                <div className="wrapperField">
                  <div className="descriptionUser">Street</div>

                  <input
                    className="shortInput inputRegistr"
                    name="street"
                    type="string"
                    value={'Avenue 12'}
                    disabled
                  />
                </div>

                <div className="wrapperField">
                  <div className="subTitleRegistr">Postal code</div>

                  <input
                    className="shortInput inputRegistr"
                    name="postcode"
                    type="string"
                    value={'12563'}
                    disabled
                  />
                </div>
              </div>
              <button className="btnAddressAdd">
                <img src={plus} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;
