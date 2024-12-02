import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/validations/userSchema";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

/* type LoginInputState = {
  email: string;
  password: string;
}; */

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    /* setInput({ ...input, [e.target.name]: e.target.value }); */
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Inicio de verificación de validación de formulario
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }

    console.log(input);
    /*   setLoading(true); */
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:border border-gray-200 rounded-lg max-w-md px-4 md:p-8 space-y-6 w-full"
    >
      <div className="mb-3">
        <h1 className="font-bold text-2xl  text-center">DevEats</h1>
      </div>
      <div className="relative">
        {/*  <Label>Correo</Label> */}
        <Input
          type="email"
          placeholder="Escribe tu correo"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-1"
        />
        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
        {errors && <p className="text-red-500 text-xs">{errors.email}</p>}
      </div>
      <div className="relative">
        {/* <Label>Contraseña</Label> */}
        <Input
          type="password"
          placeholder="Escribe tu contraseña"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-1"
        />
        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
        {errors && <p className="text-red-500 text-xs">{errors.password}</p>}
      </div>

      <div className="flex flex-col items-center">
        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Espere por favor
          </Button>
        ) : (
          <Button className="w-full">Iniciar Sesión</Button>
        )}
        {/* Forgot Password */}
        <Button asChild variant="link">
          <Link to="/auth/forgot-password" className="mt-4">
            Has olvidado tu contraseña?
          </Link>
        </Button>
      </div>
      <Separator />
      <p className="text-center">
        ¿No tienes una cuenta?
        <Button type="submit" asChild variant="link" className="p-0 ml-2">
          <Link to="/auth/register">Registrate</Link>
        </Button>
      </p>
    </form>
  );
};
