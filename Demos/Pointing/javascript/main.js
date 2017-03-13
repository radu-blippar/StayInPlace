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

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function Sin(deg) {
  return Math.sin(toRadians(deg))
}

function Cos(deg) {
  return Math.cos(toRadians(deg))
}

function multiplyMatrix(b, a) {
  var aNumRows = a.length,
    aNumCols = a[0].length,
    bNumRows = b.length,
    bNumCols = b[0].length,
    m = new Array(aNumRows); // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0; // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

function matrixInvert(m) {
  var det = matrixDeterminant(m);
  var a = undefined;
  if (det != 0) {
    a = matrixAdj(m);
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        a[i][j] /= det;
      }
    }
  }
  return a
}

function matrixAdj(m) {
  var a = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  a[0][0] = m[1][2] * m[2][3] * m[3][1] - m[1][3] * m[2][2] * m[3][1] + m[1][3] * m[2][1] * m[3][2] - m[1][1] * m[2][3] * m[3][2] - m[1][2] * m[2][1] * m[3][3] + m[1][1] * m[2][2] * m[3][3];
  a[0][1] = m[0][3] * m[2][2] * m[3][1] - m[0][2] * m[2][3] * m[3][1] - m[0][3] * m[2][1] * m[3][2] + m[0][1] * m[2][3] * m[3][2] + m[0][2] * m[2][1] * m[3][3] - m[0][1] * m[2][2] * m[3][3];
  a[0][2] = m[0][2] * m[1][3] * m[3][1] - m[0][3] * m[1][2] * m[3][1] + m[0][3] * m[1][1] * m[3][2] - m[0][1] * m[1][3] * m[3][2] - m[0][2] * m[1][1] * m[3][3] + m[0][1] * m[1][2] * m[3][3];
  a[0][3] = m[0][3] * m[1][2] * m[2][1] - m[0][2] * m[1][3] * m[2][1] - m[0][3] * m[1][1] * m[2][2] + m[0][1] * m[1][3] * m[2][2] + m[0][2] * m[1][1] * m[2][3] - m[0][1] * m[1][2] * m[2][3];
  a[1][0] = m[1][3] * m[2][2] * m[3][0] - m[1][2] * m[2][3] * m[3][0] - m[1][3] * m[2][0] * m[3][2] + m[1][0] * m[2][3] * m[3][2] + m[1][2] * m[2][0] * m[3][3] - m[1][0] * m[2][2] * m[3][3];
  a[1][1] = m[0][2] * m[2][3] * m[3][0] - m[0][3] * m[2][2] * m[3][0] + m[0][3] * m[2][0] * m[3][2] - m[0][0] * m[2][3] * m[3][2] - m[0][2] * m[2][0] * m[3][3] + m[0][0] * m[2][2] * m[3][3];
  a[1][2] = m[0][3] * m[1][2] * m[3][0] - m[0][2] * m[1][3] * m[3][0] - m[0][3] * m[1][0] * m[3][2] + m[0][0] * m[1][3] * m[3][2] + m[0][2] * m[1][0] * m[3][3] - m[0][0] * m[1][2] * m[3][3];
  a[1][3] = m[0][2] * m[1][3] * m[2][0] - m[0][3] * m[1][2] * m[2][0] + m[0][3] * m[1][0] * m[2][2] - m[0][0] * m[1][3] * m[2][2] - m[0][2] * m[1][0] * m[2][3] + m[0][0] * m[1][2] * m[2][3];
  a[2][0] = m[1][1] * m[2][3] * m[3][0] - m[1][3] * m[2][1] * m[3][0] + m[1][3] * m[2][0] * m[3][1] - m[1][0] * m[2][3] * m[3][1] - m[1][1] * m[2][0] * m[3][3] + m[1][0] * m[2][1] * m[3][3];
  a[2][1] = m[0][3] * m[2][1] * m[3][0] - m[0][1] * m[2][3] * m[3][0] - m[0][3] * m[2][0] * m[3][1] + m[0][0] * m[2][3] * m[3][1] + m[0][1] * m[2][0] * m[3][3] - m[0][0] * m[2][1] * m[3][3];
  a[2][2] = m[0][1] * m[1][3] * m[3][0] - m[0][3] * m[1][1] * m[3][0] + m[0][3] * m[1][0] * m[3][1] - m[0][0] * m[1][3] * m[3][1] - m[0][1] * m[1][0] * m[3][3] + m[0][0] * m[1][1] * m[3][3];
  a[2][3] = m[0][3] * m[1][1] * m[2][0] - m[0][1] * m[1][3] * m[2][0] - m[0][3] * m[1][0] * m[2][1] + m[0][0] * m[1][3] * m[2][1] + m[0][1] * m[1][0] * m[2][3] - m[0][0] * m[1][1] * m[2][3];
  a[3][0] = m[1][2] * m[2][1] * m[3][0] - m[1][1] * m[2][2] * m[3][0] - m[1][2] * m[2][0] * m[3][1] + m[1][0] * m[2][2] * m[3][1] + m[1][1] * m[2][0] * m[3][2] - m[1][0] * m[2][1] * m[3][2];
  a[3][1] = m[0][1] * m[2][2] * m[3][0] - m[0][2] * m[2][1] * m[3][0] + m[0][2] * m[2][0] * m[3][1] - m[0][0] * m[2][2] * m[3][1] - m[0][1] * m[2][0] * m[3][2] + m[0][0] * m[2][1] * m[3][2];
  a[3][2] = m[0][2] * m[1][1] * m[3][0] - m[0][1] * m[1][2] * m[3][0] - m[0][2] * m[1][0] * m[3][1] + m[0][0] * m[1][2] * m[3][1] + m[0][1] * m[1][0] * m[3][2] - m[0][0] * m[1][1] * m[3][2];
  a[3][3] = m[0][1] * m[1][2] * m[2][0] - m[0][2] * m[1][1] * m[2][0] + m[0][2] * m[1][0] * m[2][1] - m[0][0] * m[1][2] * m[2][1] - m[0][1] * m[1][0] * m[2][2] + m[0][0] * m[1][1] * m[2][2];

  return a;
}

