import Ember from 'ember';
import ENV from 'charcoal/config/environment';

const { computed, Component } = Ember;

const tagName = 'footer';

const author = computed(function() {
  return ENV.author;
});

const year = computed(function() {
  return new Date();
});

export default Component.extend({ year, author, tagName });
