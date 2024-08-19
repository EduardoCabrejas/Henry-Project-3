export const validateUsername = (username) => {
    if (username.trim() === '') {
        return 'El nombre de usuario es requerido.';
    }
    if (username.length < 4 || username.length > 20) {
        return 'El nombre de usuario debe tener entre 4 y 20 caracteres.';
    }
    return '';
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (password.trim() === '') {
        return 'La contraseña es requerida.';
    }
    if (!passwordRegex.test(password)) {
        return 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un carácter especial.';
    }
    return '';
};