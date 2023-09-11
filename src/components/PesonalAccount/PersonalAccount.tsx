import { useState, useEffect } from 'react';
import plus from '../../shared/assets/icons/plus.svg';
import '../FormRegistration/FormRegistration.scss';
import ChangeName from '../Popup/ChangeName';
import ChangeSurname from '../Popup/ChangeSurname';
import PopupRoot from '../Popup/PopupRoot';
import './PersonalAccount.scss';
import ChangeBirthday from '../Popup/ChangeBirthday';
import { useAppDispatch, useAppSelector } from '../../store';
import { getDataUser } from '../../api/methods';
import { Customer } from '@commercetools/platform-sdk';
import ChangeEmail from '../Popup/ChangeEmail';
import ChangePassword from '../Popup/ChangePassword';
import Address from './Address';
import AddAddress from '../Popup/AddAddress';
import {
  changeCartId,
  changeCustomerState,
  changeUserId,
  resetTokenCache,
} from '../../store/rootReducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/AppRouter';

const PersonalAccount = () => {
  const [userData, setUserData] = useState<Customer | null>(null);
  const { isCustomer } = useAppSelector((state) => state.customer);
  const [isUpdateData, setIsUpdateData] = useState(true);
  const [openAddress, setOpenAddress] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openSurname, setOpenSurname] = useState(false);
  const [openBirthday, setOpenBirthday] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(changeUserId(''));
    dispatch(changeCartId(''));
    dispatch(changeCustomerState(false));
    dispatch(resetTokenCache());
    navigate(`../../${routes.main.path}`);
  };

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
        <div className="titlePersonalAccount">
          <span>Personal account</span>
          <div className="logout" onClick={logout}>
            Logout
          </div>
        </div>
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
          <>
            {!!userData?.addresses.length &&
              userData.addresses.map((el) => (
                <Address
                  info={el}
                  key={el.id}
                  version={userData.version}
                  setIsUpdate={setIsUpdateData}
                />
              ))}
          </>
          <button
            className="btnAddressAdd"
            onClick={() => setOpenAddress(!openAddress)}
            type="button"
          >
            <img src={plus} alt="Add" /> Add address
          </button>
        </form>
      </div>
      {openAddress && (
        <PopupRoot
          closePopup={() => setOpenAddress(!openAddress)}
          children={
            <AddAddress
              closePopup={() => setOpenAddress(!openAddress)}
              setIsUpdate={setIsUpdateData}
              version={userData?.version}
            />
          }
        />
      )}
      {openName && (
        <PopupRoot
          closePopup={() => setOpenName(!openName)}
          children={
            <ChangeName
              closePopup={() => setOpenName(!openName)}
              version={userData?.version}
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
              version={userData?.version}
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
              version={userData?.version}
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
              version={userData?.version}
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
              version={userData?.version}
              setIsUpdate={setIsUpdateData}
            />
          }
        />
      )}
    </div>
  );
};

export default PersonalAccount;
