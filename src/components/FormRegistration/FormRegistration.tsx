import { useEffect, useState } from 'react';
import eyeoff from '../../shared/assets/icons/eye-off.svg';
import eye from '../../shared/assets/icons/eye.svg';
import './FormRegistration.scss';

const FormRegistration = () => {
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
  const [emailError, setEmailError] = useState<string>(
    'Field must not be empty'
  );
  const [passwordError, setPasswordError] = useState<string>(
    'Field must not be empty'
  );
  const [nameError, setNameError] = useState<string>('Field must not be empty');
  const [surnameError, setSurnameError] = useState<string>(
    'Field must not be empty'
  );
  const [birthdayError, setBirthdayError] = useState<string>(
    'Field must not be empty'
  );
  const [countryError, setCountryError] = useState<string>(
    'Field must not be empty'
  );
  const [cityError, setCityError] = useState<string>('Field must not be empty');
  const [streetError, setStreetError] = useState<string>(
    'Field must not be empty'
  );
  const [postcodeError, setPostcodeError] = useState<string>(
    'Field must not be empty'
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      emailError ||
      passwordError ||
      nameError ||
      surnameError ||
      birthdayError ||
      countryError ||
      cityError ||
      streetError ||
      postcodeError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    emailError,
    passwordError,
    nameError,
    surnameError,
    birthdayError,
    countryError,
    cityError,
    streetError,
    postcodeError,
  ]);

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
        'Password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character(e.g., !@#$%^&*) '
      );
    } else {
      setPasswordError('');
    }
  };

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    const nameRegex = /^[a-zA-Z ]+$/;

    if (!newName) {
      setNameError('Field must not be empty');
    } else if (!nameRegex.test(newName)) {
      setNameError(
        'Name must contain at least one character and no special characters or numbers'
      );
    } else {
      setNameError('');
    }
  };

  const surnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSurname = e.target.value;
    setSurname(newSurname);

    const surnameRegex = /^[a-zA-Z ]+$/;
    if (!newSurname) {
      setSurnameError('Field must not be empty');
    } else if (!surnameRegex.test(newSurname)) {
      setSurnameError(
        'Last name must contain at least one character and no special characters or numbers'
      );
    } else {
      setSurnameError('');
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
  };

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
  };

  const birthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBirthday = e.target.value;
    setBirthday(newBirthday);
    const age = getAge(newBirthday);
    if (!newBirthday) {
      setBirthdayError('Field must not be empty');
    } else if (age < 18) {
      setBirthdayError('Age must be over 18 years old');
    } else {
      setBirthdayError('');
    }
  };

  const countryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    setCountry(newCountry);

    if (!newCountry) {
      setCountryError('Select the country from the list');
    } else {
      setCountryError('');
    }
  };

  const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);

    const surnameRegex = /^[a-zA-Z ]+$/;
    if (!newCity) {
      setCityError('Field must not be empty');
    } else if (!surnameRegex.test(newCity)) {
      setCityError(
        'City must contain at least one character and no special characters or numbers'
      );
    } else {
      setCityError('');
    }
  };

  const streetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStreet = e.target.value;
    setStreet(newStreet);

    if (!newStreet) {
      setStreetError('Field must not be empty');
    } else {
      setStreetError('');
    }
  };

  const postcodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostcode = e.target.value;
    setPostcode(newPostcode);
    const cntr = country;

    const usRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const spanishRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
    const germanRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;

    if (!newPostcode) {
      setPostcodeError('Field must not be empty');
    } else if (cntr === 'United States' && !usRegex.test(newPostcode)) {
      setPostcodeError("The postal code doesn't match the selected country");
    } else if (cntr === 'Germany' && !germanRegex.test(newPostcode)) {
      setPostcodeError("The postal code doesn't match the selected country");
    } else if (cntr === 'Spain' && !spanishRegex.test(newPostcode)) {
      setPostcodeError("The postal code doesn't match the selected country");
    } else {
      setPostcodeError('');
    }
  };

  return (
    <form>
      <div className="wrapperEmail">
        <p>
          Email <span>*</span>
        </p>

        <input
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
      <div className="wrapperPassword">
        <p>
          Пароль <span>*</span>
        </p>
        <div className="inputPasswordWrapper">
          <input
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

      <div className="nameContainer">
        <div className="wrapperName">
          <p className="shortName">
            Name <span>*</span>
          </p>

          <input
            className="shortInput"
            onChange={(e) => nameHandler(e)}
            value={name || ''}
            onBlur={(e) => blurHandler(e)}
            name="name"
            type="text"
            placeholder="Enter your name.."
          />
          {nameDirty && nameError && (
            <div className="error shortError" style={{ color: 'red' }}>
              {nameError}
            </div>
          )}
        </div>

        <div className="wrapperSurname">
          <p className="shortName">
            Surname <span>*</span>
          </p>

          <input
            className="shortInput"
            onChange={(e) => surnameHandler(e)}
            value={surname || ''}
            onBlur={(e) => blurHandler(e)}
            name="surname"
            type="text"
            placeholder="Enter your surname.."
          />
          {surnameDirty && surnameError && (
            <div className="error shortError" style={{ color: 'red' }}>
              {surnameError}
            </div>
          )}
        </div>
      </div>

      <div className="wrapperBirthday">
        <p>
          Birthday <span>*</span>
        </p>

        <input
          onChange={(e) => birthdayHandler(e)}
          value={birthday || ''}
          onBlur={(e) => blurHandler(e)}
          name="birthday"
          type="date"
          max="1940-12-31"
          placeholder="dd-mm-yyyy"
        />
        {birthdayDirty && birthdayError && (
          <div className="error" style={{ color: 'red' }}>
            {birthdayError}
          </div>
        )}
      </div>

      <h2>Address</h2>

      <div className="addressContainer">
        <div className="wrapperCountry">
          <p className="shortName">
            Country <span>*</span>
          </p>
          <select
            className="shortSelect"
            onChange={(e) => countryHandler(e)}
            value={country || ''}
            onBlur={(e) => blurSelectHandler(e)}
            name="country"
            placeholder="Select the country.."
          >
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="Spain">Spain</option>
          </select>
          {countryDirty && countryError && (
            <div className="error shortError" style={{ color: 'red' }}>
              {countryError}
            </div>
          )}
        </div>

        <div className="wrapperCity">
          <p className="shortName">
            City <span>*</span>
          </p>

          <input
            className="shortInput"
            onChange={(e) => cityHandler(e)}
            value={city || ''}
            onBlur={(e) => blurHandler(e)}
            name="city"
            type="string"
            placeholder="Enter the city.."
          />
          {cityDirty && cityError && (
            <div className="error shortError" style={{ color: 'red' }}>
              {cityError}
            </div>
          )}
        </div>

        <div className="wrapperStreet">
          <p className="shortName">
            Street <span>*</span>
          </p>

          <input
            className="shortInput"
            onChange={(e) => streetHandler(e)}
            value={street || ''}
            onBlur={(e) => blurHandler(e)}
            name="street"
            type="string"
            placeholder="Enter the street name.."
          />
          {streetDirty && streetError && (
            <div className="error shortError" style={{ color: 'red' }}>
              {streetError}
            </div>
          )}
        </div>

        <div className="wrapperPostcode">
          <p className="shortName">
            Postal code <span>*</span>
          </p>

          <input
            className="shortInput"
            onChange={(e) => postcodeHandler(e)}
            value={postcode || ''}
            onBlur={(e) => blurHandler(e)}
            name="postcode"
            type="string"
            placeholder="Enter the postal code.."
          />
          {postcodeDirty && postcodeError && (
            <div className="error shortError" style={{ color: 'red' }}>
              {postcodeError}
            </div>
          )}
        </div>
      </div>

      <div className="wrapperCheckbox">
        <label>
          <input className="checkbox" name="checkbox" type="checkbox" />
          Use the default address for shipping and billing
        </label>
      </div>

      <button disabled={!formValid} type="submit">
        Register
      </button>
    </form>
  );
};

export default FormRegistration;
