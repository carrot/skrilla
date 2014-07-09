((window) ->
  class Skrilla
    start: 0
    end: 0
    el: ''
    keyframes: {}

    constructor: (args) ->
      @[k] = v for k, v of args

    beforeInit: ->

    afterInit: ->

    init: ->
      @beforeInit()
      set_keyframes.call(@)
      @afterInit()

    percent_to_absolute: (percent) ->
      ((percent * 0.01) * (@end - @start)) + @start

    #
    # private
    #

    set_keyframes = ->
      for el, frames of @keyframes
        for percent, styles of frames
          abs = @percent_to_absolute(percent)
          if el == 'this' then el = ''
          $("#{@el} #{el}").attr("data-#{abs}", concat_styles(styles))

    concat_styles = (styles) ->
      result = ''
      for prop, val of styles
        result += "#{prop}:#{val};"
      result

  Skrilla.version = '0.0.1'

  if (typeof define == 'function' && define.amd)
    define -> Skrilla
  else if (typeof module != 'undefined' && module.exports)
    module.exports = Skrilla
  else
    window.Skrilla = Skrilla

)(window)
