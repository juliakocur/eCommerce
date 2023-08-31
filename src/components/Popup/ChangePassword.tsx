import { useState } from 'react';
import { passwordRegex } from '../../shared/constants/Constants';
import save from '../../shared/assets/icons/save.svg';
import eyeOff from '../../shared/assets/icons/eye-off.svg';
import eye from '../../shared/assets/icons/eye.svg';
import { IPropsChangeUserData } from './ChangeName';
import { useAppDispatch, useAppSelector } from '../../store';
import { changePassword, loginCustomer } from '../../api/methods';
import { buildClientWithPasswordFlow } from '../../api/BuildClient';
import {
  changeCustomerState,
  changeUserId,
  resetTokenCache,
} from '../../store/rootReducer';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';

const ChangePassword = ({
  closePopup,
  version,
  setIsUpdate,
}: IPropsChangeUserData) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.auth);
  const [currentPassword, setCurrentPassword] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [currentPasswordDirty, setCurrentPasswordDirty] =
    useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [repeatPasswordDirty, setRepeatPasswordDirty] =
    useState<boolean>(false);
  const [currentPasswordError, setCurrentPasswordError] = useState<string>(
    'Field must not be empty'
  );
  const [passwordError, setPasswordError] = useState<string>(
    'Field must not be empty'
  );
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>(
    'Field must not be empty'
  );
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState<boolean>(false);

  const currentPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setCurrentPassword(newPassword);

    if (!newPassword) {
      setCurrentPasswordError('Field must not be empty');
    } else if (!passwordRegex.test(newPassword)) {
      setCurrentPasswordError(
        'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character(e.g., !@#$%^&*) '
      );
    } else {
      setCurrentPasswordError('');
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setCurrentPasswordError('Field must not be empty');
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character(e.g., !@#$%^&*) '
      );
    } else {
      setPasswordError('');
    }
  };

  const passwordRepeatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setRepeatPassword(newPassword);

    if (!newPassword) {
      setRepeatPasswordError('Field must not be empty');
    } else if (!passwordRegex.test(newPassword)) {
      setRepeatPasswordError(
        'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character(e.g., !@#$%^&*) '
      );
    } else if (newPassword !== password) {
      setRepeatPasswordError('You entered different passwords');
    } else {
      setRepeatPasswordError('');
    }
  };

  const savePassword = async () => {
    await changePassword(currentPassword, password, userId, version)
      .then((res) => {
        dispatch(resetTokenCache());
        buildClientWithPasswordFlow(res.body.email, password);

        loginCustomer(res.body.email, password).then(({ body }) => {
          dispatch(changeUserId(body.customer.id));
          dispatch(changeCustomerState(true));
          closePopup();
          setIsUpdate(true);
        });

        AppNotification({
          msg: 'Password changed!',
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
      <div className="popupHeader">
        <h2 className="titleAddress">Change the password</h2>
      </div>
      <p className="popupText">
        Change the data and confirm by pressing the "Save" button
      </p>
      <div className="addressContainer">
        <div className="wrapperFieldData">
          <div className="wrapperField">
            <div className="subTitleRegistr">
              Current password <span className="requiredRegistr">*</span>
            </div>
            <div className="inputPasswordWrapper">
              <input
                className="inputRegistr"
                onChange={(e) => currentPasswordHandler(e)}
                value={currentPassword || ''}
                onBlur={() => setCurrentPasswordDirty(true)}
                name="current-password"
                type={showCurrentPassword ? 'text' : 'password'}
                placeholder="Enter your current password.."
              />

              <img
                src={showCurrentPassword ? eye : eyeOff}
                alt=""
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="icon"
              />
            </div>
            {currentPasswordDirty && currentPasswordError && (
              <div className="error" style={{ color: 'red' }}>
                {currentPasswordError}
              </div>
            )}
          </div>
          <div className="wrapperField" style={{ marginTop: '40px' }}>
            <div className="subTitleRegistr">
              New password <span className="requiredRegistr">*</span>
            </div>
            <div className="inputPasswordWrapper">
              <input
                className="inputRegistr"
                onChange={(e) => passwordHandler(e)}
                value={password || ''}
                onBlur={() => setPasswordDirty(true)}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your new password.."
              />

              <img
                src={showPassword ? eye : eyeOff}
                alt=""
                onClick={() => setShowPassword(!showPassword)}
                className="icon"
              />
            </div>
            {passwordDirty && passwordError && (
              <div className="error" style={{ color: 'red' }}>
                {passwordError}
              </div>
            )}
          </div>

          <div className="wrapperField" style={{ marginTop: '40px' }}>
            <div className="subTitleRegistr">
              Repeat new password <span className="requiredRegistr">*</span>
            </div>
            <div className="inputPasswordWrapper">
              <input
                className="inputRegistr"
                onChange={(e) => passwordRepeatHandler(e)}
                value={repeatPassword || ''}
                onBlur={() => setRepeatPasswordDirty(true)}
                name="repeat-password"
                type={showPasswordRepeat ? 'text' : 'password'}
                placeholder="Repeat your password.."
              />

              <img
                src={showPasswordRepeat ? eye : eyeOff}
                alt=""
                onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                className="icon"
              />
            </div>
            {repeatPasswordDirty && repeatPasswordError && (
              <div className="error" style={{ color: 'red' }}>
                {repeatPasswordError}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="btnSave"
        disabled={
          !!(
            !password ||
            !repeatPassword ||
            passwordError ||
            repeatPasswordError ||
            !currentPassword ||
            currentPasswordError
          )
        }
        type="submit"
        onClick={() => savePassword()}
      >
        <img src={save} alt="Save" /> Save
      </button>
    </div>
  );
};

export default ChangePassword;
