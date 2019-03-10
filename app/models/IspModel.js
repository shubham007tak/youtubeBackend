const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

let Schema = mongoose.Schema;

let ispSchema = new Schema({
  rank: {
    type: String,
    default: '',
  },
  subscribers: {
    type: Number,
    default: ''
  },
  grade: {
    type: Number,
    default: '',
  },
  channelName: {
    type: String,
    default: ''
  },
  video: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: ''
  },
  uploads: {
    type: Number
  }
})

mongoose.model('Isp', ispSchema)