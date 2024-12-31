import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userIsAdmin = decodedToken.role?.some(
          (p) => p.authority === "ADMINISTRADOR"
        );

        setAuth({
          isAuthenticated: true,
          token,
          user: decodedToken,
          isAdmin: userIsAdmin,
        });
      } catch (error) {

        localStorage.removeItem("authToken");
        setAuth({
          isAuthenticated: false,
          token: null,
          user: null,
          isAdmin: false,
        });
      }
    } else {
      setAuth({
        isAuthenticated: false,
        token: null,
        user: null,
        isAdmin: false,
      });
    }

    setLoading(false);
  }, []); 
  const login = (token) => {
    const decodedToken = jwtDecode(token);
    const userIsAdmin = decodedToken.role?.some(
      (p) => p.authority === "ADMINISTRADOR"
    );

    localStorage.setItem("authToken", token);

    setAuth({
      isAuthenticated: true,
      token,
      user: decodedToken,
      isAdmin: userIsAdmin,
    });

    navigate("/dashboard/items");
  };

  const logout = () => {
    localStorage.removeItem("authToken");

    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
      isAdmin: false,
    });

    toast.success('Logout efetuado com sucesso.');
    navigate("/login");
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
