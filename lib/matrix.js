'use strict';

// MODULES //

var LOG2 = require( './number.js' );


// BASE 2 LOGARITHM //

/**
* FUNCTION: log2( out, mat )
*	Computes an element-wise base-2 logarithm.
*
* @param {Matrix} out - output matirx
* @param {Matrix} mat - input matrix
* @returns {Matrix} output matrix
*/
function log2( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'log2()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = LOG2( x.data[ i ] );
	}
	return y;
} // end FUNCTION log2()


// EXPORTS //

module.exports = log2;
