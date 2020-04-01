import str from "./models/Search";

import {add, mul, ID} from './views/searchView';
import * as searchView from './views/searchView';

console.log(`Usign imported functions! ${add(ID,2)} and ${mul(ID,2)}`);
console.log(searchView.add(ID,2));