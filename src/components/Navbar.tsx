import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  // useState isAdmin
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="w-full border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex md:space-x-12 items-center">
          <Link to="/">
            <h1 className="font-bold md:font-extrabold text-2xl">AdevEats</h1>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Inicio</Link>
            <Link to="/profile">Perfil</Link>
            <Link to="/order/status">Order</Link>
          </div>
          {
            isAdmin && (
                
            )
          }
        </div>
      </div>
    </div>
  );
};
