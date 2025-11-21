# Store Management System - Architecture & Deployment Guide

## System Architecture

### Backend Architecture

```
Express.js Server (TypeScript)
    ├── Authentication Layer (Passport.js)
    │   ├── Local Strategy (Username/Password)
    │   ├── Google OAuth 2.0
    │   └── Facebook OAuth
    ├── API Routes
    │   ├── /auth - Authentication endpoints
    │   ├── /api/products - Product management
    │   ├── /api/customers - Customer management
    │   ├── /api/orders - Order processing
    │   ├── /api/inventories - Inventory management
    │   └── /api/reports - Analytics & reporting
    └── Database Layer (Sequelize ORM + SQLite)
        ├── Users
        ├── Products
        ├── Customers
        ├── Orders
        ├── OrderItems
        ├── Inventories
        └── InventoryItems
```

### Frontend Architecture

```
React Application (TypeScript)
    ├── Authentication Pages
    │   ├── Login.tsx
    │   └── Register.tsx
    ├── Management Pages
    │   ├── Products (List, Add, Edit)
    │   ├── Customers (List, Add, Edit)
    │   ├── Orders (List, Create)
    │   └── Inventory
    ├── Reports Pages
    │   ├── StockReport.tsx
    │   └── CustomerPurchaseReport.tsx
    ├── Redux Store
    │   ├── authSlice
    │   ├── productSlice
    │   ├── customerSlice
    │   └── orderSlice
    └── Navigation (React Router)
```

## Data Flow

### Order Creation Flow

```
1. User selects customer and products
2. Frontend validates selection
3. POST /api/orders sent to backend
4. Backend verifies stock availability
5. If stock available:
   - Create Order record
   - Create OrderItem records
   - Deduct stock from products
   - Calculate total amount
   - Return completed order
6. If stock insufficient:
   - Return error message
7. Frontend updates Redux store
8. UI displays success/error
```

### Inventory Import Flow

```
1. User provides supplier and products
2. POST /api/inventories sent to backend
3. Backend creates Inventory record
4. For each item:
   - Create InventoryItem record
   - Add quantity to product stock
5. Return updated inventory
6. Frontend refreshes product list
```

## Deployment

### Production Environment Setup

#### Prerequisites

- Node.js 14+
- PostgreSQL or MySQL (for production)
- PM2 or similar process manager
- Nginx reverse proxy (optional)

#### Backend Deployment

1. **Install dependencies:**

   ```bash
   cd backend
   npm install --production
   npm run build
   ```

2. **Configure environment:**

   ```env
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://user:pass@host:5432/store_db
   SESSION_SECRET=<strong-random-secret>
   JWT_SECRET=<strong-random-secret>
   ```

3. **Start with PM2:**
   ```bash
   pm2 start dist/server.js --name "store-api"
   pm2 save
   pm2 startup
   ```

#### Frontend Deployment

1. **Build for production:**

   ```bash
   cd frontend
   npm install --production
   npm run build
   ```

2. **Serve with Nginx:**

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /path/to/frontend/build;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       location /api/ {
           proxy_pass http://backend-server:5000;
       }
   }
   ```

3. **Enable HTTPS:**
   ```bash
   certbot --nginx -d your-domain.com
   ```

### Docker Deployment

#### Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/src ./src
COPY backend/tsconfig.json ./
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci

COPY frontend .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

#### Docker Compose

```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: postgres:13-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=store_db
      - POSTGRES_USER=store_user
      - POSTGRES_PASSWORD=store_pass

volumes:
  postgres_data:
```

## Performance Optimization

### Backend

- Add caching layer (Redis)
- Implement pagination for list endpoints
- Use database indexing on frequently queried columns
- Enable gzip compression

### Frontend

- Code splitting with lazy loading
- Image optimization
- Service Worker for offline support
- CSS-in-JS optimization

## Security Considerations

1. **Authentication**

   - Use HTTPS only
   - Implement CORS properly
   - Secure session cookies (HttpOnly, Secure flags)
   - JWT expiration handling

2. **Data Protection**

   - Input validation on all endpoints
   - SQL injection prevention (Sequelize parameterization)
   - Rate limiting
   - CSRF protection

3. **API Security**
   - API versioning
   - Request size limits
   - Helmet.js for HTTP headers
   - Sanitize outputs

## Monitoring & Maintenance

### Logging

```bash
npm install winston
# Configure centralized logging
```

### Health Checks

```bash
GET /health - Server status
GET /api/db-health - Database connectivity
```

### Backup Strategy

- Daily database backups
- Version control for code
- Environment variable backup (encrypted)

## Troubleshooting

### High Memory Usage

```bash
# Check current memory
npm ls
# Upgrade Node version
node -v
```

### Database Connection Issues

- Verify connection string
- Check database credentials
- Monitor connection pool
- Clear old connections

### API Performance

- Use monitoring tools (New Relic, DataDog)
- Profile slow endpoints
- Optimize database queries
- Implement caching

## Future Enhancements

1. **Scalability**

   - Microservices architecture
   - Load balancing
   - Database replication
   - CDN integration

2. **Features**

   - Advanced analytics
   - Real-time notifications
   - Mobile app
   - API documentation (Swagger)
   - Automated testing

3. **DevOps**
   - CI/CD pipeline
   - Automated deployments
   - Container orchestration (Kubernetes)
   - Infrastructure as Code (Terraform)

## Support & Documentation

- API Documentation: See README.md
- Setup Instructions: See QUICKSTART.md
- Troubleshooting: See QUICKSTART.md Troubleshooting section
- Contributing: Create issues/PRs on repository

## License

This project is provided as-is for educational and commercial use.
