/**
* @file glow.frag
* @brief Fragment shader for the sun glow effect.
* @details This shader is used to render the sun glow effect. The glow effect is based on the distance from the sun and the camera position. The shader calculates the Fresnel effect and blends it with the glow effect based on the distance from the sun.
@author Mitch Campbell
@copyright 2024
*/

precision mediump float;

uniform float uInnerRadius;
uniform float uOuterRadius;
uniform float uGlowIntensity;
uniform vec2 uCenter;
uniform vec3 uSunColor;
uniform vec3 uGlowColor;
uniform vec3 uCameraPosition;

varying vec3 vPosition;
varying vec3 vNormal;


void main() 
{
    // Calculate the view direction
    vec3 viewDirection = normalize(uCameraPosition - vPosition);

    // Calculate the Fresnel effect with softer falloff for corona
    float fresnelPower = 2.0;
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDirection)), fresnelPower);

    // Enhanced glow effect with multiple layers for realism
    // Inner bright corona
    float innerGlow = pow(1.0 - abs(dot(vNormal, viewDirection)), 4.0);
    
    // Outer soft corona
    float outerGlow = pow(1.0 - abs(dot(vNormal, viewDirection)), 1.5);
    
    // Combine glow layers
    float combinedGlow = innerGlow * 0.6 + outerGlow * 0.4;
    
    // Add Fresnel rim lighting
    float rim = fresnel * 0.8;
    
    // Final glow with intensity control
    float finalGlow = (combinedGlow + rim) * uGlowIntensity;
    
    // Color gradient from yellow-orange to orange-red
    vec3 innerColor = vec3(1.0, 0.9, 0.3);  // Bright yellow
    vec3 outerColor = vec3(1.0, 0.3, 0.0);  // Orange-red
    vec3 finalColor = mix(outerColor, innerColor, fresnel);
    
    // Apply intensity and add subtle pulsing effect
    finalColor *= finalGlow;
    
    gl_FragColor = vec4(finalColor, finalGlow * 0.7);
}
