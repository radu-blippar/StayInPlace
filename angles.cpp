#define PI  ((float)3.1415926535)
#define RAD_TO_DEG ((float)180.0/PI)
#define RadToDeg(rad) (((float)rad)*RAD_TO_DEG)

void BlippSceneFormatJSON::ExportRotation(json::Value& value, const Matrix3& tm)
{
    AffineParts local; decomp_affine(tm, &local);

    // this might seem counter intuitive, but this is the only combination that makes rotations look right in blippar.
    Point3 euler;
    QuatToEuler(local.q, (float*)&euler, EULERTYPE_ZYX, false);
    std::swap(euler.x, euler.z); 

    if (!euler.Equals(Point3(0, 0, 0)))
    {
        json::Value r(json::kArrayType);
        r.PushBack(RadToDeg(euler.x), doc.GetAllocator());
        r.PushBack(RadToDeg(euler.y), doc.GetAllocator());
        r.PushBack(RadToDeg(euler.z), doc.GetAllocator());
        value.AddMember("rotation", r, doc.GetAllocator());
    }
}

//@radu: function headers in the MAX API:

/*! \remarks This will decompose a matrix into the translation,
rotation and scale components and store the results in the AffineParts
structure passed. This will return correct results for off axis
scale. This is a fairly computationally intensive iterative solution operation.
\par Parameters:
<b>Matrix3 A</b> \n
The input matrix to decompose.\n\n
<b>AffineParts *parts</b> \n
The result. See above.\n\n
\par Sample Code:
Note: If you want to rebuild a Matrix3 from the decomposed parts you get
back from decomp_affine() the important thing is the order the parts are combined.\n\n
Consider the following matrices constructed from the various affine parts:\n
<b>ptm</b> = position component (t) \n
<b>rtm</b> = "essential" rotation (q) \n
<b>srtm</b> = "stretch" rotation (u) \n
<b>stm</b> = scale component (k) \n
<b>ftm</b> = the flip tm -> ScaleMatrix(Point3(ap.f,ap.f,ap.f)); \n\n
Here's the correct way of reassembling the decomposed matrix: \n
\code
Matrix3 srtm, rtm, ptm, stm, ftm;
ptm.IdentityMatrix();
ptm.SetTrans(ap.t);
ap.q.MakeMatrix(rtm);
ap.u.MakeMatrix(srtm);
stm = ScaleMatrix(ap.k);
mat = Inverse(srtm) * stm * srtm * rtm * ftm * ptm;
\endcode
*/
CoreExport void decomp_affine(Matrix3 A, AffineParts *parts);

#define EULERTYPE_XYZ    0
#define EULERTYPE_XZY    1
#define EULERTYPE_YZX    2
#define EULERTYPE_YXZ    3
#define EULERTYPE_ZXY    4
#define EULERTYPE_ZYX    5
#define EULERTYPE_XYX    6
#define EULERTYPE_YZY    7
#define EULERTYPE_ZXZ    8

#define EULERTYPE_RF    16  // rotating frame (axes)  --prs.

GEOMEXPORT void QuatToEuler(const Quat &q, float *ang, int type, bool flag = false);    // flag added 001101  --prs.