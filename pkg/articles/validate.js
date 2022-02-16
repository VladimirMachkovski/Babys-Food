const {Validator} = require('node-input-validator');

const CreateRecipe = {
  recipe_title:'required',
  category:'required',
  preparation_time:'required',
  no_people:'required',
  short_description:'required',
  recipe:'required'
}
const validate = async(data)=>{
  let v = new Validator(data,CreateRecipe);
  let e = await v.check();
  if(!e){
    throw v.errors
  }
};

module.exports = validate;