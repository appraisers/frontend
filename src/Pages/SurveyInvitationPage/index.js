import { NavLink } from 'react-router-dom';
import profileImage from '../../assets/images/profile-img.jpg';
import logoRight from '../../assets/images/logo.svg';
import './SurveyInvitationPage.scss';

const SurveyInvitationPage = () => {
  const name = "Name surname";
  const post = "Test post";
  const organization = "Test organization";
  return (
    <div className='body'>
      <div className="header">
        <span className="logo">
          <img src={logoRight} className="logo-left" alt="logo" />
        </span>
        <span className="logo">
          <img src={logoRight} className="logo-right" alt="logo" />
        </span>
      </div>
      <div className="container">
        <div className="profile">
          <h3 className="evaluatee">Информация оцениваемого</h3>
          <hr className="horizontal-rule" />

          <img src={profileImage} className="profile-image" alt="" />

          <ul className="profile-identity">
            <li className="profile-identity-details">
              <p className="profile-detail">полное имя:</p>
              <span className="profile-name profile-input">{name}</span>
            </li>
            <li className="profile-identity-details">
              <p className="profile-detail">должность:</p>
              <span className="profile-post profile-input">{post}</span>
            </li>
            <li className="profile-identity-details">
              <p className="profile-detail">Организация:</p>
              <span className="profile-organisation profile-input">{organization}</span>
            </li>
          </ul>
        </div>
        <div className="description-container">
          <h1 className="description-header">
            Оцените работу и личные качества Иванова Ивана.
          </h1>
          <p className="description">
            Оценка происходит в виде тестирования. Можно выбрать только один
            ответ на каждый вопрос. Если Вы не знаете, как ответить, выберите
            пункт “Не имею информации”. Отвечайте честно. Опрос анонимный.
          </p>

          <NavLink to="/" className="survey-link">
            <span className="link-to-survey">Пройти опрос</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SurveyInvitationPage;
