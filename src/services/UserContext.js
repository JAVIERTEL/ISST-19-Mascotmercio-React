import React from 'react';

// Paso 1: Crear el contexto del usuario
export const UserContext = React.createContext();

// Paso 2: Crear un proveedor de contexto de usuario
export const UserProvider = UserContext.Provider;