/**
* @file sun.vert
* @brief Vertex shader for the sun
* @author Mitch Campbell
* @copyright 2024
*/

precision mediump float;

attribute vec2 uv;          // Texture coordinates
attribute vec3 position;    // Vertex position
attribute vec3 normal;      // Vertex normal

varying vec2 vUv; 
varying vec3 vPosition;
varying vec3 vNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;


/**
* @brief Main function for the vertex shader
* @details This function sets the texture coordinates and position of the vertex
*/
void main()
{
    vUv = uv;
    vPosition = position;

    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * vec4(vPosition, 1.0);
}
