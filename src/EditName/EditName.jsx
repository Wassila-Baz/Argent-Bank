import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../action/user.action"; // Import de l'action updateUserName depuis votre fichier d'actions

import "./EditName.css";

const EditName = () => {
  const userProfile = useSelector((state) => state.user.userProfile); // Utilisation de useSelector pour accéder à userProfile
  const dispatch = useDispatch(); // Obtention de la fonction de dispatch

  // État local pour stocker le nouveau nom d'utilisateur
  const [newUserName, setNewUserName] = useState("");

  // Gestion de la modification du nom d'utilisateur
  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value); // Mise à jour de l'état local avec la valeur saisie dans l'input
  };

  // Gestion de l'enregistrement du nouveau nom d'utilisateur
  const handleSave = () => {
    dispatch(updateUserName(newUserName)); // Dispatch de l'action updateUserName avec le nouveau nom d'utilisateur
  };

  // Gestion de l'annulation de la modification du nom d'utilisateur
  const handleCancel = () => {
    // Vous pouvez implémenter une logique pour réinitialiser l'état local du nouveau nom d'utilisateur si nécessaire
  };

  return (
    <div>
      <div className="edit-form">
        <h3>Edit User info</h3>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={userProfile.userName} // Utilisation de userProfile.userName comme valeur par défaut
            onChange={handleUserNameChange} // Gestion des modifications du nom d'utilisateur
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={userProfile.firstName}
            className="blocked-input"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={userProfile.lastName}
            className="blocked-input"
            readOnly
          />
        </div>
      </div>
      <div className="btn-form">
        <button onClick={handleSave}>Save</button> {/* Gestion du clic sur le bouton Save */}
        <button onClick={handleCancel}>Cancel</button> {/* Gestion du clic sur le bouton Cancel */}
      </div>
    </div>
  );
};

export default EditName;
