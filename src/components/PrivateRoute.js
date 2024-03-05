import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  let token = localStorage.getItem("token"); // récupère la valeur stockée sous la clé "token" dans le stockage local du navigateur
  
  if (!token) {
    token = sessionStorage.getItem("token"); //Si aucune valeur n'est trouvée dans le stockage local, le code vérifie le stockage de session pour la clé "token"
  }

  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
