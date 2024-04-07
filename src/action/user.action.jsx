import axios from "axios";

// Constantes pour les actions de connexion
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_PROFILE = "USER_PROFILE";
export const UPDATE_USER_NAME = "UPDATE_USER_NAME";
export const LOGIN_LOGOUT = "LOGIN_LOGOUT";

// Actions , fonction de connexion
export const loginRequest = () => ({ type: LOGIN_REQUEST });//connexion en cours
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });// connexion réussi
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error }); // erreur 

export const loginUser = (email, password, navigate, rememberMe) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );

      if (response.status === 200) {
        const token = response.data.body.token;
        rememberMe ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);
        navigate("/account");
        dispatch(loginSuccess());
      } else {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        response.status === 401 && navigate("/account");
      }
    } catch (error) {
      dispatch(loginFailure("Identifiants incorrects"));
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  };
};

// Actions pour récupérer le profil de l'utilisateur et mettre à jour le nom d'utilisateur
export const fetchUserProfile = () => { //récupérer le profil de l'utilisateur 
  return async (dispatch) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return; // Si aucun jeton n'est trouvé, on arrête la fonction car l'utilisateur n'est pas connecté
    try {
      const response = await axios.post( //envoi de la requete POST pour récup profil d'utilisateur
        "http://localhost:3001/api/v1/user/profile",
        {},// Pas de données à envoyer dans le corps de la requête car on veut juste récupérer le profil
        { headers: { Authorization: `Bearer ${token}` } } // On ajoute le jeton d'authentification dans les en-têtes de la requête pour s'identifier auprès du serveur
      );

      if (response.status === 200) { // Si la requête réussit (code de statut HTTP 200)
        dispatch({ type: USER_PROFILE, payload: response.data.body }); // envoie les données du profil de l'utilisateur au store Redux via l'action USER_PROFILE
      }
    } catch (error) {
      console.error(error);
    }
  };
};
/// Action pour mettre à jour le nom d'utilisateur 
export const updateUserName = (userName) => {
  return async (dispatch) => {
    let token = localStorage.getItem("token");

    if (!token) {
      token = sessionStorage.getItem("token");
    }

    if (!token) {
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: UPDATE_USER_NAME,
          payload: userName,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// Action pour la déconnexion
export const logoutUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  return { type: LOGIN_LOGOUT };
};

