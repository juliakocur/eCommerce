import '../FormRegistration/FormRegistration.scss';
import './PersonalAccount.scss';
import plus from '../../shared/assets/icons/plus.svg';
import save from '../../shared/assets/icons/save.svg';
import close from '../../shared/assets/icons/burger-close.svg';
import { useState } from 'react';

const PersonalAccount = () => {
  const [open, setOpen] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openSurname, setOpenSurname] = useState(false);
  const [openBirthday, setOpenBirthday] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const clickHandler = () => {
    setOpen(false);
  };
  const clickHandlerName = () => {
    setOpenName(false);
  };
  const clickHandlerSurname = () => {
    setOpenSurname(false);
  };
  const clickHandlerBirthday = () => {
    setOpenBirthday(false);
  };
  const clickHandlerEmail = () => {
    setOpenEmail(false);
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
                <div
                  onClick={() => {
                    setOpenName(!openName);
                  }}
                >
                  change
                </div>
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
                <div
                  onClick={() => {
                    setOpenSurname(!openSurname);
                  }}
                >
                  change
                </div>
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
              <div
                onClick={() => {
                  setOpenBirthday(!openBirthday);
                }}
              >
                change
              </div>
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
              <div
                onClick={() => {
                  setOpenEmail(!openEmail);
                }}
              >
                change
              </div>
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

      <div className={`popupContainer ${open ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the address</h2>
                <div className="popupClose" onClick={() => clickHandler()}>
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperField">
                  <div className="descriptionUser">Country</div>
                  <input
                    className=" countryField shortInput select inputRegistr"
                    value={'USA'}
                  ></input>
                </div>

                <div className="wrapperField">
                  <div className="descriptionUser">City</div>

                  <input
                    className="shortInput inputRegistr"
                    name="city"
                    type="string"
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
                  />
                </div>

                <div className="wrapperField">
                  <div className="subTitleRegistr">Postal code</div>

                  <input
                    className="shortInput inputRegistr"
                    name="postcode"
                    type="string"
                    value={'12563'}
                  />
                </div>
              </div>
              <button className="btnSave">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openName ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the name</h2>
                <div className="popupClose" onClick={() => clickHandlerName()}>
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Name</div>
                  <input className="inputRegistr" value={'Simon'}></input>
                </div>
              </div>
              <button className="btnSave">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openSurname ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the surname</h2>
                <div
                  className="popupClose"
                  onClick={() => clickHandlerSurname()}
                >
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Surname</div>
                  <input
                    className="inputRegistr"
                    type="text"
                    value={'Pit'}
                  ></input>
                </div>
              </div>
              <button className="btnSave">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openBirthday ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the date of birth</h2>
                <div
                  className="popupClose"
                  onClick={() => clickHandlerBirthday()}
                >
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Birthday</div>
                  <input
                    className="inputRegistr"
                    type="date"
                    value={'2013-10-22'}
                  ></input>
                </div>
              </div>
              <button className="btnSave">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openEmail ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the email</h2>
                <div className="popupClose" onClick={() => clickHandlerEmail()}>
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Email</div>
                  <input
                    className="inputRegistr"
                    type="text"
                    value={'6227968@gmail.com'}
                  ></input>
                </div>
              </div>
              <button className="btnSave">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;
