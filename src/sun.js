import * as THREE from 'three';
import vertexShader from './shaders/sun.vert';
import fragmentShader from './shaders/sun.frag';


// Shader Material
const sunMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: 
    {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(1024, 1024) },
    },
    side: THREE.DoubleSide,
    transparent: true,
});

// Sun Mesh
export const sun = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 64), 
    sunMaterial
);
