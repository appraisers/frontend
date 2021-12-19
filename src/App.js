import React from "react";
import { Switch, Route } from "react-router-dom";

import RestorePassword from './Pages/LoginPages/RestorePassword/RestorePasswordFirstPage';
import SecondPasswordPage from "./Pages/LoginPages/RestorePassword/RestorePasswordSecondPage";

import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import NotFoundPage from "./Pages/404/404";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path='/' exact component={Main} />
                <Route path="/forgot_password" component={RestorePassword} />
                <Route path="/forgot_password_2" component={SecondPasswordPage} />
                <Route path='/about' component={About} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
};


export default App;

