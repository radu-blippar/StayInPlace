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
      val = "" + a[r][c];
      t += " " + val.substr(0, 7);
      if (c < aNumCols - 1) {
        t += ", ";
      }
    }
    console.log(t)
  }
  console.log(' └');
}

function ZYX_to_XYZ(rotations, inputRadians, returnRadians) {
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

  var IJKz = multiplyMatrix(IJK, Rz);
  var IJKy = multiplyMatrix(IJKz, Ry);
  var IJKx = multiplyMatrix(IJKy, Rx);

  var out_z = Math.atan2(IJKx[1][0], IJKx[0][0]);
  var out_y = Math.atan2(-IJKx[2][0], IJKx[0][0] * Math.cos(out_z) + IJKx[1][0] * Math.sin(out_z));
  var out_x = Math.atan2(IJKx[0][2] * Math.sin(out_z) - IJKx[1][2] * Math.cos(out_z), IJKx[1][1] * Math.cos(out_z) - IJKx[0][1] * Math.sin(out_z));

  if (returnRadians) {
    return [out_x, out_y, out_z]
  } else {
    return [toDegrees(out_x), toDegrees(out_y), toDegrees(out_z)]
  }
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

function GetMatrix(model) {
  var t = model.getTranslation();
  var r = ZYX_to_XYZ(model.getRotation(), false, false);
  var s = model.getScale()[0]; // uniform scale

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
  //console.log("Got matrix for " + model.getName() + ".");
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

  GetMatrix(model);
}

var colors = ["ff0000", "00ff00", "0000ff", "ffff00", "ff00ff", "00ffff"];
var totalCubes = 6;
var Cubes = [];

function rr(min, max) { //RandomRange
  return (min + Math.random() * (max - min))
}

scene.onCreate = function () {

  blipp.hideUiComponents('navBar');
  /*
    var A = scene.addMesh('A.b3m')
      .setName('A')
      .setType('phantom')
      .setTranslation(-107.51593, 60.505707, 0)
      .setRotation(-0, 0, 30.623669)
      .setScale(1.5)
      .setColor([0.529, 0.024, 0.024])
      .setMaterial('Default');
    A.onTouchEnd = function () {
      Spin(this)
    }
  */

  for (var i = 0; i < totalCubes; i++) {
    var Cube
    if (i == 0) {
      Cube = scene.addMesh('Box.b3m')
        .setScale(2.5)
    } else {
      Cube = Cubes[i - 1].addMesh('Box.b3m')
        .setScale(rr(0.7, 0.9))
        .setTranslation(0, 0, rr(120, 150))
    }

    Cube.n = i;

    Cube
      .setName("Cube_" + i)
      .setColor(colors[i])
      .setAlpha(0.7)
      .setType('phantom')
      .setRotationX(rr(-10, 10))
      .setRotationY(rr(-10, 10))
      .setRotationZ(rr(-180, 180))
      .setMaterial('Default');

    Cube.onTouchEnd = function () {
      Spin(this)
    }

    Cubes.push(Cube)
  }

  Tester = Cubes[totalCubes - 1].addMesh('Box.b3m')
    .setTranslation(0, 0, rr(120, 150))
    .setScale(2)
    .setName("Tester")
    .setType('solid')
    .setMaterial('Default');

  Tester.p = totalCubes - 1;

  Tester.onUpdate = function () {
    if (this.getParent() == blipp.getScene()) {
      this.setColor('ffffff');
    } else {
      this.setColor(this.getParent().getColor())
    }
  }

  scene.getScreen().addSprite().setScale(sW).setTranslationY(-sH * 0.5).setColor("00000080");

  ParentUp = scene.getScreen().addSprite().setScale(sW / 6).setHAlign('right').setVAlign('bottom').setTranslation(sW / 2, -sH / 2 + sW / 6, 0).setColor("ffffffAA");

  ParentUp.onTouchEnd = function () {
    if (Tester.p < totalCubes - 1) {
      InsertParent(Tester, Cubes[Tester.p + 1], true)
      Tester.p++
    }
  }

  ParentDown = scene.getScreen().addSprite().setScale(sW / 6).setHAlign('right').setVAlign('bottom').setTranslation(sW / 2, -sH / 2, 0).setColor("000000AA");

  ParentDown.onTouchEnd = function () {
    if (Tester.p >= 0) {
      RemoveParent(Tester, true)
      Tester.p--
    }
  }

  Reset = scene.getScreen().addSprite().setScale(sW / 2).setTranslation(-sW / 2, -sH / 2, 0).setColor("ff000040");

  Reset.onTouchEnd = function () {
    blipp.goToBlipp(blipp.getAddress());
  }

  var test = [
    [1, 2, 3, 1],
    [2, 1, 8, 2],
    [9, 10, 11, 2],
    [13, 14, 15, 1]
  ];

  printMatrix(test)
  printMatrix(matrixInvert(test))

}

function ParentsList(model) {
  var m = model;
  var list = [];
  while (m.getName() != blipp.getScene().getName()) {
    list.push([m.getParent(), m.getParent().getName()]);
    m = m.getParent();
  }
  return list;
}

function RemoveParent(model, logEvents) {
  if (model.getParent().getName() == blipp.getScene().getName()) {
    if (logEvents) {
      console.log(model.getName() + " has no parent but the scene (" + blipp.getScene().getName() + ")")
    }
  } else {
    if (model.itsMatrix == undefined || model.getParent().itsMatrix == undefined) {
      if (model.itsMatrix == undefined) {
        GetMatrix(model);
      }
      if (model.getParent().itsMatrix == undefined) {
        GetMatrix(model.getParent());
      }
      RemoveParent(model, logEvents);
    } else {
      if (logEvents) {
        console.log("Removed " + model.getName() + " from parent " + model.getParent().getName())
        console.log("New parent for " + model.getName() + " is " + model.getParent().getParent().getName())
      }
      var Pmatrix = multiplyMatrix(model.itsMatrix, model.getParent().itsMatrix);
      SetMatrix(model.getParent().getParent(), model, Pmatrix);
    }
  }
}

function InsertParent(model, newParent, logEvents) {
  if (model.getParent() != newParent.getParent()) {
    console.log("Cannot insert parent!")
    console.log(model.getName() + " and " + newParent.getName() + " have different parents")
  } else {
    if (model.itsMatrix == undefined || newParent.itsMatrix == undefined) {
      if (model.itsMatrix == undefined) {
        GetMatrix(model);
      }
      if (newParent.itsMatrix == undefined) {
        GetMatrix(newParent);
      }
      InsertParent(model, newParent, logEvents);
    } else {
      if (logEvents) {
        console.log("New parent for " + model.getName() + " is " + newParent.getName())
      }

      GetMatrix(model);
      GetMatrix(newParent);

      var Pmatrix = multiplyMatrix(model.itsMatrix, matrixInvert(newParent.itsMatrix));
      SetMatrix(newParent, model, Pmatrix);
    }
  }
}

function RemoveParents(model, n, logEvents) {
  if (model.getParent().getName() == blipp.getScene().getName()) {
    if (logEvents) {
      console.log(model.getName() + " has no parent but the scene (" + blipp.getScene().getName() + ")")
    }
  } else {
    while (model.getParent().getName() != blipp.getScene().getName() && n > 0) {
      RemoveParent(model, false)
      n--
    }
    if (logEvents) {
      console.log((n > 1 ? "Parents were" : "The parent was") + " removed from model " + model.getName())
      console.log("The new parent of " + model.getName() + " is " + model.getParent().getName())
    }
  }
}

function RemoveParentsUntil(model, Target, logEvents) {
  var p = ParentsList(model);
  var foundTarget = false;
  for (var i = 0; i < p.length; i++) {
    if (Target == p[i][0]) {
      foundTarget = true;
    }
  }

  if (!foundTarget) {
    if (logEvents) {
      console.log(model.getName() + " doesn't have " + Target.getName() + " as a parent")
    }
  } else {
    while (model.getParent() != Target) {
      RemoveParent(model, false)
    }
    if (logEvents) {
      console.log("The new parent of " + model.getName() + " is " + model.getParent().getName())
    }
  }
}

function RemoveAllParents(model, logEvents) {
  if (model.getParent().getName() != blipp.getScene().getName()) {
    while (model.getParent().getName() != blipp.getScene().getName()) {
      RemoveParent(model, false)
    }
  }
  if (logEvents) {
    console.log(model.getName() + " has no more parents but the scene (" + blipp.getScene().getName() + ")")
  }
}

scene.onTouchMove = function () {
  //blipp.goToBlipp(blipp.getAddress());
}