/**
* @file flare.frag
* @brief Fragment shader for solar flares
* @details Creates animated solar flares (prominences) using procedural noise
* @author Mitch Campbell
* @copyright 2024
*/

precision mediump float;

uniform float uTime;
uniform float uFlareIntensity;
uniform vec3 uFlareColor;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

// Simple 2D noise function for performance
float hash(vec2 p) 
{
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) 
{
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal noise for more detail
float fbm(vec2 p) 
{
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for(int i = 0; i < 3; i++) 
    {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    
    return value;
}

void main() 
{
    // Create vertical flare shape using UV coordinates
    vec2 uv = vUv;
    
    // Center the UV
    uv = uv * 2.0 - 1.0;
    
    // Cache commonly used value for performance
    float uvXAbs = abs(uv.x);
    
    // Create elongated flare shape with stronger base
    float flareShape = 1.0 - uvXAbs;
    flareShape = pow(flareShape, 1.5);
    
    // Add height falloff with visible base
    float heightFalloff = smoothstep(1.2, -0.2, abs(uv.y));
    flareShape *= heightFalloff;
    
    // Animate with noise for turbulent appearance
    vec2 noiseCoord = vec2(uv.x * 2.0, uv.y * 3.0 - uTime * 0.3);
    float turbulence = fbm(noiseCoord * 2.0);
    
    // Add time-based animation for dynamic movement
    float wave = sin(uv.y * 5.0 - uTime * 2.0) * 0.5 + 0.5;
    turbulence = mix(turbulence, wave, 0.3);
    
    // Combine shape with turbulence
    float flare = flareShape * (0.5 + turbulence * 0.5);
    
    // Add very bright core at base
    float coreShape = pow(1.0 - uvXAbs, 3.0) * smoothstep(0.3, -0.3, uv.y);
    float core = coreShape * 3.0;
    flare = max(flare * 1.5, core);
    
    // Color gradient from bright yellow-white at base to orange-red at tips
    vec3 baseColor = vec3(1.0, 0.95, 0.7);  // Bright yellow-white
    vec3 tipColor = vec3(1.0, 0.3, 0.0);    // Orange-red
    vec3 color = mix(tipColor, baseColor, pow(smoothstep(1.0, -0.5, uv.y), 1.5));
    
    // Boost intensity for visibility
    color *= 1.3;
    
    // Apply flare intensity
    float alpha = flare * uFlareIntensity;
    
    // Ensure minimum visibility at base using the cached core calculation
    alpha = max(alpha, coreShape * uFlareIntensity * 0.8);
    
    // Clamp alpha for performance
    alpha = clamp(alpha, 0.0, 1.0);
    
    gl_FragColor = vec4(color * alpha, alpha);
}
