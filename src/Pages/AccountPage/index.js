import AuthorizedHeader from '../../Components/AuthorizedHeader';
import CreateQuestion from '../CreateQuestion';
import DeleteQuestion from '../DeleteQuestion';
import InviteRegistration from '../InviteRegistration';
import userIcon from '../../assets/icons/user-icon.svg';

import './AccountPage.scss';

const AccountPage = () => {
  return (
    <div className="account-page-main">
      <AuthorizedHeader
        className="account-page-header"
        title="Личный кабинет"
      />
      <div className="account-page-body">
        <div className="account-page-delete-create">
          <div className="account-page-all-users">
            <a href="/users" className="account-page-all-users-url">
              <img
                src={userIcon}
                href="/my"
                className="account-page-all-users-logo"
                alt="account-page-all-users-logo"
              />
              Таблица пользователей
            </a>
          </div>
          <div className="account-page-create-question">
            <CreateQuestion />
          </div>
          <div className="account-page-delete-question">
            <DeleteQuestion />
          </div>
          <div className="account-page-invite-registration">
            <InviteRegistration />
          </div>
        </div>
        <div className="account-page-profile">HERE WILL BE CONTENT</div>
      </div>
    </div>
  );
};

export default AccountPage;
