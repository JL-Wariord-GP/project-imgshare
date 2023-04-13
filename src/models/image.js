const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

// Almacenamos los datos que queremos guardar

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '')
    });

module.export = mongoose.model('Image', ImageSchema);