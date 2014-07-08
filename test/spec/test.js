(function () {
  'use strict';

  set_up_test()

  describe('Skrilla', function() {
    it('exists', function() {
      expect(Skrilla).to.exist;
    });

    describe('.init', function() {
      describe('applying data attributes', function() {
        it('applies "this" keyframes to the top level el', function() {
          (new Test).init()
          var data = document.querySelector('#test').dataset
          expect(data['1000']).to.equal('top:500px;background-size:100%;');
          expect(data['1500']).to.equal('top:150px;background-size:50%;');
          expect(data['2000']).to.equal('top:-500px;background-size:0%;');
        });

        it('applies keyframes for child els', function() {
          (new Test).init()
          var data = document.querySelector('#child').dataset
          expect(data['1000']).to.equal('top:500px;');
          expect(data['1500']).to.equal('top:150px;');
          expect(data['2000']).to.equal('top:-500px;');
        });
      });
    });

    describe('.beforeInit', function() {
      it('is a before hook to .init', function () {
        var before_init_test = false
        var test = new Test
        test.beforeInit = function () { window.before_init_test = true }
        test.init()
        expect(window.before_init_test).to.equal(true)
      })
    });
  });

  function set_up_test() {
    var Test,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

    Test = (function(_super) {
      __extends(Test, _super);

      function Test() {
        return Test.__super__.constructor.apply(this, arguments);
      }

      Test.prototype.start = 1000;

      Test.prototype.end = 2000;

      Test.prototype.el = '#test';

      Test.prototype.before_init = function() {};

      Test.prototype.keyframes = {
        'this': {
          0: {
            top: '500px',
            'background-size': '100%'
          },
          50: {
            top: '150px',
            'background-size': '50%'
          },
          100: {
            top: '-500px',
            'background-size': '0%'
          }
        },

        '#child': {
          0: {
            top: '500px'
          },
          50: {
            top: '150px'
          },
          100: {
            top: '-500px'
          }
        }
      }

      return Test;

    })(Skrilla);
    window.Test = Test
  }
})();
