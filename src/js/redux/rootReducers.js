import { combineActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import { routerReducer as routing } from 'react-router-redux';


import faq from './faq'
// module들을 import 해서 combine시킨다
// module들을 import 해서 combine시킨다

export default combineReducers({
  faq,
  routing : routing,
  pender: penderReducer,
})
