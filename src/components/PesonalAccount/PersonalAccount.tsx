import '../FormRegistration/FormRegistration.scss';
import './PersonalAccount.scss';
import plus from '../../shared/assets/icons/plus.svg';
import save from '../../shared/assets/icons/save.svg';
import close from '../../shared/assets/icons/burger-close.svg';
// import eyeOff from '../../shared/assets/icons/eye-off.svg';
// import eye from '../../shared/assets/icons/eye.svg';
import {
  usRegex,
  spanishRegex,
  germanRegex,
  re,
  // passwordRegex,
  nameRegex,
} from '../../shared/constants/Constants';
import { useEffect, useState } from 'react';

const PersonalAccount = () => {
  const [open, setOpen] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openSurname, setOpenSurname] = useState(false);
  const [openBirthday, setOpenBirthday] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState<string>();
  const [newEmail, setNewEmail] = useState<string>('6227968@gmail.com');
  // const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [country, setCountry] = useState<string>('US');
  const [city, setCity] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [postcode, setPostcode] = useState<string>();
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  // const [passwordDirty, setPasswordDirty] = useState<boolean>(false);
  const [nameDirty, setNameDirty] = useState<boolean>(false);
  const [surnameDirty, setSurnameDirty] = useState<boolean>(false);
  const [birthdayDirty, setBirthdayDirty] = useState<boolean>(false);
  const [cityDirty, setCityDirty] = useState<boolean>(false);
  const [streetDirty, setStreetDirty] = useState<boolean>(false);
  const [postcodeDirty, setPostcodeDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>(
    'Field must not be empty'
  );
  // const [passwordError, setPasswordError] = useState<string>(
  //   'Field must not be empty'
  // );
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
  //  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      emailError &&
      // passwordError ||
      nameError &&
      surnameError &&
      birthdayError &&
      cityError &&
      streetError &&
      postcodeError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    emailError,
    // passwordError,
    nameError,
    surnameError,
    birthdayError,
    cityError,
    streetError,
    postcodeError,
  ]);

  const clickHandler = () => {
    setOpen(false);
  };
  const clickHandlerName = () => {
    setOpenName(false);
  };
  const clickHandlerSurname = () => {
    setOpenSurname(false);
  };
  const clickHandlerBirthday = () => {
    setOpenBirthday(false);
  };
  const clickHandlerEmail = () => {
    setOpenEmail(false);
  };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Enter an existing email(e.g., example@mail.com)');
    } else {
      setEmailError('');
    }
  };

  const saveEmail = () => {
    setNewEmail(email);
    setOpenEmail(!openEmail);
    console.log(email);
    console.log('ok');
  };
  /*
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
*/
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
      /*
      case 'password':
        setPasswordDirty(true);
        break; */
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
  /*
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
*/
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
                value={'Simon'}
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
                value={'Pit'}
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
              value={'2013-10-22'}
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
              value={newEmail}
            />
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
                value={'USA'}
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
                value={'12563'}
                disabled
              />
            </div>
          </div>
          <button className="btnAddressAdd">
            <img src={plus} alt="Add" /> Add address
          </button>
        </form>
      </div>

      <div className={`popupContainer ${open ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the address</h2>
                <div className="popupClose" onClick={() => clickHandler()}>
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperField">
                  <div className="descriptionUser">Country</div>
                  <select
                    className="countryField shortInput select inputRegistr"
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
                  <div className="descriptionUser">City</div>

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
                  <div className="descriptionUser">Street</div>

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
                  <div className="subTitleRegistr">Postal code</div>

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
              <button className="btnSave" disabled={!formValid} type="submit">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openName ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the name</h2>
                <div className="popupClose" onClick={() => clickHandlerName()}>
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Name</div>
                  <input
                    className="inputRegistr"
                    onChange={(e) => nameHandler(e)}
                    value={name || ''}
                    onBlur={(e) => blurHandler(e)}
                    name="name"
                    type="text"
                    placeholder="Enter your name.."
                  ></input>
                  {nameDirty && nameError && (
                    <div className="error shortError" style={{ color: 'red' }}>
                      {nameError}
                    </div>
                  )}
                </div>
              </div>
              <button className="btnSave" disabled={!formValid} type="submit">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openSurname ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the surname</h2>
                <div
                  className="popupClose"
                  onClick={() => clickHandlerSurname()}
                >
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Surname</div>
                  <input
                    className="inputRegistr"
                    onChange={(e) => surnameHandler(e)}
                    value={surname || ''}
                    onBlur={(e) => blurHandler(e)}
                    name="surname"
                    type="text"
                    placeholder="Enter your surname.."
                  ></input>
                  {surnameDirty && surnameError && (
                    <div className="error shortError" style={{ color: 'red' }}>
                      {surnameError}
                    </div>
                  )}
                </div>
              </div>
              <button className="btnSave" disabled={!formValid} type="submit">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openBirthday ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the date of birth</h2>
                <div
                  className="popupClose"
                  onClick={() => clickHandlerBirthday()}
                >
                  <img src={close} alt="Close" />
                </div>
              </div>
              <p className="popupText">
                Change the data and confirm by pressing the "Save" button
              </p>
              <div className="addressContainer">
                <div className="wrapperFieldData">
                  <div className="descriptionUser">Birthday</div>
                  <input
                    className="inputRegistr"
                    onChange={(e) => birthdayHandler(e)}
                    value={birthday || ''}
                    onBlur={(e) => blurHandler(e)}
                    name="birthday"
                    type="date"
                  ></input>
                  {birthdayDirty && birthdayError && (
                    <div className="error" style={{ color: 'red' }}>
                      {birthdayError}
                    </div>
                  )}
                </div>
              </div>
              <button className="btnSave" disabled={!formValid} type="submit">
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`popupContainer ${openEmail ? 'popupOpen' : ''}`}>
        <div className="popupBody">
          <div className="formPopup">
            <div className="popupCard">
              <div className="popupHeader">
                <h2 className="titleAddress">Change the email</h2>
                <div className="popupClose" onClick={() => clickHandlerEmail()}>
                  <img src={close} alt="Close" />
                </div>
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
                    onBlur={(e) => blurHandler(e)}
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
                disabled={!formValid}
                type="submit"
                onClick={() => saveEmail()}
              >
                <img src={save} alt="Save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccount;
