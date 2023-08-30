import { useState, useEffect } from 'react';
import plus from '../../shared/assets/icons/plus.svg';
import '../FormRegistration/FormRegistration.scss';
import ChangeName from '../Popup/ChangeName';
import ChangeSurname from '../Popup/ChangeSurname';
import PopupRoot from '../Popup/PopupRoot';
import './PersonalAccount.scss';
import ChangeBirthday from '../Popup/ChangeBirthday';
import { useAppSelector } from '../../store';
import { getDataUser } from '../../api/methods';
import { Customer } from '@commercetools/platform-sdk';
import ChangeEmail from '../Popup/ChangeEmail';
import ChangePassword from '../Popup/ChangePassword';
import ChangeAddress from '../Popup/ChangeAddress';

const PersonalAccount = () => {
  const [userData, setUserData] = useState<Customer | null>(null);
  const { isCustomer } = useAppSelector((state) => state.customer);
  const [isUpdateData, setIsUpdateData] = useState(true);
  const [open, setOpen] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openSurname, setOpenSurname] = useState(false);
  const [openBirthday, setOpenBirthday] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const getUserInfo = async () => {
    const { body } = await getDataUser();
    setUserData(body);
    setIsUpdateData(false);
  };

  useEffect(() => {
    if (isCustomer && isUpdateData) {
      getUserInfo();
    }
  }, [isCustomer, isUpdateData]);

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
                value={userData?.firstName ? userData.firstName : ''}
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
                value={userData?.lastName ? userData.lastName : ''}
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
              value={userData?.dateOfBirth ? userData.dateOfBirth : ''}
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
              value={userData?.email ? userData.email : ''}
            />
          </div>
          <div className="wrapperField">
            <div className="descriptionUser">
              <div>Password</div>
              <div
                onClick={() => {
                  setOpenPassword(!openPassword);
                }}
              >
                change
              </div>
            </div>
            <div className="inputPasswordWrapper">
              <input
                className="inputRegistr"
                name="password"
                disabled
                value={userData?.password ? userData.password : ''}
              />
            </div>
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
                value={'US'}
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
                value={'12345'}
                disabled
              />
            </div>
          </div>
          <button className="btnAddressAdd" onClick={() => setOpen(!open)}>
            <img src={plus} alt="Add" /> Add address
          </button>
        </form>
      </div>
      {openName && (
        <PopupRoot
          closePopup={() => setOpenName(!openName)}
          children={
            <ChangeName
              closePopup={() => setOpenName(!openName)}
              version={userData.version}
              setIsUpdate={setIsUpdateData}
            />
          }
        />
      )}
      {openSurname && (
        <PopupRoot
          closePopup={() => setOpenSurname(!openSurname)}
          children={
            <ChangeSurname
              closePopup={() => setOpenSurname(!openSurname)}
              version={userData.version}
              setIsUpdate={setIsUpdateData}
            />
          }
        />
      )}
      {openBirthday && (
        <PopupRoot
          closePopup={() => setOpenBirthday(!openBirthday)}
          children={
            <ChangeBirthday
              closePopup={() => setOpenBirthday(!openBirthday)}
              version={userData.version}
              setIsUpdate={setIsUpdateData}
            />
          }
        />
      )}
      {openEmail && (
        <PopupRoot
          closePopup={() => setOpenEmail(!openEmail)}
          children={
            <ChangeEmail
              closePopup={() => setOpenEmail(!openEmail)}
              version={userData.version}
              setIsUpdate={setIsUpdateData}
            />
          }
        />
      )}
      {openPassword && (
        <PopupRoot
          closePopup={() => setOpenPassword(!openPassword)}
          children={
            <ChangePassword
              closePopup={() => setOpenPassword(!openPassword)}
              version={userData.version}
              setIsUpdate={setIsUpdateData}
            />
          }
        />
      )}
      {open && (
        <PopupRoot
          closePopup={() => setOpen(!open)}
          children={<ChangeAddress closePopup={() => setOpen(!open)} />}
        />
      )}
    </div>
  );
};

export default PersonalAccount;
