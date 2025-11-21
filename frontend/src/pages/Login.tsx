import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { loginSuccess } from "../redux/authSlice";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    alert(
      "Google OAuth is not configured. Please use username/password login."
    );
  };

  const handleFacebookLogin = () => {
    alert(
      "Facebook OAuth is not configured. Please use username/password login."
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Store Management</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Login
            </Button>
          </Form>
          <hr />
          <Button
            variant="danger"
            onClick={handleGoogleLogin}
            className="w-100 mb-2"
            disabled
            title="Requires Google OAuth configuration"
          >
            Login with Google (Not Configured)
          </Button>
          <Button
            variant="info"
            onClick={handleFacebookLogin}
            className="w-100 mb-3"
            disabled
            title="Requires Facebook OAuth configuration"
          >
            Login with Facebook (Not Configured)
          </Button>
          <p className="text-center text-muted">
            <small>OAuth login requires valid app credentials</small>
          </p>
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/register" style={{ textDecoration: "none" }}>
              Register here
            </a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
