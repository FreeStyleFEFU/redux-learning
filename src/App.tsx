import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RoutePath } from "./router/routes";

import { Users } from "./views/Users/Users";
import { Home } from "./views/Home/Home";
import { Brands } from "./views/Brands/Brands";

export const App = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path={RoutePath.Home} element={<Home />} />

      <Route path={RoutePath.Users} element={<Users />} />

      <Route path={RoutePath.Brands} element={<Brands />} />
    </Routes>
  </BrowserRouter>
);
