import { useState } from 'react';
import save from '../../shared/assets/icons/save.svg';
import { nameRegex } from '../../shared/constants/Constants';
import { IPropsChangeUserData } from './ChangeName';
import { useAppSelector } from '../../store';
import { changeSurname } from '../../api/methods';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';

const ChangeSurname = ({
  closePopup,
  version,
  setIsUpdate,
}: IPropsChangeUserData) => {
  const { userId } = useAppSelector((state) => state.auth);
  const [surname, setSurname] = useState<string>();
  const [surnameError, setSurnameError] = useState<string>(
    'Field must not be empty'
  );
  const [surnameDirty, setSurnameDirty] = useState<boolean>(false);

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

  const saveSurname = () => {
    changeSurname(surname, userId, version)
      .then(() => {
        closePopup();
        setIsUpdate(true);
        AppNotification({
          msg: 'Surname changed!',
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
        <h2 className="titleAddress">Change the surname</h2>
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
            onBlur={() => setSurnameDirty(true)}
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
      <button
        className="btnSave"
        disabled={!!(!surname || surnameError)}
        type="submit"
        onClick={() => saveSurname()}
      >
        <img src={save} alt="Save" /> Save
      </button>
    </div>
  );
};

export default ChangeSurname;
