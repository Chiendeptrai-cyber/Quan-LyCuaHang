import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProducts } from "../redux/productSlice";
import { Container, Table, Form, Row, Col, Alert } from "react-bootstrap";

const StockReport: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector(
    (state: any) => state.products
  );
  const [lowStockOnly, setLowStockOnly] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = lowStockOnly
    ? products.filter((p: any) => p.stock < 10)
    : products;
  const totalValue = filteredProducts.reduce(
    (sum: any, p: any) => sum + p.price * p.stock,
    0
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Stock Report</h1>

      <Form className="mb-4">
        <Form.Check
          type="checkbox"
          label="Show only low stock (< 10 units)"
          checked={lowStockOnly}
          onChange={(e) => setLowStockOnly(e.target.checked)}
        />
      </Form>

      {status === "loading" && <Alert variant="info">Loading...</Alert>}
      {status === "failed" && (
        <Alert variant="danger">Error loading products</Alert>
      )}

      {status === "succeeded" && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: any) => (
                <tr
                  key={product.id}
                  style={{
                    backgroundColor: product.stock < 5 ? "#ffe6e6" : undefined,
                  }}
                >
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>${(product.price * product.stock).toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
                <td colSpan={5}>Total Inventory Value</td>
                <td>${totalValue.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default StockReport;
