const mongoose = require('mongoose');

const Article = mongoose.model(
    'articles',
    {
      recipe_title:String,
      category:String,
      preparation_time:String,
      no_people:Number,
      short_description:String,
      recipe:String,
      chef_id:String,
      create_on:String,
      likes:{
          type:Number,
          default:0,
      }, 
      usersLikes:[Number],
      image:String     
    },
    'articles'
);


const create = async (data) => {
    let a = new Article(data);
    return await a.save();
};

const getOne = async (id) => {
    return await Article.findById(id);
};

const getAllByUser = async (uid) => {
    return await Article.find({chef_id: uid});
};

const getAll = async () => {
    return await Article.find({});
};

const update = async (id, data) => {
    return await Article.updateOne({_id: id}, data);
};


const remove = async (id, uid) => {
    return await Article.deleteOne({ _id: id, chef_id: uid});
};

const getByCategory = async(recipeCategory) => {
    return await Article.find({category:recipeCategory})
};

module.exports = {
    create,
    getOne,
    getAllByUser,
    getAll,
    update,
    remove,
    getByCategory,    
};