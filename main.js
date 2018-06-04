(function() {
  var date = new Date();
  var hours = date.getHours();
  var body = document.body;
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var hue = hours * 15;

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
    body.style.setProperty(
      "--background-color",
      `hsl(${hue}, ${saturation}%, ${lightness}%)`
    );

    body.style.setProperty("--color", `hsl(${hue}, 24%, 15%)`);
  };

  var detectMouseMove = function(mouseEvent) {
    var saturation = parseInt(mouseEvent.clientX / windowWidth * 100, 10);
    var lightness = parseInt(mouseEvent.clientY / windowHeight * 100, 10);

    updateColors(saturation, lightness);
  };

  updateColors("50", "50");

  document.addEventListener("mousemove", throttle(detectMouseMove, 30));
})();
