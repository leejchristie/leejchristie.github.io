// Header: transparent over dark heroes, solid once you scroll.
(function () {
  var hdr = document.getElementById('hdr');
  if (hdr && hdr.hasAttribute('data-dark')) {
    var onScroll = function () { hdr.classList.toggle('solid', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  var burger = document.getElementById('burger');
  if (burger) burger.addEventListener('click', function () {
    burger.setAttribute('aria-expanded', document.body.classList.toggle('menu'));
  });
})();

// Events: hide the ones whose date has passed, feature the next one.
(function () {
  var today = new Date(); today.setHours(0, 0, 0, 0);
  function upcoming(el) {
    var d = el.getAttribute('data-date');
    if (!d) return true; // date to be confirmed
    var p = d.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]) >= today;
  }
  var next = [].filter.call(document.querySelectorAll('.next[data-date]'), upcoming)[0];
  if (next) next.hidden = false;

  var list = document.querySelector('.events');
  if (!list) return;
  var shown = 0;
  [].forEach.call(list.querySelectorAll('.ev'), function (ev) {
    if (upcoming(ev)) { if (!shown++) ev.classList.add('hl'); } else ev.hidden = true;
  });
  var empty = list.querySelector('.ev-empty');
  if (empty) empty.hidden = shown > 0;
})();

// Insights: topic filter buttons.
(function () {
  var chips = document.querySelectorAll('.chip');
  if (!chips.length) return;
  var cards = document.querySelectorAll('[data-topics]');
  var none = document.querySelector('.none');
  [].forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      var topic = chip.getAttribute('data-topic'), n = 0;
      [].forEach.call(chips, function (c) {
        c.classList.toggle('on', c === chip);
        c.setAttribute('aria-pressed', c === chip);
      });
      [].forEach.call(cards, function (card) {
        var match = !topic || card.getAttribute('data-topics').split('|').indexOf(topic) > -1;
        card.hidden = !match; if (match) n++;
      });
      if (none) none.hidden = n > 0;
    });
  });
})();

// Contact page: preselect the talk when arriving from "Enquire about this talk".
(function () {
  var sel = document.getElementById('talk');
  var m = /[?&]talk=([^&]+)/.exec(location.search);
  if (sel && m) sel.value = decodeURIComponent(m[1]);
})();

// Forms. With an endpoint set in _config.yml they post there;
// without one they open a ready-written email instead.
[].forEach.call(document.querySelectorAll('form[data-form]'), function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = form.querySelector('.ok');
    var say = function (t) { if (ok) { ok.textContent = t; ok.hidden = false; } };
    var endpoint = form.getAttribute('data-endpoint');
    var data = new FormData(form);
    if (endpoint) {
      say('Sending…');
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw 0; form.reset(); say('Thanks, that has been sent.'); })
        .catch(function () { say('Sorry, that did not send. Please email ' + form.getAttribute('data-email') + ' instead.'); });
      return;
    }
    var lines = [];
    data.forEach(function (v, k) {
      var field = form.elements[k];
      if (field && field.tagName === 'SELECT') v = field.options[field.selectedIndex].text;
      if (v) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v);
    });
    location.href = 'mailto:' + form.getAttribute('data-email') +
      '?subject=' + encodeURIComponent(form.getAttribute('data-subject')) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    say('Your email app should now open with the message ready to send.');
  });
});
