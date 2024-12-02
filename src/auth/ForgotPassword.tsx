import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <form className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4">
        <div>
          <h1 className="text-2xl font-semibold text-center mb-2">
            Recuperar contraseña
          </h1>
          <p className="text-sm text-gray-600">
            Ingrese su dirección de correo electrónico para restablecer su
            contraseña
          </p>
        </div>

        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Escribe tu correo"
            className="pl-10"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Espere por favor
          </Button>
        ) : (
          /* Send */
          <Button>Recuperar contraseña</Button>
        )}
        {/* Back to login */}

        <Link
          to="/auth/login"
          className="text-gray-500  hover:text-primary flex justify-center transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300" />
          <span className="text-sm font-medium">Volver a iniciar sesión</span>
        </Link>
      </form>
    </div>
  );
};
