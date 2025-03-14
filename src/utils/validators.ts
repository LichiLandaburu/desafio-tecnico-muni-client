
export const validationRegister = {
  name: {
    required: { value: true, message: "El nombre es requerido" },
    minLength: { value: 4, message: "El nombre debe tener al menos 4 caracteres" },
    maxLength: { value: 30, message: "El nombre debe tener menos de 30 caracteres" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "El nombre debe contener solo letras",
    }
  },
  lastname: {
    required: { value: true, message: "El apellido es requerido" },
    minLength: { value: 4, message: "El apellido debe tener al menos 4 caracteres" },
    maxLength: { value: 30, message: "El apellido debe tener menos de 30 caracteres" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "El apellido debe contener solo letras",
    }
  },
  email: {
    required: { value: true, message: "El correo es requerido" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "El correo no es válido",
    },
  },
  birthday: {
    required: { value: true, message: "La fecha de nacimiento es requerida" },
  },
  password: {
    required: { value: true, message: "La contraseña es requerida" },
    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
    maxLength: { value: 20, message: "La contraseña debe tener menos de 20 caracteres" },
  },
  confirmPassword: (watch: { (value: string): string }) => ({
    required: { value: true, message: "Por favor, confirma tu contraseña" },
    validate: {
      passwordMatch: (value: string) =>
        value === watch("password") || "Las contraseñas no coinciden",
    },
  }),
  dni: {
    required: { value: true, message: "El DNI es requerido" },
    minLength: { value: 8, message: "El DNI debe tener al menos 8 caracteres" },
    maxLength: { value: 8, message: "El DNI debe tener menos de 8 caracteres" },
    pattern: {
      value: /^[0-9]+$/i,
      message: "El DNI debe contener solo caracteres numéricos",
    },
  },
}

export const validationUpdateUser = {
  name: {
    required: { value: true, message: "El nombre es requerido" },
    minLength: { value: 4, message: "El nombre debe tener al menos 4 caracteres" },
    maxLength: { value: 30, message: "El nombre debe tener menos de 30 caracteres" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "El nombre debe contener solo letras",
    }
  },
  lastname: {
    required: { value: true, message: "El apellido es requerido" },
    minLength: { value: 4, message: "El apellido debe tener al menos 4 caracteres" },
    maxLength: { value: 30, message: "El apellido debe tener menos de 30 caracteres" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "El apellido debe contener solo letras",
    }
  },
  birthday: {
    required: { value: true, message: "La fecha de nacimiento es requerida" },
  },
  dni: {
    required: { value: true, message: "El DNI es requerido" },
    minLength: { value: 8, message: "El DNI debe tener al menos 8 caracteres" },
    maxLength: { value: 8, message: "El DNI debe tener menos de 8 caracteres" },
    pattern: {
      value: /^[0-9]+$/i,
      message: "El DNI debe contener solo caracteres numéricos",
    },
  },
}

export const validationLogin = {
  email: {
    required: { value: true, message: "El correo es requerido" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "El correo no es válido",
    },
  },
  password: {
    required: { value: true, message: "La contraseña es requerida" },
    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
    maxLength: { value: 20, message: "La contraseña debe tener menos de 20 caracteres" },
  },
}

export const validationCreateProcedure = {
  name: {
    required: { value: true, message: "El nombre es requerido" },
    minLength: { value: 4, message: "El nombre debe tener al menos 4 caracteres" },
    maxLength: { value: 30, message: "El nombre debe tener menos de 30 caracteres" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "El nombre debe contener solo letras",
    }
  },
  lastname: {
    required: { value: true, message: "El apellido es requerido" },
    minLength: { value: 4, message: "El apellido debe tener al menos 4 caracteres" },
    maxLength: { value: 30, message: "El apellido debe tener menos de 30 caracteres" },
    pattern: {
      value: /^[A-Za-z]+$/i,
      message: "El apellido debe contener solo letras",
    }
  },
  dni: {
    required: { value: true, message: "El DNI es requerido" },
    minLength: { value: 8, message: "El DNI debe tener al menos 8 caracteres" },
    maxLength: { value: 8, message: "El DNI debe tener menos de 8 caracteres" },
    pattern: {
      value: /^[0-9]+$/i,
      message: "El DNI debe contener solo caracteres numéricos",
    },
  },
  email: {
    required: { value: true, message: "El correo es requerido" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "El correo no es válido",
    },
  },
  province: {
    required: { value: true, message: "La provincia es requerida" }
  },
  city: {
    required: { value: true, message: "La ciudad es requerida" }
  },
  address: {
    required: { value: true, message: "La dirección es requerida" }
  },
  postal_code: {
    required: { value: true, message: "El Código Postal es requerido" },
    minLength: { value: 4, message: "El Código Postal debe tener al menos 5 caracteres" },
    maxLength: { value: 4, message: "El Código Postal debe tener menos de 5 caracteres" },
    pattern: {
      value: /^[0-9]+$/i,
      message: "El Código Postal debe contener solo caracteres numéricos",
    },
  },
  telephone: {
    required: { value: true, message: "El teléfono es requerido" },
    pattern: {
      value: /^[0-9]+$/i,
      message: "El teléfono debe contener solo caracteres numéricos",
    },
  }
}