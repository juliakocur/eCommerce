import '../FormRegistration/FormRegistration.scss';
import { useEffect, useState } from 'react';
import eyeOff from '../../shared/assets/icons/eye-off.svg';
import eye from '../../shared/assets/icons/eye.svg';

import { re, passwordRegex } from '../../shared/constants/Constants';
import { useAppDispatch } from '../../store';
import { buildClientWithPasswordFlow } from '../../api/BuildClient';
import { loginCustomer } from '../../api/methods';
import { changeCustomerState, changeUserId } from '../../store/rootReducer';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/AppRouter';

const FormRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>(
    'Field must not be empty'
  );
  const [passwordError, setPasswordError] = useState<string>(
    'Field must not be empty'
  );
  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Enter an existing email(e.g., example@mail.com)');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setPasswordError('Field must not be empty');
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character(e.g., !@#$%^&*) '
      );
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onClickHandler = async () => {
    if (formValid) {
      buildClientWithPasswordFlow(email, password);

      await loginCustomer(email, password)
        .then(({ body }) => {
          dispatch(changeUserId(body.customer.id));
          dispatch(changeCustomerState(true));
          AppNotification({
            msg: 'Authorization completed successfully!',
            type: NotificationType.success,
          });
          navigate(`../../${routes.main.path}`);
        })
        .catch((e) => {
          AppNotification({
            msg: e?.message,
          });
        });
    }
  };

  return (
    <form className="formRegistr">
      <div className="wrapperField">
        <div className="subTitleRegistr">
          Email <span className="requiredRegistr">*</span>
        </div>

        <input
          className="inputRegistr"
          onChange={(e) => emailHandler(e)}
          value={email || ''}
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Enter your email.."
        />
        {emailDirty && emailError && (
          <div className="error" style={{ color: 'red' }}>
            {emailError}
          </div>
        )}
      </div>
      <div className="wrapperField">
        <div className="subTitleRegistr">
          Password <span className="requiredRegistr">*</span>
        </div>
        <div className="inputPasswordWrapper">
          <input
            className="inputRegistr"
            onChange={(e) => passwordHandler(e)}
            value={password || ''}
            onBlur={(e) => blurHandler(e)}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password.."
          />

          <img
            src={showPassword ? eye : eyeOff}
            alt=""
            onClick={togglePasswordVisibility}
            className="icon"
          />
        </div>
        {passwordDirty && passwordError && (
          <div className="error" style={{ color: 'red' }}>
            {passwordError}
          </div>
        )}
      </div>
      <button
        className="btnRegistr"
        disabled={!formValid}
        type="button"
        onClick={onClickHandler}
      >
        Login
      </button>
    </form>
  );
};

export default FormRegistration;
