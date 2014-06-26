Skrilla
=======

A clean interface to the [skrollr](https://github.com/Prinzhorn/skrollr) animation library. Use Javascript objects to manage skrollr animation modules in a more maintainable way.

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Dependencies

[skrollr](https://github.com/prinzhorn/skrollr)

### Why should you care?

First, familiarize yourself with how [skrollr](https://github.com/prinzhorn/skrollr) works. This is the main animation library doing the heavy lifting and is the main dependency of the project.

One of the problems with skrollr is that you must define keyframes on every element you want to animate through data attributes. This can be a maintainability nightware when you have groups of elements that contribute to a one composed animation effect. If you need the group of elements to start animating at a different scroll position or over a different pixel distance, you must update each data attribute one by one, not only for those elements, but most likely a lot of other animations on the page.

Skrilla solves this by grouping skrollr animated elements together so that their keyframes are defined relative to one another through a wrapper object. The object represents a group of related elements and keyframes with a defined start and end point (measured in pixels from the top of the window). Keyframes are defined as percentages, so that if the duration or start point of an animation needs to change, all the individual elements keyframe definitions will be correct relative to each other. Very similar to how CSS animations are defined with keyframes.

### Usage

```coffee
class ElephantMosaic extends Skrilla
  start: 1000
  end: 2000
  el: '#main'

  before_init: ->
    console.log('this is executed right before the data attributes are applied')

  keyframes:

    '#elephant':
      0:
        display: 'block'
        top: '500px'
        background-color: 'rgb(0,0,0)'

      50:
        top: '150px'
        background-color: 'rgb(255,255,255)'

      100:
        display: 'none'
        top: '-500px'

    '#baby-elephant':
      0:
        display: 'block'
        left: '-100px'
        background-color: 'rgb(0,0,0)'

      33:
        top: '10px'
        background-color: 'rgb(255,255,255)'

      100:
        display: 'none'
        left: '-200px'

(new ElephantMosaic).init()
skrollr.init()
```

Calling `(new ElephantMosaic).init()` here will apply these keyframes onto the elements through the data attributes interface to skrollr. Once initialized, **it's up to you** to call `skrollr.init()`, this is for maximum flexibility. Later down the road, I may integrate this into Skrilla itself and add hooks for before skrollr is intiialized.

### Roadmap

This library is still in early development. The following features are on the near horizon:

- a `Skrilla.Series` object that manages and coordinates several Skrilla animation objects. Mainly for single page animation experiences that can be divided into different modules, the `Series` object will allow easy reordering of modules.
- Integration with jQuery Waypoints using a similar keyframe syntax.
