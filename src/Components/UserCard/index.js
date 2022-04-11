import profileImage from '../../assets/images/profile-image.svg';

import './UserCard.scss';

const UserCard = ({ user, Color }) => {
  const bgColor = Color[0];
  const hrColor = Color[1];

  return (
    <>
      <div
        className="user-card-profile"
        style={{ 'background-color': bgColor }}
      >
        <h3 className="user-card-evaluatee">Информация оцениваемого</h3>
        <hr style={{ border: `0.2px solid ${hrColor}` }} />

        <img
          src={profileImage}
          className="user-card-profile-image"
          alt="survey invite profile"
        />

        <ul className="user-card-profile-identity">
          <li className="user-card-profile-identity-details">
            <p className="user-card-profile-detail">Полное имя:</p>
            <span className="user-card-profile-name user-card-profile-input">
              {user.fullname}
            </span>
          </li>
          <li className="user-card-profile-identity-details">
            <p className="user-card-profile-detail">Должность:</p>
            <span className="user-card-profile-post user-card-profile-input">
              {user.position}
            </span>
          </li>
          <li className="user-card-profile-identity-details">
            <p className="user-card-profile-detail">Организация:</p>
            <span className="user-card-profile-organisation user-card-profile-input">
              {user.workplace}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserCard;