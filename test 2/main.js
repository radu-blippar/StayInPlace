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
												.setDiffuseColor([1, 0, 0]);

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

function ZYX_to_XYZ(rotations, inputRadians, returnRadians){
	var aa = rotations[0];
	var bb = rotations[1];
	var cc = rotations[2];

	if(inputRadians){
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

	var IJKz = multiplyMatrix(IJK,Rz);
	var IJKy = multiplyMatrix(IJKz,Ry);
	var IJKx = multiplyMatrix(IJKy,Rx);

	var out_z = Math.atan2(IJKx[1][0], IJKx[0][0]);
	var out_y = Math.atan2(-IJKx[2][0], IJKx[0][0]*Math.cos(out_z) + IJKx[1][0]*Math.sin(out_z));
	var out_x = Math.atan2(IJKx[0][2]*Math.sin(out_z) - IJKx[1][2]*Math.cos(out_z), IJKx[1][1]*Math.cos(out_z) - IJKx[0][1]*Math.sin(out_z));

	if(returnRadians){
		return [out_x, out_y, out_z]
	} else {
		return [toDegrees(out_x), toDegrees(out_y), toDegrees(out_z)]
	}
}

function XYZ_to_ZYX(rotations, inputRadians, returnRadians){
	var aa = rotations[0];
	var bb = rotations[1];
	var cc = rotations[2];

	if(inputRadians){
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

	var IJKx = multiplyMatrix(IJK,Rx);
	var IJKy = multiplyMatrix(IJKx,Ry);
	var IJKz = multiplyMatrix(IJKy,Rz);

	var out_x = Math.atan2(-IJKz[1][2], IJKz[2][2]);
	var out_y = Math.atan2(IJKz[0][2], IJKz[2][2]*Math.cos(out_x) - IJKz[1][2]*Math.sin(out_x));
	var out_z = Math.atan2(IJKz[1][0]*Math.cos(out_x) + IJKz[2][0]*Math.sin(out_x), IJKz[1][1]*Math.cos(out_x) + IJKz[2][1]*Math.sin(out_x));

	if(returnRadians){
		return [out_x, out_y, out_z]
	} else {
		return [toDegrees(out_x), toDegrees(out_y), toDegrees(out_z)]
	}
}

function GetMatrix(model) {
  var t = model.getTranslation();
  var r = ZYX_to_XYZ(model.getRotation(), false, false);
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
  r = XYZ_to_ZYX(r, false, false)

  model.setTranslation(t)
  model.setRotation(r);
  model.setScale(s);
}

scene.onCreate = function(){

	blipp.hideUiComponents('navBar');

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

	var B = A.addMesh('B.b3m')
					 .setName('B')
					 .setType('phantom')
					 .setTranslation(7.800129, -55.813934, 111.116089)
					 .setRotation(-9.149782, -8.524243, 19.407499)
					 .setScale(0.6)
					 .setColor([0.898, 0.604, 0.843])
					 .setMaterial('Default');
	GetMatrix(B);
	B.onTouchEnd = function () {
  	Spin(this)
  }

	var C = B.addMesh('C.b3m')
					 .setName('C')
					 .setType('phantom')
					 .setTranslation(-119.695862, -69.40358, 519.784485)
					 .setRotation(56.154945, -2.368725, 48.837994)
					 .setScale(1.2)
					 .setMaterial('01___Default')
					 .setAlpha(0.300);
	GetMatrix(C);
/*
	var CB = A.addMesh('CB.b3m')
						.setName('CB')
						.setType('phantom')
						.setTranslation(-91.732086, -70.376282, 417.769623)
						.setRotation(44.531879, 8.72314, 66.879982)
						.setScale(0.72)
						.setMaterial('02___Default')
						.setAlpha(0.300);
*/
	var Cabs = scene.addMesh('Cabs.b3m')
								 .setName('Cabs')
								 .setType('phantom')
								 .setTranslation(-172.149307, -100.427887, 626.654419)
								 .setRotation(36.388062, 28.922029, 91.391266)
								 .setScale(1.08)
								 .setMaterial('03___Default')
								 .setAlpha(0.300);

  //scene.getScreen().addSprite().setScale(sW).setTranslationY(-sH * 0.3).setColor("00000080");

  C_SetParentA =  scene.getScreen().addSprite()
  	.setScale(sW/2)
  	.setTranslationX(-sW/2)
  	.setTranslationY(-sH/2)
		.setColor([0.529, 0.024, 0.024])
		.setAlpha(0.5);

	C_SetParentA.onTouchEnd = function(){
  	var CxB = multiplyMatrix(C.itsMatrix, B.itsMatrix);
 		SetMatrix(A, C, CxB);
 		console.log("C parent changed from B to A")
	}
}

scene.onTouchMove = function () {
	blipp.goToBlipp(blipp.getAddress());
}