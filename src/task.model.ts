import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Task = new Schema({
  title: String,
  completed: { type: Boolean, default: false },
});

export default mongoose.model('Task', Task);
