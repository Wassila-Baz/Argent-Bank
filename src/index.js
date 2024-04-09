import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from './pages/Home';
import Login from './pages/Login';
import UserAccount from './pages/UserAccount';
import Error404 from "./components/Error404/Error404.jsx";
import PrivateRoute from "./components/PrivateRoute";

//  store Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"; 
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path='/account' element={<UserAccount />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </Provider>
  );
};

// Utilisez createRoot() pour rendre l'application
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
