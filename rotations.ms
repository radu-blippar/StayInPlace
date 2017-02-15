clearlistener()
for i in selection do(
	print i.name
	print ("MAX: 38.969 -7.511 32.923 = -Z, -Y, -X from ZYX")
	print ("JS: 37.108582, 14.862703, 30.570572= -X, -Y, -Z from XYZ")
	print("-------------------------------------")
	print (i.rotation)
	print (i.rotation as eulerAngles)
	print ("1 - XYZ; 2 - XZY; 3 - YZX; 4 - YXZ; 5 - ZXY; 6 - ZYX; 7 - XYX; 8 - YZY; 9 - ZXZ;")
	for n=1 to 9  do(
		print (n as string  + " - " + (quatToEuler i.rotation order: n) as string)
	)	
	XYZ = quatToEuler i.rotation order: 1
	print ("XYZ : " + XYZ	as string)
	ZYX = quatToEuler (eulerToQuat XYZ order: 1) order: 6
	print ("ZYX : " + ZYX as string)
	print("-------------------------------------")
	print (eulerToQuat XYZ order:1)
	print (eulerToQuat ZYX order:6)
)