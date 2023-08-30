import { useEffect, useState } from 'react';
import eyeOff from '../../shared/assets/icons/eye-off.svg';
import eye from '../../shared/assets/icons/eye.svg';
import {
  usRegex,
  spanishRegex,
  germanRegex,
  re,
  passwordRegex,
  nameRegex,
} from '../../shared/constants/Constants';
import './FormRegistration.scss';
import { useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/methods';
import { changeCustomerState, changeUserId } from '../../store/rootReducer';
import { routes } from '../../routes/AppRouter';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';
import { getAge } from '../../utils';

const FormRegistration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [country, setCountry] = useState<string>('US');
  const [city, setCity] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [postcode, setPostcode] = useState<string>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [nameDirty, setNameDirty] = useState<boolean>(false);
  const [surnameDirty, setSurnameDirty] = useState<boolean>(false);
  const [birthdayDirty, setBirthdayDirty] = useState<boolean>(false);
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
    cityError,
    streetError,
    postcodeError,
  ]);

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

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

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

    if (!newSurname) {
      setSurnameError('Field must not be empty');
    } else if (!nameRegex.test(newSurname)) {
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    if (postcode) {
      setPostcode('');
      setPostcodeError('Field must not be empty');
    }
    setCountry(newCountry);
  };

  const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);

    if (!newCity) {
      setCityError('Field must not be empty');
    } else if (!nameRegex.test(newCity)) {
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

    if (!newPostcode) {
      setPostcodeError('Field must not be empty');
    } else if (country === 'US' && !usRegex.test(newPostcode)) {
      setPostcodeError("The postal code doesn't match the selected country");
    } else if (country === 'DE' && !germanRegex.test(newPostcode)) {
      setPostcodeError("The postal code doesn't match the selected country");
    } else if (country === 'ES' && !spanishRegex.test(newPostcode)) {
      setPostcodeError("The postal code doesn't match the selected country");
    } else {
      setPostcodeError('');
    }
  };

  const onClickHandler = async () => {
    if (formValid) {
      const address = isChecked
        ? {
            defaultShippingAddress: 0,
            defaultBillingAddress: 0,
          }
        : {};

      await createUser({
        email,
        password,
        firstName: name,
        lastName: surname,
        dateOfBirth: birthday,
        addresses: [
          { streetName: street, postalCode: postcode, city, country },
        ],
        ...address,
      })
        .then(({ body }) => {
          dispatch(changeUserId(body.customer.id));
          dispatch(changeCustomerState(true));
          AppNotification({
            msg: 'User successfully registered!',
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

      <div className="nameContainer">
        <div className="wrapperField">
          <div className="subTitleRegistr">
            Name <span className="requiredRegistr">*</span>
          </div>

          <input
            className="shortInput inputRegistr"
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

        <div className="wrapperField">
          <div className="subTitleRegistr">
            Surname <span className="requiredRegistr">*</span>
          </div>

          <input
            className="shortInput inputRegistr"
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

      <div className="wrapperField">
        <div className="subTitleRegistr">
          Birthday <span className="requiredRegistr">*</span>
        </div>

        <input
          className="inputRegistr"
          onChange={(e) => birthdayHandler(e)}
          value={birthday || ''}
          onBlur={(e) => blurHandler(e)}
          name="birthday"
          type="date"
          max="1940-01-01"
        />
        {birthdayDirty && birthdayError && (
          <div className="error" style={{ color: 'red' }}>
            {birthdayError}
          </div>
        )}
      </div>

      <h2 className="titleRegistr">Address</h2>

      <div className="addressContainer">
        <div className="wrapperField">
          <div className="subTitleRegistr">
            Country <span className="requiredRegistr">*</span>
          </div>
          <select
            className="shortInput select inputRegistr"
            onChange={(e) => countryHandler(e)}
            value={country || ''}
            name="country"
          >
            <option value="US">United States</option>
            <option value="DE">Germany</option>
            <option value="ES">Spain</option>
          </select>
        </div>

        <div className="wrapperField">
          <div className="subTitleRegistr">
            City <span className="requiredRegistr">*</span>
          </div>

          <input
            className="shortInput inputRegistr"
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

        <div className="wrapperField">
          <div className="subTitleRegistr">
            Street <span className="requiredRegistr">*</span>
          </div>

          <input
            className="shortInput inputRegistr"
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

        <div className="wrapperField">
          <div className="subTitleRegistr">
            Postal code <span className="requiredRegistr">*</span>
          </div>

          <input
            className="shortInput inputRegistr"
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
        <label className="labelCheckbox">
          <input
            className="checkbox inputRegistr"
            name="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          Use the default address for shipping and billing
        </label>
      </div>

      <button
        className="btnRegistr"
        disabled={!formValid}
        type="button"
        onClick={onClickHandler}
      >
        Register
      </button>
    </form>
  );
};

export default FormRegistration;
