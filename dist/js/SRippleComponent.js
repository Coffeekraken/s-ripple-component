'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _coffeekrakenSParticlesSystemComponent = require('coffeekraken-s-particles-system-component');

var _coffeekrakenSParticlesSystemComponent2 = _interopRequireDefault(_coffeekrakenSParticlesSystemComponent);

var _style = require('coffeekraken-sugar/js/dom/style');

var _style2 = _interopRequireDefault(_style);

var _offset = require('coffeekraken-sugar/js/dom/offset');

var _offset2 = _interopRequireDefault(_offset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name 		SRippleComponent
 * @extends 	SWebComponent
 * Provide a nice and simple to use ripple webcomponent fully customizable
 *
 * @example 		html
 * <div style="height:500px; position:relative;">
 * 	<s-ripple></s-ripple>
 * 	<div style="position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%)">
 * 	 Click to see the ripple effect in action
 * 	</div>
 * </div>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

var SRippleComponent = function (_SWebComponent) {
	_inherits(SRippleComponent, _SWebComponent);

	function SRippleComponent() {
		_classCallCheck(this, SRippleComponent);

		return _possibleConstructorReturn(this, (SRippleComponent.__proto__ || Object.getPrototypeOf(SRippleComponent)).apply(this, arguments));
	}

	_createClass(SRippleComponent, [{
		key: 'componentWillMount',


		/**
   * Component will mount
   * @definition 		SWebComponent.componentWillMount
   * @protected
   */
		value: function componentWillMount() {
			_get(SRippleComponent.prototype.__proto__ || Object.getPrototypeOf(SRippleComponent.prototype), 'componentWillMount', this).call(this);
			this._particlesSystem = null;
		}

		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */

	}, {
		key: 'componentMount',
		value: function componentMount() {
			_get(SRippleComponent.prototype.__proto__ || Object.getPrototypeOf(SRippleComponent.prototype), 'componentMount', this).call(this);
			// set initial styles
			this._setInitialStyles();
			// listen for click on parent
			this.parentNode.addEventListener('click', this._onParentClick.bind(this));
			this._parentNode = this.parentNode;
		}

		/**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */

	}, {
		key: 'componentUnmount',
		value: function componentUnmount() {
			_get(SRippleComponent.prototype.__proto__ || Object.getPrototypeOf(SRippleComponent.prototype), 'componentUnmount', this).call(this);
			// do not listen for click anymore
			this._parentNode.removeEventListener('click', this._onParentClick);
		}

		/**
   * When click on parent, trigger a ripple
   */

	}, {
		key: '_onParentClick',
		value: function _onParentClick(e) {

			// calculate position of the emitter
			var emitterX = void 0,
			    emitterY = void 0;
			if (this.props.centered) {
				emitterX = this.offsetWith * .5;
				emitterY = this.offsetHeight * .5;
			} else {
				var elmOffset = (0, _offset2.default)(this);
				emitterX = e.pageX - elmOffset.left;
				emitterY = e.pageY - elmOffset.top;
			}

			// add a particle system
			if (!this._particlesSystem) {
				this._particlesSystem = document.createElement('s-particles-system').setProps({
					particleClass: this._componentNameDash + '__particle',
					loop: false
				});
				this.appendChild(this._particlesSystem);
			}

			// amit a particle
			this._emitRipples(emitterX, emitterY);
		}

		/**
   * Emit ripples
   */

	}, {
		key: '_emitRipples',
		value: function _emitRipples(emitterX, emitterY) {
			var _this2 = this;

			var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;


			var emX = emitterX,
			    emY = emitterY;

			// handle spread
			if (this.props.spread) {
				emX += -this.props.spread + Math.round(Math.random() * (this.props.spread * 2));
				emY += -this.props.spread + Math.round(Math.random() * (this.props.spread * 2));
			}

			// set emitter position
			this._particlesSystem.setProps({
				emitterX: emX,
				emitterY: emY
			});

			// emit a particle
			this._particlesSystem.emitParticle();
			// check if need more that 1
			if (this.props.count > 1 && current < this.props.count) {
				setTimeout(function () {
					_this2._emitRipples(emitterX, emitterY, current + 1);
				}, this.props.delay);
			}
		}

		/**
   * Set initial styles
   */

	}, {
		key: '_setInitialStyles',
		value: function _setInitialStyles() {
			if (this.parentNode.style.position !== 'relative' || this.parentNode.style.position !== 'absolute') {
				(0, _style2.default)(this.parentNode, {
					position: 'relative'
				});
			}
			if (this.props.contains) {
				(0, _style2.default)(this, {
					overflow: 'hidden'
				});
			} else {
				(0, _style2.default)(this, {
					overflow: null
				});
			}
		}

		/**
   * Should component update
   * @protected
   */

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {
			return false;
		}
	}], [{
		key: 'defaultCss',


		/**
   * Css
   * @protected
   */
		value: function defaultCss(componentName, componentNameDash) {
			return '\n\t\t\t' + componentNameDash + ' {\n\t\t\t\tpointer-events : none;\n\t\t\t\tposition : absolute;\n\t\t\t\ttop : 0;\n\t\t\t\tleft : 0;\n\t\t\t\twidth : 100%;\n\t\t\t\theight : 100%;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__particle {\n\t\t\t\ttop:50%; left:50%;\n\t\t\t\t-webkit-transform: translateX(-50%) translateY(-50%);\n\t\t\t\ttransform: translateX(-50%) translateY(-50%);\n\t\t\t\tposition:absolute;\n\t\t\t\twidth:150%;\n\t\t\t\tborder-radius: 50%;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__particle:after {\n\t\t\t\tcontent:"";\n\t\t\t\tdisplay:block;\n\t\t\t\twidth:100%;\n\t\t\t\theight:0;\n\t\t\t\tpadding-top:100%;\n\t\t\t}\n\t\t';
		}
	}, {
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */
		get: function get() {
			return {
				/**
     * Set if need to stay contained in the parent (overflow hidden)
     * @prop
     * @type 		{Boolean}
     */
				contains: true,

				/**
     * Set if want the ripple to be centered into his parent and not be placed where the user has clicked
     * @prop
     * @type 		{Boolean}
     */
				centered: false,

				/**
     * Set the delay between each ripples if the props.count is more that 1
     * @prop
     * @type 		{Number}
     */
				delay: 130,

				/**
     * Set the number of ripples wanted on each click
     * @prop
     * @type 		{Integer}
     */
				count: 1,

				/**
     * Set the random distance that each ripples will takes relative to the emitter position
     * @prop
     * @type 		{Number}
     */
				spread: 0
			};
		}
	}]);

	return SRippleComponent;
}(_SWebComponent3.default);

exports.default = SRippleComponent;