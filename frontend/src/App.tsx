import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useAppSelector } from "./redux/hooks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductAdd from "./pages/ProductAdd";
import CustomerList from "./pages/CustomerList";
import CustomerAdd from "./pages/CustomerAdd";
import OrderList from "./pages/OrderList";
import StockReport from "./pages/StockReport";
import CustomerPurchaseReport from "./pages/CustomerPurchaseReport";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { logout } from "./redux/authSlice";
import { useAppDispatch } from "./redux/hooks";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAppSelector((state: any) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppNavbar: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="/">Store Management</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/customers">Customers</Nav.Link>
          <Nav.Link href="/orders">Orders</Nav.Link>
          <Nav.Link href="/reports/stock">Stock Report</Nav.Link>
          <Nav.Link href="/reports/purchases">Purchase Report</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item className="me-3">
            <span style={{ color: "#fff" }}>Welcome, {user?.username}</span>
          </Nav.Item>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <PrivateRoute>
              <ProductAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <CustomerList />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/add"
          element={
            <PrivateRoute>
              <CustomerAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/stock"
          element={
            <PrivateRoute>
              <StockReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports/purchases"
          element={
            <PrivateRoute>
              <CustomerPurchaseReport />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
