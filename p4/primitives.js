function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function normalize(v) {
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return len > 0 ? [v[0] / len, v[1] / len, v[2] / len] : [0, 0, 0];
}


function generateSphereData(latBands, longBands, radius) {
    let positions = [];
    let colors = [];
    let normals = []; 
    let indices = [];
    const color = [1.0, 1.0, 1.0];

    for (let latNumber = 0; latNumber <= latBands; latNumber++) {
        let theta = latNumber * Math.PI / latBands;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);

        for (let longNumber = 0; longNumber <= longBands; longNumber++) {
            let phi = longNumber * 2 * Math.PI / longBands;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            let x = radius * cosPhi * sinTheta;
            let y = radius * cosTheta;
            let z = radius * sinPhi * sinTheta;
            
            positions.push(x, y, z);
            colors.push(...color); 
            
            let norm = normalize([x, y, z]);
            normals.push(...norm); 
        }
    }

    for (let latNumber = 0; latNumber < latBands; latNumber++) {
        for (let longNumber = 0; longNumber < longBands; longNumber++) {
            let first = (latNumber * (longBands + 1)) + longNumber;
            let second = first + longBands + 1;

            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        normals: new Float32Array(normals), 
        indices: new Uint16Array(indices)
    };
}

function generateCylinderData(slices, radius, height) {
    let positions = [];
    let colors = [];
    let normals = []; 
    let indices = [];
    const color = [1.0, 1.0, 1.0]; 
    const halfHeight = height / 2;
    
    const topCenterIndex = 0;
    positions.push(0, halfHeight, 0);
    colors.push(...color);
    normals.push(0, 1, 0); 

    const bottomCenterIndex = 1;
    positions.push(0, -halfHeight, 0);
    colors.push(...color);
    normals.push(0, -1, 0); 
    
    let baseVertexIndex = 2; 

    for (let i = 0; i <= slices; i++) {
        const theta = i * 2 * Math.PI / slices;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);

        positions.push(x, halfHeight, z);
        colors.push(...color);
        normals.push(x, 0, z);
        
        positions.push(x, -halfHeight, z);
        colors.push(...color);
        normals.push(x, 0, z); 
    }
    
    for (let i = 0; i < slices; i++) {
        const top1 = baseVertexIndex + i * 2;
        const bottom1 = baseVertexIndex + i * 2 + 1;
        const top2 = baseVertexIndex + (i + 1) * 2;
        const bottom2 = baseVertexIndex + (i + 1) * 2 + 1;
        
        indices.push(top1, bottom1, top2); 
        indices.push(bottom1, bottom2, top2);
    }

    for (let i = 0; i < slices; i++) {
        const v1 = baseVertexIndex + i * 2;
        const v2 = baseVertexIndex + (i + 1) * 2;
        indices.push(topCenterIndex, v2, v1); 
    }
    
    for (let i = 0; i < slices; i++) {
        const v1 = baseVertexIndex + i * 2 + 1;
        const v2 = baseVertexIndex + (i + 1) * 2 + 1;
        indices.push(bottomCenterIndex, v1, v2); 
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        normals: new Float32Array(normals), 
        indices: new Uint16Array(indices)
    };
}

function generateConeData(slices, radius, height) {
    let positions = [];
    let colors = [];
    let normals = []; 
    let indices = [];
    const color = [1.0, 1.0, 1.0];
    const halfHeight = height / 2;

    const tipIndex = 0;
    positions.push(0, halfHeight, 0);
    colors.push(...color);
    normals.push(0, 1, 0); 

    const baseCenterIndex = 1;
    positions.push(0, -halfHeight, 0);
    colors.push(...color);
    normals.push(0, -1, 0); 
    
    let baseVertexIndex = 2; 

    for (let i = 0; i <= slices; i++) {
        const theta = i * 2 * Math.PI / slices;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        
        positions.push(x, -halfHeight, z);
        colors.push(...color);

        const normal_x = Math.cos(theta);
        const normal_z = Math.sin(theta);
        const normal_y = radius / height; 
        let norm = normalize([normal_x, normal_y, normal_z]);
        normals.push(...norm); 
    }

    for (let i = 0; i < slices; i++) {
        const v1 = baseVertexIndex + i;
        const v2 = baseVertexIndex + i + 1;
        indices.push(tipIndex, v2, v1); 
    }

    for (let i = 0; i < slices; i++) {
        const v1 = baseVertexIndex + i;
        const v2 = baseVertexIndex + i + 1;
        indices.push(baseCenterIndex, v1, v2); 
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        normals: new Float32Array(normals), 
        indices: new Uint16Array(indices)
    };
}

const allPrimitives = {
    'Cube': { positions: cube_positions, colors: cube_colors, normals: cube_normals, indices: cube_indices },
    'Sphere': generateSphereData(20, 20, 1.0),
    'Cylinder': generateCylinderData(24, 1.0, 1.0),
    'Cone': generateConeData(24, 1.0, 1.0)
};