function matrixDeterminant(m) {
  var det =
    m[0][3] * m[1][2] * m[2][1] * m[3][0] - m[0][2] * m[1][3] * m[2][1] * m[3][0] - m[0][3] * m[1][1] * m[2][2] * m[3][0] + m[0][1] * m[1][3] * m[2][2] * m[3][0] +
    m[0][2] * m[1][1] * m[2][3] * m[3][0] - m[0][1] * m[1][2] * m[2][3] * m[3][0] - m[0][3] * m[1][2] * m[2][0] * m[3][1] + m[0][2] * m[1][3] * m[2][0] * m[3][1] +
    m[0][3] * m[1][0] * m[2][2] * m[3][1] - m[0][0] * m[1][3] * m[2][2] * m[3][1] - m[0][2] * m[1][0] * m[2][3] * m[3][1] + m[0][0] * m[1][2] * m[2][3] * m[3][1] +
    m[0][3] * m[1][1] * m[2][0] * m[3][2] - m[0][1] * m[1][3] * m[2][0] * m[3][2] - m[0][3] * m[1][0] * m[2][1] * m[3][2] + m[0][0] * m[1][3] * m[2][1] * m[3][2] +
    m[0][1] * m[1][0] * m[2][3] * m[3][2] - m[0][0] * m[1][1] * m[2][3] * m[3][2] - m[0][2] * m[1][1] * m[2][0] * m[3][3] + m[0][1] * m[1][2] * m[2][0] * m[3][3] +
    m[0][2] * m[1][0] * m[2][1] * m[3][3] - m[0][0] * m[1][2] * m[2][1] * m[3][3] - m[0][1] * m[1][0] * m[2][2] * m[3][3] + m[0][0] * m[1][1] * m[2][2] * m[3][3];
  return det;
}

