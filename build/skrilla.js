var Skrilla;

Skrilla = (function() {
  var concat_styles, insert_placeholder, set_keyframes;

  Skrilla.prototype.start = 0;

  Skrilla.prototype.end = 0;

  Skrilla.prototype.el = '';

  Skrilla.prototype.fixed = false;

  Skrilla.prototype.keyframes = {};

  function Skrilla(args) {
    var k, v;
    for (k in args) {
      v = args[k];
      this[k] = v;
    }
    if (!this.fixed || is_mobile) {
      this.duration = $(this.el).height();
    }
  }

  Skrilla.prototype.before_init = function() {};

  Skrilla.prototype.init = function() {
    this.before_init();
    set_keyframes.call(this);
    if (this.fixed) {
      insert_placeholder.call(this);
    }
    return this.set_arrow_listeners();
  };

  Skrilla.prototype.animate_to = function(pos, opts) {
    var s;
    if (!is_mobile) {
      s = skrollr.get();
      if (s) {
        return s.animateTo(this.percent_to_absolute(pos), opts);
      }
    }
  };

  Skrilla.prototype.percent_to_absolute = function(percent) {
    return ((percent * 0.01) * (this.end - this.start)) + this.start;
  };

  Skrilla.prototype.set_arrow_listeners = function() {
    if (this.arrow) {
      return $(this.arrow).on('click', (function(_this) {
        return function() {
          ga('send', 'event', _this.arrow, 'click');
          return _this.animate_to(_this.arrow_target, {
            duration: _this.arrow_duration
          });
        };
      })(this));
    }
  };

  set_keyframes = function() {
    var abs, el, frames, percent, styles, _ref, _results;
    _ref = this.keyframes;
    _results = [];
    for (el in _ref) {
      frames = _ref[el];
      _results.push((function() {
        var _results1;
        _results1 = [];
        for (percent in frames) {
          styles = frames[percent];
          abs = this.percent_to_absolute(percent);
          if (el === 'this') {
            el = '';
          }
          _results1.push($("" + this.el + " " + el).attr("data-" + abs, concat_styles(styles)));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  concat_styles = function(styles) {
    var prop, result, val;
    result = '';
    for (prop in styles) {
      val = styles[prop];
      result += "" + prop + ":" + val + ";";
    }
    return result;
  };

  insert_placeholder = function() {
    return $(this.el).addClass('fixed').after("<div id='" + this.el + "-placeholder' style='height: " + this.duration + "px;'></div>");
  };

  return Skrilla;

})();
