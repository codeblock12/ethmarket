import { ROLES } from './constants';

export function getRoleById (roleId) {
    return ROLES[roleId];
}