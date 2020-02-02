import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'

import App from './App/App';
import NotFound from './App/NotFound';
import Home from './Home/Home';

const Root = () => (
<BrowserRouter>
    <App>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route component={NotFound} />
        </Switch>
    </App>
</BrowserRouter>
);

export default Root;