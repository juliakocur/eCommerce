import './RegistrationPage.scss';
import { useEffect, useState } from 'react';
import eyeoff from '../../shared/assets/icons/eye-off.svg';
import eye from '../../shared/assets/icons/eye.svg';

const RegistrationPage = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
    const [nameDirty, setNameDirty] = useState<boolean>(false);
    const [surnameDirty, setSurnameDirty] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('Все плохо');
    const [passwordError, setPasswordError] = useState<string>('Все плохо');
    const [nameError, setNameError] = useState<string>('Все плохо');
    const [surnameError, setSurnameError] = useState<string>('Все плохо');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formValid, setFormValid] = useState(false);
  
    useEffect(() => {
      if (emailError || passwordError || nameError || surnameError) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }, [emailError, passwordError, nameError, surnameError]);
  
    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      const re =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  
      if (!re.test(String(e.target.value).toLowerCase())) {
        setEmailError('Все плохо');
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
        setPasswordError('Пароль не должен быть пустым');
      } else if (!passwordRegex.test(newPassword)) {
        setPasswordError('Пароль не соответствует требованиям');
      } else {
        setPasswordError('');
      }
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      setName(newName);

      const nameRegex = /^[a-zA-Z ]+$/;
      
      if (!newName) {
        setNameError('Имя не должно быть пустое');
      } else if (!nameRegex.test(newName)) {
        setNameError('Имя не соответствует требованиям');
      } else {
        setNameError('');
      }
    }

    const surnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSurname = e.target.value;
      setSurname(newSurname);

      const surnameRegex = /^[a-zA-Z ]+$/;
      if (!newSurname) {
        setSurnameError('Имя не должно быть пустое');
      } else if (!surnameRegex.test(newSurname)) {
        setSurnameError('Имя не соответствует требованиям');
      } else {
        setSurnameError('');
      }
    }
  
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      switch (e.target.name) {
        case 'email':
          setEmailDirty(true);
          break;
        case 'password':
          setPasswordDirty(true);
          break;
        case 'name':
          setNameDirty(true);
          break;
        case 'surname':
          setSurnameDirty(true);
          break;  
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <div className="mainPage">
        <form>
          <div className="wrapperEmail">
            <p>
              Почта <span>*</span>
            </p>
  
            <input
              onChange={(e) => emailHandler(e)}
              value={email || ""}
              onBlur={(e) => blurHandler(e)}
              name="email"
              type="text"
              placeholder="Enter your email...."
            />
            {emailDirty && emailError && (
              <div className="error" style={{ color: 'red' }}>
                {emailError}
              </div>
            )}
          </div>
          <div className="wrapperPassword">
            <p>
              Пароль <span>*</span>
            </p>
            <div className="inputPasswordWrapper">
              <input
                onChange={(e) => passwordHandler(e)}
                value={password || ""}
                onBlur={(e) => blurHandler(e)}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password...."
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

          <div className="wrapperName">
            <p>
              Name <span>*</span>
            </p>

            <input
              onChange={(e) => nameHandler(e)}
              value={name || ""}
              onBlur={(e) => blurHandler(e)}
              name="name"
              type="text"
              placeholder="Enter your name...."
            />
            {nameDirty && nameError && (
              <div className="error" style={{ color: 'red' }}>
                {nameError}
              </div>
            )}
          </div>

          <div className="wrapperSurname">
            <p>
              Surname <span>*</span>
            </p>

            <input
              onChange={(e) => surnameHandler(e)}
              value={surname || ""}
              onBlur={(e) => blurHandler(e)}
              name="surname"
              type="text"
              placeholder="Enter your surname...."
            />
            {surnameDirty && surnameError && (
              <div className="error" style={{ color: 'red' }}>
                {surnameError}
              </div>
            )}
          </div>
  
          <button disabled={!formValid} type="submit">
            Register
          </button>
        </form>
      </div>
    );
  };
  
export default RegistrationPage;
