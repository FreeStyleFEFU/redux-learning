import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RoutePath } from './router/routes';

import { Users } from './views/Users/Users';
import { Home } from './views/Home/Home';
import { Brands } from './views/Brands/Brands';

export const App = () => (
    <BrowserRouter basename="/">
        <Routes>
            <Route path={RoutePath.Home}>
                <Home />
            </Route>

            <Route path={RoutePath.Users}>
                <Users />
            </Route>

            <Route path={RoutePath.Brands}>
                <Brands />
            </Route>
        </Routes>
    </BrowserRouter>
);
