import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import UserAccount from './pages/UserAccount';

// Configurez votre store Redux ici
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"; 
import rootReducer from "./reducers"

const store = configureStore({
  reducer: rootReducer,
  devTools:true,
});

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/account' element={<UserAccount />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);
