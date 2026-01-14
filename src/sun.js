/**
 * @file sun.js
 * @brief Functions for creating and managing the sun.
 * @details This file contains functions for creating and managing the sun. The sun is created as a sphere with a custom shader material that simulates the sun's atmosphere. The sun also has a glow effect that is created using a second sphere with a separate shader material. The sun and glow sphere are added to the scene and the glow sphere is added as a child of the sun.
 * @author Mitch Campbell
 * @copyright 2024
 */


import * as THREE from 'three';
import vertexShader from './shaders/sun/sun.vert';
import fragmentShader from './shaders/sun/sun.frag';
import glowFragmentShader from './shaders/sun/glow.frag'
import flareVertexShader from './shaders/sun/flare.vert';
import flareFragmentShader from './shaders/sun/flare.frag';


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
        uGlowIntensity: { value: 1.5 },
        uCameraPosition: { value: new THREE.Vector3() },
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
});

const glowMesh = new THREE.Mesh(
    new THREE.SphereGeometry(sun.geometry.parameters.radius * 1.4, 32, 32),
    glowMaterial
);
sun.add(glowMesh);

// Solar Flares
// Create solar flares - multiple small prominences around the sun
export const solarFlares = [];
const flareCount = 6; // Keep count low for performance
const sunRadius = sun.geometry.parameters.radius;

for (let i = 0; i < flareCount; i++) {
    // Create flare material (each flare gets its own material for independent animation)
    const flareMaterial = new THREE.RawShaderMaterial({
        vertexShader: flareVertexShader,
        fragmentShader: flareFragmentShader,
        uniforms: {
            uTime: { value: Math.random() * 10.0 }, // Random start time for variety
            uFlareIntensity: { value: 1.0 + Math.random() * 0.5 },
            uFlareColor: { value: new THREE.Color(1.0, 0.5, 0.1) },
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
    });
    
    // Create flare geometry - simple plane for performance
    const flareWidth = sunRadius * 0.6;
    const flareHeight = sunRadius * (2.0 + Math.random() * 1.5); // Larger, more visible flares
    const flareGeometry = new THREE.PlaneGeometry(flareWidth, flareHeight);
    
    const flareMesh = new THREE.Mesh(flareGeometry, flareMaterial);
    
    // Position flares around the equator and mid-latitudes for better visibility
    const angle = (i / flareCount) * Math.PI * 2;
    const latitude = (Math.random() - 0.5) * Math.PI * 0.5; // -45° to +45°
    
    flareMesh.position.set(
        sunRadius * Math.cos(latitude) * Math.cos(angle),
        sunRadius * Math.sin(latitude),
        sunRadius * Math.cos(latitude) * Math.sin(angle)
    );
    
    // Orient flare to point outward from sun surface
    flareMesh.lookAt(0, 0, 0);
    flareMesh.rotateX(Math.PI / 2);
    
    // Store reference for animation
    solarFlares.push(flareMesh);
    
    sun.add(flareMesh);
}
