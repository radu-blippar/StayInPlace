// This file is auto-generated by the Blippar 3ds Max Exporter
// 2017-02-13.12:25:22
//
// WARNING: This file contains a complete blipp of your exported scene from 3ds Max.
// Please do not modify this file directly, copy and paste the code stub into your own javascript source.
//
// This file may be overwritten by future exports, so modifications will be lost.
//

var blipp = require('blippar').blipp;
var scene = blipp.addScene('default');

scene.addMaterial('Default')
     .setType('matt');

// RenderBin: 1
var _01___Default = scene.addMaterial('01___Default')
                         .setType('matt')
                         .setDiffuseColor([0.588235, 0.588235, 0.588235]);

var _08___Default = scene.addMaterial('08___Default')
                         .setType('matt')
                         .setDiffuseColor([1, 0, 0]);


// RenderBin: 50
var root = scene.addTransform('scene_main');

var A = root.addMesh('A.b3m')
            .setName('A')
            .setType('solid')
            .setTranslation(-442.665527, 200.677353, -0.000022)
            .setRotation(-0, 0, 30.318306)
            .setScale(1.475041, 1.475041, 1.475041)
            .setColor([0.694, 0.345, 0.106])
            .setMaterial('Default');

var B = A.addMesh('B.b3m')
         .setName('B')
         .setType('solid')
         .setTranslation(-78.604858, -113.293747, 255.59166)
         .setRotation(4.116472, -22.70549, -1.951609)
         .setScale(0.573714, 0.573714, 0.573714)
         .setColor([0.690, 0.102, 0.102])
         .setMaterial('Default');

var C = B.addMesh('C.b3m')
         .setName('C')
         .setType('solid')
         .setTranslation(522.02002, -268.933319, 346.485291)
         .setRotation(42.978809, 1.239354, -37.055176)
         .setScale(1.087075, 1.087075, 1.087075)
         .setMaterial('01___Default')
         .setAlpha(0.500)
         .setTexture('keyboard-keys-r-icon-53039.png')
         .setTextureEdges(['hWrap', 'vWrap']);

var Ctest = A.addMesh('Ctest.b3m')
             .setName('Ctest')
             .setType('solid')
             .setTranslation(115.938538, -298.581787, 539.908691)
             .setRotation(49.445007, -16.487169, -22.55061)
             .setScale(0.623671, 0.62367, 0.62367)
             .setMaterial('08___Default')
             .setAlpha(0.500);

var Cref = root.addMesh('Cref.b3m')
               .setName('Cref')
               .setType('solid')
               .setTranslation(-72.488708, -94.601074, 797.534546)
               .setRotation(51.082714, 7.052786, -3.238514)
               .setScale(0.91994, 0.919939, 0.919939);

var D = root.addMesh('D.b3m')
            .setName('D')
            .setType('solid')
            .setTranslation(315.992493, -91.575668, -0.000022)
            .setRotation(0, 0, -5.296601)
            .setScale(1.08199, 1.08199, 1.08199)
            .setColor([0.031, 0.431, 0.529])
            .setMaterial('Default');

var E = D.addMesh('E.b3m')
         .setName('E')
         .setType('solid')
         .setTranslation(-0.266052, 61.794632, 384.275177)
         .setRotation(-119.647675, -28.612478, -136.024872)
         .setScale(1.416025, 1.416026, 1.416025)
         .setColor([0.110, 0.110, 0.694])
         .setMaterial('Default');


// RenderBin: 2000
scene.onShow = function() {
}


