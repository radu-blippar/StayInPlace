var blipp = require('blippar').blipp;
var scene = blipp.addScene('default');

var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003;
/*
Reset = scene.getScreen().addSprite().setScale(sW / 2).setTranslation(-sW / 2, -sH / 2.2, 0).setColor("ff000040");
Reset.onTouchEnd = function () {
  blipp.goToBlipp(blipp.getAddress());
}
*/
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

function PointCoords(thePointer, targetCoords) {

  var PointerParent = thePointer.getParent();
  SceneMatrix = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];

  SetMatrix(blipp.getScene(), thePointer, multiplyMatrix(GetGM(thePointer), matrixInvert(SceneMatrix)))

  var GM_Pointer = thePointer.getGlobalMatrix();
  //var GM_Target = theTarget.getGlobalMatrix();

  var tPointer = [GM_Pointer[12], GM_Pointer[13], GM_Pointer[14]];
  var tTarget = targetCoords;

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

function Point(thePointer, theTarget) {
  var GM_Target = theTarget.getGlobalMatrix();
  PointCoords(thePointer, [GM_Target[12], GM_Target[13], GM_Target[14]])
}

Globe = scene.addMaterial('Globe')
  .setSelfLightIntensity(0.36)
  .setType('matt');

Iris = scene.addMaterial('Iris')
  .setSelfLightIntensity(0.36)
  .setType('matt')
  .setDiffuseColor([0.152941, 0.784314, 0.878431]);

Pupil = scene.addMaterial('Pupil')
  .setSelfLightIntensity(0.36)
  .setType('matt')
  .setDiffuseColor([0, 0, 0]);

Lids = scene.addMaterial('Lids')
  .setSelfLightIntensity(0.36)
  .setType('matt')
  .setDiffuseColor([0.588235, 0.313726, 0.231373]);

scene.onCreate = function () {

  Eye = scene.addTransform('scene_main').setScale(10);

  Eye_Globe = Eye.addMesh('Sphere.b3m')
    .setName('Eye_Globe')
    .setType('solid')
    .setTranslation(-0.588463, -0.82385, 0)
    .setMaterial('Globe');

  Eye_Globe.onDraw = function () {
    PointCoords(this, blipp.getCameraPosition('marker'))
  }

  Eye_Iris = Eye_Globe.addMesh('Sphere.b3m')
    .setName('Eye_Iris')
    .setType('solid')
    .setTranslation(0, 0, 7.611631)
    .setScale(0.763341, 0.763341, 0.763341)
    .setMaterial('Iris');

  Eye_Pupil = Eye_Iris.addMesh('Sphere.b3m')
    .setName('Eye_Pupil')
    .setType('solid')
    .setTranslation(0, 0, 15.0)
    .setScale(0.468982, 0.468982, 0.468982)
    .setMaterial('Pupil');

  Eye_Lid_Bottom = Eye.addMesh('Eye_Lid.b3m')
    .setName('Eye_Lid_Bottom')
    .setType('solid')
    .setTranslation(-0.588463, -0.82385, 0)
    .setRotation(140, 0, -0)
    .setMaterial('Lids');

  Eye_Lid_Top = Eye.addMesh('Eye_Lid.b3m')
    .setName('Eye_Lid_Top')
    .setType('solid')
    .setTranslation(-0.588463, -0.82385, 0)
    .setRotation(-140, 0, -0)
    .setMaterial('Lids');

  var Blink = Math.random() * 100 + 50;
  Eye_Lid_Bottom.onDraw = function () {
    Blink--
    if (Blink < 0) {
      Blink = Math.random() * 100 + 50;
      var rotBottom = this.getRotationX();
      this.animate().rotationX(rotBottom - 50).duration(100).onEnd = function () {
        this.animate().rotationX(rotBottom).duration(100);
      }
      var rotTop = Eye_Lid_Top.getRotationX();
      Eye_Lid_Top.animate().rotationX(rotTop + 50).duration(100).onEnd = function () {
        Eye_Lid_Top.animate().rotationX(rotTop).duration(100);
      }
    }
  }

  console.log('I see you!')
}