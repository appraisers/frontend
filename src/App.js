import React from "react";
import { Switch, Route } from "react-router-dom";

<<<<<<< HEAD
import RegisterPage from "./Pages/LoginPages/SignUpPage/SignUpFirstPage";
import SecondRegisterPage from "./Pages/LoginPages/SignUpPage/SignUpSecondPage";
import SignIn from "./Pages/LoginPages/SignInPage/SignInPage";
import RestorePasswordFirstPage from "./Pages/LoginPages/RestorePassword/RestorePasswordFirstPage";
import RestorePasswordSecondPage from "./Pages/LoginPages/RestorePassword/RestorePasswordSecondPage";
=======
import RestorePassword from './Pages/LoginPages/RestorePassword/RestorePasswordFirstPage';
import SecondPasswordPage from "./Pages/LoginPages/RestorePassword/RestorePasswordSecondPage";
>>>>>>> de70b33aac734e91ef425bd35f1df99f31e0d751

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import NotFoundPage from "./Pages/404/404";

const App = () => {
    return (
        <div className="App">
            <Switch>
<<<<<<< HEAD
                <Route path='/' exact component={HomePage} />
                <Route path="/login" component={SignIn} />
                <Route path="/sign/up" exact component={RegisterPage} />
                <Route path="/sign/up/2" component={SecondRegisterPage} />
                <Route path="/forgot_password" component={RestorePasswordFirstPage} />
                <Route path="/forgot_password_2" component={RestorePasswordSecondPage} />
                <Route path='/about' component={AboutPage} />
                <Route component={NotFoundPage} />
=======
                <Route path='/' exact component={Main} />
                <Route path="/forgot_password" component={RestorePassword} />
                <Route path="/forgot_password_2" component={SecondPasswordPage} />
                <Route path='/about' component={About} />
                <Route component={PageNotFound} />
>>>>>>> de70b33aac734e91ef425bd35f1df99f31e0d751
            </Switch>
        </div>
    );
};


export default App;

