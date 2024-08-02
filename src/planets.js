import * as THREE from 'three';

function createPlanet({ radius, positionX, textures = {}, emissiveColor = null }) 
{
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const materialConfig = {
        bumpScale: 3.0,
        metalness: 0.1,
        roughness: 0.5,
    };

    if (textures.color)
    {
        materialConfig.map = new THREE.TextureLoader().load(textures.color);
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

// Mercury
const mercury = createPlanet({
    radius: 0.38,
    positionX: 25,
    textures: {
        color: 'textures/2k_mercury.jpg'
    },
    axialTilt: 0.034,
});
mercury.rotation.x = THREE.MathUtils.degToRad(mercury.axialTilt);
export const mercuryMesh = mercury;
export const mercuryRadius = 0.38;
export let mercuryOrbitGroup = new THREE.Group();
mercuryOrbitGroup.add(mercury);

// Venus
const venus = createPlanet({
    radius: 0.95,
    positionX: 40,
    textures: {
        color: 'textures/2k_venus_atmosphere.jpg'
    },
    axialTilt: 177.4,
});
venus.rotation.x = THREE.MathUtils.degToRad(venus.axialTilt);
export const venusMesh = venus;
export const venusRadius = 0.95;
export let venusOrbitGroup = new THREE.Group();
venusOrbitGroup.add(venus);

// Earth
const earth = createPlanet({
    radius: 1,
    positionX: 0,
    textures: {
        color: 'textures/2k_earth_daymap.jpg',
        normal: 'textures/8081_earthbump4k.jpg',
        bump: 'textures/8081_earthspec4k.jpg'
    },
    axialTilt: 23.5,
});
earth.rotation.x = THREE.MathUtils.degToRad(earth.axialTilt);
export const earthMesh = earth;
export const earthRadius = 1;
export let earthOrbitGroup = new THREE.Group();
earthOrbitGroup.add(earth);

// Mars
const mars = createPlanet({
    radius: 0.53,
    positionX: 70,
    textures: {
        color: 'textures/2k_mars.jpg'
    },
    axialTilt: 25.2,
});
mars.rotation.x = THREE.MathUtils.degToRad(mars.axialTilt);
export const marsMesh = mars;
export const marsRadius = 0.53;
export let marsOrbitGroup = new THREE.Group();
marsOrbitGroup.add(mars);

// Jupiter
const jupiter = createPlanet({
    radius: 3.5,
    positionX: 100,
    textures: {
        color: 'textures/2k_jupiter.jpg'
    },
    emissiveColor: 0x1a1a1a,
    axialTilt: 3.1,
});
jupiter.rotation.x = THREE.MathUtils.degToRad(jupiter.axialTilt);
export const jupiterMesh = jupiter;
export const jupiterRadius = 11.21;
export let jupiterOrbitGroup = new THREE.Group();
jupiterOrbitGroup.add(jupiter);

// Saturn
const saturn = createPlanet({
    radius: 3,
    positionX: 130,
    textures: {
        color: 'textures/2k_saturn.jpg'
    },
    axialTilt: 26.7,
});
saturn.rotation.x = THREE.MathUtils.degToRad(saturn.axialTilt);
export const saturnMesh = saturn;
export const saturnRadius = 9.45;
export let saturnOrbitGroup = new THREE.Group();
saturnOrbitGroup.add(saturn);

// Uranus
const uranus = createPlanet({
    radius: 1.25,
    positionX: 160,
    textures: {
        color: 'textures/2k_uranus.jpg'
    },
    axialTilt: 97.8,
});
uranus.rotation.x = THREE.MathUtils.degToRad(uranus.axialTilt);
export const uranusMesh = uranus;
export const uranusRadius = 4.01;
export let uranusOrbitGroup = new THREE.Group();
uranusOrbitGroup.add(uranus);

// Neptune
const neptune = createPlanet({
    radius: 1.2,
    positionX: 190,
    textures: {
        color: 'textures/2k_neptune.jpg'
    },
    axialTilt: 28.3,
});
neptune.rotation.x = THREE.MathUtils.degToRad(neptune.axialTilt);
export const neptuneMesh = neptune;
export const neptuneRadius = 3.88;
export let neptuneOrbitGroup = new THREE.Group();
neptuneOrbitGroup.add(neptune);
