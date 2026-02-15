import React from 'react';

function ExpenseList({ expenses, categories, onDeleteExpense, loading }) {
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Recent Expenses</h2>
        <p style={styles.loading}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Recent Expenses</h2>
      
      {expenses.length === 0 ? (
        <p style={styles.empty}>No expenses yet. Add your first expense above!</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id} style={styles.tr}>
                  <td style={styles.td}>{new Date(expense.date).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <span style={styles.categoryBadge}>
                      {getCategoryName(expense.category_id)}
                    </span>
                  </td>
                  <td style={styles.td}>{expense.description || '-'}</td>
                  <td style={styles.td}>
                    <strong>${expense.amount.toFixed(2)}</strong>
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '20px',
    margin: '0 0 20px 0',
    color: '#333'
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    padding: '40px'
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    padding: '40px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #e0e0e0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#555'
  },
  tr: {
    borderBottom: '1px solid #f0f0f0'
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    color: '#333'
  },
  categoryBadge: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  deleteButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ExpenseList;