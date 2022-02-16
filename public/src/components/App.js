import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './Header';
import { Login } from './Login';
import { Createaccount } from './Createaccount';
import {Main} from './Main';
import { Footer } from './Footer';
import { Myprofile } from './Myprofile';
import { Myrecipes } from './Myrecipes';
import { Addrecipe } from './Addrecipe';
import { Breakfast } from '../components/meals/Breakfast';
import { Brunch } from '../components/meals/Brunch';
import { Lunch } from '../components/meals/Lunch';
import { Dinner } from '../components/meals/Dinner';
import {Updaterecipe} from './Updaterecipe';
import { Popup } from './popup/Popup';
import '../css/App.css';
export const App = () => {
 
       return (
        <div id="app">
            <Header/>            
            <Switch>              
                <Route path='/' exact component={Main}/>                
                <Route path='/login' component={Login}/>
                <Route path='/create-account' component={Createaccount}/>
                <Route path='/my-profile' component={Myprofile}/>
                <Route path='/addrecipe' component={Addrecipe}/>
                <Route path='/myrecipes' component={Myrecipes}/>
                <Route path='/breakfast' component={Breakfast}/>
                <Route path='/brunch' component={Brunch}/>
                <Route path='/lunch' component={Lunch}/>
                <Route path='/dinner' component={Dinner}/>
                <Route path='/updaterecipe' component={Updaterecipe}/>
                <Route path='/popup' component={Popup}/>                
            </Switch>                       
            <Footer/>           
        </div>
    )
}