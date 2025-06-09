const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get financial overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const financialData = {
      revenue: {
        current: 125000,
        previous: 118000,
        growth: 5.9
      },
      expenses: {
        current: 75000,
        previous: 72000,
        growth: 4.2
      },
      profit: {
        current: 50000,
        previous: 46000,
        growth: 8.7
      },
      recentTransactions: [
        { id: 1, type: 'income', amount: 5000, description: 'Client Payment - ABC Corp', date: '2024-01-15' },
        { id: 2, type: 'expense', amount: 1200, description: 'Office Supplies', date: '2024-01-14' },
        { id: 3, type: 'income', amount: 8500, description: 'Product Sales', date: '2024-01-13' }
      ]
    };

    res.json(financialData);
  } catch (error) {
    console.error('Finance overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;