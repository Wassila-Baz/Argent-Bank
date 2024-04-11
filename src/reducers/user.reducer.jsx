import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, USER_PROFILE, UPDATE_USER_NAME, LOGIN_LOGOUT} from '../action/user.action'; 

const initialState = {
  loading: false,
  error: null, //n'a pas rencontré d'erreur au départ.
  userProfile: '', // début de l'application, aucun profil utilisateur n'est actuellement chargé ou disponible
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { //le reducer retourne un nouvel objet d'état
        ...state, //pour copier toutes les propriétés de l'état actuel
        loading: true, //indiquer que la connexion est en cours
        error: null, //error est défini sur null pour effacer toute erreur précédente.
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false, //loading est défini sur false pour indiquer que la requête de connexion est terminée.
        error: null, //error est défini sur null pour indiquer qu'il n'y a pas d'erreur associée à la connexion réussie. Même s'il y avait une erreur précédente, elle est effacée lorsqu'une connexion réussit.
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false, // pour indique que la requête de connexion est terminée.
        error: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
      case UPDATE_USER_NAME:
        return {
          ...state,
          userProfile: {
            ...state.userProfile,
            userName: action.payload //nouveau nom d'utilisateur fourni dans l'action
          }
        };
      case LOGIN_LOGOUT:
        return {
          ...state,
          userProfile: '' //est réinitialisée à une valeur vide 
        };
      
    default:
      return state;
  }
};

export default userReducer;
