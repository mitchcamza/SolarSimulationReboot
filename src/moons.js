import * as THREE from 'three';
import { planets, orbitalGroups } from './planets.js';


/**
 * Moons
 */

function createMoon({ radius, parentPlanet, positionX, texture }) 
{
    const geometry = new THREE.SphereGeometry(radius, 32, 32);    
    const material = new THREE.MeshStandardMaterial(
    {
        map: new THREE.TextureLoader().load(texture)
    });
    material.map.colorSpace = THREE.SRGBColorSpace;
    const moon = new THREE.Mesh(geometry, material);
    moon.position.set(positionX, 0, 0); // Position relative to orbit group
    moon.receiveShadow = true;
    moon.castShadow = true;
    return moon;
}

// Earth's moon
export const earthLunaOrbitGroup = new THREE.Group();
earthLunaOrbitGroup.position.copy(planets[2].position);
const earthRadius = Math.abs(planets[2].geometry.parameters.radius);

const earthLuna = createMoon({
    radius: earthRadius * 0.273,
    parentPlanet: planets[2],
    positionX: earthRadius + 1.5,
    texture: 'textures/2k_moon.jpg'
});
export const earthLunaMesh = earthLuna;
earthLunaOrbitGroup.add(earthLunaMesh);

// Mars' moons
export const marsLunaOrbitGroup = new THREE.Group();
marsLunaOrbitGroup.position.copy(planets[3].position);
const marsRadius = Math.abs(planets[3].geometry.parameters.radius);

const marsPhobos = createMoon({
    radius: marsRadius * 0.209,
    parentPlanet: planets[3],
    positionX: marsRadius + 1.67,
    texture: 'textures/phobos.jpg'
});
export const marsPhobosMesh = marsPhobos;
marsLunaOrbitGroup.add(marsPhobosMesh);

const marsDeimos = createMoon({
    radius: marsRadius * 0.423,
    parentPlanet: planets[3],
    positionX: -marsRadius - 1.97,
    texture: 'textures/deimos.jpg'
});
export const marsDeimosMesh = marsDeimos;
marsLunaOrbitGroup.add(marsDeimosMesh);

// Jupiter's moons
export const jupiterLunaOrbitGroup = new THREE.Group();
jupiterLunaOrbitGroup.position.copy(planets[4].position);
const jupiterRadius = Math.abs(planets[4].geometry.parameters.radius);

const jupiterIo = createMoon({
    radius: jupiterRadius * 0.058,
    parentPlanet: planets[4],
    positionX: jupiterRadius + 3,
    texture: 'textures/io.jpg'
});
export const jupiterIoMesh = jupiterIo;
jupiterLunaOrbitGroup.add(jupiterIoMesh);

const jupiterEuropa = createMoon({
    radius: jupiterRadius * 0.036,
    parentPlanet: planets[4],
    positionX: -jupiterRadius - 3.5,
    texture: 'textures/europa.jpg'
});
export const jupiterEuropaMesh = jupiterEuropa;
jupiterLunaOrbitGroup.add(jupiterEuropaMesh);

const jupiterGanymede = createMoon({
    radius: jupiterRadius * 0.026,
    parentPlanet: planets[4],
    positionX: -jupiterRadius - 0.8,
    texture: 'textures/ganymede.jpg'
});
export const jupiterGanymedeMesh = jupiterGanymede;
jupiterLunaOrbitGroup.add(jupiterGanymedeMesh);

const jupiterCallisto = createMoon({
    radius: jupiterRadius * 0.021,
    parentPlanet: planets[4],
    positionX: jupiterRadius + 0.5,
    texture: 'textures/callisto.jpg'
});
export const jupiterCallistoMesh = jupiterCallisto;
jupiterLunaOrbitGroup.add(jupiterCallistoMesh);

// Saturn's moons
export const saturnLunaOrbitGroup = new THREE.Group();
saturnLunaOrbitGroup.position.copy(planets[5].position);
const saturnRadius = Math.abs(planets[5].geometry.parameters.radius);

const saturnTitan = createMoon({
    radius: saturnRadius * 0.128,
    parentPlanet: planets[5],
    positionX: saturnRadius + 4,
    texture: 'textures/titan.jpg'
});
export const saturnTitanMesh = saturnTitan;
saturnLunaOrbitGroup.add(saturnTitanMesh);

const saturnRhea = createMoon({
    radius: saturnRadius * 0.067,
    parentPlanet: planets[5],
    positionX: -saturnRadius - 4.5,
    texture: 'textures/rhea.jpg'
});
export const saturnRheaMesh = saturnRhea;
saturnLunaOrbitGroup.add(saturnRheaMesh);

// Uranus' moons
export const uranusLunaOrbitGroup = new THREE.Group();
uranusLunaOrbitGroup.position.copy(planets[6].position);
const uranusRadius = Math.abs(planets[6].geometry.parameters.radius);

const uranusTitania = createMoon({
    radius: uranusRadius * 0.16,
    parentPlanet: planets[6],
    positionX: uranusRadius + 5,
    texture: 'textures/titania.jpg'
});
export const uranusTitaniaMesh = uranusTitania;
uranusLunaOrbitGroup.add(uranusTitaniaMesh);

const uranusOberon = createMoon({
    radius: uranusRadius * 0.08,
    parentPlanet: planets[6],
    positionX: -uranusRadius - 5.5,
    texture: 'textures/oberon.jpg'
});
export const uranusOberonMesh = uranusOberon;
uranusLunaOrbitGroup.add(uranusOberonMesh);

// Neptune's moons
export const neptuneLunaOrbitGroup = new THREE.Group();
export const neptuneLunaRetrogadeOrbitGroup = new THREE.Group();
neptuneLunaOrbitGroup.position.copy(planets[7].position);
neptuneLunaRetrogadeOrbitGroup.position.copy(planets[7].position);
const neptuneRadius = Math.abs(planets[7].geometry.parameters.radius);

const neptuneTriton = createMoon({
    radius: neptuneRadius * 0.45,
    parentPlanet: planets[7],
    positionX: neptuneRadius + 9,
    texture: 'textures/triton.jpg'
});
export const neptuneTritonMesh = neptuneTriton;
neptuneLunaRetrogadeOrbitGroup.add(neptuneTritonMesh);

const neptuneProteus = createMoon({
    radius: neptuneRadius * 0.17,
    parentPlanet: planets[7],
    positionX: -neptuneRadius - 3,
    texture: 'textures/triton.jpg'
});
export const neptuneProteusMesh = neptuneProteus;
neptuneLunaOrbitGroup.add(neptuneProteusMesh);

orbitalGroups[2].add(earthLunaOrbitGroup);
orbitalGroups[3].add(marsLunaOrbitGroup);
orbitalGroups[4].add(jupiterLunaOrbitGroup);
orbitalGroups[5].add(saturnLunaOrbitGroup);
orbitalGroups[6].add(uranusLunaOrbitGroup);
orbitalGroups[7].add(neptuneLunaOrbitGroup);
orbitalGroups[7].add(neptuneLunaRetrogadeOrbitGroup);
