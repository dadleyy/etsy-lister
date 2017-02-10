import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['category-filter'],
  i18n: inject.service(),
  store: inject.service(),

  text: computed('delegate.filters.{filter}', function() {
    const i18n = this.get('i18n');
    const delegate = this.get('delegate');
    const { category } = delegate.get('filters.filter');

    if(!category) {
      return i18n.t('categories');
    }

    const match = this.get('store').peekRecord('category', category);

    if(!match || !match.get('page_title')) {
      return i18n.t('categories');
    }

    return match.get('page_title');
  })

});
