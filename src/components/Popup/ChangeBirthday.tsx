import { useState } from 'react';
import save from '../../shared/assets/icons/save.svg';
import { getAge } from '../../utils';
import { IPropsChangeUserData } from './ChangeName';
import { changeBirthday } from '../../api/methods';
import { useAppSelector } from '../../store';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';

const ChangeBirthday = ({
  closePopup,
  version,
  setIsUpdate,
}: IPropsChangeUserData) => {
  const { userId } = useAppSelector((state) => state.auth);
  const [birthday, setBirthday] = useState<string>();
  const [birthdayError, setBirthdayError] = useState<string>(
    'Field must not be empty'
  );
  const [birthdayDirty, setBirthdayDirty] = useState<boolean>(false);

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

  const saveBirthday = () => {
    changeBirthday(birthday, userId, version)
      .then(() => {
        closePopup();
        setIsUpdate(true);
        AppNotification({
          msg: 'Birthday changed!',
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
        <h2 className="titleAddress">Change the date of birth</h2>
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
            onBlur={() => setBirthdayDirty(true)}
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
      <button
        className="btnSave"
        disabled={!!(birthdayError || !birthday)}
        type="submit"
        onClick={() => saveBirthday()}
      >
        <img src={save} alt="Save" /> Save
      </button>
    </div>
  );
};

export default ChangeBirthday;
