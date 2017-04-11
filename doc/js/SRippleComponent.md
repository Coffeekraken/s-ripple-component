# SRippleComponent

Extends **SWebComponent**

Provide a nice and simple to use ripple webcomponent fully customizable


### Example
```html
	<div style="height:500px; position:relative;">
	<s-ripple></s-ripple>
	<div style="position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%)">
	 Click to see the ripple effect in action
	</div>
</div>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### contains

Set if need to stay contained in the parent (overflow hidden)

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### centered

Set if want the ripple to be centered into his parent and not be placed where the user has clicked

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### delay

Set the delay between each ripples if the props.count is more that 1

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **130**


### count

Set the number of ripples wanted on each click

Type : **{ Integer }**

Default : **1**


### spread

Set the random distance that each ripples will takes relative to the emitter position

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**