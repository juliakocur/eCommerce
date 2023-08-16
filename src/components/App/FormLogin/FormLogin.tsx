import './FormLogin.scss';
import { useEffect, useState } from 'react';
import eyeoff from '../../../shared/assets/icons/eye-off.svg';
import eye from '../../../shared/assets/icons/eye.svg';

const FormLogin = () => {
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Enter an existing email(e.g., example@mail.com)');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/;

    if (!newPassword) {
      setPasswordError('Field must not be empty');
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number'
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

  return (
    <div className="mainPage">
      <form>
        <div className="wrapperFieldLogin">
          <p className="fieldHeader">
            Email <span style={{ color: 'red' }}>*</span>
          </p>

          <input
            className="inputLogin"
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
        <div className="wrapperFieldLogin">
          <p className="fieldHeader">
            Password <span style={{ color: 'red' }}>*</span>
          </p>
          <div className="inputPasswordWrapper">
            <input
              className="inputLogin"
              onChange={(e) => passwordHandler(e)}
              value={password || ''}
              onBlur={(e) => blurHandler(e)}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password.."
            />

            <img
              src={showPassword ? eye : eyeoff}
              alt=""
              style={{ paddingRight: '20px' }}
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordDirty && passwordError && (
            <div className="error" style={{ color: 'red' }}>
              {passwordError}
            </div>
          )}
        </div>

        <button disabled={!formValid} type="submit" className="buttonLogin">
          Login
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
