import * as THREE from 'three';
import vertexShader from './shaders/sun/sun.vert';
import fragmentShader from './shaders/sun/sun.frag';
import glowFragmentShader from './shaders/sun/glow.frag'


// Sun Material
export const sunMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms:
    {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uScatteringIntensity: { value: 0.1 },
        uCameraPosition: { value: new THREE.Vector3() },
    },
    side: THREE.DoubleSide,
    transparent: true,
});

// Sun Mesh
export const sun = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 64), 
    sunMaterial
);

// Glow Material
export const glowMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: glowFragmentShader,
    uniforms: 
    {
        uSunColor: { value: new THREE.Color(1.0, 0.42, 0.0) },
        uCenter: { value: sun.position.clone() },
        uInnerRadius: { value: sun.geometry.parameters.radius * 1.1 },
        uOuterRadius: { value: sun.geometry.parameters.radius * 1.2 },
        uGlowColor: { value: new THREE.Color('orange') },
        uGlowIntensity: { value: 1.0 },
        uCameraPosition: { value: new THREE.Vector3() },
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
});

const glowMesh = new THREE.Mesh(
    new THREE.SphereGeometry(sun.geometry.parameters.radius * 1.01, 32, 32),
    glowMaterial
);
sun.add(glowMesh);
