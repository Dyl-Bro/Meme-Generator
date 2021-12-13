const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
    caption: {
        type: String,
        required: true  
    },
    image: {
        type: String,
        default: ''
    },
    descriptor: {
        type: String,
        required: true
    }
})

memeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
memeSchema.set('toJSON', {
    virtuals: true
})

exports.Meme = mongoose.model('Meme', memeSchema);

