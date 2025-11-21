import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCustomers } from "../redux/customerSlice";
import { fetchOrders } from "../redux/orderSlice";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Table,
  Alert,
} from "react-bootstrap";

const CustomerPurchaseReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state: any) => state.customers.items);
  const allOrders = useAppSelector((state: any) => state.orders.items);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerPurchases, setCustomerPurchases] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCustomerId) {
      const filtered = allOrders.filter(
        (o: any) =>
          o.customerId === parseInt(selectedCustomerId) &&
          o.status === "completed"
      );
      setCustomerPurchases(filtered);
    }
  }, [selectedCustomerId, allOrders]);

  const totalSpent = customerPurchases.reduce(
    (sum, o) => sum + o.totalAmount,
    0
  );
  const totalOrders = customerPurchases.length;

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Customer Purchase History</h1>

      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Select Customer</Form.Label>
              <Form.Select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
              >
                <option value="">Choose a customer...</option>
                {customers.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {selectedCustomerId && (
        <>
          <Alert variant="info">
            <strong>Total Orders:</strong> {totalOrders} |{" "}
            <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
          </Alert>

          {customerPurchases.length === 0 ? (
            <Alert variant="warning">
              No purchases found for this customer.
            </Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Purchase Date</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {customerPurchases.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.purchaseTime).toLocaleString()}</td>
                    <td>
                      {order.OrderItems?.map((item: any) => (
                        <div key={item.productId}>
                          {item.Product?.name}: {item.quantity} x ${item.price}
                        </div>
                      ))}
                    </td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
};

export default CustomerPurchaseReport;
