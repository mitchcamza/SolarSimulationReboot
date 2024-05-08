import * as THREE from 'three';
import CelestialBody from './celestials';

/**
 * Stars
 */
// Sun
const sunRadius = 10;
const sun = new CelestialBody(sunRadius, 0, 'textures/2k_sun.jpg');
export const sunMesh = sun.getMesh();

// // Modify material to be emissive
// sunMesh.material = new THREE.MeshLambertMaterial({
//     map: sunMesh.material.map, // Preserve the existing texture
//     emissive: 0xffffff, // Set the emissive color to white
//     emissiveIntensity: 1, // Adjust intensity as needed
//     side: THREE.FrontSide // Ensure the material is visible from the inside
// });