clone.js
========

JavaScript deep object cloning (with cyclic reference support)

This library adds a `clone` method to global `Object` function.
`Object.clone(sourceObject [, deepCloning [, clonePrototypes ]])`

Browser support:
- `Internet Explorer 9+`
- `Firefox 4+`
- `Safari 5+`
- `Chrome/Chromium 5+`
- `Opera 12+`



Examples:

```javascript
var object = {
    foo: "bar",
    now: new Date(),
    regex: /hi/g,
    fn: function hello() {
        console.log('Hello World !');
    }
};
object.self = object;

var clone = Object.clone(object, true);

// all true
clone !== object;
clone.self === clone;
clone.now !== object.now
clone.now.getTime() === object.now.getTime();
clone.regex !== object.regex
clone.fn === object.fn
```

Preserves "Class":

```javascript
function Foo() {
    this.foo = "bar";
}
Foo.prototype.baz = function() {
    console.log(this.foo);
};

var foo = new Foo();
foo.baz(); // => 'bar'


var clone = Object.clone(foo);
clone.baz()             // => 'bar'
clone.foo = "cat";
clone.baz()             // => 'cat'

clone === foo           // false
clone instanceof Foo    // true
clone.__proto__ === foo.__proto__ // true (false when `clonePrototypes` is true)
```
