import Ember from 'ember';

const { Service, RSVP: deferred } = Ember;

function resolve(result) {
  return deferred.resolve(result);
}

function all(iterable) {
  return deferred.all(iterable);
}

function delay(delay_target, amount = 1000) {
  function resolved(promise_results) {
    const {promise, resolve} = deferred.defer();

    function exec() {
      delay_target(promise_results).then(resolve);
    }

    setTimeout(exec, amount);

    return promise;
  }

  return resolved;
}

function reject(reason) {
  return deferred.reject(reason);
}

function make() {
  return deferred.defer();
}

export default Service.extend({ resolve, reject, all, delay, make });
