import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  RegisterInputState,
  userRegisterSchema,
} from "@/validations/userSchema";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

/* type RegisterInputState = {
  fullName: string;
  email: string;
  password: string;
  contact: string;
}; */

export const Register = () => {
  const [errors, setErrors] = useState<Partial<RegisterInputState>>({});
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<RegisterInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    /* setInput({ ...input, [e.target.name]: e.target.value }); */
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Inicio de verificación de validación de formulario
    const result = userRegisterSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RegisterInputState>);
      return;
    }
    // La implementación de la API de inicio de sesión comienza aquí
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
        <Input
          type="text"
          placeholder="Full Name"
          name="fullname"
          value={input.fullname}
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-1"
        />
        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
        {errors && <p className="text-red-500 text-xs">{errors.fullname}</p>}
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

      <div className="relative">
        <Input
          type="text"
          placeholder="Número de contacto"
          name="contact"
          value={input.contact}
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-1"
        />
        <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
        {errors && <p className="text-red-500 text-xs">{errors.contact}</p>}
      </div>

      <div className="">
        {loading ? (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Espere por favor
          </Button>
        ) : (
          <Button className="w-full">Registrarme</Button>
        )}
      </div>
      <Separator />
      <p className="text-center">
        ¿Tienes una cuenta?
        <Button type="submit" asChild variant="link" className="p-0 ml-2">
          <Link to="/auth/login">Inicia Sesión</Link>
        </Button>
      </p>
    </form>
  );
};
