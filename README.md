# Store Management System

A comprehensive store management system built with React (TypeScript), Express (TypeScript), and SQL. Manage products, customers, orders, and inventory with advanced features like stock tracking, reporting, and authentication.

## Features

### Product Management

- Add, edit, hide, and show products
- Product code, name, selling price, and stock quantity
- Search products by code, name, or category
- Product visibility control

### Customer Management

- Customer information: code, full name, birth year, address
- Add, edit, and search customers
- Full customer history tracking

### Order Management

- Create orders with customer details and product list
- Automatic stock checking and verification
- Stock quantity updates after order completion
- Search orders by customer, status, or date range
- Track purchase time and order status

### Inventory Management

- Import inventory with supplier tracking
- Track import time and imported products
- Automatic stock updates after inventory imports
- Inventory history

### Reporting & Analytics

- **Stock Status Report**: Current stock levels for all products
- **Stock Report by Date**: Historical stock data as of any specific date
- **Customer Purchase History**: Detailed purchase records per customer

### Authentication

- Local authentication (username/password)
- Google OAuth integration
- Facebook OAuth integration
- Secure session management

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (TypeScript)
- **Database**: SQLite with Sequelize ORM
- **Authentication**: Passport.js with multiple strategies
- **Password Hashing**: bcryptjs

### Frontend

- **Framework**: React 18 (TypeScript)
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **UI Framework**: React Bootstrap
- **Build Tool**: Create React App

## Project Structure

```
QuanLyCuaHang/
├── backend/
│   ├── src/
│   │   ├── models/          # Database models
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Customer.ts
│   │   │   ├── Order.ts
│   │   │   ├── OrderItem.ts
│   │   │   ├── Inventory.ts
│   │   │   └── InventoryItem.ts
│   │   ├── routes/          # API endpoints
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── customerRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   ├── inventoryRoutes.ts
│   │   │   └── reportRoutes.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── passport.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/           # React pages
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductAdd.tsx
│   │   │   ├── ProductEdit.tsx
│   │   │   ├── CustomerList.tsx
│   │   │   ├── CustomerAdd.tsx
│   │   │   ├── CustomerEdit.tsx
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderCreate.tsx
│   │   │   ├── InventoryList.tsx
│   │   │   ├── InventoryAdd.tsx
│   │   │   ├── StockReport.tsx
│   │   │   └── CustomerPurchaseReport.tsx
│   │   ├── redux/
│   │   │   ├── store.ts
│   │   │   ├── authSlice.ts
│   │   │   ├── productSlice.ts
│   │   │   ├── customerSlice.ts
│   │   │   ├── orderSlice.ts
│   │   │   └── hooks.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- SQLite3

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with configuration:

   ```env
   PORT=5000
   SESSION_SECRET=your_session_secret
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   ```

4. Build TypeScript:

   ```bash
   npm run build
   ```

5. Start the server (development):
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   App will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with username/password
- `GET /auth/google` - Google OAuth login
- `GET /auth/facebook` - Facebook OAuth login
- `GET /auth/logout` - Logout

### Products

- `GET /api/products` - Get all visible products
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `PATCH /api/products/:id/hide` - Hide product
- `PATCH /api/products/:id/show` - Show product
- `DELETE /api/products/:id` - Delete product

### Customers

- `GET /api/customers` - Get all customers
- `GET /api/customers/search` - Search customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/search` - Search orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order (with stock verification)

### Inventories

- `GET /api/inventories` - Get all inventories
- `GET /api/inventories/:id` - Get inventory by ID
- `POST /api/inventories` - Create inventory import

### Reports

- `GET /api/reports/stock` - Current stock status
- `GET /api/reports/stock-by-date` - Historical stock by date
- `GET /api/reports/customer-purchases/:customerId` - Customer purchase history

## Database Models

### User

- `id`: INTEGER PRIMARY KEY
- `username`: STRING UNIQUE
- `password`: STRING (nullable for OAuth users)
- `googleId`: STRING (nullable)
- `facebookId`: STRING (nullable)
- `role`: STRING (default: 'staff')

### Product

- `id`: INTEGER PRIMARY KEY
- `code`: STRING UNIQUE
- `name`: STRING
- `price`: FLOAT
- `stock`: INTEGER
- `category`: STRING
- `hidden`: BOOLEAN (default: false)
- `createdAt`: TIMESTAMP
- `updatedAt`: TIMESTAMP

### Customer

- `id`: INTEGER PRIMARY KEY
- `code`: STRING UNIQUE
- `name`: STRING
- `birthYear`: INTEGER
- `address`: STRING
- `createdAt`: TIMESTAMP
- `updatedAt`: TIMESTAMP

### Order

- `id`: INTEGER PRIMARY KEY
- `customerId`: INTEGER FOREIGN KEY
- `totalAmount`: FLOAT
- `status`: STRING (pending/completed/cancelled)
- `purchaseTime`: TIMESTAMP
- `createdAt`: TIMESTAMP
- `updatedAt`: TIMESTAMP

### OrderItem

- `id`: INTEGER PRIMARY KEY
- `orderId`: INTEGER FOREIGN KEY
- `productId`: INTEGER FOREIGN KEY
- `quantity`: INTEGER
- `price`: FLOAT

### Inventory

- `id`: INTEGER PRIMARY KEY
- `code`: STRING UNIQUE
- `supplier`: STRING
- `importTime`: TIMESTAMP
- `createdAt`: TIMESTAMP
- `updatedAt`: TIMESTAMP

### InventoryItem

- `id`: INTEGER PRIMARY KEY
- `inventoryId`: INTEGER FOREIGN KEY
- `productId`: INTEGER FOREIGN KEY
- `quantity`: INTEGER

## Key Features Implementation

### Stock Management

- Stock automatically decreases when orders are created
- Stock automatically increases when inventories are imported
- Stock availability verification before order creation

### Search & Filtering

- Search products by code, name, or category
- Search customers by code or name
- Search orders by customer, status, or date range

### Reporting

- Generate real-time stock reports
- Calculate historical stock levels based on order history
- Track customer purchase patterns and history

### Authentication & Security

- Secure password hashing with bcryptjs
- JWT token-based authentication
- Passport.js for OAuth strategies
- Session-based authentication

## Running the Application

### Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend (in another terminal)
cd frontend
npm run build
npm start
```

### Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 5000)
- `SESSION_SECRET` - Session encryption secret
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `FACEBOOK_APP_ID` - Facebook app ID
- `FACEBOOK_APP_SECRET` - Facebook app secret

## Future Enhancements

- User role-based access control (admin/staff)
- Advanced inventory forecasting
- Multi-warehouse support
- Product variants and bundles
- Automated reports via email
- Real-time notifications
- Mobile app
- Payment gateway integration

## Support

For issues or questions, please create an issue in the project repository.
# Quan-LyCuaHang
