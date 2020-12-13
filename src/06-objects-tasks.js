/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
	return {
		width,
		height,
		getArea() {
			return this.width * this.height;
		}
	}
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
	return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
	return Object.setPrototypeOf(JSON.parse(json), proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Impostor {
	constructor() {
		this.selector = '';
		this.exception = 'Element, id and pseudo-element should not occur more then one time inside the selector';
		this.isAJoke = 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element';
		this.rightSelectorOrder = ['element', 'id', 'class', 'attribute', 'pseudo-class', 'pseudo-element']; // consts will be better but...
		this.currentOrder = [];
		this.elemCount = 0;
		this.idCount = 0;
		this.psElCount = 0;
		this.magic = 0;
	}

	isOrderRight() {
		if (!this.magic) {
			this.magic = 1;
			const firstElemIndex = this.rightSelectorOrder.indexOf(this.currentOrder[0]);
			this.rightSelectorOrder = this.rightSelectorOrder.slice(firstElemIndex);
		}
		return this
			.currentOrder
			.every((value, index) => index <= this.rightSelectorOrder.indexOf(value));
	}

	element(value) {
		this.elemCount += 1;
		if (this.elemCount > 1) {
			throw this.exception;
		}
		this.currentOrder.push('element');
		if (!this.isOrderRight()) {
			throw Error(this.isAJoke);
		}
		this.selector += value;
		return this;
	}

	id(value) {
		this.idCount += 1;
		if (this.idCount > 1) {
			throw this.exception;
		}
		this.currentOrder.push('id');
		if (!this.isOrderRight()) {
			throw Error(this.isAJoke);
		}
		this.selector += `#${value}`;
		return this;
	}

	class(value) {
		if (this.currentOrder[this.currentOrder.length - 1] !== 'class') {
			this.currentOrder.push('class');
		}
		if (!this.isOrderRight()) {
			throw Error(this.isAJoke);
		}
		this.selector += `.${value}`;
		return this;
	}

	attr(value) {
		if (this.currentOrder[this.currentOrder.length - 1] !== 'attribute') {
			this.currentOrder.push('attribute');
		}
		if (!this.isOrderRight()) {
			throw Error(this.isAJoke);
		}
		this.selector += `[${value}]`;
		return this;
	}

	pseudoClass(value) {
		if (this.currentOrder[this.currentOrder.length - 1] !== 'pseudo-class') {
			this.currentOrder.push('pseudo-class');
		}
		if (!this.isOrderRight()) {
			throw Error(this.isAJoke);
		}
		this.selector += `:${value}`;
		return this;
	}

	pseudoElement(value) {
		this.psElCount += 1;
		if (this.psElCount > 1) {
			throw this.exception;
		}
		this.currentOrder.push('pseudo-element');
		if (!this.isOrderRight()) {
			throw Error(this.isAJoke);
		}
		this.selector += `::${value}`;
		return this;
	}

	combine(selector1, combinator, selector2) {
		this.selector = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
		return this;
	}

	stringify() {
		return this.selector;
	}
}

const cssSelectorBuilder = {
	element(value) {
		return new Impostor().element(value);
	},

	id(value) {
		return new Impostor().id(value);
	},

	class(value) {
		return new Impostor().class(value);
	},

	attr(value) {
		return new Impostor().attr(value);
	},

	pseudoClass(value) {
		return new Impostor().pseudoClass(value);
	},

	pseudoElement(value) {
		return new Impostor().pseudoElement(value);
	},

	combine(selector1, combinator, selector2) {
		return new Impostor().combine(selector1, combinator, selector2);
	},
};


module.exports = {
	Rectangle,
	getJSON,
	fromJSON,
	cssSelectorBuilder,
};
