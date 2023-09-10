import { IPoint, IVector } from "../models/geometry.interface";



function vectorLength (input_vector: any) {
  let result;
  if (input_vector.length === 2 && input_vector.length === 2) {
    result = Math.sqrt( Math.pow(input_vector[0], 2) + Math.pow(input_vector[1], 2));
  } else if (input_vector.length === 3 && input_vector.length === 3) {
    result = Math.sqrt( Math.pow(input_vector[0], 2) + Math.pow(input_vector[1], 2) + Math.pow(input_vector[2], 2));
  } else {
    result = 'Invalid input.'
  };
  return result;
};

function setVectorMagnitude (input_vector:  any, num: any) {
  let result;
  let multiplier = num / vectorLength(input_vector);
  if (input_vector.length === 2 && input_vector.length === 2) {
    result = [input_vector[0] * multiplier, input_vector[1] * multiplier]; 
  } else if (input_vector.length === 3 && input_vector.length === 3) {
    result = [input_vector[0] * multiplier, input_vector[1] * multiplier, input_vector[2] * multiplier];
  } else {
    result = 'Invalid input.'
  };
  return result;
}

function crossProduct (vec1, vec2) {
  let result;
  if (vec1.length === 3 && vec2.length === 3) {
    result = [(vec1[1]*vec2[2] - vec1[2]*vec2[1]), (vec1[2]*vec2[0] - vec1[0]*vec2[2]), (vec1[0]*vec2[1] - vec1[1]*vec2[0])];
  } else {
    result = 'Invalid input.'
  };
  return result;
};

function dotProduct (vec1, vec2) {
  let result;
  if (vec1.length === 2 && vec2.length === 2) {
    result = (vec1[0]*vec2[0] + vec1[1]*vec2[1]);
  } else if (vec1.length === 3 && vec2.length === 3) {
    result = (vec1[0]*vec2[0] + vec1[1]*vec2[1] + vec1[2]*vec2[2]);
  } else {
    result = 'Invalid input.'
  };
  return result;
};


function multiplyVector (vec, multiplier) {
  let result;
  if (vec.length === 2) {
    result = [vec[0]*multiplier, vec[1]*multiplier];
  } else if (vec.length === 3) {
    result = [vec[0]*multiplier, vec[1]*multiplier, vec[2]*multiplier];
  } else {
    result = 'Invalid input.'
  };
  return result;
};

function series (startNumber, endNumber, count) {
  let result = [];
  let step = ( endNumber - startNumber ) / ( count - 1 );

  for ( i = 0; i < count; i++) {
    let y;
    y = startNumber + step * [i];
    result.push(y); 
  }
  return result;
}


function vectorAngle (vec1, vec2) {
  let result;
  if ((vec1.length === 2 && vec2.length === 2) || (vec1.length === 3 && vec2.length === 3)) {
    result = Math.acos( dotProduct(vec1,vec2) / ((vectorLength(vec1) * vectorLength(vec2))) )
  } else {
    result = 'Invalid input.'
  };
  return result;
}

function planeVecVecPt (vec_x=[], vec_y=[], origin=[]) {
  result = {type: 'plane', xAxis: [0, 0, 0], yAxis: [0, 0, 0], zAxis: [0, 0, 0], origin: [0, 0, 0]}; // this is the plane object format we'll be using.
  if (vectorAngle (vec_x, vec_y) === Math.PI/2) {
    result.type = 'plane';
    result.xAxis = vec_x;
    result.yAxis = vec_y;
    result.zAxis = crossProduct(vec_x, vec_y);
    result.origin = origin;
  } else {
    result = 'Invalid input.'
  };
  return result;
};

function changeOrigin (plane, newOrigin) {
  let result = {type: 'plane', xAxis: [0, 0, 0], yAxis: [0, 0, 0], zAxis: [0, 0, 0], origin: [0, 0, 0]};
  if ((plane.type === 'plane' && newOrigin.length === 3) || (plane.type === 'plane' && newOrigin.length === 2)) {
    result.type = 'plane';
    result.xAxis = plane.xAxis;
    result.yAxis = plane.yAxis;
    result.zAxis = plane.zAxis;
    result.origin = newOrigin;
  } else {
    result = 'Invalid input.'
  };

  return result; 
};

function move (point, vector) {
  let result;
  let pt;

  if (Array.isArray(point)) {
    pt = point;
  } else {
    pt = Object.values(point);
  };

  if (vector.length === 2) {
    result = [pt[0] + vector [0], pt[1] + vector [1]];
  } else if (vector.length === 3) {
    result = [pt[0] + vector [0], pt[1] + vector [1], pt[2] + vector [2]];
  } else {
    result = 'Invalid input.'
  }

  return result; 
};

function line (point1_xy, point2_xy, width, target_div, _class) {
  let result;
  let length;
  let angle;
  // We have an endpoint in screen coordinates. To calculate relative width of the arrow, we need to calculate its position to uvw space.
  point1_xy = Object.values(point1_xy);
  point2_xy = Object.values(point2_xy);

  length = distance(point1_xy, point2_xy);
  
  if (point1_xy[1] < point2_xy[1]) {
    angle = vectorAngle(vectorFromPoints(point1_xy, point2_xy), [1, 0]);
  } else {
    angle = -vectorAngle(vectorFromPoints(point1_xy, point2_xy), [1, 0]);
  }

  let correctionVec;
  correctionVec = vectorFromPoints(point1_xy, point2_xy);
  correctionVec = [-correctionVec[1], correctionVec[0]];
  correctionVec = setVectorMagnitude(correctionVec, (width)/2);

  result = `
    <div class="${_class}" style="
      position: absolute;
      top: ${point1_xy[1]}px;
      left: ${point1_xy[0]}px;
      height: ${width}px;
      width: ${length}px;
      transform-origin: 0px 0px;
      transform: translate(${-correctionVec[0]}px, ${-correctionVec[1]}px) rotate(${angle}rad);
      "></div>
      `;
  target_div.innerHTML = result;
  arrowLine = result;
};