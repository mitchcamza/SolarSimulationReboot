/**
* @file flare.vert
* @brief Vertex shader for solar flares
* @author Mitch Campbell
* @copyright 2024
*/

precision mediump float;

attribute vec2 uv;
attribute vec3 position;
attribute vec3 normal;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main()
{
    vUv = uv;
    vNormal = normal;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vPosition, 1.0);
}
