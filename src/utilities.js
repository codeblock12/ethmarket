import { ROLE_LABELS, WEI } from './constants';
import BigNumber from 'bignumber.js';

const web3 = window.web3;

export function getRoleById (_roleId) {
    return ROLE_LABELS[_roleId];
}

export function toWei (_ethVal, _unit) {
  let unit = _unit || 'ether';
  let val = web3.toWei(_ethVal, unit);
  return val;
}

export function fromWei (_weiVal, _unit) {
  let unit = _unit || 'ether';
  let val = web3.fromWei(_weiVal, unit);
  return val;
}