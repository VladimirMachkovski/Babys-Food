const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('../../../pkg/users/validate');
const user = require('../../../pkg/users');
const config = require('../../../pkg/config');


const login = async (req, res) => {
    try {
        await validator(req.body, 'LOGIN');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }

    try {
        let u = await user.getByEmail(req.body.email);
        if(!u) {
            return res.status(400).send('Bad request');
        }
        if(!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send('Bad request. Wrong password');
        }
        
        let token = jwt.sign({
            uid: u._id,
            email: u.email,
            full_name: `${u.first_name} ${u.last_name}`,
            exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000)
        }, config.get('security').secret);
        res.status(200).send(token);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const validate = async(req, res) => {
 
    try {
        const u = await user.getByID(req.user.uid)
        if(!user){
            return res.status(401).send("Not authorized")
        }

        return res.status(200).send(u)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};

const createAccount = async (req, res) => {
    try {
        await validator(req.body, 'CREATE');
    } catch(err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }    
    try {
        let data = req.body;
        data.password = bcrypt.hashSync(data.password);
        data.image = "";
        let u = await user.create(data);
        return res.status(201).send(u);
    } catch(err) {
        console.log(err);
        if(err.code === 11000) {            
            return res.status(400).send('Bad request. Email already in use');
        }
        return res.status(500).send('Internal server error');
    }
};

const updateAccount = async(req,res) =>{
    try {
        await validator(req.body, 'UPDATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }
    try {
        console.log(req.body);
        const a = await user.update(req.user.uid, req.body);
        if (!a){
            return res.status(404).send('Not found');
        }
        res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const getAll = async (req, res) => {
    try {
      const data = await user.getAll();
  
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

module.exports = {
    login,
    validate,
    createAccount ,
    updateAccount ,
    getAll
};