function printMatrix(a) {
  var aNumRows = a.length;
  var aNumCols = a[0].length;
  console.log(' ┌');
  var t = "";
  for (var r = 0; r < aNumRows; ++r) {
    t = " │";
    for (var c = 0; c < aNumCols; ++c) {
      if (Math.abs(a[r][c]) < 0.01) {
        val = "0*";
      } else {
        val = "" + a[r][c];
      }
      t += " " + val.substr(0, 7);
      if (c < aNumCols - 1) {
        t += ", ";
      }
    }
    console.log(t)
  }
  console.log(' └');
}

function XYZ_to_ZYX(rotations, inputRadians, returnRadians) {
  var aa = rotations[0];
  var bb = rotations[1];
  var cc = rotations[2];

  if (inputRadians) {
    aa = toDegrees(aa);
    bb = toDegrees(bb);
    cc = toDegrees(cc);
  }

  var Rx = [
    [1, 0, 0],
    [0, Cos(aa), -Sin(aa)],
    [0, Sin(aa), Cos(aa)]
  ];

  var Ry = [
    [Cos(bb), 0, Sin(bb)],
    [0, 1, 0],
    [-Sin(bb), 0, Cos(bb)]
  ];

  var Rz = [
    [Cos(cc), -Sin(cc), 0],
    [Sin(cc), Cos(cc), 0],
    [0, 0, 1]
  ];

  var IJK = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];

  var IJKx = multiplyMatrix(IJK, Rx);
  var IJKy = multiplyMatrix(IJKx, Ry);
  var IJKz = multiplyMatrix(IJKy, Rz);

  var out_x = Math.atan2(-IJKz[1][2], IJKz[2][2]);
  var out_y = Math.atan2(IJKz[0][2], IJKz[2][2] * Math.cos(out_x) - IJKz[1][2] * Math.sin(out_x));
  var out_z = Math.atan2(IJKz[1][0] * Math.cos(out_x) + IJKz[2][0] * Math.sin(out_x), IJKz[1][1] * Math.cos(out_x) + IJKz[2][1] * Math.sin(out_x));

  if (returnRadians) {
    return [out_x, out_y, out_z]
  } else {
    return [toDegrees(out_x), toDegrees(out_y), toDegrees(out_z)]
  }
}

function GetGM(model) {
  var m = model.getGlobalMatrix();
  return [
    [m[0], m[4], m[8], -m[12]],
    [m[1], m[5], m[9], -m[13]],
    [m[2], m[6], m[10], -m[14]],
    [m[3], m[7], m[11], m[15]]
  ];
}

function SetMatrix(itsParent, model, m) {

  model.setParent(itsParent);

  var t = [-m[0][3], -m[1][3], -m[2][3]];
  var r = [];
  r.push(Math.atan2(m[2][1], m[2][2]));
  r.push(Math.atan2(-m[2][0], Math.sqrt(m[2][2] * m[2][2] + m[2][1] * m[2][1])));
  r.push(Math.atan2(m[1][0], m[0][0]));

  q = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  q[0][0] = Math.cos(r[1]) * Math.cos(r[3 - 1]);
  q[0][1] = Math.cos(r[2]) * Math.sin(r[1 - 1]) * Math.sin(r[1]) - Math.cos(r[1 - 1]) * Math.sin(r[2])
  q[0][2] = Math.cos(r[0]) * Math.cos(r[2]) * Math.sin(r[1]) + Math.sin(r[0]) * Math.sin(r[2])

  q[1][0] = Math.cos(r[1]) * Math.sin(r[2]);
  q[1][1] = Math.cos(r[0]) * Math.cos(r[2]) + Math.sin(r[0]) * Math.sin(r[1]) * Math.sin(r[2]);
  q[1][2] = -Math.cos(r[2]) * Math.sin(r[0]) + Math.cos(r[0]) * Math.sin(r[1]) * Math.sin(r[2]);

  q[2][0] = -Math.sin(r[1]);
  q[2][1] = Math.cos(r[1]) * Math.sin(r[0]);
  q[2][2] = Math.cos(r[0]) * Math.cos(r[1]);

  var s = m[0][0] + m[0][1] + m[0][2] + m[1][0] + m[1][1] + m[1][2] + m[2][0] + m[2][1] + m[2][2];
  s = s / (q[0][0] + q[0][1] + q[0][2] + q[1][0] + q[1][1] + q[1][2] + q[2][0] + q[2][1] + q[2][2]);

  r = [toDegrees(r[0]), toDegrees(r[1]), toDegrees(r[2])];
  r = XYZ_to_ZYX(r, false, false)

  model.setTranslation(t)
  model.setRotation(r);
  model.setScale(s);
}

