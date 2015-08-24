'use strict';

// MODULES //

var LOG2 = require( './number.js' );


// BASE 2 LOGARITHM //

/**
* FUNCTION: log2( out, arr )
*	Computes an element-wise base-2 logarithm.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function log2( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = LOG2( x[ i ] );
	}
	return y;
} // end FUNCTION log2()


// EXPORTS //

module.exports = log2;
