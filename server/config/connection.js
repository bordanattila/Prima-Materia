const mongoose = require('mongoose');
//needs mongodb location
<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/primaDB', {
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prima-materia', {
>>>>>>> cdbf84d46b8c9f189be128162c2a871d7b2af453
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;