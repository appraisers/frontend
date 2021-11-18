import React from "react";
import { Switch, Route } from "react-router-dom";

import RegisterPage from "./Pages/LoginPages/SignUpPage/SignUpFirstPage";
import SecondRegisterPage from "./Pages/LoginPages/SignUpPage/SignUpSecondPage";
import LoginPage from "./Pages/LoginPages/SignInPage/SignInPage";
import RestorePassword from './Pages/LoginPages/RestorePasswordPage/RestorePasswordPage.js';

import Main from './Pages/HomePage/HomePage.js';
import About from './Pages/AboutPage/AboutPage.js';
import PageNotFound from "./Pages/404/404.js";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path="/login" component={LoginPage} />
                <Route path="/sign/up" exact component={RegisterPage} />
                <Route path="/sign/up/2" component={SecondRegisterPage} />
                <Route path="/forgot_password" component={RestorePassword} />
                <Route path='/about' component={About} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};

export default App;
