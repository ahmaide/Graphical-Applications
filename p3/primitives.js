//Cube Geometry
const cube_positions = new Float32Array([
  -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
  -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,  
]);

const cube_colors = new Float32Array([
  1,0,0,  0,1,0,  0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,0, 1,0,1,
  1,0,0,  0,1,0,  0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,0, 1,0,1
]);

const cube_indices = new Uint16Array([
  0, 1, 2, 0, 2, 3,
  4, 5, 6, 4, 6, 7,
  3, 2, 6, 3, 6, 7,
  0, 1, 5, 0, 5, 4,
  1, 5, 6, 1, 6, 2,
  0, 4, 7, 0, 7, 3,
]);

function generateSphereData(latBands, longBands, radius) {
    let positions = [];
    let colors = [];
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
        indices: new Uint16Array(indices)
    };
}

function generateCylinderData(slices, radius, height) {
    let positions = [];
    let colors = [];
    let indices = [];
    const color = [1.0, 1.0, 1.0]; 
    const halfHeight = height / 2;
    
    const topCenterIndex = 0;
    positions.push(0, halfHeight, 0);
    colors.push(...color);

    const bottomCenterIndex = 1;
    positions.push(0, -halfHeight, 0);
    colors.push(...color);
    
    let baseVertexIndex = 2; 

    for (let i = 0; i <= slices; i++) {
        const theta = i * 2 * Math.PI / slices;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        positions.push(x, halfHeight, z);
        colors.push(...color);
        positions.push(x, -halfHeight, z);
        colors.push(...color);
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
        indices: new Uint16Array(indices)
    };
}

function generateConeData(slices, radius, height) {
    let positions = [];
    let colors = [];
    let indices = [];
    const color = [1.0, 1.0, 1.0];
    const halfHeight = height / 2;

    const tipIndex = 0;
    positions.push(0, halfHeight, 0);
    colors.push(...color);

    const baseCenterIndex = 1;
    positions.push(0, -halfHeight, 0);
    colors.push(...color);
    
    let baseVertexIndex = 2; 

    for (let i = 0; i <= slices; i++) {
        const theta = i * 2 * Math.PI / slices;
        const x = radius * Math.cos(theta);
        const z = radius * Math.sin(theta);
        
        positions.push(x, -halfHeight, z);
        colors.push(...color);
    }

    for (let i = 0; i < slices; i++) {
        const v1 = baseVertexIndex + i;
        const v2 = baseVertexIndex + i + 1;
        indices.push(tipIndex, v1, v2); 
    }

    for (let i = 0; i < slices; i++) {
        const v1 = baseVertexIndex + i;
        const v2 = baseVertexIndex + i + 1;
        indices.push(baseCenterIndex, v2, v1);
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        indices: new Uint16Array(indices)
    };
}
