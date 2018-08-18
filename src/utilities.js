import { ROLES } from './constants';

export function getRoleById (roleId) {
    return ROLES[roleId];
}

export function waitForAsync(expression, func, seconds){
    if (expression) {
      func()
    } else {
      setTimeout( () => waitForAsync(), seconds * 1000 ) 
    }
  }