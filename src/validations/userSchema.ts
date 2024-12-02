import { z } from "zod";

export const userRegisterSchema = z.object({
  fullname: z
    .string()
    .min(2, "El nombre completo debe tener al menos 2 caracteres"),
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  contact: z
    .string()
    .min(9, "El número de contacto debe tener al menos 9 caracteres"),
});

export type RegisterInputState = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;

export const otpSchema = z
  .string()
  .length(6, "El código de verificación debe tener exactamente 6 caracteres")
  .regex(/^\d+$/, "El código solo debe contener números.");

export type OtpInputState = z.infer<typeof otpSchema>;
