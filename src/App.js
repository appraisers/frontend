import React from "react";
import { Switch, Route } from "react-router-dom";

import RestorePassword from './Pages/RestorePassword/RestorePasswordFirstPage';
import SecondPasswordPage from "./Pages/RestorePassword/RestorePasswordSecondPage";
import Main from './Pages/HomePage';
import About from './Pages/AboutPage';
import PageNotFound from "./Pages/404";
import AccountPage from './Pages/AccountPage';
import SurveyInvitationPage from "./Pages/SurveyInvitationPage";
import SurveyPage from "./Pages/SurveyPage";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path="/forgot_password" component={RestorePassword} />
                <Route path="/forgot_password_2" component={SecondPasswordPage} />
                <Route path='/about' component={About} />
                <Route path='/my' component={AccountPage} />
                <Route path="/appraise-invite" component={SurveyInvitationPage} />
                <Route path='/survey' component={SurveyPage} />
                <Route component={PageNotFound} />
                
            </Switch>
        </div>
    );
};

export default App;