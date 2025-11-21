import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { createCustomer } from "../redux/customerSlice";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomerAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    birthYear: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        createCustomer({
          code: formData.code,
          name: formData.name,
          birthYear: formData.birthYear ? parseInt(formData.birthYear) : null,
          address: formData.address,
        })
      ).unwrap();
      navigate("/customers");
    } catch (err: any) {
      setError(err.message || "Failed to create customer");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2>Add Customer</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Customer Code</Form.Label>
          <Form.Control
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth Year</Form.Label>
          <Form.Control
            type="number"
            value={formData.birthYear}
            onChange={(e) =>
              setFormData({ ...formData, birthYear: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Create Customer
        </Button>
      </Form>
    </Container>
  );
};

export default CustomerAdd;
