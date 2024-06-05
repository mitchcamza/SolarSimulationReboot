import * as THREE from 'three';
import CelestialBody from './celestials';

/**
 * Stars
 */
// Sun
const sunRadius = 10;
export const sunlightColor = new THREE.Color(0xffe7ba)
const sun = new CelestialBody(sunRadius, 0, 'textures/2k_sun.jpg');
export const sunMesh = sun.getMesh();

// Modify material to be emissive
sunMesh.material.dispose(); // Clean up the existing material
sunMesh.material = new THREE.MeshStandardMaterial({
    map: sunMesh.material.map, // Preserve the existing texture
    emissive: sunlightColor, // Set the emissive color
    emissiveIntensity: 1, // Adjust intensity as needed
    side: THREE.FrontSide // Ensure the material is visible from the inside
});
