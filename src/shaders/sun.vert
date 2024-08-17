/**
* @file sun.vert
* @brief Vertex shader for the sun
* @author Mitch Campbell
*/

precision mediump float;

attribute vec2 uv;          // Texture coordinates
attribute vec3 position;    // Vertex position

varying vec2 vUv; 
varying vec3 vPosition;

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
