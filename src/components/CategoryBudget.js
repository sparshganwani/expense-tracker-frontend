import React, { useState } from 'react';

function CategoryBudget({ categories, expenses, onSetBudget }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [budgetInput, setBudgetInput] = useState('');

  const getCategoryTotal = (categoryId) => {
    return expenses
      .filter(expense => expense.category_id === categoryId)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const handleSetBudget = (categoryId) => {
    if (budgetInput && parseFloat(budgetInput) > 0) {
      onSetBudget(categoryId, parseFloat(budgetInput));
      setEditingCategory(null);
      setBudgetInput('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Monthly Budget</h2>
      
      <div style={styles.categoryList}>
        {categories.map(category => {
          const spent = getCategoryTotal(category.id);
          const budget = category.monthly_budget || 0;
          const percentage = budget > 0 ? (spent / budget) * 100 : 0;
          const isOverBudget = percentage > 100;

          return (
            <div key={category.id} style={styles.categoryCard}>
              <div style={styles.categoryHeader}>
                <h3 style={styles.categoryName}>{category.name}</h3>
                {budget > 0 && (
                  <span style={{...styles.percentage, color: isOverBudget ? '#f44336' : '#4CAF50'}}>
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </div>

              <div style={styles.amounts}>
                <span style={styles.spent}>${spent.toFixed(2)}</span>
                {budget > 0 && (
                  <span style={styles.budget}>/ ${budget.toFixed(2)}</span>
                )}
              </div>

              {budget > 0 && (
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: isOverBudget ? '#f44336' : '#4CAF50'
                    }}
                  />
                </div>
              )}

              {editingCategory === category.id ? (
                <div style={styles.budgetInput}>
                  <input
                    type="number"
                    step="0.01"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    placeholder="Budget amount"
                    style={styles.input}
                  />
                  <button
                    onClick={() => handleSetBudget(category.id)}
                    style={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setBudgetInput('');
                    }}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingCategory(category.id);
                    setBudgetInput(budget > 0 ? budget.toString() : '');
                  }}
                  style={styles.setBudgetButton}
                >
                  {budget > 0 ? 'Edit Budget' : 'Set Budget'}
                </button>
              )}
            </div>
          );
        })}
      </div>
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
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  categoryCard: {
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px'
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  categoryName: {
    fontSize: '16px',
    margin: 0,
    color: '#333'
  },
  percentage: {
    fontSize: '14px',
    fontWeight: '600'
  },
  amounts: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px'
  },
  spent: {
    fontWeight: '600',
    color: '#333'
  },
  budget: {
    color: '#999'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  budgetInput: {
    display: 'flex',
    gap: '5px',
    marginTop: '10px'
  },
  input: {
    flex: 1,
    padding: '6px 10px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  saveButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  setBudgetButton: {
    width: '100%',
    padding: '8px',
    fontSize: '12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default CategoryBudget;