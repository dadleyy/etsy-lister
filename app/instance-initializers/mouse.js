function initialize(application) {
  let mouse = application.lookup('service:mouse');
  mouse.mount();
}

export default { name: 'mouse', initialize };
