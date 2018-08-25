import { ROLE_LABELS, PRODUCT_STATUS_LABELS, TOASTR_SETTINGS } from './constants';
import toastr from 'toastr';

toastr.options = TOASTR_SETTINGS;

const web3 = window.web3;

export function getRoleById (_roleId) {
    return ROLE_LABELS[_roleId];
}

export function getProductStatusById (_statusId) {
  return PRODUCT_STATUS_LABELS[_statusId];
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

export function defaultErrorNotification (err) {
  let message = "Error"
    if (err.message.indexOf('revert') > -1) {
      message = 'Please check role permissions or status of product and storefront';
    } else if (err.message.indexOf('bigNumber')) {
      message = 'Please check input type';
    }

  toastr.error(err, message);
}