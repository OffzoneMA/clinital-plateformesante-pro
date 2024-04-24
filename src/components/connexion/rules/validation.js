// Méthode de validation de l'e-mail
export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

// Méthode de validation du numéro de téléphone
export const validatePhone = (phone) => {
    const phonePattern = /^(?:\+?(\d{1,3}))?(\d{9,14})$/;
    return phonePattern.test(phone);
};

// Méthode de validation du mot de passe
export const validatePassword = (password) => {
   
    return password.length >= 8; 
};
