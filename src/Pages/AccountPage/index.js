import AuthorizedHeader from '../../Components/AuthorizedHeader';

import "./AccountPage.scss";

const AccountPage = () => {
  return (
    <div className='account-page-main'>
     <AuthorizedHeader className="account-page-header" title="Личный кабинет" />

      <div className="account-page-body">
        <h1>Личный кабинет</h1>
      </div>
    </div>
  );
};

export default AccountPage;
