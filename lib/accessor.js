'use strict';

// MODULES //

var LOG2 = require( './number.js' );


// BASE 2 LOGARITHM //

/**
* FUNCTION: log2( out, arr, accessor )
*	Computes an element-wise base-2 logarithm using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function log2( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = LOG2( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION log2()


// EXPORTS //

module.exports = log2;
