import * as THREE from 'three';
import vertexShader from './shaders/sun.vert';
import fragmentShader from './shaders/sun.frag';
import glowFragmentShader from './shaders/glow.frag'


// Sun Material
const sunMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms:
    {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uScatteringIntensity: { value: 0.1 },
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
const glowMaterial = new THREE.RawShaderMaterial({
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
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
});

const glowMesh = new THREE.Mesh(
    new THREE.SphereGeometry(sun.geometry.parameters.radius * 1.05, 32, 32),
    glowMaterial
);
sun.add(glowMesh);
