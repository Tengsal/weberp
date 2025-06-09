const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get dashboard stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = {
      totalEmployees: await User.countDocuments({ role: 'employee', isActive: true }),
      totalAdmins: await User.countDocuments({ role: 'admin', isActive: true }),
      activeUsers: await User.countDocuments({ isActive: true }),
      finance: {
        totalRevenue: 125000,
        totalExpenses: 75000,
        profit: 50000,
        pendingInvoices: 12
      },
      hr: {
        newHires: 5,
        pendingLeaves: 8,
        upcomingReviews: 15
      },
      inventory: {
        totalItems: 1250,
        lowStock: 23,
        outOfStock: 5,
        recentOrders: 18
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;