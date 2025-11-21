import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCustomers, searchCustomers } from "../redux/customerSlice";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state: any) => state.customers);
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCustomers());
    }
  }, [status, dispatch]);

  const handleSearch = () => {
    dispatch(searchCustomers({ code: searchCode, name: searchName }));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Customers</h1>
        <Link to="/customers/add">
          <Button variant="success">Add Customer</Button>
        </Link>
      </div>

      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Search code"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search name"
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleSearch} className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {status === "loading" && <Alert variant="info">Loading...</Alert>}
      {status === "failed" && (
        <Alert variant="danger">Error loading customers</Alert>
      )}

      {status === "succeeded" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Birth Year</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((customer: any) => (
              <tr key={customer.id}>
                <td>{customer.code}</td>
                <td>{customer.name}</td>
                <td>{customer.birthYear || "N/A"}</td>
                <td>{customer.address}</td>
                <td>
                  <Link to={`/customers/edit/${customer.id}`}>
                    <Button variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CustomerList;
