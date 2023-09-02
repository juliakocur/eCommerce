import { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';
import PopupRoot from '../Popup/PopupRoot';
import ChangeAddress from '../Popup/ChangeAddress';
import { deleteAddress } from '../../api/methods';
import { useAppSelector } from '../../store';
import {
  AppNotification,
  NotificationType,
} from '../Notification/Notification';

export interface IPropsAddress {
  info: Address;
  version: number;
  setIsUpdate: (arg: boolean) => void;
}

const Address = ({ info, version, setIsUpdate }: IPropsAddress) => {
  const { userId } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const removeAddress = () => {
    deleteAddress(userId, version, info.id).then(() => {
      setIsUpdate(true);
      AppNotification({
        msg: 'Address deleted!',
        type: NotificationType.success,
      });
    });
  };
  return (
    <>
      <h2 className="titleAddress">
        Address{' '}
        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          change
        </span>
        <div className="delete" onClick={removeAddress}>
          Delete
        </div>
      </h2>
      <div className="addressContainer">
        <div className="wrapperField">
          <div className="descriptionUser">Country</div>
          <input
            className=" countryField shortInput select inputRegistr"
            disabled
            value={info.country}
          ></input>
        </div>
        <div className="wrapperField">
          <div className="descriptionUser">City</div>
          <input
            className="shortInput inputRegistr"
            name="city"
            type="string"
            disabled
            value={info.city}
          />
        </div>
        <div className="wrapperField">
          <div className="descriptionUser">Street</div>
          <input
            className="shortInput inputRegistr"
            name="street"
            type="string"
            value={info.streetName}
            disabled
          />
        </div>
        <div className="wrapperField">
          <div className="subTitleRegistr">Postal code</div>
          <input
            className="shortInput inputRegistr"
            name="postcode"
            type="string"
            value={info.postalCode}
            disabled
          />
        </div>
      </div>
      {open && (
        <PopupRoot
          closePopup={() => setOpen(!open)}
          children={
            <ChangeAddress
              closePopup={() => setOpen(!open)}
              info={info}
              version={version}
              setIsUpdate={setIsUpdate}
            />
          }
        />
      )}
    </>
  );
};

export default Address;
