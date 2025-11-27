# Expense Tracker 💰

A full-stack web application for tracking personal expenses built with modern web technologies.

## 🚀 Features

- **User Authentication** - Secure signup and login system
- **Expense Management** - Add, view, edit, and delete expenses
- **Category Organization** - Categorize expenses for better tracking
- **Visual Analytics** - Charts and graphs for spending insights
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Instant expense tracking and updates

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Namithlj/expensetracker.git
   cd expensetracker
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expensetracker
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev

   # Or run separately:
   # Start backend server
   npm start

   # Start frontend development server (in another terminal)
   cd client
   npm run dev
   ```

## 🏗️ Project Structure

```
expensetracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS files
│   ├── public/            # Static assets
│   └── package.json
├── models/                # MongoDB models
│   ├── User.js
│   └── Expense.js
├── routes/               # Express routes
├── middleware/           # Custom middleware
├── server.js            # Express server entry point
└── package.json
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Expenses
- `GET /api/expenses` - Get all expenses for user
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Categories
- `GET /api/categories` - Get expense categories
- `POST /api/categories` - Create new category

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Heroku/Railway)
- Set environment variables
- Ensure MongoDB connection string is configured

## 📱 Usage

1. **Register/Login** - Create an account or login
2. **Add Expenses** - Click "Add Expense" to record new spending
3. **Categorize** - Assign categories to expenses
4. **View Analytics** - Check the dashboard for spending insights
5. **Manage Expenses** - Edit or delete existing expenses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Namith L J**
- GitHub: [@Namithlj](https://github.com/Namithlj)

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for amazing utility classes
- MongoDB for robust database solutions

---

**Note**: This is a development project. For production use, ensure proper security measures, input validation, and error handling are implemented.
