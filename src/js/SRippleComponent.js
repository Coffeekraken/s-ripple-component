import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import SParticlesSystemComponent from 'coffeekraken-s-particles-system-component'
import __style from 'coffeekraken-sugar/js/dom/style'
import __offset from 'coffeekraken-sugar/js/dom/offset'

/**
 * @name 	Ripple
 * Display a ripple on click
 * @styleguide 	Effects / Ripple
 * @example 	html
 * <div style="height:500px; position:relative;">
 * 	<s-ripple></s-ripple>
 * 	<div style="position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%)">
 * 	 Click to see the ripple effect in action
 * 	</div>
 * </div>
 */

export default class SRippleComponent extends SWebComponent {

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 */
	static get defaultProps() {
		return {
			/**
			 * Set if need to stay contained in the parent (overflow hidden)
			 * @prop
			 * @type 		{Boolean}
			 */
			contains : true,

			/**
			 * Set if want the ripple to be centered into his parent and not be placed where the user has clicked
			 * @prop
			 * @type 		{Boolean}
			 */
			centered : false,

			/**
			 * Set the delay between each ripples if the props.count is more that 1
			 * @prop
			 * @type 		{Number}
			 */
			delay : 130,

			/**
			 * Set the number of ripples wanted on each click
			 * @prop
			 * @type 		{Integer}
			 */
			count : 1,

			/**
			 * Set the random distance that each ripples will takes relative to the emitter position
			 * @prop
			 * @type 		{Number}
			 */
			spread : 0
		};
	}

	/**
	 * Css
	 */
	static css(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				pointer-events : none;
				position : absolute;
				top : 0;
				left : 0;
				width : 100%;
				height : 100%;
			}
			.${componentNameDash}__particle {
				top:50%; left:50%;
				-webkit-transform: translateX(-50%) translateY(-50%);
				transform: translateX(-50%) translateY(-50%);
				position:absolute;
				width:150%;
				border-radius: 50%;
			}
			.${componentNameDash}__particle:after {
				content:"";
				display:block;
				width:100%;
				height:0;
				padding-top:100%;
			}
		`;
	}

	/**
	 * Component will mount
	 * @definition 		SWebComponent.componentWillMount
	 */
	componentWillMount() {
		super.componentWillMount();
		this._particlesSystem = null;
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 */
	componentMount() {
		super.componentMount();
		// set initial styles
		this._setInitialStyles();
		// listen for click on parent
		this.parentNode.addEventListener('click', this._onParentClick.bind(this));
		this._parentNode = this.parentNode;
	}

	/**
	 * Component unmount
	 * @definition 		SWebComponent.componentUnmount
	 */
	componentUnmount() {
		super.componentUnmount();
		// do not listen for click anymore
		this._parentNode.removeEventListener('click', this._onParentClick);
	}

	/**
	 * When click on parent, trigger a ripple
	 */
	_onParentClick(e) {

		// calculate position of the emitter
		let emitterX, emitterY;
		if (this.props.centered) {
			emitterX = this.offsetWith * .5;
			emitterY = this.offsetHeight * .5;
		} else {
			const elmOffset = __offset(this);
			emitterX = e.pageX - elmOffset.left;
			emitterY = e.pageY - elmOffset.top;
		}

		// add a particle system
		if ( ! this._particlesSystem) {
			this._particlesSystem = document.createElement('s-particles-system').setProps({
				particleClass : `${this._componentNameDash}__particle`,
				loop : false
			});
			this.appendChild(this._particlesSystem);
		}

		// amit a particle
		this._emitRipples(emitterX, emitterY);
	}

	/**
	 * Emit ripples
	 */
	_emitRipples(emitterX, emitterY, current = 1) {

		let emX = emitterX,
			emY = emitterY;

		// handle spread
		if (this.props.spread) {
			emX += -this.props.spread + Math.round(Math.random() * (this.props.spread * 2));
			emY += -this.props.spread + Math.round(Math.random() * (this.props.spread * 2));
		}

		// set emitter position
		this._particlesSystem.setProps({
			emitterX : emX,
			emitterY : emY
		});

		// emit a particle
		this._particlesSystem.emitParticle();
		// check if need more that 1
		if (this.props.count > 1 && current < this.props.count) {
			setTimeout(() => {
				this._emitRipples(emitterX, emitterY, current+1);
			}, this.props.delay);
		}
	}

	/**
	 * Set initial styles
	 */
	_setInitialStyles() {
		if (this.parentNode.style.position !== 'relative'
			|| this.parentNode.style.position !== 'absolute'
		) {
			__style(this.parentNode, {
				position : 'relative'
			});
		}
		if (this.props.contains) {
			__style(this, {
				overflow : 'hidden'
			});
		} else {
			__style(this, {
				overflow : null
			});
		}
	}

	/**
	 * Should component update
	 */
	shouldComponentUpdate(nextProps) {
		return false;
	}
}
