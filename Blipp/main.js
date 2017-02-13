var blipp = require('blippar').blipp;
var scene = blipp.addScene('default');

var markerW = blipp.getMarker().getWidth();
var markerH = blipp.getMarker().getHeight();
var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003;

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

function printMatrix(a) {
  var aNumRows = a.length;
  var aNumCols = a[0].length;
  console.log('-------------------------');
  var t = "";
  for (var r = 0; r < aNumRows; ++r) {
    t = "|";
    for (var c = 0; c < aNumCols; ++c) {
      val = "" + a[r][c];
      t += " " + val.substr(0, 7);
      if (c < aNumCols - 1) {
        t += ", ";
      };
    }
    t += "|";
    console.log(t)
  }
  console.log('-------------------------');
}

function GetMatrix(model) {
  var t = model.getTranslation();
  var r = model.getRotation();
  var s = model.getScale()[0]; //	uniform scale

  var T = [
    [1, 0, 0, -t[0]],
    [0, 1, 0, -t[1]],
    [0, 0, 1, -t[2]],
    [0, 0, 0, 1]
  ];

  var Rx = [
    [1, 0, 0, 0],
    [0, Cos(r[0]), -Sin(r[0]), 0],
    [0, Sin(r[0]), Cos(r[0]), 0],
    [0, 0, 0, 1]
  ];

  var Ry = [
    [Cos(r[1]), 0, Sin(r[1]), 0],
    [0, 1, 0, 0],
    [-Sin(r[1]), 0, Cos(r[1]), 0],
    [0, 0, 0, 1]
  ];

  var Rz = [
    [Cos(r[2]), -Sin(r[2]), 0, 0],
    [Sin(r[2]), Cos(r[2]), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];

  var S = [
    [s, 0, 0, 0],
    [0, s, 0, 0],
    [0, 0, s, 0],
    [0, 0, 0, 1]
  ];

  var SxT = multiplyMatrix(S, T);

  var RxRyRz = multiplyMatrix(multiplyMatrix(Rx, Ry), Rz);

  var RxRyRz_x_SxT = multiplyMatrix(RxRyRz, SxT);

  var cl = RxRyRz_x_SxT;
  for (i = 0; i < cl.length; i++) {
    // console.log(cl[i]);
  }

  model.itsMatrix = RxRyRz_x_SxT;
  console.log("Got matrix for " + model.getName() + ".");
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

  model.setTranslation(t)
  model.setRotation(r);
  model.setScale(s);
}

function Spin(model) {
  var rot0 = model.getRotationZ();
  model.animate().duration(1000).rotationZ(rot0 + 360).onEnd = function () {
    model.setRotationZ(rot0);
  }
}

scene.onCreate = function () {

  blipp.hideUiComponents('navBar');
  scene.addMaterial('Default').setType('matt');

  A = scene.addMesh('A.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('A')
    .setType('solid')
    .setTranslation(-442.665527, 200.677353, -0.000022)
    .setRotation(-0, 0, 30.318306)
    .setScale(1.475041, 1.475041, 1.475041)
    .setColor([0.694, 0.345, 0.106])
    .setMaterial('Default');

  A.onTouchEnd = function () {
    Spin(this)
  }

  B = A.addMesh('B.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('B')
    .setType('solid')
    .setTranslation(-78.604858, -113.293747, 255.59166)
    .setRotation(4.116472, -22.70549, -1.951609)
    .setScale(0.573714, 0.573714, 0.573714)
    .setColor([0.690, 0.102, 0.102])
    .setMaterial('Default');

  B.onTouchEnd = function () {
    Spin(this)
  }

  C = B.addMesh('C.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('C')
    .setType('solid')
    .setTranslation(522.02002, -268.933319, 346.485291)
    .setRotation(42.978809, 1.239354, -37.055176)
    .setScale(1.087075, 1.087075, 1.087075)
    .setTexture('keyboard-keys-r-icon-53039.png')
    .setMaterial('Default');

  Cref = scene.addMesh('Cref.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('Cref')
    .setType('solid')
    .setTranslation(-72.488708, -94.601074, 797.534546)
    .setRotation(51.082714, 7.052786, -3.238514)
    .setScale(0.91994, 0.919939, 0.919939)
    .setSides('both');

  D = scene.addMesh('D.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('D')
    .setType('solid')
    .setTranslation(315.992493, -91.575668, -0.000022)
    .setRotation(0, 0, -5.296601)
    .setScale(1.08199)
    .setColor([0.031, 0.431, 0.529])
    .setMaterial('Default');

  D.onTouchEnd = function () {
    Spin(this)
  }

  E = D.addMesh('E.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('E')
    .setType('solid')
    .setTranslation(-0.266052, 61.794632, 384.275177)
    .setRotation(-119.647675, -28.612478, -136.024872)
    .setScale(1.416025)
    .setColor([0.110, 0.110, 0.694])
    .setMaterial('Default');

  E.onTouchEnd = function () {
    Spin(this)
  }

  Ctest = scene.addMesh('C.b3m')
    .setXAxis([1, 0, 0])
    .setYAxis([0, 1, 0])
    .setZAxis([0, 0, 1])
    .setName('Ctest')
    .setType('solid')
    .setScale(1)
    .setColor('ff000080');

  scene.getScreen().addSprite().setScale(sW).setTranslationY(-sH * 0.3).setColor("00000080");

  GetMatrix(A);
  GetMatrix(B);
  GetMatrix(C);
  GetMatrix(Ctest);
  GetMatrix(Cref);
  GetMatrix(D);
  GetMatrix(E);

  printMatrix(C.itsMatrix)
  printMatrix(B.itsMatrix)

  var CxB = multiplyMatrix(C.itsMatrix, B.itsMatrix);

  printMatrix(CxB)


  SetMatrix(B, Ctest, C.itsMatrix)

  SetMatrix(A, Ctest, CxB)
}

scene.onTouchMove = function () {
  blipp.goToBlipp(blipp.getAddress());
}