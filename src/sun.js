import * as THREE from 'three';


// Textures
const colorTexture = new THREE.TextureLoader().load('textures/2k_sun.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;

// Sun Mesh
export const sun = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 64), 
    new THREE.MeshBasicMaterial({ map: colorTexture })
);
