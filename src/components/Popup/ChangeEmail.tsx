import { useState } from 'react';
import { re } from '../../shared/constants/Constants';
import save from '../../shared/assets/icons/save.svg';
import { IPropsChangeUserData } from './ChangeName';
import { changeEmail } from '../../api/methods';
import { useAppSelector } from '../../store';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';

const ChangeEmail = ({
  closePopup,
  version,
  setIsUpdate,
}: IPropsChangeUserData) => {
  const { userId } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>(
    'Field must not be empty'
  );
  const [emailDirty, setEmailDirty] = useState<boolean>(false);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Enter an existing email(e.g., example@mail.com)');
    } else {
      setEmailError('');
    }
  };

  const saveEmail = () => {
    changeEmail(email, userId, version)
      .then(() => {
        closePopup();
        setIsUpdate(true);
        AppNotification({
          msg: 'Email changed!',
          type: NotificationType.success,
        });
      })
      .catch((e) => {
        AppNotification({
          msg: e?.message,
        });
      });
  };
  return (
    <div className="formPopup">
      <div className="popupCard">
        <div className="popupHeader">
          <h2 className="titleAddress">Change the email</h2>
        </div>
        <p className="popupText">
          Change the data and confirm by pressing the "Save" button
        </p>
        <div className="addressContainer">
          <div className="wrapperFieldData">
            <div className="descriptionUser">Email</div>
            <input
              onChange={(e) => emailHandler(e)}
              value={email || ''}
              onBlur={() => setEmailDirty(true)}
              name="email"
              type="text"
              placeholder="Enter your email.."
              className="inputRegistr"
            ></input>
            {emailDirty && emailError && (
              <div className="error" style={{ color: 'red' }}>
                {emailError}
              </div>
            )}
          </div>
        </div>
        <button
          className="btnSave"
          disabled={!!(!email || emailError)}
          type="submit"
          onClick={() => saveEmail()}
        >
          <img src={save} alt="Save" /> Save
        </button>
      </div>
    </div>
  );
};

export default ChangeEmail;
