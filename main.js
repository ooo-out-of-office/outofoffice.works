(function() {
  var date = new Date();
  var body = document.body;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var saturation = 50;
  var lightness = 50;

  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last, deferTimer;

    return function() {
      var context = scope || this;

      var now = +new Date(),
        args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  var updateColors = function(saturation, lightness) {
    var hue = (date.getHours() + date.getMinutes() / 60) * 15;

    body.style.setProperty(
      "--background-color",
      `hsl(${hue}, ${saturation}%, ${lightness}%)`
    );

    body.style.setProperty("--color", `hsl(${hue}, 24%, 15%)`);
  };

  var detectMouseMove = function(mouseEvent) {
    saturation = parseInt((mouseEvent.clientX / windowWidth) * 100, 10);
    lightness = parseInt((mouseEvent.clientY / windowHeight) * 100, 10);

    updateColors(saturation, lightness);
  };

  updateColors(saturation, lightness);

  window.setInterval(updateColors, 10000, saturation, lightness);

  document.addEventListener("mousemove", throttle(detectMouseMove, 30));
})();
