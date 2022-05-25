const landing = require('./../model/landing');
const fs = require('fs');
const path = require('path')

module.exports.multipleImage = async (req, res) => {
    try {
        // console.log(req.files);
        const image = [];
        const rejectImage = [];
        const imageSize = [];
        // image validation check image format and size..
        req.files.forEach(element => {
            // console.log(element);
            if (element.mimetype == "image/png" || element.mimetype == "image/jpg" || element.mimetype == "image/jpeg") {
                if ((element.size >= 1024) && (element.size <= 1024 * 1024 * 10)) {
                    const allimages = element.filename
                    image.push(allimages)
                } else {
                    const reject = element.filename
                    imageSize.push(reject)
                }
            } else {
                const reject = element.filename
                rejectImage.push(reject)
            }
        });

        if (req.files.length === image.length) {
            const users = await landing.find();
            // console.log(users.length);
            if ((users.length != 1)) {
                //data save in database ....
                const data = landing({
                    title: req.body.title,
                    description: req.body.description,
                    subTitle: req.body.subTitle,
                    image: image
                })
                await data.save();
                res.json({
                    success: 1,
                    data: "All data upload successfully"
                })
            } else {
                // data update in dataBase ...
                const users = await landing.findOne();
                users.image.forEach((file) => {
                    // console.log(file);
                    let imgPath = path.join(__dirname, '../../upload/images/' + file);
                    fs.unlinkSync(imgPath);
                })
                await landing.updateOne({}, {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        subTitle: req.body.subTitle,
                        image: image
                    }
                })
                res.json({
                    success: 1,
                    data: "All data upload successfully"
                })
            }
        } else {
            // error in uploading the image ....
            req.files.forEach(file => {
                try {
                    let imgPath = path.join(__dirname, '../../upload/images/' + file.filename);
                    fs.unlinkSync(imgPath);
                } catch (error) {
                    console.log(error);
                }
            })
            if (imageSize.length > 0) {
                res.status(400).send({
                    msg: "image size must between 1 mb to 10 mb",
                    imageSize
                });
            } else {
                res.status(400).send({
                    msg: "Only jpg ,jpeg ,png fromat image are allowed ",
                    data: {
                        rejectImage,
                        msg: "this   tppe of image format is not allowed "
                    }
                })
            }
        }
    } catch (err) {
        console.log(err);
    }

}

module.exports.imageGet = async (req, res) => {
    try {
        const finding = await landing.find();
        res.json({ status: " the data are ", finding });
    } catch (err) {
        console.log(err);
    }
}