import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RoutePath } from './router/routes';

import { Users } from '@views/Users/Users';
import { Home } from '@views/Home/Home';

import { UserList } from '@components/UserList/UserList';

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path={RoutePath.Home}>
                <Home />
            </Route>

            <Route path={RoutePath.Users}>
                <Users />
            </Route>

            <Route path={RoutePath.Brands}>
                <UserList />
            </Route>
        </Routes>
    </BrowserRouter>
);
