import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

import App from './App/App';
import NotFound from './App/NotFound';
import Home from './Home/Home';
import SignUp from './Home/SignUp';

const Root = () => (
<BrowserRouter>
    <App>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route component={NotFound} />
        </Switch>
    </App>
</BrowserRouter>
);

export default Root;