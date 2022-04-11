import profileImage from '../../assets/images/profile-image.svg';

import './UserCard.scss';

const UserCard = ({ user, darkMode }) => {
  return (
    <div
      className="user-card-profile"
      style={{ 'background-color': darkMode ? '#000000' : '#cfb389' }}
    >
      <h3 className="user-card-evaluatee">Информация оцениваемого</h3>
      <hr
        style={{ border: `0.2px solid ${darkMode ? '#cfb389' : '#000000'}` }}
      />

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
  );
};

export default UserCard;