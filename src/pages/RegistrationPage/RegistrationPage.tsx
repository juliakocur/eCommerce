import './RegistrationPage.scss';
import { useEffect, useState } from 'react';
import eyeoff from '../../shared/assets/icons/eye-off.svg';
import eye from '../../shared/assets/icons/eye.svg';

const RegistrationPage = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
    const [surname, setSurname] = useState<string>();
    const [birthday, setBirthday] = useState<string>();
    const [country, setCountry] = useState<string>();
    const [city, setCity] = useState<string>();
    const [street, setStreet] = useState<string>();
    const [postcode, setPostcode] = useState<string>();
    const [emailDirty, setEmailDirty] = useState<boolean>(false);
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
    const [nameDirty, setNameDirty] = useState<boolean>(false);
    const [surnameDirty, setSurnameDirty] = useState<boolean>(false);
    const [birthdayDirty, setBirthdayDirty] = useState<boolean>(false);
    const [countryDirty, setCountryDirty] = useState<boolean>(false);
    const [cityDirty, setCityDirty] = useState<boolean>(false);
    const [streetDirty, setStreetDirty] = useState<boolean>(false);
    const [postcodeDirty, setPostcodeDirty] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('Все плохо');
    const [passwordError, setPasswordError] = useState<string>('Все плохо');
    const [nameError, setNameError] = useState<string>('Все плохо');
    const [surnameError, setSurnameError] = useState<string>('Все плохо');
    const [birthdayError, setBirthdayError] = useState<string>('Все плохо');
    const [countryError, setCountryError] = useState<string>('Все плохо');
    const [cityError, setCityError] = useState<string>('Все плохо');
    const [streetError, setStreetError] = useState<string>('Все плохо');
    const [postcodeError, setPostcodeError] = useState<string>('Все плохо');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formValid, setFormValid] = useState(false);
  
    useEffect(() => {
      if (emailError || passwordError || nameError || surnameError || birthdayError || countryError || cityError || streetError || postcodeError) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }, [emailError, passwordError, nameError, surnameError, birthdayError, countryError, cityError, streetError, postcodeError]);
  
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
        case 'birthday':
          setBirthdayDirty(true);
          break;      
        case 'city':
          setCityDirty(true);
          break;    
        case 'street':
          setStreetDirty(true);
          break;  
        case 'postcode':
          setPostcodeDirty(true);
          break;  
      }
    };

    const blurSelectHandler = (e: React.FocusEvent<HTMLSelectElement>) => {
      switch (e.target.name) {
        case 'country':
          setCountryDirty(true);
        break;  
      }
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const getAge = (dateString: string) => {
      const today = new Date();
      const birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  }

  const birthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthday = e.target.value;
    setBirthday(newBirthday);
    const age = getAge(newBirthday);
    if (!newBirthday) {
      setBirthdayError('Дата не должна быть пустой');
    } else if (age < 18) {
      setBirthdayError('Дата не соответствует требованиям');
    } else {
      setBirthdayError('');
    }
  }

  const countryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);

    if (!newCountry) {
      setCountryError('Выберите страну из предложенного списка');
    } else {
      setCountryError('');
    }
  }

  const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);

    const surnameRegex = /^[a-zA-Z ]+$/;
    if (!newCity) {
      setCityError('Город не должен быть пустым');
    } else if (!surnameRegex.test(newCity)) {
      setCityError('Назв. города не соответствует требованиям');
    } else {
      setCityError('');
    }
  }

  const streetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStreet = e.target.value;
    setStreet(newStreet);

    if (!newStreet) {
      setStreetError('Улица не должна быть пустой');
    } else {
      setStreetError('');
    }
  }

  const postcodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostcode = e.target.value;
    setPostcode(newPostcode);
    const cntr = country;

    const usRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const spanishRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
    const germanRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;

    if (!newPostcode) {
      setPostcodeError('Postal code не должeн быть пустой');
    } else if (cntr==='United States' && !usRegex.test(newPostcode)) {
      setPostcodeError('Код не соответствует требованиям');
    } else if (cntr==='Germany' && !germanRegex.test(newPostcode)) {
      setPostcodeError('Код не соответствует требованиям');
    }  else if (cntr==='Spain' && !spanishRegex.test(newPostcode)) {
      setPostcodeError('Код не соответствует требованиям');
    } else {
      setPostcodeError('');
    }
  }
  
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

          <div className="wrapperBirthday">
            <p>
              Birthday <span>*</span>
            </p>

            <input
              onChange={(e) => birthdayHandler(e)}
              value={birthday || ""}
              onBlur={(e) => blurHandler(e)}
              name="birthday"
              type="date"
              placeholder="dd-mm-yyyy"
            />
            {birthdayDirty && birthdayError && (
              <div className="error" style={{ color: 'red' }}>
                {birthdayError}
              </div>
            )}
          </div>

          <h1>Address</h1>
          
          <div className="wrapperCountry">
            <p>
              Country <span>*</span>
            </p>
            <select
              onChange={(e) => countryHandler(e)}
              value={country || ""}
              onBlur={(e) => blurSelectHandler(e)}
              name="country"
              placeholder="Select the country...">
                <option value="United States">United States</option>
                <option value="Germany">Germany</option>
                <option value="Spain">Spain</option>
              </select>
            {countryDirty && countryError && (
              <div className="error" style={{ color: 'red' }}>
                {countryError}
              </div>
            )}
          </div>

          <div className="wrapperCity">
            <p>
              City <span>*</span>
            </p>

            <input
              onChange={(e) => cityHandler(e)}
              value={city || ""}
              onBlur={(e) => blurHandler(e)}
              name="city"
              type="string"
              placeholder="Enter the city..."
            />
            {cityDirty && cityError && (
              <div className="error" style={{ color: 'red' }}>
                {cityError}
              </div>
            )}
          </div>

          <div className="wrapperStreet">
            <p>
              Street <span>*</span>
            </p>

            <input
              onChange={(e) => streetHandler(e)}
              value={street || ""}
              onBlur={(e) => blurHandler(e)}
              name="street"
              type="string"
              placeholder="Enter the street name..."
            />
            {streetDirty && streetError && (
              <div className="error" style={{ color: 'red' }}>
                {streetError}
              </div>
            )}
          </div>

          <div className="wrapperPostcode">
            <p>
              Postal code <span>*</span>
            </p>

            <input
              onChange={(e) => postcodeHandler(e)}
              value={postcode || ""}
              onBlur={(e) => blurHandler(e)}
              name="postcode"
              type="string"
              placeholder="Enter the postal code..."
            />
            {postcodeDirty && postcodeError && (
              <div className="error" style={{ color: 'red' }}>
                {postcodeError}
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
