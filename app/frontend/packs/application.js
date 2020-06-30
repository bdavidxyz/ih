require("@rails/ujs").start()
require("turbolinks").start()
// require("@rails/activestorage").start()
// require("channels")

import './bootstrap_custom'
// import '../stylesheets/application'
// import 'bootstrap/dist/js/bootstrap';

// let $ = require('jquery')
import $ from 'jquery'

$(document).on('turbolinks:load', function() {
  console.log(`jQuery version is ${$.fn.jquery}`)
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body',
  });

  $('body').popover({
    selector: '[data-toggle="popover"]',
    container: 'body',
    html: true,
    trigger: 'hover',
  });
});

