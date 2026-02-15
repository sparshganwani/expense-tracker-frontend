import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import CategoryBudget from './CategoryBudget';

function Dashboard({ user, onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch expenses and categories when component loads
  useEffect(() => {
  fetchExpenses();
  fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`https://expense-tracker-backend-a1a8.onrender.com/api/expenses/${user.id}`);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://expense-tracker-backend-a1a8.onrender.com/api/categories/${user.id}`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await axios.post('https://expense-tracker-backend-a1a8.onrender.com/api/expenses', {
        ...expenseData,
        user_id: user.id
      });
      // Refresh expenses after adding
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`https://expense-tracker-backend-a1a8.onrender.com/api/expenses/${expenseId}`);
      // Refresh expenses after deleting
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense');
    }
  };

  const handleSetBudget = async (categoryId, budget) => {
    try {
      await axios.put(`https://expense-tracker-backend-a1a8.onrender.com/api/categories/${categoryId}`, {
        monthly_budget: budget
      });
      // Refresh categories after updating
      fetchCategories();
    } catch (error) {
      console.error('Error setting budget:', error);
      alert('Failed to set budget');
    }
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>💰 Expense Tracker</h1>
          <p style={styles.userName}>Welcome, {user.name}!</p>
        </div>
        <button onClick={onLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryContainer}>
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryTitle}>Total Expenses</h3>
          <p style={styles.summaryAmount}>${totalExpenses.toFixed(2)}</p>
        </div>
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryTitle}>This Month</h3>
          <p style={styles.summaryAmount}>${monthlyTotal.toFixed(2)}</p>
        </div>
        <div style={styles.summaryCard}>
          <h3 style={styles.summaryTitle}>Categories</h3>
          <p style={styles.summaryAmount}>{categories.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column - Add Expense & Expenses List */}
        <div style={styles.leftColumn}>
          <AddExpense 
            categories={categories} 
            onAddExpense={handleAddExpense}
          />
          
          <ExpenseList 
            expenses={expenses}
            categories={categories}
            onDeleteExpense={handleDeleteExpense}
            loading={loading}
          />
        </div>

        {/* Right Column - Budget Tracker */}
        <div style={styles.rightColumn}>
          <CategoryBudget 
            categories={categories}
            expenses={monthlyExpenses}
            onSetBudget={handleSetBudget}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '28px',
    margin: '0 0 5px 0',
    color: '#333'
  },
  userName: {
    fontSize: '14px',
    color: '#666',
    margin: 0
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  summaryContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  summaryTitle: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 10px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  summaryAmount: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  }
};

export default Dashboard;