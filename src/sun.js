import * as THREE from 'three';

// Sun
const sunRadius = 10;
export const sunlightColor = new THREE.Color(0xffe7ba);
const colorTexture = new THREE.TextureLoader().load('textures/2k_sun.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;
console.log(colorTexture)
export const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(sunRadius, 32, 32), new THREE.MeshBasicMaterial({ map: colorTexture }));

// Modify material to be emissive
// sunMesh.material.dispose(); // Clean up the existing material
// sunMesh.material = new THREE.MeshStandardMaterial({
//     map: sunMesh.material.map, // Preserve the existing texture
//     emissive: sunlightColor, // Set the emissive color
//     emissiveIntensity: 0.1, // Adjust intensity as needed
//     side: THREE.FrontSide // Ensure the material is visible from the inside
// });
