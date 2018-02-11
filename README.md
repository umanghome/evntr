# Evntr

Zero-dependency eventing and pub-sub library for the browser and Node.js.

---

# Installation

## Browser

```html
<script src="path/to/evntr.min.js" type="text/javascript"></script>
<script>
  var evntr = Evntr();
</script>
```

## Node.js

Install from NPM using `npm i --save evntr`, then

```js
import Evntr from 'evntr';
const evntr = Evntr();
```

OR

```js
const evntr = require('evntr')();
```

# Usage

## Listen for an event

```js
evntr.on('myEvent', (some, data) => {
  console.log(some, data);
})
```

## Emit an event

```js
evntr.emit('myEvent', {
  hello: 'world'
}, {
  world: 'hello'
});
```

## Remove a listener

```js
evntr.off('myEvent', myListener);
```

---

# License

[MIT License](https://opensource.org/licenses/MIT) © [Umang Galaiya](https://umanggalaiya.in/)
