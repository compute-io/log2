/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	log2 = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array log2', function tests() {

	it( 'should export a function', function test() {
		expect( log2 ).to.be.a( 'function' );
	});

	it( 'should compute the base-2 logarithm', function test() {
		var data, actual, expected;

		data = [
			Math.pow( 2, 4 ),
			Math.pow( 2, 6 ),
			Math.pow( 2, 9 ),
			Math.pow( 2, 15 ),
			Math.pow( 2, 10 ),
			Math.pow( 2, 25 )
		];
		actual = new Array( data.length );

		actual = log2( actual, data );
		expected = [ 4, 6, 9, 15, 10, 25 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log2( [], [] ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = log2( actual, data );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
