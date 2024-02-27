import axios from "axios";

// Constantes pour les actions de connexion
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const USER_PROFILE = "USER_PROFILE";
export const UPDATE_USER_NAME = "UPDATE_USER_NAME";
export const LOGIN_LOGOUT = "LOGIN_LOGOUT";

// Actions de connexion
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = () => ({ type: LOGIN_SUCCESS });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

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
export const fetchUserProfile = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch({ type: USER_PROFILE, payload: response.data.body });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUserName = (newUserName) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { newUserName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch({ type: UPDATE_USER_NAME, payload: newUserName });
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
