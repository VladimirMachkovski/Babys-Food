const fs = require('fs');
const config = require('../../../pkg/config');
const strings = require('../../../pkg/strings');

const cfgApp = config.get('storage');

const upload = async (req, res) => {
console.log(req);
debugger;
    if (req.files.document.size > cfgApp.max_filesize) {
        return res.status(400).send('File exceeds max file size');
    }

    if (!cfgApp.allowed_filetypes.includes(req.files.document.mimetype)) {
        return res.status(400).send('Filetype not allowed');
    }

    let userDir = `user_${req.user.uid}`;
    let userDirPath = `${__dirname}/../../../${cfgApp.upload_dir}/${userDir}`;

    if(!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }

    let fileID = strings.makeID(6);
    let fileName = `${fileID}_${req.files.document.name}`;
    let filePath = `${userDirPath}/${fileName}`;
    req.files.document.mv(filePath, err => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        res.status(200).send({filename: fileName});
    });
};

const download = async (req, res) => {
    let userDir = `user_${req.user.uid}`;
    let userDirPath = `${__dirname}/../../../${cfgApp.upload_dir}/${userDir}`;
    let filePath = `${userDirPath}/${req.params.filename}`;

    if(!fs.existsSync(filePath)) {
        return res.status(404).send('Not Found');
    }
    res.download(filePath);
};

const getFileList = (req, res) => {
    try {
      fs.readdir(
        `${__dirname}/../../../${config.get("storage").upload_dir}/user_${
          req.user.uid
        }`,
        (err, files) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).send(files);
        }
      );
    } catch (error) {
      return res.status(500).send();
    }
  };

const removeFile = (req, res) => {
    res.send('ok');
};


module.exports = {
    upload,
    download,
    getFileList,
    removeFile
};



