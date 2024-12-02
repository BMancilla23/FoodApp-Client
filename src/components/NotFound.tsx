import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NotFoundProps {
  text?: string;
  path: string;
}

export const NotFound = ({ text = "Inicio", path }: NotFoundProps) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Falta algo.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Lo sentimos, no podemos encontrar esa página. Encontrarás mucho que
            explorar en la página de {text}.
          </p>
          <Button asChild>
            <Link to={path}>Volver al {text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
