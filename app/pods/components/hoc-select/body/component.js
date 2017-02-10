import DeferredList from 'charcoal/pods/components/deferred/result-list/component';
import layout from 'charcoal/pods/components/hoc-select/body/template';

const actions = {
  select(item) {
    const delegate = this.get('delegate');
    delegate.select(item);
  }
};

export default DeferredList.extend({ layout, actions });
