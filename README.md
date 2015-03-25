# Blze Local State

It is a common pattern in Blaze UI code to rely on session
variables:

``` js
Session.setDefault('counter', 0);

Template.hello.helpers({
  key: function () {
    return Session.get('counter');
  }
});

Template.hello.events({
  'click button': function () {
    Session.set('counter', Session.get('counter') + 1);
  }
});
```

There are several problems with this pattern:

1. Relies on the global `Session`, could accidentally
overwrite the variable elsewhere;
2. The same variables are shared across all instances of
the `hello` template, and often times we need to explicitly
reset the state whenever the template is re-rendered.
3. When there are multiple variables it becomes unecessarily
verbose to define and create helpers for each of them.

By using local `ReactiveVar`s instead of `Session` we can
avoid issue 1, but issue 2 and 3 remains the same.

This package provides some syntax sugar to provide local
reactive state to Blaze templates:

``` js
Template.hello.localState(function () {
  // this function is called when a template instance is
  // created to provide its initial local state.
  return {
    // a 'counter' helper will automatically be created.
    counter: 0
  }
});

Template.hello.events({
  'click button': function (event, template) {
    // template instances now have .get() and .set() methods
    // which are reactive
    template.set('counter', template.get('counter') + 1);
  }
});
```