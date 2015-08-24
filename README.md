Binary Logarithm
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise [binary logarithm](https://en.wikipedia.org/wiki/Binary_logarithm) (logarithm with base 2).

The [binary logarithm](https://en.wikipedia.org/wiki/Binary_logarithm) (logarithm with base 2) is defined for any positive real number as

<div class="equation" align="center" data-raw-text="\quad \log_{2} \left( x \right) = y \quad \text{s.t.} \quad 2^y = x" data-equation="eq:binary_logarithm">
	<img src="https://cdn.rawgit.com/compute-io/log2/7f71a4ebca0f43cbc03a830856a1172fae5accc2/docs/img/eqn.svg" alt="Equation for the binary logarithm.">
	<br>
</div>

## Installation

``` bash
$ npm install compute-log2
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var log2 = require( 'compute-log2' );
```

#### log2( x[, opts] )

Computes an element-wise [binary logarithm](https://en.wikipedia.org/wiki/Binary_logarithm) (logarithm with base 2). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = log2( Math.pow( 2, 3 ) );
// returns 3

out = log2( -9 );
// returns NaN

data = [ 3, 7, 9 ];
out = log2( data );
// returns [ ~1.585, ~2.807, 3.17 ]

data = new Int8Array( data );
out = log2( data );
// returns Float64Array( [~1.585,~2.807,3.17] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = log2( mat );
/*
	[ -Infinity 0
	  1 ~1.585
	  2 ~2.322 ]
*/

```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,Math.pow( 2, 4 )],
	[1,Math.pow( 2, 6 )],
	[2,Math.pow( 2, 15 )],
	[3,Math.pow( 2, 10 )],
	[4,Math.pow( 2, 25 )]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = log2( data, {
	'accessor': getValue
});
// returns [ 4, 6, 15, 10, 25 ]

```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,Math.pow( 2, 4 )]},
	{'x':[1,Math.pow( 2, 6 )]},
	{'x':[2,Math.pow( 2, 15 )]},
	{'x':[3,Math.pow( 2, 10 )]},
	{'x':[4,Math.pow( 2, 25 )]}
];


var out = log2( data, {
	'path': 'x|1',
	'sep': '|'
});
/*
	[
		{ x: [ 0, 4 ] },
		{ x: [ 1, 6 ] },
		{ x: [ 2, 15 ] },
		{ x: [ 3, 10 ] },
		{ x: [ 4, 25 ] }
	]
*/

var bool = ( data === out );
// returns true

```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [4,8,16,32,64] );

out = log2( data, {
	'dtype': 'int32'
});
// returns Int32Array( [2,3,4,5,6] )

// Works for plain arrays, as well...
out = log2( [ 4, 8, 16, 32, 64 ], {
	'dtype': 'uint8'
});
// returns Uint8Array( [2,3,4,5,6] )

```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 3, 7, 9 ];

out = log2( data, {
	'copy': false
});
// returns [ ~1.585, ~2.807, 3.17 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[ 0 1
	  2 3
	  4 5 ]
*/

out = log2( mat, {
	'copy': false
});
/*
	[ -Infinity 0
	  1 ~1.585
	  2 ~2.322 ]
*/

bool = ( mat === out );
// returns true

```


## Notes

*	If an element is __not__ a numeric value, the evaluated [common logarithm](https://en.wikipedia.org/wiki/Common_logarithm) (logarithm with base 10) is `NaN`.

	``` javascript
	var data, out;

	out = log2( null );
	// returns NaN

	out = log2( true );
	// returns NaN

	out = log2( {'a':'b'} );
	// returns NaN

	out = log2( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = log2( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = log2( data, {
		'path': 'x'
	});
	/*
	[ { x: NaN }, { x: NaN }, { x: NaN }, { x: NaN } ]
	*/

	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = log2( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] )

	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	log2 = require( 'compute-log2' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
out = log2( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = log2( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = log2( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
out = log2( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = log2( mat );

// Matrices (custom output data type)...
out = log2( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-log2.svg
[npm-url]: https://npmjs.org/package/compute-log2

[travis-image]: http://img.shields.io/travis/compute-io/log2/master.svg
[travis-url]: https://travis-ci.org/compute-io/log2

[codecov-image]: https://img.shields.io/codecov/c/github/compute-io/log2/master.svg
[codecov-url]: https://codecov.io/github/compute-io/log2?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/log2.svg
[dependencies-url]: https://david-dm.org/compute-io/log2

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/log2.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/log2

[github-issues-image]: http://img.shields.io/github/issues/compute-io/log2.svg
[github-issues-url]: https://github.com/compute-io/log2/issues
