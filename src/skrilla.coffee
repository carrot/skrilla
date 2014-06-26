class Skrilla
  start: 0
  end: 0
  el: ''
  fixed: false
  keyframes: {}

  constructor: (args) ->
    @[k] = v for k, v of args
    if not @fixed || is_mobile
      @duration = $(@el).height()

  before_init: ->

  init: ->
    @before_init()
    set_keyframes.call(@)
    if @fixed then insert_placeholder.call(@)
    @set_arrow_listeners()

  animate_to: (pos, opts) ->
    if not is_mobile
      s = skrollr.get()
      if s then s.animateTo(@percent_to_absolute(pos), opts)

  percent_to_absolute: (percent) ->
    ((percent * 0.01) * (@end - @start)) + @start

  set_arrow_listeners: ->
    if @arrow
      $(@arrow).on 'click', =>
        ga('send', 'event', @arrow, 'click')
        @animate_to(@arrow_target, {duration: @arrow_duration})

  #
  # private
  #

  set_keyframes = ->
    for el, frames of @keyframes
      for percent, styles of frames
        abs = @percent_to_absolute(percent)
        if el == 'self' then el = ''
        $("#{@el} #{el}").attr("data-#{abs}", concat_styles(styles))

  concat_styles = (styles) ->
    result = ''
    for prop, val of styles
      result += "#{prop}:#{val};"
    result

  insert_placeholder = ->
    $(@el)
      .addClass('fixed')
      .after("<div id='#{@el}-placeholder' style='height: #{@duration}px;'></div>")
