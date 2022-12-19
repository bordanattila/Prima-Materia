const mongoose = require('mongoose');
//needs mongodb location
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prima-materia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;