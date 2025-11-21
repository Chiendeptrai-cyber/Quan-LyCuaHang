import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RootState } from "../redux/store";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state: any) => state.auth);
  const { items: products } = useAppSelector((state: any) => state.products);
  const { items: customers } = useAppSelector((state: any) => state.customers);
  const { items: orders } = useAppSelector((state: any) => state.orders);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {user?.username}!</h2>
          <p className="text-muted">Store Management System</p>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <h3>{products.length}</h3>
              <p className="text-muted">Total Products</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Customers</Card.Title>
              <h3>{customers.length}</h3>
              <p className="text-muted">Total Customers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <h3>{orders.length}</h3>
              <p className="text-muted">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Quick Links</Card.Title>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                <li>
                  <a href="/products">View Products</a>
                </li>
                <li>
                  <a href="/orders">View Orders</a>
                </li>
                <li>
                  <a href="/reports/stock">Stock Report</a>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
