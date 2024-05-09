import * as THREE from 'three';
import CelestialBody from './celestials';

/**
 * Stars
 */
// Sun
const sunRadius = 10;
/**
 * Represents the sun in the solar simulation.
 * @type {CelestialBody}
 */
const sun = new CelestialBody(sunRadius, 0, 'textures/2k_sun.jpg');
export const sunMesh = sun.getMesh();