function Reparent(model, newParent) {
  SetMatrix(newParent, model, multiplyMatrix(GetGM(model), matrixInvert(GetGM(newParent))))
}

function Point(thePointer, theTarget) {

  var PointerParent = thePointer.getParent();
  SceneMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];

  SetMatrix(blipp.getScene(), thePointer, multiplyMatrix(GetGM(thePointer), matrixInvert(SceneMatrix)))

  var GM_Pointer = thePointer.getGlobalMatrix();
  var GM_Target = theTarget.getGlobalMatrix();

  var tPointer = [GM_Pointer[12], GM_Pointer[13], GM_Pointer[14]];
  var tTarget = [GM_Target[12], GM_Target[13], GM_Target[14]];

  var d = [tTarget[0] - tPointer[0], tTarget[1] - tPointer[1], tTarget[2] - tPointer[2]];

  var x = Math.atan2(-d[1], d[0]);
  var y = Math.atan2(d[2], -Math.sqrt(d[0] * d[0] + d[1] * d[1]));

  var A = [
    [0, -Math.cos(y), Math.sin(y), 0],
    [Math.cos(x), -Math.sin(x) * Math.sin(y), -Math.sin(x) * Math.cos(y), 0],
    [Math.sin(x), Math.cos(x) * Math.sin(y), Math.cos(x) * Math.cos(y), 0],
    [0, 0, 0, 1]
  ];

  var B = [
    [0, 0, 1, tPointer[2]],
    [0, 1, 0, tPointer[1]],
    [1, 0, 0, tPointer[0]],
    [0, 0, 0, 1]
  ];

  var m = multiplyMatrix(A, matrixInvert(B));

  var t = [-m[0][3], -m[1][3], -m[2][3]];
  var r = [];
  r.push(Math.atan2(m[2][1], m[2][2]));
  r.push(Math.atan2(-m[2][0], Math.sqrt(m[2][2] * m[2][2] + m[2][1] * m[2][1])));
  r.push(Math.atan2(m[1][0], m[0][0]));

  r = [toDegrees(r[0]), toDegrees(r[1]), toDegrees(r[2])];
  r = XYZ_to_ZYX(r, false, false)

  thePointer.setTranslation(t)
  thePointer.setRotation(r);

  Reparent(thePointer, PointerParent)
}

var colors = ["ff0000", "00ff00", "0000ff", "ffff00", "ff00ff", "00ffff"];
var totalCubes = 6;
var totalStack = 4;
var Cubes = [];
var Stack = [];

scene.addMaterial('Default')
  .setType('matt');

var _01___Default = scene.addMaterial('01___Default')
  .setType('matt')
  .setDiffuseColor([0.0705882, 1, 0]);

var _03___Default = scene.addMaterial('03___Default')
  .setType('matt')
  .setDiffuseColor([1, 1, 1]);

var _02___Default = scene.addMaterial('02___Default')
  .setType('matt');

