import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchOrders, createOrder } from "../redux/orderSlice";
import { fetchCustomers } from "../redux/customerSlice";
import { fetchProducts } from "../redux/productSlice";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state: any) => state.orders.items);
  const orderStatus = useAppSelector((state: any) => state.orders.status);
  const customers = useAppSelector((state: any) => state.customers.items);
  const products = useAppSelector((state: any) => state.products.items);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [orderItems, setOrderItems] = useState<any[]>([
    { productId: "", quantity: 1 },
  ]);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { productId: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleCreateOrder = async () => {
    try {
      await dispatch(
        createOrder({
          customerId: parseInt(selectedCustomer),
          items: orderItems.map((item) => ({
            productId: parseInt(item.productId),
            quantity: parseInt(item.quantity),
          })),
        })
      ).unwrap();
      setShowCreateModal(false);
      setSelectedCustomer("");
      setOrderItems([{ productId: "", quantity: 1 }]);
    } catch (err) {
      alert("Failed to create order");
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Orders</h1>
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Create Order
        </Button>
      </div>

      {orderStatus === "loading" && <Alert variant="info">Loading...</Alert>}
      {orderStatus === "failed" && (
        <Alert variant="danger">Error loading orders</Alert>
      )}

      {orderStatus === "succeeded" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Purchase Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.Customer?.name}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.purchaseTime).toLocaleString()}</td>
                <td>
                  <Link to={`/orders/${order.id}`}>
                    <Button variant="info" size="sm">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">Select Customer</option>
              {customers.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <h5>Items</h5>
          {orderItems.map((item, idx) => (
            <Row key={idx} className="mb-3">
              <Col md={7}>
                <Form.Select
                  value={item.productId}
                  onChange={(e) => {
                    const newItems = [...orderItems];
                    newItems[idx].productId = e.target.value;
                    setOrderItems(newItems);
                  }}
                >
                  <option value="">Select Product</option>
                  {products.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.price})
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...orderItems];
                    newItems[idx].quantity = e.target.value;
                    setOrderItems(newItems);
                  }}
                />
              </Col>
              <Col md={2}>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(idx)}
                  size="sm"
                >
                  X
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddItem} className="mb-3">
            + Add Item
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateOrder}>
            Create Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderList;
