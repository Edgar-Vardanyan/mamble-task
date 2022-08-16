
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
});

const Todo = module.exports = mongoose.model('todo', todoSchema);
module.exports.get = (callback, limit) => {
    Todo.find(callback).limit(limit);
}