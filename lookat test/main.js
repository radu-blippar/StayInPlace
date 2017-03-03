var blipp = require('blippar').blipp;
var scene = blipp.addScene('default');
scene.addMaterial('Default').setType('matt');

var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003;

Reset = scene.getScreen().addSprite().setScale(sW / 2).setTranslation(-sW / 2, -sH / 2.2, 0).setColor("ff000040");
Reset.onTouchEnd = function () {
  blipp.goToBlipp(blipp.getAddress());
}

function rr(min, max) { //RandomRange
  return (min + Math.random() * (max - min))
}

scene.onCreate = function () {

  p0 = scene.addTransform();
  p1 = p0.addTransform();
  p2 = p1.addTransform();
  p3 = p2.addTransform();

  Pointer = p3.addMesh('Pointer.b3m').setColor('00ff00').setMaterial('Default');

  Target = scene.addMesh('Target.b3m').setColor('ff0000aa').setMaterial('Default');

  Look = scene.getScreen().addSprite().setScale(sW / 2).setTranslation(sW / 2, -sH / 2.2, 0).setColor("00ff0040");
  Look.onTouchEnd = function () {
    var p = [rr(-400, 400), rr(-400, 400), rr(-400, 400)];
    var t = [rr(-400, 400), rr(-400, 400), rr(-400, 400)];
    var d = [t[0] - p[0], t[1] - p[1], t[2] - p[2]];

    var x = Math.atan2(-d[1], d[0]) * 180 / Math.PI;
    var y = Math.atan2(-d[2], Math.sqrt(d[0] * d[0] + d[1] * d[1])) * 180 / Math.PI;

    Target.setTranslation(t)
    p0.setTranslation(p).setRotationY(90);
    p1.setRotationX(x)
    p2.setRotationY(y)
    p3.setRotationZ(90)
  }

  Look.onTouchEnd();
}