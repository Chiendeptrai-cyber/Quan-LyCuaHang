import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchProducts,
  searchProducts,
  hideProduct,
  showProduct,
} from "../redux/productSlice";
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

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state: any) => state.products);
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSearch = () => {
    dispatch(
      searchProducts({
        code: searchCode,
        name: searchName,
        category: searchCategory,
      })
    );
  };

  const handleHide = (id: number) => {
    dispatch(hideProduct(id));
  };

  const handleShow = (id: number) => {
    dispatch(showProduct(id));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Products</h1>
        <Link to="/products/add">
          <Button variant="success">Add Product</Button>
        </Link>
      </div>

      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Search code"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search name"
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder="Search category"
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleSearch} className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {status === "loading" && <Alert variant="info">Loading...</Alert>}
      {status === "failed" && (
        <Alert variant="danger">Error loading products</Alert>
      )}

      {status === "succeeded" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product: any) => (
              <tr
                key={product.id}
                style={{ opacity: product.hidden ? 0.5 : 1 }}
              >
                <td>{product.code}</td>
                <td>
                  {product.name} {product.hidden && <small>(hidden)</small>}
                </td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Link to={`/products/edit/${product.id}`}>
                    <Button variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  {product.hidden ? (
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShow(product.id)}
                      className="me-2"
                    >
                      Show
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleHide(product.id)}
                      className="me-2"
                    >
                      Hide
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProductList;
