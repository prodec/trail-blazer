import Ember from 'ember';

export default Ember.Component.extend({
  click: function(e) {
    var clicked = $(e.target).parent('button'), button;
    clicked.length ? button = clicked : button = $(e.target);
    this.set('currentSlideout', $('#slideout-' + button.prop('id')));
    this.set('currentButton', button);
    this.slide();
  },

  slide: function() {
    this.get('currentButton').hasClass('clicked') ? this.slidein() : this.slideout(); 
  },

  slideout: function() {
    var slideout = this.get('currentSlideout');
    var button = this.get('currentButton');

    this.resetAnimation();
    slideout.css('border-right-color', button.css('background-color'));
    slideout.addClass('menu-slideout-on');
    button.addClass('clicked');
  },

  slidein: function() {
    this.get('currentSlideout').one('transitionend', function() {
      $('.slide').addClass('after-transition');
    });
   
    $('.menu-slideout-on').removeClass('menu-slideout-on');
    this.get('currentButton').removeClass('clicked');
  },

  resetAnimation: function() {
    $('.clicked').removeClass('clicked');
    $('.slide').removeClass('after-transition');
    this.get('currentSlideout').removeClass('menu-slideout-on');
    $('.menu-slideout-on').removeClass('menu-slideout-on');
  }
});
