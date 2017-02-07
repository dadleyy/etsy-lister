import DS from 'ember-data';

const type = 'shop';

export default DS.JSONSerializer.extend({

  normalizeResponse(store, Shop, payload) {
    const {results} = payload;
    const shop      = results['0'];
    const meta      = {};
    const id        = shop.shop_id;
    const data      = [{ id, type, attributes: shop }];
    return { data, meta };
  }

});
