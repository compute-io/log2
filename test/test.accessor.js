/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	log2 = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor log2', function tests() {

	it( 'should export a function', function test() {
		expect( log2 ).to.be.a( 'function' );
	});

	it( 'should compute the base-2 logarithm using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x': Math.pow( 2, 4 ) },
			{'x': Math.pow( 2, 6 ) },
			{'x': Math.pow( 2, 9 ) },
			{'x': Math.pow( 2, 15 ) },
			{'x': Math.pow( 2, 10 ) },
			{'x': Math.pow( 2, 25 ) }
		];
		actual = new Array( data.length );

		actual = log2( actual, data, getValue );
		expected = [ 4, 6, 9, 15, 10, 25 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( log2( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = log2( actual, data, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
