#!/bin/bash

# Complete setup and start script for Store Management System

echo "================================================"
echo "Store Management System - Complete Setup"
echo "================================================"

# Backend Setup
echo ""
echo "Setting up Backend..."
cd backend || exit
npm install
npm run build

# Frontend Setup  
echo ""
echo "Setting up Frontend..."
cd ../frontend || exit
npm install

echo ""
echo "================================================"
echo "Setup Complete!"
echo "================================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend - http://localhost:5000):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend - http://localhost:3000):"
echo "  cd frontend && npm start"
echo ""
echo "Default credentials for testing:"
echo "  Username: test"
echo "  Password: test123"
echo ""
echo "================================================"
