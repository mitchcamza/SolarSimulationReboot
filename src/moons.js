import * as THREE from 'three';
import CelestialBody from './celestials.js';
import { earthMesh, earthRadius, marsMesh, marsRadius, jupiterMesh, jupiterRadius, saturnMesh, saturnRadius, uranusMesh, uranusRadius, neptuneMesh, neptuneRadius, earthOrbitGroup, jupiterOrbitGroup, marsOrbitGroup, neptuneOrbitGroup, saturnOrbitGroup, uranusOrbitGroup } from './planets.js';

/**
 * Moons
 */
// Note: Mercury and Venus do not have moons
// TODO: Calculate moon radii and relative positions based on their parent planet
// TODO: Refactor to use a class for moons

/// Earth's moons (x1)
export const earthLunaOrbitGroup = new THREE.Group();
earthLunaOrbitGroup.position.x = earthMesh.position.x;
    // Luna
    const earthLuna = new CelestialBody(earthRadius * 0.273, earthMesh.position.x, 'textures/2k_moon.jpg');
    export const earthLunaMesh = earthLuna.getMesh();
    earthLunaMesh.position.set(earthRadius + 1, 0, 0);
    earthLunaOrbitGroup.add(earthLunaMesh);

/// Mars' moons (x2)
export const marsLunaOrbitGroup = new THREE.Group();
marsLunaOrbitGroup.position.x = marsMesh.position.x;

    // Phobos
    const marsPhobos = new CelestialBody(marsRadius * 0.209, marsMesh.position.x, 'textures/phobos.jpg');
    export const marsPhobosMesh = marsPhobos.getMesh();
    marsPhobosMesh.position.set((marsRadius + 1.67), 0, 0);
    marsLunaOrbitGroup.add(marsPhobosMesh);

    // Deimos
    const marsDeimos = new CelestialBody(marsRadius * 0.423, marsMesh.position.x, 'textures/deimos.jpg');
    export const marsDeimosMesh = marsDeimos.getMesh();
    marsDeimosMesh.position.set((marsRadius + 1.97) * -1, 0, 0);
    marsLunaOrbitGroup.add(marsDeimosMesh);

/// Jupiter's moons (x4)
export const jupiterLunaOrbitGroup = new THREE.Group();
jupiterLunaOrbitGroup.position.x = jupiterMesh.position.x;

    // Io
    const jupiterIo = new CelestialBody(jupiterRadius * 0.058, jupiterMesh.position.x, 'textures/io.jpg');
    export const jupiterIoMesh = jupiterIo.getMesh();
    jupiterIoMesh.position.set(jupiterRadius + 3, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterIoMesh);

    // Europa
    const jupiterEuropa = new CelestialBody(jupiterRadius * 0.036, jupiterMesh.position.x, 'textures/europa.jpg');
    export const jupiterEuropaMesh = jupiterEuropa.getMesh();
    jupiterEuropaMesh.position.set((jupiterRadius + 3.5) * -1, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterEuropaMesh);

    // Ganymede
    /**
     * Represents the Ganymede moon of Jupiter.
     * @type {CelestialBody}
     */
    const jupiterGanymede = new CelestialBody(jupiterRadius * 0.026, jupiterMesh.position.x, 'textures/ganymede.jpg');
    export const jupiterGanymedeMesh = jupiterGanymede.getMesh();
    jupiterGanymedeMesh.position.set((jupiterRadius + 0.8) * -1, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterGanymedeMesh);

    // Callisto
    const jupiterCallisto = new CelestialBody(jupiterRadius * 0.021, jupiterMesh.position.x, 'textures/callisto.jpg');
    export const jupiterCallistoMesh = jupiterCallisto.getMesh();
    jupiterCallistoMesh.position.set(jupiterRadius + 0.5, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterCallistoMesh);

/// Saturn's moons (x2)
export const saturnLunaOrbitGroup = new THREE.Group();
saturnLunaOrbitGroup.position.x = saturnMesh.position.x;

    // Titan
    const saturnTitan = new CelestialBody(saturnRadius * 0.128, saturnMesh.position.x, 'textures/titan.jpg');
    export const saturnTitanMesh = saturnTitan.getMesh();
    saturnTitanMesh.position.set(saturnRadius + 4, 0, 0);
    saturnLunaOrbitGroup.add(saturnTitanMesh);

    // Rhea
    const saturnRhea = new CelestialBody(saturnRadius * 0.067, saturnMesh.position.x, 'textures/rhea.jpg');
    export const saturnRheaMesh = saturnRhea.getMesh();
    saturnRheaMesh.position.set((saturnRadius + 4.5) * -1, 0, 0);
    saturnLunaOrbitGroup.add(saturnRheaMesh);

/// Uranus' moons (x2)
export const uranusLunaOrbitGroup = new THREE.Group();
uranusLunaOrbitGroup.position.x = uranusMesh.position.x;

    // Titania
    const uranusTitania = new CelestialBody(uranusRadius * 0.16, uranusMesh.position.x, 'textures/titania.jpg');
    export const uranusTitaniaMesh = uranusTitania.getMesh();
    uranusTitaniaMesh.position.set(uranusRadius + 5, 0, 0);
    uranusLunaOrbitGroup.add(uranusTitaniaMesh);

    // Oberon
    const uranusOberon = new CelestialBody(uranusRadius * 0.08, uranusMesh.position.x, 'textures/oberon.jpg');
    export const uranusOberonMesh = uranusOberon.getMesh();
    uranusOberonMesh.position.set((uranusRadius + 5.5) * -1, 0, 0);
    uranusLunaOrbitGroup.add(uranusOberonMesh);

/// Neptune's moons (x2) 
// Note: Neptune has 14 known moons, but only 2 are shown here 
// TODO: Add more moons
export const neptuneLunaOrbitGroup = new THREE.Group();
export const neptuneLunaRetrogadeOrbitGroup = new THREE.Group();
neptuneLunaOrbitGroup.position.x = neptuneMesh.position.x;
neptuneLunaRetrogadeOrbitGroup.position.x = neptuneMesh.position.x;

    // Triton
    const neptuneTriton = new CelestialBody(neptuneRadius * 0.45, neptuneMesh.position.x, 'textures/triton.jpg');
    export const neptuneTritonMesh = neptuneTriton.getMesh();
    neptuneTritonMesh.position.set(neptuneRadius + 9, 0, 0);
    neptuneLunaRetrogadeOrbitGroup.add(neptuneTritonMesh);

    // Proteus 
    const neptuneProteus = new CelestialBody(neptuneRadius * 0.17, neptuneMesh.position.x, 'textures/triton.jpg');
    export const neptuneProteusMesh = neptuneProteus.getMesh();
    neptuneProteusMesh.position.set((neptuneRadius + 3) * -1, 0, 0);
    neptuneLunaOrbitGroup.add(neptuneProteusMesh);// Add moons to their respective planets

    // TODO: get textures for Proteus

earthOrbitGroup.add(earthLunaOrbitGroup);
marsOrbitGroup.add(marsLunaOrbitGroup);
jupiterOrbitGroup.add(jupiterLunaOrbitGroup);
saturnOrbitGroup.add(saturnLunaOrbitGroup);
uranusOrbitGroup.add(uranusLunaOrbitGroup);
neptuneOrbitGroup.add(neptuneLunaOrbitGroup);
neptuneOrbitGroup.add(neptuneLunaRetrogadeOrbitGroup);

