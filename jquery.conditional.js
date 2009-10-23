/*
 * jQuery conditional Plugin v1.0
 * http://outwestmedia.com/jquery-plugins/conditional/
 *
 * Released: 2009-10-23
 * Version: 1.1
 *
 * Copyright (c) 2009 Jonathan Sharp, Out West Media LLC.
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
 /**
	Basic
	 $('selector')
		.If('hasClass', 'foo')
			.find('> child')
				.doSomething()
			.end()
		.Else()
			.doSomethingElse()
		.end();
	
	Complex
		.If('attr', 'title', 'Some Title')
		.If('hasClass', 'foo', false)
	
	Functions
		.If(function() { return this == that; })
	
	Else
		.Else()
		or
		.Else('conditions')
		
	 */
(function($) {
	$.fn.If = function() {
		var test = false;
		if ( $.isFunction(arguments[0]) ) {
			test = arguments[0].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ( arguments.length == 1 ) {
			// Convert our argument to a boolean
			test = !!arguments[0];
		} else {
			test = this[arguments[0]].apply(this, $.makeArray( arguments[1] ) );
			if ( arguments.length == 3 ) {
				test = ( test == arguments[2] );
			}
		}
		// Force boolean type
		this._ifTest = !!test;
		var ret = this.pushStack( this );
		if ( !this._ifTest ) {
			ret = ret.pushStack( [] );
		}
		return ret;
	};
	$.fn.Else = function() {
		var prev = this.end();
		if ( ! prev._ifTest ) {
			if ( arguments.length > 0 ) {
				var ret = $.fn.If.apply(this, arguments);
				if ( ret._ifTest !== false ) {
					return ret;
				}
			} else {
				return this;
			}
		}
		return this.pushStack( [] );
	};
})(jQuery);
