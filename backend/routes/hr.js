const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get HR overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee', isActive: true })
      .select('profile.firstName profile.lastName profile.department profile.position profile.hireDate')
      .limit(10);

    const hrData = {
      totalEmployees: employees.length,
      departments: [
        { name: 'Engineering', count: 25 },
        { name: 'Sales', count: 18 },
        { name: 'Marketing', count: 12 },
        { name: 'HR', count: 8 }
      ],
      recentHires: employees.slice(0, 5),
      pendingLeaves: [
        { id: 1, employee: 'John Doe', type: 'Vacation', startDate: '2024-01-20', days: 5 },
        { id: 2, employee: 'Jane Smith', type: 'Sick Leave', startDate: '2024-01-18', days: 2 }
      ]
    };

    res.json(hrData);
  } catch (error) {
    console.error('HR overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all employees
router.get('/employees', authenticateToken, authorizeRole(['admin', 'hr']), async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' })
      .select('-password')
      .sort({ 'profile.firstName': 1 });

    res.json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;