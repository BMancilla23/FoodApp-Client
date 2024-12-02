import { Button } from "@/components/ui/button";
import { otpSchema } from "@/validations/userSchema";
import { Loader2 } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";

export const VerifyEmail = () => {
  // Inicializa con 6 elementos vacíos
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  // Tipamos correctamente el arrays de refs
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [errors, setErrors] = useState<string>("");

  // Manejo de cambios en los inputs de OTP
  const handleChange = (index: number, value: string) => {
    // Aceptar solo un dígito numérico
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (errors) setErrors("");

      // Mover al siguiente campo solo si no estamos en el último input
      if (value !== "" && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  // Manejo de teclas presionadas en los inputs de OTP
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // Si el input actual está vacío y hay uno anterior, enfoca el anterior
      if (otp[index] === "" && index > 0) {
        inputRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = ""; // Limpia el valor actual si hay backspace
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Unir matriz a una sola cadena
    const otpString = otp.join("");
    // Validamos la cadena con zod
    const result = otpSchema.safeParse(otpString);
    if (!result.success) {
      setErrors(result.error.issues[0].message);
      return;
    }
    console.log(otpString);
  };

  return (
    <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
      <div className="text-center">
        <h1 className="font-bold text-2xl text-primary-600">
          Verifica tu correo
        </h1>
        <p className="text-gray-600 text-sm">
          Te hemos enviado un código de verificación de 6 dígitos a tu correo
          electrónico.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              placeholder="0"
              value={digit}
              maxLength={1} // Aseguramos que solo puede haber un carácter
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(element) => (inputRef.current[index] = element)} // Asignamos la referencia
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              inputMode="numeric" // Input adaptado para dispositivos móviles
              className="w-12 h-12 border border-gray-200 rounded-lg text-center text-gray-600 focus:outline-none focus:border-orange-500"
              autoComplete="one-time-code" // Sugerencia de OTP en móviles
              aria-label={`Código de verificación ${index + 1}`} // Mejora accesibilidad
            />
          ))}
        </div>
        {errors && <p className="text-red-500 mt-2">{errors}</p>}
        {loading ? (
          <Button className="w-full mt-6" disabled>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Espere por favor
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-6">
            Verificar
          </Button>
        )}
      </form>
    </div>
  );
};
