// Perspective matrix
function perspective(fov, aspect, near, far) {
    const f = 1 / Math.tan(fov / 2);
    const nf = 1 / (near - far);
    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0
    ];
}

function ortho(left, right, bottom, top, near, far) {
    const lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
    return [
        -2*lr, 0, 0, 0,
        0, -2*bt, 0, 0,
        0, 0, 2*nf, 0,
        (left+right)*lr, (top+bottom)*bt, (far+near)*nf, 1
    ];
}

function mat4Identity() {
    return new Float32Array([
        1, 0, 0, 0, 
        0, 1, 0, 0, 
        0, 0, 1, 0, 
        0, 0, 0, 1
    ]);
}

function mat4Translate(matrix, translation) {
    const result = new Float32Array(matrix);
    const [tx, ty, tz] = translation;
    
    result[12] = matrix[0] * tx + matrix[4] * ty + matrix[8] * tz + matrix[12];
    result[13] = matrix[1] * tx + matrix[5] * ty + matrix[9] * tz + matrix[13];
    result[14] = matrix[2] * tx + matrix[6] * ty + matrix[10] * tz + matrix[14];
    result[15] = matrix[3] * tx + matrix[7] * ty + matrix[11] * tz + matrix[15];
    
    return result;
}

function mat4RotateX(matrix, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const result = new Float32Array(matrix);

    const mv1 = matrix[4], mv5 = matrix[5], mv9 = matrix[6], mv13 = matrix[7];
    const mv2 = matrix[8], mv6 = matrix[9], mv10 = matrix[10], mv14 = matrix[11];

    result[4] = mv1 * c + mv2 * s;
    result[5] = mv5 * c + mv6 * s;
    result[6] = mv9 * c + mv10 * s;
    result[7] = mv13 * c + mv14 * s;
    
    result[8] = mv2 * c - mv1 * s;
    result[9] = mv6 * c - mv5 * s;
    result[10] = mv10 * c - mv9 * s;
    result[11] = mv14 * c - mv13 * s;

    return result;
}

function mat4RotateY(matrix, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const result = new Float32Array(matrix);

    const mv0 = matrix[0], mv4 = matrix[1], mv8 = matrix[2], mv12 = matrix[3];
    const mv2 = matrix[8], mv6 = matrix[9], mv10 = matrix[10], mv14 = matrix[11];


    result[0] = mv0 * c - mv2 * s;
    result[1] = mv4 * c - mv6 * s;
    result[2] = mv8 * c - mv10 * s;
    result[3] = mv12 * c - mv14 * s;
    
    result[8] = mv0 * s + mv2 * c;
    result[9] = mv4 * s + mv6 * c;
    result[10] = mv8 * s + mv10 * c;
    result[11] = mv12 * s + mv14 * c;

    return result;
}

function mat4RotateZ(matrix, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const result = new Float32Array(matrix);

    const mv0 = matrix[0], mv4 = matrix[1], mv8 = matrix[2], mv12 = matrix[3];
    const mv1 = matrix[4], mv5 = matrix[5], mv9 = matrix[6], mv13 = matrix[7]; 

    result[0] = mv0 * c + mv1 * s;
    result[1] = mv4 * c + mv5 * s;
    result[2] = mv8 * c + mv9 * s;
    result[3] = mv12 * c + mv13 * s;

    result[4] = mv1 * c - mv0 * s;
    result[5] = mv5 * c - mv4 * s;
    result[6] = mv9 * c - mv8 * s;
    result[7] = mv13 * c - mv12 * s;

    return result;
}

function multiplyMat4(a, b) {
    let r = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) { 
            let sum = 0;
            for (let k = 0; k < 4; k++) {
                sum += a[k * 4 + i] * b[j * 4 + k]; 
            }
            r[j * 4 + i] = sum;
        }
    }
    return r;
}

// Scaling
function mat4Scale(matrix, scale) {
    const [sx, sy, sz] = scale;
    const result = new Float32Array(matrix);

    for(let i=0; i<4; i++) {
        result[i] *= sx;      
        result[i+4] *= sy;    
        result[i+8] *= sz;    
    }

    return result;
}
