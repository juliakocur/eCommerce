import { useEffect, useState } from 'react';
import './UserPage.scss';
import { IUserData } from '../../shared/types';
import { useAppSelector } from '../../store';
import { getDataUser } from '../../api/methods';

const UserPage = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const { isCustomer } = useAppSelector((state) => state.customer);

  const getUserInfo = async () => {
    const { body } = await getDataUser();
    setUserData({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      dateOfBirth: body.dateOfBirth,
    });
  };

  useEffect(() => {
    if (isCustomer) {
      getUserInfo();
    }
  }, [isCustomer]);

  return (
    <div className="userPage">
      <h1>User page</h1>
      {!!userData && (
        <div>
          <div>
            FirstName: <span></span>
            <span>{userData.firstName}</span>
          </div>
          <div>
            LastName: <span></span>
            <span>{userData.lastName}</span>
          </div>
          <div>
            Email: <span></span>
            <span>{userData.email}</span>
          </div>
          <div>
            Date of birth: <span></span>
            <span>{userData.dateOfBirth}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
