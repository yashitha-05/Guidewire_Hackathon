#!/bin/bash

# GigShield Parametric Insurance - Development Setup Script

echo "🚀 Setting up GigShield Parametric Insurance development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Setup frontend
echo "📦 Setting up frontend..."
cd frontend
if [ ! -f "package.json" ]; then
    echo "Creating basic package.json for frontend..."
    cat > package.json << EOF
{
  "name": "gigshield-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
EOF
fi
npm install
cd ..

# Setup backend
echo "🔧 Setting up backend..."
cd backend
if [ ! -f "package.json" ]; then
    echo "Creating basic package.json for backend..."
    cat > package.json << EOF
{
  "name": "gigshield-backend",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "pg": "^8.11.0",
    "joi": "^17.9.0"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
EOF
fi
npm install
cd ..

# Setup AI service
echo "🤖 Setting up AI service..."
cd ai-service
if [ ! -f "requirements.txt" ]; then
    echo "Creating requirements.txt for AI service..."
    cat > requirements.txt << EOF
fastapi==0.104.0
uvicorn==0.24.0
scikit-learn==1.3.0
pandas==2.1.0
numpy==1.24.0
tensorflow==2.15.0
python-dotenv==1.0.0
requests==2.31.0
pytest==7.4.0
EOF
fi
pip install -r requirements.txt
cd ..

# Create environment files
echo "📝 Creating environment template files..."
if [ ! -f ".env.example" ]; then
    cat > .env.example << EOF
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/gigshield_dev

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# External APIs
OPENWEATHER_API_KEY=your-openweather-api-key
WAQI_API_KEY=your-waqi-api-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Payments (Test Mode)
RAZORPAY_KEY_ID=your-razorpay-test-key-id
RAZORPAY_KEY_SECRET=your-razorpay-test-key-secret

# AI Service
AI_SERVICE_URL=http://localhost:8000
EOF
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and fill in your API keys"
echo "2. Set up PostgreSQL database"
echo "3. Run 'npm run dev' to start development servers"
echo "4. Visit http://localhost:3000 for the frontend"
echo ""
echo "Happy hacking! 🎉"