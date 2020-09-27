const path = require('path');
const router = require('express').Router();
const tractInfoRoutes = require('./tractinfo')
const tractdataRoutes = require('./tractdata')
const dataInfoRoutes = require('./datainfo')
const cityCrossWalkRoutes = require('./citycrosswalk')

router.use('/tractinfo', tractInfoRoutes);
router.use('/tractdata', tractdataRoutes);
router.use('/datainfo', dataInfoRoutes);
router.use('/citycrosswalk', cityCrossWalkRoutes);

// If no API routes are hit, send the React app
router.use((req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

router.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  let msg = err.message
  // If we are in production, override the message we
  // expose to the client (for security reasons)
  if (process.env.NODE_ENV === 'production') {
    msg = 'Internal server error'
  }
  if (err.statusCode === 500) {
    console.error(err)
  }
  res.status(err.statusCode).json({
    error: msg
  })
});

module.exports = router;
