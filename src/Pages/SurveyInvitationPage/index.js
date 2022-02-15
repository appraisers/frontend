import { NavLink } from 'react-router-dom';
import profileImage from '../../assets/images/profile-img.jpg';
import logoLeft from '../../assets/images/logo-left.svg';
import logoRight from '../../assets/images/logo-right.svg';
import './SurveyInvitationPage.scss';

const SurveyInvitationPage = () => {
  const name = "Name surname";
  const post = "Test post";
  const organization = "Test organization";
  return (
    <div className='survey-invite-body'>
      <div className="survey-invite-header">
        <span className="survey-invite-logo">
          <img src={logoLeft} className="survey-invite-logo-left" alt="logo" />
        </span>
        <span className="survey-invite-logo">
          <img src={logoRight} className="survey-invite-logo-right" alt="logo" />
        </span>
      </div>
      <div className="survey-invite-container">
        <div className="survey-invite-profile">
          <h3 className="survey-invite-evaluatee">Информация оцениваемого</h3>
          <hr className="survey-invite-horizontal-rule" />

          <img src={profileImage} className="survey-invite-profile-image" alt="" />

          <ul className="survey-invite-profile-identity">
            <li className="survey-invite-profile-identity-details">
              <p className="survey-invite-profile-detail">полное имя:</p>
              <span className="survey-invite-profile-name survey-invite-profile-input">{name}</span>
            </li>
            <li className="survey-invite-profile-identity-details">
              <p className="survey-invite-profile-detail">должность:</p>
              <span className="survey-invite-profile-post survey-invite-profile-input">{post}</span>
            </li>
            <li className="survey-invite-profile-identity-details">
              <p className="survey-invite-profile-detail">Организация:</p>
              <span className="survey-invite-profile-organisation survey-invite-profile-input">{organization}</span>
            </li>
          </ul>
        </div>
        <div className="survey-invite-description-container">
          <h1 className="survey-invite-description-header">
            Оцените работу и личные качества Иванова Ивана.
          </h1>
          <p className="survey-invite-description">
            Оценка происходит в виде тестирования. Можно выбрать только один
            ответ на каждый вопрос. Если Вы не знаете, как ответить, выберите
            пункт “Не имею информации”. Отвечайте честно. Опрос анонимный.
          </p>

          <NavLink to="/" className="survey-invite-survey-link">
            <span className="survey-invite-link-to-survey">Пройти опрос</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SurveyInvitationPage;
