import React from "react";
import { FreshNew } from "./meals/FreshNew";
import { PopularRecipes } from "./meals/PopularRecipes";
import '../css/Main.css';
export const Main = () => {
  return (
    <div id='main'>      
      <FreshNew/>
      <PopularRecipes/>           
    </div>
  )
}