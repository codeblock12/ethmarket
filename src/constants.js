export const ROLE_LABELS = {
	'0': 'Shopper',
	'1': 'Store Owner',
	'2': 'Admin'
}

export const ROLES = {
	'SHOPPER': '0',
	'STORE_OWNER': '1',
	'ADMIN': '2'
}

export const PRODUCT_STATUS = {
	'CANCELLED': '0',
	'LISTED': '1'
}

export const PRODUCT_STATUS_LABELS = {
	'0': 'Cancelled',
	'1': 'Listed'
}

export const STOREFRONT = {
	'STOREFRONT_ID': '0',
	'OWNER': '1',
	'BALANCE': '2',
	'NAME': '3',
	'IS_ACTIVE': '4'
}

export const PRODUCT = {
	'PRODUCT_ID': '0',
  'STOREFRONT_ID': '1',
  'NAME': '2',
  'PRICE': '3',
  'QUANTITY': '4',
  'STATUS': '5',
}

export const ORDER = {
	'ORDER_ID': '0',
	'PRODUCT_ID': '1',
	'STOREFRONT_ID': '2',
	'PRODUCT_NAME': '3',
	'DATETIME': '4',
  'QUANTITY': '5',
	'PRICE': '6'
}

export const WEI = '1000000000000000000';
export const GWEI = '1000000000';

export const NOTIFICATION_TIMEOUT = '5000';

export const TOASTR_SETTINGS = {
		"closeButton": false,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-bottom-full-width",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
}