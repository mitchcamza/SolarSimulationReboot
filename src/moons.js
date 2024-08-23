/**
 * @file moons.js
 * @brief Functions for creating and managing the moons.
 * @author Mitch Campbell
 * @copyright 2024
 */


import * as THREE from 'three';
import { planets, orbitalGroups } from './planets.js';

/**
 * Moons
 */

function createMoon({ name, radius, parentPlanet, positionX, texture, initialAngle = Math.random() * Math.PI * 2, orbitSpeed, rotationSpeed }) 
{
    const geometry = new THREE.SphereGeometry(radius, 32, 32);    
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(texture)
    });
    material.map.colorSpace = THREE.SRGBColorSpace;
    const moon = new THREE.Mesh(geometry, material);
    moon.position.set(positionX, 0, 0); // Position relative to orbit group
    moon.receiveShadow = true;
    moon.castShadow = true;

    const orbitGroup = new THREE.Group();
    orbitGroup.add(moon);
    orbitGroup.position.copy(parentPlanet.position);

    return { name, mesh: moon, orbitGroup, initialAngle, orbitSpeed, rotationSpeed, parentPlanet };
}

export const moonData = [
    {
        name: 'Luna',
        radius: planets[2].geometry.parameters.radius * 0.273,
        parentPlanet: planets[2],
        positionX: planets[2].geometry.parameters.radius + 1.5,
        texture: 'textures/2k_moon.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Phobos',
        radius: planets[3].geometry.parameters.radius * 0.209,
        parentPlanet: planets[3],
        positionX: planets[3].geometry.parameters.radius + 1.67,
        texture: 'textures/phobos.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Deimos',
        radius: planets[3].geometry.parameters.radius * 0.423,
        parentPlanet: planets[3],
        positionX: -(planets[3].geometry.parameters.radius + 1.97),
        texture: 'textures/deimos.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Io',
        radius: planets[4].geometry.parameters.radius * 0.058,
        parentPlanet: planets[4],
        positionX: planets[4].geometry.parameters.radius + 3,
        texture: 'textures/io.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Europa',
        radius: planets[4].geometry.parameters.radius * 0.036,
        parentPlanet: planets[4],
        positionX: -(planets[4].geometry.parameters.radius + 3.5),
        texture: 'textures/europa.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Ganymede',
        radius: planets[4].geometry.parameters.radius * 0.026,
        parentPlanet: planets[4],
        positionX: -(planets[4].geometry.parameters.radius + 0.8),
        texture: 'textures/ganymede.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Callisto',
        radius: planets[4].geometry.parameters.radius * 0.021,
        parentPlanet: planets[4],
        positionX: planets[4].geometry.parameters.radius + 0.5,
        texture: 'textures/callisto.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Titan',
        radius: planets[5].geometry.parameters.radius * 0.128,
        parentPlanet: planets[5],
        positionX: planets[5].geometry.parameters.radius + 4,
        texture: 'textures/titan.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Rhea',
        radius: planets[5].geometry.parameters.radius * 0.067,
        parentPlanet: planets[5],
        positionX: -(planets[5].geometry.parameters.radius + 4.5),
        texture: 'textures/rhea.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Titania',
        radius: planets[6].geometry.parameters.radius * 0.16,
        parentPlanet: planets[6],
        positionX: planets[6].geometry.parameters.radius + 5,
        texture: 'textures/titania.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Oberon',
        radius: planets[6].geometry.parameters.radius * 0.08,
        parentPlanet: planets[6],
        positionX: -(planets[6].geometry.parameters.radius + 5.5),
        texture: 'textures/oberon.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Triton',
        radius: planets[7].geometry.parameters.radius * 0.45,
        parentPlanet: planets[7],
        positionX: planets[7].geometry.parameters.radius + 9,
        texture: 'textures/triton.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    },
    {
        name: 'Proteus',
        radius: planets[7].geometry.parameters.radius * 0.17,
        parentPlanet: planets[7],
        positionX: -(planets[7].geometry.parameters.radius + 3),
        texture: 'textures/triton.jpg',
        orbitSpeed: 0.0748,
        rotationSpeed: 0.0748
    }
];
export const moons = moonData.map(createMoon);

// Add moons to their respective orbital groups
moons.forEach(moon => {
    const parentIndex = planets.indexOf(moon.parentPlanet);
    if (parentIndex !== -1) {
        orbitalGroups[parentIndex].add(moon.orbitGroup);
    }
});

export const earthLunaMesh = moons.find(moon => moon.name === 'Luna').mesh;
export const marsPhobosMesh = moons.find(moon => moon.name === 'Phobos').mesh;
export const marsDeimosMesh = moons.find(moon => moon.name === 'Deimos').mesh;  
export const jupiterIoMesh = moons.find(moon => moon.name === 'Io').mesh;
export const jupiterEuropaMesh = moons.find(moon => moon.name === 'Europa').mesh;
export const jupiterGanymedeMesh = moons.find(moon => moon.name === 'Ganymede').mesh;
export const jupiterCallistoMesh = moons.find(moon => moon.name === 'Callisto').mesh;
export const saturnTitanMesh = moons.find(moon => moon.name === 'Titan').mesh;
export const saturnRheaMesh = moons.find(moon => moon.name === 'Rhea').mesh;
export const uranusTitaniaMesh = moons.find(moon => moon.name === 'Titania').mesh;
export const uranusOberonMesh = moons.find(moon => moon.name === 'Oberon').mesh;
export const neptuneTritonMesh = moons.find(moon => moon.name === 'Triton').mesh;
export const neptuneProteusMesh = moons.find(moon => moon.name === 'Proteus').mesh;

export const earthLunaOrbitGroup = moons.find(moon => moon.name === 'Luna').orbitGroup;
export const marsLunaOrbitGroup = moons.find(moon => moon.name === 'Phobos').orbitGroup;
export const jupiterLunaOrbitGroup = moons.find(moon => moon.name === 'Io').orbitGroup;
export const saturnLunaOrbitGroup = moons.find(moon => moon.name === 'Titan').orbitGroup;
export const uranusLunaOrbitGroup = moons.find(moon => moon.name === 'Titania').orbitGroup;
export const neptuneLunaOrbitGroup = moons.find(moon => moon.name === 'Triton').orbitGroup;
export const neptuneLunaRetrogadeOrbitGroup = moons.find(moon => moon.name === 'Proteus').orbitGroup;
