function initialize(application) {
  let keyboard = application.lookup('service:keyboard');
  keyboard.mount();
}

export default { name: 'keyboard', initialize };
