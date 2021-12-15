import React from "react";
import { Switch, Route } from "react-router-dom";

import RegisterPage from "./Pages/LoginPages/SignUpPage/SignUpFirstPage";
import SecondRegisterPage from "./Pages/LoginPages/SignUpPage/SignUpSecondPage";
import SignIn from "./Pages/LoginPages/SignInPage/SignInPage";
import RestorePasswordFirstPage from "./Pages/LoginPages/RestorePassword/RestorePasswordFirstPage";
import RestorePasswordSecondPage from "./Pages/LoginPages/RestorePassword/RestorePasswordSecondPage";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import NotFoundPage from "./Pages/404/404";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path="/login" component={SignIn} />
                <Route path="/sign/up" exact component={RegisterPage} />
                <Route path="/sign/up/2" component={SecondRegisterPage} />
                <Route path="/forgot_password" component={RestorePasswordFirstPage} />
                <Route path="/forgot_password_2" component={RestorePasswordSecondPage} />
                <Route path='/about' component={AboutPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
};


export default App;

