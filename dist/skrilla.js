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
      return this.afterInit();
    };

    Skrilla.prototype.percent_to_absolute = function(percent) {
      return ((percent * 0.01) * (this.end - this.start)) + this.start;
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
