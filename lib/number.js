'use strict';

module.exports = Math.log2 || function( x ) {
	return Math.log( x ) / Math.LN2;
};
