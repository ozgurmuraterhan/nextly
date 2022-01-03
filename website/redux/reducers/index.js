import { combineReducers } from "redux";
import Settings from "./Settings";
import Login from "./Login";
import Brands from "./Brands";
import FilterProducts from "./FilterProducts";
import Categories from "./Categories";
import Basket from "./Basket";


const reducers = combineReducers({
  settings: Settings,
  login: Login,
  brands: Brands,
  filterProducts: FilterProducts,
  categories: Categories,
  basket: Basket

});

export default reducers;
