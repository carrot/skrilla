(function(window) {
  var Skrilla;
  Skrilla = (function() {
    var concat_styles, set_keyframes;

    Skrilla.prototype.start = 0;

    Skrilla.prototype.end = 0;

    Skrilla.prototype.el = '';

    Skrilla.prototype.keyframes = {};

    function Skrilla(args) {
      var k, v;
      for (k in args) {
        v = args[k];
        this[k] = v;
      }
    }

    Skrilla.prototype.beforeInit = function() {};

    Skrilla.prototype.afterInit = function() {};

    Skrilla.prototype.init = function() {
      this.beforeInit();
      set_keyframes.call(this);
      this.set_arrow_listeners();
      return this.afterInit();
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

    return Skrilla;

  })();
  Skrilla.version = '0.0.1';
  if (typeof define === 'function' && define.amd) {
    return define(function() {
      return Skrilla;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    return module.exports = Skrilla;
  } else {
    return window.Skrilla = Skrilla;
  }
})(window);
