const yup = require('yup');

const registerSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
  firstName: yup.string().required('Prénom requis'),
  lastName: yup.string().required('Nom requis'),
  role: yup.string().oneOf(['member', 'trainer'], 'Rôle invalide').required('Rôle requis')
});

const loginSchema = yup.object({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis')
});

const sessionSchema = yup.object({
  title: yup.string().required('Titre requis'),
  description: yup.string().required('Description requise'),
  startTime: yup.date().required('Heure de début requise'),
  endTime: yup.date().required('Heure de fin requise')
    .min(
      yup.ref('startTime'),
      'L\'heure de fin doit être après l\'heure de début'
    ),
  capacity: yup.number().positive('La capacité doit être positive').required('Capacité requise'),
  trainer: yup.string().required('Identifiant de l\'entraîneur requis')
});

const validateRegister = async (data) => {
  try {
    return await registerSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateLogin = async (data) => {
  try {
    return await loginSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateSession = async (data) => {
  try {
    return await sessionSchema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validateSession
};