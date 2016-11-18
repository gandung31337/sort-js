/*
 * Sort.js - Various algorithm for sorting data
 *
 * Paulus Gandung Prakosa (gandung@ppp.cylab.cmu.edu)
 */

var Sort = {};

Sort.create = function( name )
{
	if ( name.constructor !== String )
		throw new Error("name !== String");

	this[name] = this;
};

Sort.registerCallback = function( name, fn )
{
	if ( name.constructor !== String || fn.constructor !== Function )
		throw new Error("name !== String or callback !== Function");

	this[name] = fn;
};

Sort.create('helper');
Sort.create('algorithm');

Sort.helper.registerCallback('isString', function(x)
{
	return ( x.constructor !== String ? false : true );
});

Sort.helper.registerCallback('isFunction', function(x)
{
	return ( x.constructor !== Function ? false : true );
});

Sort.helper.registerCallback('isArray', function(x)
{
	return ( x.constructor !== Array ? false : true );
});

Sort.helper.registerCallback('isNumber', function(x)
{
	return ( x.constructor !== Number ? false : true );
});

Sort.helper.registerCallback('swap', function(el, x, y)
{
	if ( !this.isArray(el) || !this.isNumber(x) || !this.isNumber(y) )
		throw new Error("Prerequisite not satisfied.");

	el[x] ^= el[y];
	el[y] ^= el[x];
	el[x] ^= el[y];
});

Sort.helper.registerCallback('min', function(x, y)
{
	if ( !this.isNumber(x) || !this.isNumber(y) )
		throw new Error("x !== Number or y !== Number");

	return ( x < y ? true : false );
});

Sort.helper.registerCallback('max', function(x, y)
{
	if ( !this.isNumber(x) || !this.isNumber(y) )
		throw new Error("x !== Number or y !== Number");

	return ( x > y ? true : false );
});

Sort.helper.registerCallback('generateRandomData', function(max, n)
{
	if ( !Sort.helper.isNumber(max) || !Sort.helper.isNumber(n) )
		throw new Error("Prerequisite not satisfied.");

	var container = [];

	for ( var i = 0; i < n; i++ ) {
		Array.prototype.push.call(container, Math.floor(Math.random() * max));
	}

	return ( container );
});

Sort.algorithm.registerCallback('bubbleSort', function( el )
{
	if ( !Sort.helper.isArray(el) )
		throw new Error("el !== Array");

	var swapped = true;

	while ( swapped )
	{
		swapped = false;

		for ( var i = 1; i < el.length; i++ )
		{
			if ( Sort.helper.max(el[i - 1], el[i]) )
			{
				Sort.helper.swap(el, i - 1, i);

				swapped = true;
			}
		}
	}
});

Sort.algorithm.registerCallback('cocktailShakerSort', function(el)
{
	if ( !Sort.helper.isArray(el) )
		throw new Error("el !== Array");

	var swapped = true;

	do {
		swapped = false;

		/* do top-down first */
		for ( var i = 1; i < el.length; i++ )
		{
			if ( Sort.helper.max(el[i - 1], el[i]) )
			{
				Sort.helper.swap(el, i - 1, i);

				swapped = true;
			}
		}

		/* if !swapped = break outer loop */
		if ( !swapped )
			break;

		/* if swapped, then do down-top */
		for ( var i = (el.length - 2); i >= 0; i-- )
		{
			if ( Sort.helper.max(el[i], el[i + 1]) )
			{
				Sort.helper.swap(el, i, i + 1);

				swapped = true;
			}
		}
	} while ( swapped );
});

Sort.algorithm.registerCallback('oddEvenSort', function(el)
{
	if ( !Sort.helper.isArray(el) )
		throw new Error("el !== Array");

	var sorted = false;

	while ( !sorted ) {
		sorted = true;

		for ( var i = 1; i < el.length; i++ )
		{
			if ( Sort.helper.max(el[i - 1], el[i]) )
			{
				Sort.helper.swap(el, i - 1, i);

				sorted = false;
			}
		}

		for ( var i = 1; i < el.length; i++ )
		{
			if ( Sort.helper.max(el[i - 1], el[i]) )
			{
				Sort.helper.swap(el, i - 1, i);

				sorted = false;
			}
		}
	}
});

Sort.algorithm.registerCallback('combSort', function(el)
{
	if ( !Sort.helper.isArray(el) )
		throw new Error("el !== Array");

	var gap = el.length;
	var shrinkFactor = 1.3;
	var sorted = false;

	while ( !sorted )
	{
		gap = Math.floor(gap / shrinkFactor);

		if ( gap > 1 )
		{
			sorted = false;
		}
		else
		{
			gap = 1;

			sorted = true;
		}

		var i = 0;

		while ( (i + gap) < (el.length) )
		{
			if ( Sort.helper.max(el[i], el[i + gap]) )
			{
				Sort.helper.swap(el, i, i + gap);

				sorted = false;
			}

			i++;
		}
	}
});