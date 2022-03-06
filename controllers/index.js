const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes')

router.use('/dashboard', dashboardRoutes)
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
