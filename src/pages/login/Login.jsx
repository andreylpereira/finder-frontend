import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginService } from "./../../services/loginService";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap/";
import { toast } from "sonner";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { login, auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const acessToken = await loginService(form);
      login(acessToken);
      toast.success("Login efetuado com sucesso.");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-primary"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ minWidth: "350px" }} className="shadow">
        <div className="text-center">
          <svg
            id="user-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="200"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 14a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4z" />
          </svg>
        </div>
        <Card.Body>
          <Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="formEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formPassword"
              >
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="senha"
                  value={form.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100 shadow"
                disabled={isLoading}
                type="submit" 
              >
                {isLoading ? "Carregando..." : "LOGIN"}
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
