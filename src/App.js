import React from "react";
import { Switch, Route } from "react-router-dom";

import RegisterPage from "./Pages/LoginPages/SignUpPage/SignUpFirstPage";
import SecondRegisterPage from "./Pages/LoginPages/SignUpPage/SignUpSecondPage";
import LoginPage from "./Pages/LoginPages/SignInPage";
import RestorePassword from './Pages/LoginPages/RestorePassword/RestorePasswordFirstPage';
import SecondPasswordPage from "./Pages/LoginPages/RestorePassword/RestorePasswordSecondPage";

import Main from './Pages/HomePage';
import About from './Pages/AboutPage';
import PageNotFound from "./Pages/404";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path="/login" component={LoginPage} />
                <Route path="/sign/up" exact component={RegisterPage} />
                <Route path="/sign/up/2" component={SecondRegisterPage} />
                <Route path="/forgot_password" component={RestorePassword} />
                <Route path="/forgot_password_2" component={SecondPasswordPage} />
                <Route path='/about' component={About} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};

export default App;