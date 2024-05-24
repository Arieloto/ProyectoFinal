import { object, string, ref } from "yup"
export const signupSchema = object().shape({
    email: string().required("El correo electrónico es obligatorio").email("Correo electrónico no válido"),
    password: string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: string()
        .oneOf([ref("password"), null], "Las contraseñas deben coincidir")
        .required("La confirmación de la contraseña es obligatoria"),
})