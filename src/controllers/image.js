const path = require('path');
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models')

const ctrl = {};

ctrl.index = (req, res) => {

};

ctrl.create = (req, res) => {

    const saveImage = async () => {

        const imgUrl = randomNumber();
        const images = await Image.find({ filname: imgUrl });
        if (images.length > 0) {
            saveImage();
        } else {
            const imageTemPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTemPath, targetPath);
                const newImg = new Image({
                    titlle: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                })
                const imageSaved = await newImg.save();
                res.send('works!');
            } else {
                await fs.unlink(imageTemPath);
                res.status(500).json({ error: 'only Images are allowed' })
            }
        }

    }
    saveImage();




};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};
ctrl.remove = (req, res) => {

};

module.exports = ctrl;