function Spin(model) {
  var rot0 = model.getRotationZ();
  model.animate().duration(1000).rotationZ(rot0 + 360).onEnd = function () {
    model.setRotationZ(rot0);
  }
}

scene.onCreate = function () {

  for (var i = 0; i < totalStack; i++) {
    var Cube;
    if (i == 0) {
      Cube = scene.addMesh('Box.b3m')
        .setScale(1.5)
        .setTranslation(rr(-20, 20) + 300, rr(-20, 20), 0)
    } else {
      Cube = Stack[i - 1].addMesh('Box.b3m')
        .setScale(rr(0.7, 0.9))
        .setTranslation(rr(-20, 20), rr(-20, 20), rr(120, 150))
        .setRotationX(rr(-30, 30))
        .setRotationY(rr(-30, 30))
        .setRotationZ(rr(-180, 180))
    }

    Cube.n = i;

    Cube
      .setName("Stack_" + i)
      .setColor(colors[i])
      .setAlpha(0.3)
      .setType('phantom')
      .setMaterial('Default');

    Cube.onTouchEnd = function () {
      Spin(this)
    }

    Stack.push(Cube)
  }

  for (var i = 0; i < totalCubes; i++) {
    var Cube;
    if (i == 0) {
      Cube = scene.addMesh('Box.b3m')
        .setScale(1.5)
        .setTranslation(rr(-20, 20) - 300, rr(-20, 20), 0)
    } else {
      Cube = Cubes[i - 1].addMesh('Box.b3m')
        .setScale(rr(0.7, 0.9))
        .setTranslation(rr(-20, 20), rr(-20, 20), rr(120, 150))
        .setRotationX(rr(-30, 30))
        .setRotationY(rr(-30, 30))
        .setRotationZ(rr(-180, 180))
    }

    Cube.n = i;

    Cube
      .setName("Cube_" + i)
      .setColor(colors[i])
      .setAlpha(0.7)
      .setType('phantom')
      .setMaterial('Default');

    Cube.onTouchEnd = function () {
      Spin(this)
    }

    Cubes.push(Cube)
  }

  Pointer = Cubes[totalCubes - 1].addMesh('Pointer.b3m').setScale(3).setColor('00ff00').setMaterial('Default');

  Pointer.onDraw = function () {
    Point(Pointer, Target);
  }

  Target = Stack[totalStack - 1].addMesh('Target.b3m').setScale(3).setColor('ff0000aa').setMaterial('Default');

  Look = scene.getScreen().addSprite().setScale(sW / 2).setTranslation(sW / 2, -sH / 2.2, 0).setColor("00ff0040");
  Look.onTouchEnd = function () {
    var new_p = [rr(-100, 100), rr(-100, 100), rr(150, 250)];
    var new_t = [rr(-100, 100), rr(-100, 100), rr(150, 250)];
    for (var i = 1; i < totalCubes; i++) {
      Cubes[i]
        .setScale(rr(0.7, 0.9))
        .setTranslation(rr(-20, 20), rr(-20, 20), rr(120, 150))
        .setRotationX(rr(-10, 10))
        .setRotationY(rr(-10, 10))
        .setRotationZ(rr(-180, 180))
    }
    for (var i = 1; i < totalStack; i++) {
      Stack[i]
        .setScale(rr(0.7, 0.9))
        .setTranslation(rr(-20, 20), rr(-20, 20), rr(120, 150))
        .setRotationX(rr(-10, 10))
        .setRotationY(rr(-10, 10))
        .setRotationZ(rr(-180, 180))
    }
    Pointer.setTranslation(new_p)
    Target.setTranslation(new_t)

    Point(Pointer, Target);
  }

  Look.onTouchEnd();

  console.log("=======================");
  console.log("RED screen button resets the blipp");
  console.log("GREEN screen button resets the cube towers");
  console.log("Tap on any cube to make it spin 180° on Z");
  console.log("=======================");
}