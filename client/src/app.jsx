import React, { useState, useEffect } from 'react';

// Simple icons using emojis
const Icons = {
  Plus: () => <span>➕</span>,
  Trash: () => <span>🗑️</span>,
  Edit: () => <span>✏️</span>,
  Chart: () => <span>📊</span>,
  Settings: () => <span>⚙️</span>,
  Logout: () => <span>🚪</span>,
  Dollar: () => <span>💰</span>,
  Calendar: () => <span>📅</span>,
  User: () => <span>👤</span>,
  TrendingUp: () => <span>📈</span>,
  TrendingDown: () => <span>📉</span>,
  Money: () => <span>💵</span>,
  Card: () => <span>💳</span>,
  PieChart: () => <span>🥧</span>,
  BarChart: () => <span>📊</span>,
  LineChart: () => <span>📈</span>
};

const CATEGORIES = [
  'Food & Dining', 'Transportation', 'Entertainment', 'Shopping',
  'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Other'
];

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

// Custom Pie Chart Component
const PieChart = ({ data, width = 200, height = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {data.map((item, index) => {
          const angle = (item.value / total) * 360;
          const largeArcFlag = angle > 180 ? 1 : 0;
          const x1 = Math.cos(currentAngle * Math.PI / 180) * 80;
          const y1 = Math.sin(currentAngle * Math.PI / 180) * 80;
          const x2 = Math.cos((currentAngle + angle) * Math.PI / 180) * 80;
          const y2 = Math.sin((currentAngle + angle) * Math.PI / 180) * 80;

          const pathData = [
            `M 0 0`,
            `L ${x1} ${y1}`,
            `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');

          currentAngle += angle;

          return (
            <path
              key={item.name}
              d={pathData}
              fill={COLORS[index % COLORS.length]}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="0" cy="0" r="50" fill="white" />
        <text textAnchor="middle" dy="5" fontSize="14" fontWeight="bold">
          ${total.toFixed(0)}
        </text>
        <text textAnchor="middle" dy="25" fontSize="10" fill="#666">
          Total
        </text>
      </g>
    </svg>
  );
};

// Bar Chart Component
const BarChart = ({ data, width = 400, height = 200 }) => {
  const maxValue = Math.max(...data.map(item => item.value), 1);
  const barWidth = (width - 100) / data.length;

  return (
    <svg width={width} height={height} className="bg-white rounded-lg p-4">
      {data.map((item, index) => {
        const barHeight = (item.value / maxValue) * (height - 60);
        return (
          <g key={item.name} transform={`translate(${index * barWidth + 50}, ${height - barHeight - 30})`}>
            <rect
              width={barWidth - 10}
              height={barHeight}
              fill={COLORS[index % COLORS.length]}
              rx="4"
            />
            <text
              x={barWidth / 2 - 5}
              y={barHeight + 20}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
            >
              {item.name}
            </text>
            <text
              x={barWidth / 2 - 5}
              y={-5}
              textAnchor="middle"
              fontSize="10"
              fill="#333"
              fontWeight="bold"
            >
              ${item.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// Line Chart Component
// Line Chart Component - Fixed with visible x-axis and y-axis
const LineChart = ({ data, width = 600, height = 400 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center" style={{ width, height }}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value), 1);
  const margin = { top: 70, right: 70, bottom: 70, left: 70 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const pointWidth = chartWidth / (data.length - 1);

  const points = data.map((item, index) => {
    const x = index * pointWidth + margin.left;
    const y = margin.top + chartHeight - (item.value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="bg-white rounded-lg p-4">
      {/* Y-axis grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
        const y = margin.top + chartHeight - (ratio * chartHeight);
        return (
          <g key={index}>
            <line
              x1={margin.left}
              y1={y}
              x2={width - margin.right}
              y2={y}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* X-axis line */}
      <line
        x1={margin.left}
        y1={margin.top + chartHeight}
        x2={width - margin.right}
        y2={margin.top + chartHeight}
        stroke="#d1d5db"
        strokeWidth="2"
      />

      {/* Y-axis line */}
      <line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={margin.top + chartHeight}
        stroke="#d1d5db"
        strokeWidth="2"
      />

      {/* Trend line */}
      <polyline
        fill="none"
        stroke="#4ECDC4"
        strokeWidth="3"
        points={points}
      />
      
      {/* Data points and labels */}
      {data.map((item, index) => {
        const x = index * pointWidth + margin.left;
        const y = margin.top + chartHeight - (item.value / maxValue) * chartHeight;
        return (
          <g key={item.name}>
            <circle cx={x} cy={y} r="6" fill="#4ECDC4" stroke="#fff" strokeWidth="2" />
            <text
              x={x}
              y={y - 15}
              textAnchor="middle"
              fontSize="12"
              fill="#374151"
              fontWeight="bold"
              className="bg-white/80 backdrop-blur-sm px-1 rounded"
            >
              ${item.value}
            </text>
            <text
              x={x}
              y={margin.top + chartHeight + 20}
              textAnchor="middle"
              fontSize="11"
              fill="#6b7280"
              fontWeight="500"
            >
              {item.name}
            </text>
          </g>
        );
      })}

      {/* Y-axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
        const y = margin.top + chartHeight - (ratio * chartHeight);
        const value = Math.round(maxValue * ratio);
        return (
          <text
            key={index}
            x={margin.left - 10}
            y={y}
            textAnchor="end"
            fontSize="10"
            fill="#9ca3af"
            dy="4"
          >
            ${value}
          </text>
        );
      })}

      {/* Chart title */}
      <text
        x={width / 2}
        y={15}
        textAnchor="middle"
        fontSize="12"
        fill="#374151"
        fontWeight="bold"
      >
        Monthly Spending Trend
      </text>
    </svg>
  );
};

// Auth Section Component
function AuthSection({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter your username"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ expenses, analyticsData, comparisonData, onShowForm, onRefresh }) {
  const totalThisMonth = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={onRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Icons.Dollar />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent This Month</p>
              <p className="text-2xl font-bold">${totalThisMonth.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Icons.Chart />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold">{expenses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <button
            onClick={onShowForm}
            className="w-full h-full flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors p-4"
          >
            <Icons.Plus />
            <span className="ml-2 font-medium">Add Expense</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {recentExpenses.length > 0 ? (
              recentExpenses.map(expense => (
                <div key={expense._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No expenses yet</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map(category => {
              const categoryTotal = expenses
                .filter(e => e.category === category)
                .reduce((sum, e) => sum + e.amount, 0);
              
              if (categoryTotal === 0) return null;
              
              return (
                <div key={category} className="flex justify-between items-center py-2">
                  <span className="text-sm">{category}</span>
                  <span className="font-semibold">${categoryTotal.toFixed(2)}</span>
                </div>
              );
            })}
            {expenses.length === 0 && (
              <p className="text-gray-500 text-center py-4">No category data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Expense Form Component
function ExpenseForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save expense');
      }

      await response.json();
      onSave();
    } catch (error) {
      alert('Error saving expense: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="What was this expense for?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Expenses Page Component
function ExpensesPage({ expenses, onExpensesChange }) {
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      onExpensesChange();
    } catch (error) {
      alert('Error deleting expense: ' + error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">All Expenses</h2>
        <p className="text-gray-600 mt-1">Total: {expenses.length} expenses</p>
      </div>
      
      <div className="overflow-x-auto">
        {expenses.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map(expense => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{expense.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-red-600">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Delete expense"
                    >
                      <Icons.Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <Icons.Dollar className="text-4xl mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No expenses yet</p>
            <p className="text-gray-400">Add your first expense to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Advanced Analytics Component
function AdvancedAnalytics({ analyticsData, categoryStats, expenses }) {
  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading advanced analytics...</p>
      </div>
    );
  }

  const pieChartData = analyticsData.categoryBreakdown?.map(cat => ({
    name: cat._id,
    value: cat.total
  })) || [];

  const barChartData = analyticsData.categoryBreakdown?.slice(0, 6).map(cat => ({
    name: cat._id,
    value: Math.round(cat.total)
  })) || [];

  const lineChartData = analyticsData.monthlyTrend?.slice(-6).map(month => ({
    name: month.month,
    value: Math.round(month.total)
  })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icons.PieChart />
            <span className="ml-2">Spending Distribution</span>
          </h3>
          {pieChartData.length > 0 ? (
            <>
              <div className="flex justify-center">
                <PieChart data={pieChartData} />
              </div>
              <div className="mt-4 space-y-2">
                {pieChartData.map((item, index) => (
                  <div key={item.name} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-semibold">${item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icons.BarChart />
            <span className="ml-2">Top Categories</span>
          </h3>
          {barChartData.length > 0 ? (
            <BarChart data={barChartData} />
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icons.LineChart />
            <span className="ml-2">Monthly Trend</span>
          </h3>
          {lineChartData.length > 0 ? (
            <LineChart data={lineChartData} />
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </div>

        {/* Category Statistics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Category Insights</h3>
          <div className="space-y-4">
            {categoryStats && categoryStats.slice(0, 5).map((cat, index) => (
              <div key={cat._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold">{cat._id}</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${cat.totalSpent?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Transactions: {cat.transactionCount || 0}</div>
                  <div>Average: ${cat.averageAmount?.toFixed(2) || '0.00'}</div>
                  <div>Max: ${cat.maxAmount?.toFixed(2) || '0.00'}</div>
                  <div>Min: ${cat.minAmount?.toFixed(2) || '0.00'}</div>
                </div>
              </div>
            ))}
            {(!categoryStats || categoryStats.length === 0) && (
              <p className="text-gray-500 text-center py-4">No category data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reports Page Component
function ReportsPage({ analyticsData, categoryStats, comparisonData }) {
  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Financial Reports</h2>
        
        {/* Monthly Comparison */}
        {comparisonData && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Monthly Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Current Month</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${comparisonData.currentMonth?.total?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-gray-500">{comparisonData.currentMonth?.count || 0} transactions</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Last Month</p>
                <p className="text-2xl font-bold text-green-600">
                  ${comparisonData.lastMonth?.total?.toFixed(2) || '0.00'}
                </p>
                <p className="text-sm text-gray-500">{comparisonData.lastMonth?.count || 0} transactions</p>
              </div>
              <div className={`text-center p-4 rounded-lg ${
                comparisonData.change?.percentage >= 0 ? 'bg-red-50' : 'bg-green-50'
              }`}>
                <p className="text-sm text-gray-600">Change</p>
                <p className={`text-2xl font-bold ${
                  comparisonData.change?.percentage >= 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {comparisonData.change?.percentage >= 0 ? '+' : ''}{comparisonData.change?.percentage?.toFixed(1) || 0}%
                </p>
                <p className="text-sm text-gray-500">
                  ${Math.abs(comparisonData.change?.amount || 0).toFixed(2)} {comparisonData.change?.amount >= 0 ? 'more' : 'less'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Spending Summary */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Spending Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Icons.Money />
              <p className="text-sm text-gray-600 mt-2">Total Spent</p>
              <p className="text-xl font-bold text-purple-600">
                ${analyticsData.totalSpent?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Icons.Chart />
              <p className="text-sm text-gray-600 mt-2">Daily Average</p>
              <p className="text-xl font-bold text-yellow-600">
                ${analyticsData.dailyAverage?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Icons.Card />
              <p className="text-sm text-gray-600 mt-2">Categories Used</p>
              <p className="text-xl font-bold text-green-600">
                {analyticsData.categoryBreakdown?.length || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Icons.TrendingUp />
              <p className="text-sm text-gray-600 mt-2">Top Category</p>
              <p className="text-xl font-bold text-red-600">
                {analyticsData.categoryBreakdown?.[0]?._id || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Top Expenses */}
        {analyticsData.topExpenses && analyticsData.topExpenses.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Top 5 Expenses</h3>
            <div className="space-y-3">
              {analyticsData.topExpenses.map((expense, index) => (
                <div key={expense._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchExpenses(),
        fetchAnalytics(),
        fetchCategoryStats(),
        fetchComparisonData()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/expenses', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch expenses: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Your backend returns { expenses: [], totalPages, currentPage, total }
      if (data.expenses && Array.isArray(data.expenses)) {
        setExpenses(data.expenses);
      } else {
        console.warn('Unexpected response structure:', data);
        setExpenses([]);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Failed to load expenses. Please check if the server is running.');
      setExpenses([]);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analytics/summary', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        console.warn('Analytics endpoint not available');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analytics/categories', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCategoryStats(data);
      } else {
        console.warn('Category stats endpoint not available');
      }
    } catch (error) {
      console.error('Error fetching category stats:', error);
    }
  };

  const fetchComparisonData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/analytics/compare', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setComparisonData(data);
      } else {
        console.warn('Comparison data endpoint not available');
      }
    } catch (error) {
      console.error('Error fetching comparison data:', error);
    }
  };

  const refreshData = () => {
    fetchAllData();
  };

  if (!user) {
    return <AuthSection onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Icons.Dollar />
              <span className="ml-2 text-xl font-bold">Advanced ExpenseTracker</span>
            </div>
            <div className="flex space-x-4">
              {['dashboard', 'expenses', 'analytics', 'reports'].map(view => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentView === view
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  setUser(null);
                }}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Icons.Logout />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50">
          <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 px-4">
        {currentView === 'dashboard' && (
          <Dashboard 
            expenses={expenses}
            analyticsData={analyticsData}
            comparisonData={comparisonData}
            onShowForm={() => setShowExpenseForm(true)}
            onRefresh={refreshData}
          />
        )}
        {currentView === 'expenses' && (
          <ExpensesPage 
            expenses={expenses}
            onExpensesChange={refreshData}
          />
        )}
        {currentView === 'analytics' && (
          <AdvancedAnalytics 
            analyticsData={analyticsData}
            categoryStats={categoryStats}
            expenses={expenses}
          />
        )}
        {currentView === 'reports' && (
          <ReportsPage 
            analyticsData={analyticsData}
            categoryStats={categoryStats}
            comparisonData={comparisonData}
          />
        )}
      </main>

      {showExpenseForm && (
        <ExpenseForm
          onClose={() => setShowExpenseForm(false)}
          onSave={() => {
            setShowExpenseForm(false);
            refreshData();
          }}
        />
      )}
    </div>
  );
}
export default App;