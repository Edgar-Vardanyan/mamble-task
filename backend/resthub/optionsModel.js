const mongoose = require('mongoose');

const optionsSchema = mongoose.Schema({
    showCompleted: {
        type: Boolean,
        required: true
    },
});

const Options = module.exports = mongoose.model('options', optionsSchema);
module.exports.getOptions = (callback, limit) => {
    Options.find(callback).limit(limit);
}