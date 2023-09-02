import { useState } from 'react';
import save from '../../shared/assets/icons/save.svg';
import { nameRegex } from '../../shared/constants/Constants';
import { changeUserName } from '../../api/methods';
import { useAppSelector } from '../../store';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';

export interface IPropsChangeUserData {
  closePopup: () => void;
  version: number;
  setIsUpdate: (arg: boolean) => void;
}

const ChangeName = ({
  closePopup,
  version,
  setIsUpdate,
}: IPropsChangeUserData) => {
  const { userId } = useAppSelector((state) => state.auth);
  const [name, setName] = useState<string>();
  const [nameError, setNameError] = useState<string>('Field must not be empty');
  const [nameDirty, setNameDirty] = useState<boolean>(false);

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

  const saveName = () => {
    changeUserName(name, userId, version)
      .then(() => {
        closePopup();
        setIsUpdate(true);
        AppNotification({
          msg: 'Name changed!',
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
        <h2 className="titleAddress">Change the name</h2>
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
            onBlur={() => setNameDirty(true)}
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
      <button
        className="btnSave"
        disabled={!!(nameError || !name)}
        type="button"
        onClick={() => saveName()}
      >
        <img src={save} alt="Save" /> Save
      </button>
    </div>
  );
};

export default ChangeName;
