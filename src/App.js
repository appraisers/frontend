import React from "react";
import { Switch, Route } from "react-router-dom";

import Registration from "./Pages/RegistrationPage";
import RestorePassword from './Pages/RestorePassword/RestorePasswordFirstPage';
import SecondPasswordPage from "./Pages/RestorePassword/RestorePasswordSecondPage";
import Main from './Pages/HomePage';
import About from './Pages/AboutPage';
import PageNotFound from "./Pages/404";
import AccountPage from './Pages/AccountPage';
import InviteAppraisePage from "./Pages/InviteAppraisePage";
import AppraisePage from "./Pages/AppraisePage";
import LastAnswerPage from "./Pages/LastAnswerPage";
import AllUsersPage from "./Pages/AllUsersPage";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path="/forgot_password" component={RestorePassword} />
                <Route path="/forgot_password_2/:token" component={SecondPasswordPage} />
                <Route path='/about' component={About} />
                <Route path='/my' component={AccountPage} />
                <Route path="/invite-appraise/:userId" component={InviteAppraisePage} />
                <Route path='/appraise/:userId' component={AppraisePage} />
                <Route path='/appraise-description/:userId' component={LastAnswerPage} />
                <Route path='/registration' component={Registration} />
                <Route path='/users' component={AllUsersPage} />
                <Route component={PageNotFound} />      
            </Switch>
        </div>
    );
};

export default App;