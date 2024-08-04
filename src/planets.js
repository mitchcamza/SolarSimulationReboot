import * as THREE from 'three';


function createPlanet({ name = null, radius, positionX, textures = {}, axialTilt = null, emissiveColor = null }) 
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
    mesh.position.x = positionX;

    // Set shadow properties
    mesh.receiveShadow = true;
    mesh.castShadow = true;

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
    },
    { 
        name: 'Venus', 
        radius: 0.95, 
        positionX: 40, 
        textures: { color: 'textures/2k_venus_atmosphere.jpg' },
        axialTilt: 177.4,
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
    },
    { 
        name: 'Mars', 
        radius: 0.53, 
        positionX: 70, 
        textures: { color: 'textures/2k_mars.jpg' },
        axialTilt: 25.2,
    },
    { 
        name: 'Jupiter', 
        radius: 3.5, 
        positionX: 100, 
        textures: { color: 'textures/2k_jupiter.jpg' },
        emissiveColor: 0x1a1a1a,
        axialTilt: 3.1,
    },
    { 
        name: 'Saturn', 
        radius: 3, 
        positionX: 130, 
        textures: { color: 'textures/2k_saturn.jpg' },
        axialTilt: 26.7,
    },
    { 
        name: 'Uranus', 
        radius: 1.25, 
        positionX: 160, 
        textures: { color: 'textures/2k_uranus.jpg' },
        axialTilt: 97.8,
    },
    { 
        name: 'Neptune', 
        radius: 1.2, 
        positionX: 190, 
        textures: { color: 'textures/2k_neptune.jpg' },
        axialTilt: 28.3,
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
