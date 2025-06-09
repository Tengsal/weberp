const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get inventory overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const inventoryData = {
      totalItems: 1250,
      totalValue: 485000,
      categories: [
        { name: 'Electronics', count: 350, value: 125000 },
        { name: 'Office Supplies', count: 450, value: 85000 },
        { name: 'Furniture', count: 150, value: 175000 },
        { name: 'Software', count: 300, value: 100000 }
      ],
      lowStockItems: [
        { id: 1, name: 'Laptop Chargers', current: 5, minimum: 20, category: 'Electronics' },
        { id: 2, name: 'Printer Paper', current: 12, minimum: 50, category: 'Office Supplies' },
        { id: 3, name: 'Office Chairs', current: 3, minimum: 10, category: 'Furniture' }
      ],
      recentOrders: [
        { id: 1, supplier: 'TechCorp', items: 25, total: 15000, status: 'pending' },
        { id: 2, supplier: 'OfficeMax', items: 50, total: 2500, status: 'delivered' }
      ]
    };

    res.json(inventoryData);
  } catch (error) {
    console.error('Inventory overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;