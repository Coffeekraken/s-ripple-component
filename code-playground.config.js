module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-ripple-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="container">
					<h1 class="h1 m-b-small">
						Coffeekraken s-ripple-component
					</h1>
					<p class="p m-b-bigger">
						Provide a nice and simple to use ripple webcomponent fully customizable
					</p>
					<div class="card m-b-big">
						<span>Click here</span>
						<s-ripple count="2"></s-ripple>
					</div>
					<a href="#" class="btn">
						<s-ripple></s-ripple>
						Click me!!!
					</a>
					<a href="#" class="btn btn--primary">
						<s-ripple></s-ripple>
						Click me!!!
					</a>
					<a href="#" class="btn btn--secondary">
						<s-ripple></s-ripple>
						Click me!!!
					</a>
				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				@include s-button-classes();
				.container {
					@include s-position(absolute, middle, center);
					min-width:80vw;
				}
				.card {
					background-color: white;
					@include s-depth(5);
					height: 30vh;
					line-height: 30vh;
					text-align: center;
					user-select: none;
					border: 5px solid white;
					span {
						pointer-events:none;
					}
				}
				@include s-ripple-classes();
			`
		},
		js : {
			language : 'js',
			data : `
				import 'webcomponents.js/webcomponents-lite'
				import SRippleComponent from './dist/index'
			`
		}
	}
}
