import { useState } from 'react';
import {
  germanRegex,
  nameRegex,
  spanishRegex,
  usRegex,
} from '../../shared/constants/Constants';
import { IPopupProps } from './PopupRoot';
import save from '../../shared/assets/icons/save.svg';

const ChangeAddress = ({ closePopup }: IPopupProps) => {
  const [country, setCountry] = useState<string>('US');
  const [city, setCity] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [postcode, setPostcode] = useState<string>();
  const [cityDirty, setCityDirty] = useState<boolean>(false);
  const [streetDirty, setStreetDirty] = useState<boolean>(false);
  const [postcodeDirty, setPostcodeDirty] = useState<boolean>(false);
  const [cityError, setCityError] = useState<string>('Field must not be empty');
  const [streetError, setStreetError] = useState<string>(
    'Field must not be empty'
  );
  const [postcodeError, setPostcodeError] = useState<string>(
    'Field must not be empty'
  );

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

  const saveAddress = () => {
    closePopup();
  };

  return (
    <div className="formPopup">
      <div className="popupCard">
        <div className="popupHeader">
          <h2 className="titleAddress">Change the address</h2>
        </div>
        <p className="popupText">
          Change the data and confirm by pressing the "Save" button
        </p>
        <div className="addressContainer">
          <div className="wrapperField">
            <div className="descriptionUser">Country</div>
            <select
              className="countryField  select inputRegistr"
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
              className="inputRegistr"
              onChange={(e) => cityHandler(e)}
              value={city || ''}
              onBlur={() => setCityDirty(true)}
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
              className="inputRegistr"
              onChange={(e) => streetHandler(e)}
              value={street || ''}
              onBlur={() => setStreetDirty(true)}
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
              className="inputRegistr"
              onChange={(e) => postcodeHandler(e)}
              value={postcode || ''}
              onBlur={() => setPostcodeDirty(true)}
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
        <button
          className="btnSave"
          disabled={
            !!(
              !city ||
              !postcode ||
              !street ||
              cityError ||
              postcodeError ||
              streetError
            )
          }
          type="submit"
          onClick={() => saveAddress()}
        >
          <img src={save} alt="Save" /> Save
        </button>
      </div>
    </div>
  );
};

export default ChangeAddress;
