const recipe = require('../../../pkg/articles');
const validator = require('../../../pkg/articles/validate');

const create = async (req, res) => {
  try {
      await validator(req.body);
  } catch(err) {
      console.log(err);
      return res.status(400).send('Bad request');
  }

  try {
      let data = {
          ...req.body,
          chef_id: req.user.uid
      };
      
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month <= 9) {
      month = "0" + month;
    }
    if (day <= 9) {
      day = "0" + day;
    }    
    data.create_on = `${day}.${month}.${date.getFullYear()}`;    
      let out = await recipe.create(data);
      res.status(201).send(out);
  } catch (err) {
      console.log(err);
      return res.status(400).send('Internal server error');
  }
};

const getAll = async (req, res) => {
  try {
      let recipes = await recipe.getAll();
      return res.status(200).send(recipes);
  } catch(err) {
      console.log(err);
      return res.status(500).send('Internal server error');
  }
};

const getMine = async (req, res) => {
  try {
      let recipes = await recipe.getAllByUser(req.user.uid);
      return res.status(200).send(recipes);
  } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
  }
};

const getOne = async (req, res) => {
  console.log(req.params)
  try {
      let recipes = await recipe.getOne(req.params.id);
      console.log(recipes)
      return res.status(200).send(recipes);
  } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
  }
};

const update = async (req, res) => {
  try {
    await validator(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
  try {
    const a = await recipe.update( req.params.id, req.body);
    if (!a.matchedCount) {
      return res.status(404).send("Not found");
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const a = await recipe.remove(req.params.id, req.user.uid);

    if (!a.deletedCount) {
      return res.status(404).send("Not found");
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const getCategory = async(req,res) =>{
   try {
     const recipes = await recipe.getByCategory(req.params.category);
     res.status(200).send(recipes)
   } catch (error) {
     console.log(error)
     return res.status(500).send(error)
   } 

};

module.exports = {
  create,
  getAll,
  getMine,
  getOne,
  update,  
  remove,
  getCategory,
  
};