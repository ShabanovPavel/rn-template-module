import {SET_NAME} from './action'

export default function profile(state = {
    name: `Василий`
}, action = {}) {
  switch (action.type) {
    case SET_NAME:{
        return { ...state, name: action.name}
    }
    default:
      return state;
  }
}

//----Функции с какой-либо бизнес логикой
profile.updateName = () => dispatch => {
  dispatch({
    type: SET_NAME,
    name:'Pavel',
  });
};

/*
export const defineModule = (
    title,
    path,
    component,
    reducer = (state = {}) => state,
    onEnter = null) => {
      return {title, path, component, reducer, onEnter}
  }
*/
//export default defineModule('Личный кабинет', '/profile, Profile')