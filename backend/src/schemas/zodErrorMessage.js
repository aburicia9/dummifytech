// Configuracion de mensajes de error para Joi.
export const zodErrorMessages = {
  required: 'El campo "{#key}" es requerido',
  onlyFormatImage: 'Solo se permiten fotos jpeg o png',
  baseNumber: 'El valor de {{key}} debe ser un número',
  numberInteger: 'El valor de {{key}} debe ser un número entero',
  fileMax: 'El archivo no debe exceder los 5 MB',
  fileMin: 'El valor de {{key}} debe ser mayor o igual a 1',
  object: 'El valor de {{key}} debe ser un objeto',
  objectUnknown: 'No se permiten campos adicionales en este objeto',
  baseString: 'El valor de {{key}} debe ser una cadena',
  emailString:
        'Debe proporcionar un correo electrónico válido para {{key}}',
  emptyField: 'El campo {{key}} no debe estar vacío',
  maxChar: 'El campo {{key}} no debe exceder los {{limit}} caracteres',
  minChar: 'El campo {{key}} debe tener al menos {{limit}} caracteres',
  basePasswordPattern:
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para {{key}}'
}
