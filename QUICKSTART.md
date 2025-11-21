# Quick Start Guide

## Installation

### One-time Setup

```bash
cd /home/chien/QuanLyCuaHang
./SETUP.sh
```

Or manually:

```bash
# Backend
cd backend
npm install
npm run build

# Frontend
cd ../frontend
npm install
```

## Running the Application

### Option 1: Two Terminal Windows (Recommended for Development)

**Terminal 1 - Backend Server:**

```bash
cd /home/chien/QuanLyCuaHang/backend
npm run dev
```

Server runs on: http://localhost:5000

**Terminal 2 - Frontend Application:**

```bash
cd /home/chien/QuanLyCuaHang/frontend
npm start
```

App runs on: http://localhost:3000

### Option 2: Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend (separate terminal)
cd frontend
npm run build
npm start
```

## Testing the Application

1. **Open** http://localhost:3000 in your browser
2. **Register** a new account or use existing credentials
3. **Login** with your credentials
4. **Navigate** through the dashboard

## Project Features

### 1. Dashboard

- Quick overview after login
- Display key statistics
- Navigation to all sections

### 2. Product Management (`/products`)

- List all visible products
- Search by code, name, or category
- Add new products
- Edit product details
- Hide/Show products
- Automatic stock tracking

### 3. Customer Management (`/customers`)

- List all customers
- Search by code or name
- Add new customers
- Edit customer information
- Track customer information (code, name, birth year, address)

### 4. Order Management (`/orders`)

- View all orders
- Create new orders
- Automatic stock availability verification
- Real-time stock updates after order completion
- Track order status and purchase time

### 5. Reports (`/reports/*`)

- **Stock Report** - Current inventory levels
- **Customer Purchase Report** - Individual customer purchase history

## API Endpoints Reference

### Authentication

```
POST   /auth/register              - Register new user
POST   /auth/login                 - Login with credentials
GET    /auth/google                - Google OAuth
GET    /auth/facebook              - Facebook OAuth
GET    /auth/logout                - Logout
```

### Products

```
GET    /api/products               - List visible products
GET    /api/products/search        - Search products
GET    /api/products/:id           - Get product details
POST   /api/products               - Create product
PUT    /api/products/:id           - Update product
PATCH  /api/products/:id/hide      - Hide product
PATCH  /api/products/:id/show      - Show product
DELETE /api/products/:id           - Delete product
```

### Customers

```
GET    /api/customers              - List customers
GET    /api/customers/search       - Search customers
GET    /api/customers/:id          - Get customer details
POST   /api/customers              - Create customer
PUT    /api/customers/:id          - Update customer
DELETE /api/customers/:id          - Delete customer
```

### Orders

```
GET    /api/orders                 - List orders
GET    /api/orders/search          - Search orders
GET    /api/orders/:id             - Get order details
POST   /api/orders                 - Create order (with stock check)
```

### Inventories

```
GET    /api/inventories            - List inventories
GET    /api/inventories/:id        - Get inventory details
POST   /api/inventories            - Create inventory import
```

### Reports

```
GET    /api/reports/stock          - Current stock status
GET    /api/reports/stock-by-date  - Historical stock
GET    /api/reports/customer-purchases/:customerId - Customer history
```

## Database

The application uses **SQLite** with the following tables:

- `users` - User accounts
- `products` - Product information
- `customers` - Customer data
- `orders` - Order records
- `order_items` - Items in orders
- `inventories` - Inventory imports
- `inventory_items` - Items in inventory imports

Database file: `/home/chien/QuanLyCuaHang/backend/database.sqlite` (auto-created)

## Configuration

### Backend (.env)

```env
PORT=5000
SESSION_SECRET=your_secret
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

All backend environment variables are optional except PORT.

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database Reset

```bash
# Backend
rm backend/database.sqlite
npm run dev  # It will recreate the database
```

### Frontend Not Loading

- Clear browser cache: Ctrl+Shift+Delete
- Restart npm: Stop server and run `npm start` again

## Support

For more detailed information, see:

- README.md - Full project documentation
- Backend: `/backend/` folder
- Frontend: `/frontend/` folder

## Next Steps

1. Create test data
2. Test all CRUD operations
3. Verify search functionality
4. Generate reports
5. Test authentication methods
