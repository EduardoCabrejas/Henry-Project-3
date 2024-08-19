export const validateName = (name) => {
    const nameRegex = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*){0,4}$/;
    if (!name.trim()) {
        return 'El nombre es requerido.';
    }
    if (name.length < 3 || name.length > 25) {
        return 'El nombre debe tener entre 3 y 25 caracteres.';
    }
    if (!nameRegex.test(name)) {
        return 'El nombre debe comenzar con mayúscula y contener solo letras.';
    }
    return '';
};



export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return 'El correo electrónico es requerido.';
    }
    if (!emailRegex.test(email)) {
        return 'El correo electrónico no es válido.';
    }
    return '';
};


export const validateBirthdate = (birthdate) => {
    if (!birthdate) {
        return 'La fecha de nacimiento es requerida.';
    }
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    if (new Date(birthdate) > eighteenYearsAgo) {
        return 'Debes ser mayor de 18 años para registrarte.';
    }
    return '';
};


export const validateNDni = (nDni) => {
    const nDniRegex = /^\d{8}$/;
    if (!nDni.trim()) {
        return 'El DNI es requerido.';
    }
    if (!nDniRegex.test(nDni)) {
        return 'El DNI debe contener exactamente 8 números.';
    }
    return '';
};


export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!username.trim()) {
        return 'El nombre de usuario es requerido.';
    }
    if (!usernameRegex.test(username)) {
        return 'El nombre de usuario ser de 4 y 20 caracteres, con mayúsculas, minúsculas o números.';
    }
    return '';
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!password.trim()) {
        return 'La contraseña es requerida.';
    }
    if (password.length < 8 || password.length > 20) {
        return 'La contraseña debe tener entre 8 y 20 caracteres.';
    }
    if (!passwordRegex.test(password)) {
        return 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un carácter especial.';
    }
    return '';
};
