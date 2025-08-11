@echo off
echo 🚀 Starting Task Manager Backend...
echo.

echo 📦 Installing dependencies...
npm install

echo.
echo 🔧 Creating .env file...
if not exist .env (
    echo NODE_ENV=development > .env
    echo PORT=5000 >> .env
    echo JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production >> .env
    echo MONGODB_URI=mongodb+srv://admin:Ghaffar786@mycluster.b9fjfhn.mongodb.net/myVirtualDatabase?retryWrites=true&w=majority&appName=MyCluster >> .env
    echo CORS_ORIGIN=http://localhost:3000 >> .env
    echo ✅ .env file created with default values
) else (
    echo ✅ .env file already exists
)

echo.
echo 🗄️ Starting MongoDB connection...
echo ⚠️  Make sure MongoDB is running or accessible

echo.
echo 🌐 Starting server...
npm start

pause
