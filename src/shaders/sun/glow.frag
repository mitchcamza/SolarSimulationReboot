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

    // Calculate the Fresnel effect
    float fresnel = pow(1.0 - dot(vNormal, viewDirection), 3.0);

    // // Calculate the glow effect based on distance
    float dist = distance(gl_FragCoord.xy, uCenter.xy);
    float glow = smoothstep(uInnerRadius, uOuterRadius, dist);

    // Blend the Fresnel effect with the glow effect
    vec3 glowColor = mix(uSunColor * fresnel, vec3(0.0), glow);
    
    gl_FragColor = vec4(uGlowColor * glow * uGlowIntensity, glow);
}
