const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

let SubSection;

try {
  // Try to get the existing model
  SubSection = mongoose.model('SubSection');
} catch (e) {
  // If the model doesn't exist, define it
  SubSection = mongoose.model('SubSection', subSectionSchema);
}
module.exports = SubSection;
