import * as THREE from 'three';
import 
{
    earthMesh, earthRadius, earthOrbitGroup,
    marsMesh, marsRadius, marsOrbitGroup,
    jupiterMesh, jupiterRadius, jupiterOrbitGroup,
    saturnMesh, saturnRadius, saturnOrbitGroup,
    uranusMesh, uranusRadius, uranusOrbitGroup,
    neptuneMesh, neptuneRadius, neptuneOrbitGroup
} from './planets.js';


/**
 * Moons
 */

function createMoon({ radius, parentPlanet, positionX, texture }) 
{
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(texture)
    });
    const moon = new THREE.Mesh(geometry, material);
    moon.position.set(positionX, 0, 0); // Position relative to orbit group
    moon.receiveShadow = true;
    moon.castShadow = true;
    return moon;
}

// Earth's moon
export const earthLunaOrbitGroup = new THREE.Group();
earthLunaOrbitGroup.position.copy(earthMesh.position);

const earthLuna = createMoon({
    radius: earthRadius * 0.273,
    parentPlanet: earthMesh,
    positionX: earthRadius + 1,
    texture: 'textures/2k_moon.jpg'
});
export const earthLunaMesh = earthLuna;
earthLunaOrbitGroup.add(earthLunaMesh);

// Mars' moons
export const marsLunaOrbitGroup = new THREE.Group();
marsLunaOrbitGroup.position.copy(marsMesh.position);

const marsPhobos = createMoon({
    radius: marsRadius * 0.209,
    parentPlanet: marsMesh,
    positionX: marsRadius + 1.67,
    texture: 'textures/phobos.jpg'
});
export const marsPhobosMesh = marsPhobos;
marsLunaOrbitGroup.add(marsPhobosMesh);

const marsDeimos = createMoon({
    radius: marsRadius * 0.423,
    parentPlanet: marsMesh,
    positionX: -marsRadius - 1.97,
    texture: 'textures/deimos.jpg'
});
export const marsDeimosMesh = marsDeimos;
marsLunaOrbitGroup.add(marsDeimosMesh);

// Jupiter's moons
export const jupiterLunaOrbitGroup = new THREE.Group();
jupiterLunaOrbitGroup.position.copy(jupiterMesh.position);

const jupiterIo = createMoon({
    radius: jupiterRadius * 0.058,
    parentPlanet: jupiterMesh,
    positionX: jupiterRadius + 3,
    texture: 'textures/io.jpg'
});
export const jupiterIoMesh = jupiterIo;
jupiterLunaOrbitGroup.add(jupiterIoMesh);

const jupiterEuropa = createMoon({
    radius: jupiterRadius * 0.036,
    parentPlanet: jupiterMesh,
    positionX: -jupiterRadius - 3.5,
    texture: 'textures/europa.jpg'
});
export const jupiterEuropaMesh = jupiterEuropa;
jupiterLunaOrbitGroup.add(jupiterEuropaMesh);

const jupiterGanymede = createMoon({
    radius: jupiterRadius * 0.026,
    parentPlanet: jupiterMesh,
    positionX: -jupiterRadius - 0.8,
    texture: 'textures/ganymede.jpg'
});
export const jupiterGanymedeMesh = jupiterGanymede;
jupiterLunaOrbitGroup.add(jupiterGanymedeMesh);

const jupiterCallisto = createMoon({
    radius: jupiterRadius * 0.021,
    parentPlanet: jupiterMesh,
    positionX: jupiterRadius + 0.5,
    texture: 'textures/callisto.jpg'
});
export const jupiterCallistoMesh = jupiterCallisto;
jupiterLunaOrbitGroup.add(jupiterCallistoMesh);

// Saturn's moons
export const saturnLunaOrbitGroup = new THREE.Group();
saturnLunaOrbitGroup.position.copy(saturnMesh.position);

const saturnTitan = createMoon({
    radius: saturnRadius * 0.128,
    parentPlanet: saturnMesh,
    positionX: saturnRadius + 4,
    texture: 'textures/titan.jpg'
});
export const saturnTitanMesh = saturnTitan;
saturnLunaOrbitGroup.add(saturnTitanMesh);

const saturnRhea = createMoon({
    radius: saturnRadius * 0.067,
    parentPlanet: saturnMesh,
    positionX: -saturnRadius - 4.5,
    texture: 'textures/rhea.jpg'
});
export const saturnRheaMesh = saturnRhea;
saturnLunaOrbitGroup.add(saturnRheaMesh);

// Uranus' moons
export const uranusLunaOrbitGroup = new THREE.Group();
uranusLunaOrbitGroup.position.copy(uranusMesh.position);

const uranusTitania = createMoon({
    radius: uranusRadius * 0.16,
    parentPlanet: uranusMesh,
    positionX: uranusRadius + 5,
    texture: 'textures/titania.jpg'
});
export const uranusTitaniaMesh = uranusTitania;
uranusLunaOrbitGroup.add(uranusTitaniaMesh);

const uranusOberon = createMoon({
    radius: uranusRadius * 0.08,
    parentPlanet: uranusMesh,
    positionX: -uranusRadius - 5.5,
    texture: 'textures/oberon.jpg'
});
export const uranusOberonMesh = uranusOberon;
uranusLunaOrbitGroup.add(uranusOberonMesh);

// Neptune's moons
export const neptuneLunaOrbitGroup = new THREE.Group();
export const neptuneLunaRetrogadeOrbitGroup = new THREE.Group();
neptuneLunaOrbitGroup.position.copy(neptuneMesh.position);
neptuneLunaRetrogadeOrbitGroup.position.copy(neptuneMesh.position);

const neptuneTriton = createMoon({
    radius: neptuneRadius * 0.45,
    parentPlanet: neptuneMesh,
    positionX: neptuneRadius + 9,
    texture: 'textures/triton.jpg'
});
export const neptuneTritonMesh = neptuneTriton;
neptuneLunaRetrogadeOrbitGroup.add(neptuneTritonMesh);

const neptuneProteus = createMoon({
    radius: neptuneRadius * 0.17,
    parentPlanet: neptuneMesh,
    positionX: -neptuneRadius - 3,
    texture: 'textures/triton.jpg'
});
export const neptuneProteusMesh = neptuneProteus;
neptuneLunaOrbitGroup.add(neptuneProteusMesh);

earthOrbitGroup.add(earthLunaOrbitGroup);
marsOrbitGroup.add(marsLunaOrbitGroup);
jupiterOrbitGroup.add(jupiterLunaOrbitGroup);
saturnOrbitGroup.add(saturnLunaOrbitGroup);
uranusOrbitGroup.add(uranusLunaOrbitGroup);
neptuneOrbitGroup.add(neptuneLunaOrbitGroup);
neptuneOrbitGroup.add(neptuneLunaRetrogadeOrbitGroup);
