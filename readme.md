Skrilla
=======

A clean interface to the [skrollr](https://github.com/Prinzhorn/skrollr) animation library. Use Javascript objects to manage skrollr animation modules in a more maintainable way.

### Dependencies

- [jquery](http://jquery.com/) - want to eventually remove this dependency
- [skrollr](https://github.com/prinzhorn/skrollr) - not an explicit dependency (skrollr is never called within skrilla), but this is designed to work with skrollr, so you'll definitely need it.

### Setup

Find what you need inside the `dist/` directory. Also available on [npm](https://www.npmjs.org/package/skrilla) and [bower](http://bower.io/).

### Why should you care?

First, familiarize yourself with how [skrollr](https://github.com/prinzhorn/skrollr) works. This is the main animation library doing the heavy lifting and is the main dependency of the project.

One of the problems with skrollr is that you must define keyframes on every element you want to animate through data attributes. This can be a maintainability nightware when you have groups of elements that contribute to a one composed animation effect. If you need the group of elements to start animating at a different scroll position or over a different pixel distance, you must update each data attribute one by one, not only for those elements, but most likely a lot of other animations on the page.

Skrilla solves this by grouping skrollr animated elements together so that their keyframes are defined relative to one another through a wrapper object. The object represents a group of related elements and keyframes with a defined start and end point (measured in pixels from the top of the window). Keyframes are defined as percentages, so that if the duration or start point of an animation needs to change, all the individual elements keyframe definitions will be correct relative to each other. Very similar to how CSS animations are defined with keyframes.

### Usage

```coffee
class HeaderAnimation extends Skrilla
  start: 1000
  end: 2000
  el: '#header'

  beforeInit: ->
    console.log('this is executed right before the data attributes are applied')

  afterInit: ->
    console.log('this is executed right after the data attributes are applied')

  keyframes:
    'this':
      0:
        display: 'block'
        top: '500px'
        'background-color': 'rgb(0,0,0)'

      50:
        top: '150px'
        'background-color': 'rgb(255,255,255)'

      100:
        display: 'none'
        top: '-500px'

    '#baby-elephant':
      0:
        display: 'block'
        left: '-100px'
        'background-color': 'rgb(0,0,0)'

      33:
        top: '10px'
        'background-color': 'rgb(255,255,255)'

      100:
        display: 'none'
        left: '-200px'

(new HeaderAnimation).init()
skrollr.init()
```

Calling `(new HeaderAnimation).init()` here will apply these keyframes onto the elements through the data attributes interface to skrollr. Once initialized, **it's up to you** to call `skrollr.init()`, this is for maximum flexibility. Later down the road, I may integrate this into Skrilla itself and add hooks for before skrollr is intiialized.

### Contributing

You'll need to install [Node.js](http://nodejs.org/) and [Bower](http://bower.io/) in order to run the test suite.

- `git clone git@github.com:carrot/skrilla.git && cd skrilla` - clone the project
- `npm install` - install node dependencies
- `npm run bower` - install test suite's front end dependencies
- `npm test` - run tests

### Roadmap

This library is still in early development. The following features are on the near horizon:

- a `Skrilla.Series` object that manages and coordinates several Skrilla animation objects. Mainly for single page animation experiences that can be divided into different modules, the `Series` object will allow easy reordering of modules.
- Integration with jQuery Waypoints using a similar keyframe syntax.
