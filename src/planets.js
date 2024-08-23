import * as THREE from 'three';


function createPlanet({ name = null, radius, positionX, textures = {}, axialTilt = null, emissiveColor = null, initialAngle }) 
{
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const materialConfig = {
        bumpScale: 3.0,
        metalness: 0.1,
        roughness: 0.5,
    };

    if (textures.color)
    {
        materialConfig.map = new THREE.TextureLoader().load(textures.color);
        materialConfig.map.colorSpace = THREE.SRGBColorSpace;
    }
    if (textures.bump) 
    {
        materialConfig.bumpMap = new THREE.TextureLoader().load(textures.bump);
    }
    if (textures.metalness) 
    {
        materialConfig.metalnessMap = new THREE.TextureLoader().load(textures.metalness);
    }   
    if (textures.normal) 
    {
        materialConfig.normalMap = new THREE.TextureLoader().load(textures.normal);
    }
    if (emissiveColor) 
    {
        materialConfig.emissive = new THREE.Color(emissiveColor);
        materialConfig.emissiveIntensity = 0.5; // Adjust as needed
    }

    const material = new THREE.MeshStandardMaterial(materialConfig);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.cos(initialAngle) * positionX;
    mesh.position.z = Math.sin(initialAngle) * positionX;
    return mesh;
}

// Store the planets in an array
export const planetData = [
    { 
        name: 'Mercury', 
        radius: 0.38, 
        positionX: 25, 
        textures: { color: 'textures/2k_mercury.jpg' },
        axialTilt: 0.034,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 0.24,
        rotationSpeed: 0.01,
    },
    { 
        name: 'Venus', 
        radius: 0.95, 
        positionX: 40, 
        textures: { color: 'textures/2k_venus_atmosphere.jpg' },
        axialTilt: 177.4,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 0.62,
        rotationSpeed: 0.01,
    },
    { 
        name: 'Earth', 
        radius: 1, 
        positionX: 55, 
        textures: { 
            color: 'textures/2k_earth_daymap.jpg',
            bump: 'textures/8081_earthbump4k.jpg',
            metalness: 'textures/8081_earthspec4k.jpg'
        },
        axialTilt: 23.5,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 1,
        rotationSpeed: 0.01,
    },
    { 
        name: 'Mars', 
        radius: 0.53, 
        positionX: 70, 
        textures: { color: 'textures/2k_mars.jpg' },
        axialTilt: 25.2,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 1.03,
        rotationSpeed: 0.41,
    },
    { 
        name: 'Jupiter', 
        radius: 3.5, 
        positionX: 100, 
        textures: { color: 'textures/2k_jupiter.jpg' },
        emissiveColor: 0x1a1a1a,
        axialTilt: 3.1,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 0.41,
        rotationSpeed: 0.43,
    },
    { 
        name: 'Saturn', 
        radius: 3, 
        positionX: 130, 
        textures: { color: 'textures/2k_saturn.jpg' },
        axialTilt: 26.7,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 0.43,
        rotationSpeed: 0.72,
    },
    { 
        name: 'Uranus', 
        radius: 1.25, 
        positionX: 160, 
        textures: { color: 'textures/2k_uranus.jpg' },
        axialTilt: 97.8,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 0.72,
        rotationSpeed: 0.67,
    },
    { 
        name: 'Neptune', 
        radius: 1.2, 
        positionX: 190, 
        textures: { color: 'textures/2k_neptune.jpg' },
        axialTilt: 28.3,
        initialAngle: Math.random() * Math.PI * 2,
        orbitalSpeed: 0.67,
        rotationSpeed: 0.74,
    },
];

// Store planets and orbit groups in separate arrays
export const planets = [];
export const orbitalGroups = [];

planetData.forEach((planet) => { 
    const planetMesh = createPlanet(planet);
    planet.mesh = planetMesh;
    planets.push(planetMesh);

    const orbitGroup = new THREE.Group();
    orbitGroup.add(planetMesh);
    orbitalGroups.push(orbitGroup);
});
