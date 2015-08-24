/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	log2 = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number log2', function tests() {

	it( 'should export a function', function test() {
		expect( log2 ).to.be.a( 'function' );
	});

	it( 'should compute the base-2 logarithm', function test() {
		assert.closeTo( log2( 7 ), 2.807354922, 1e-7 );
		assert.closeTo( log2( 90 ), 6.491853096, 1e-7  );
		assert.closeTo( log2( 300 ), 8.22881869, 1e-7  );
	});

	it( 'should return `NaN` if provided with a negative number', function test() {
		var val;

		val = log2( -9 );
		assert.isTrue( val !== val );

		val = log2( -7 );
		assert.isTrue( val !== val );

		val = log2( -81 );
		assert.isTrue( val !== val );
	});

});
