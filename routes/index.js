const path = require('path');
const router = require('express').Router();
const tractInfoRoutes = require('./tractinfo')



router.use('/tractinfo', tractInfoRoutes);

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
