import * as THREE from 'three';
import CelestialBody from './celestials';

/**
 * Planets
 */
// TODO: Refactor to use a class for planets


// Mercury
const mercuryRadius = 0.38;
const mercury = new CelestialBody(mercuryRadius, 25, 'textures/2k_mercury.jpg');
export const mercuryMesh = mercury.getMesh();
export let mercuryOrbitGroup = new THREE.Group();
mercuryOrbitGroup.add(mercuryMesh);

// Venus
const venusRadius = 0.95;
/**
 * Represents the planet Venus.
 * @type {CelestialBody}
 */
const venus = new CelestialBody(venusRadius, 40, 'textures/2k_venus_atmosphere.jpg');
export const venusMesh = venus.getMesh();
export let venusOrbitGroup = new THREE.Group();
venusOrbitGroup.add(venusMesh);

// Earth
export const earthRadius = 1;
const earth = new CelestialBody(earthRadius, 55, 'textures/2k_earth_daymap.jpg');
export const earthMesh = earth.getMesh();
export let earthOrbitGroup = new THREE.Group();
earthOrbitGroup.add(earthMesh);

// Mars
export const marsRadius = 0.53;
const mars = new CelestialBody(marsRadius, 70, 'textures/2k_mars.jpg');
export const marsMesh = mars.getMesh();
export let marsOrbitGroup = new THREE.Group();
marsOrbitGroup.add(marsMesh);

// Jupiter
export const jupiterRadius = 3.5;
const jupiter = new CelestialBody(jupiterRadius, 100, 'textures/2k_jupiter.jpg');
export const jupiterMesh = jupiter.getMesh();
export let jupiterOrbitGroup = new THREE.Group();
jupiterOrbitGroup.add(jupiterMesh);

// Saturn
export const saturnRadius = 3;
const saturn = new CelestialBody(saturnRadius, 130, 'textures/2k_saturn.jpg');
export const saturnMesh = saturn.getMesh();
export let saturnOrbitGroup = new THREE.Group();
saturnOrbitGroup.add(saturnMesh);

// Uranus
export const uranusRadius = 1.25;
const uranus = new CelestialBody(uranusRadius, 160, 'textures/2k_uranus.jpg');
export const uranusMesh = uranus.getMesh();
export let uranusOrbitGroup = new THREE.Group();
uranusOrbitGroup.add(uranusMesh);

// Neptune
export const neptuneRadius = 1.2;
const neptune = new CelestialBody(neptuneRadius, 190, 'textures/2k_neptune.jpg');
export const neptuneMesh = neptune.getMesh();
export let neptuneOrbitGroup = new THREE.Group();
neptuneOrbitGroup.add(neptuneMesh);
