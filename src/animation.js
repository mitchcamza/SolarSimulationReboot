import { MathUtils } from 'three';

import { planets, orbitalGroups } from './planets.js';


import 
{ 
    earthLunaMesh, earthLunaOrbitGroup, 
    marsPhobosMesh, marsDeimosMesh, marsLunaOrbitGroup, 
    jupiterIoMesh, jupiterEuropaMesh, jupiterGanymedeMesh, jupiterCallistoMesh, jupiterLunaOrbitGroup, 
    saturnTitanMesh, saturnRheaMesh, saturnLunaOrbitGroup, 
    uranusTitaniaMesh, uranusOberonMesh,uranusLunaOrbitGroup, 
    neptuneTritonMesh, neptuneProteusMesh, neptuneLunaOrbitGroup, neptuneLunaRetrogadeOrbitGroup, 
} from './moons.js';

/**
 * Animation
 */

// TODO: remove magic numbers
/**
 * Updates the positions of the moons based on the elapsed time and speed.
 * 
 * @param {number} elapsedTime - The elapsed time in seconds.
 * @param {number} speed - The speed factor.
 */
export function updateMoons(elapsedTime, speed) 
{
    // Update moons based on their orbital speed
    earthLunaOrbitGroup.rotation.y = elapsedTime * speed / (0.0748);
    marsLunaOrbitGroup.rotation.y = elapsedTime * speed / (0.0748);
    jupiterLunaOrbitGroup.rotation.y = elapsedTime * speed / (0.0748);
    saturnLunaOrbitGroup.rotation.y = elapsedTime * speed / (0.0748);
    uranusLunaOrbitGroup.rotation.y = elapsedTime * speed / (0.0748);
    neptuneLunaOrbitGroup.rotation.y = elapsedTime * speed / (0.0748);
    neptuneLunaRetrogadeOrbitGroup.rotation.y = elapsedTime * speed / (-0.0748);

    // Rotate the moons along their own axes
    earthLunaMesh.rotation.y = elapsedTime * speed / (0.0748);
    marsPhobosMesh.rotation.y = elapsedTime * speed / (0.0748);
    marsDeimosMesh.rotation.y = elapsedTime * speed / (0.0748);
    jupiterIoMesh.rotation.y = elapsedTime * speed / (0.0748);
    jupiterEuropaMesh.rotation.y = elapsedTime * speed / (0.0748);
    jupiterGanymedeMesh.rotation.y = elapsedTime * speed / (0.0748);
    jupiterCallistoMesh.rotation.y = elapsedTime * speed / (0.0748);
    saturnTitanMesh.rotation.y = elapsedTime * speed / (0.0748);
    saturnRheaMesh.rotation.y = elapsedTime * speed / (0.0748);
    uranusTitaniaMesh.rotation.y = elapsedTime * speed / (0.0748);
    uranusOberonMesh.rotation.y = elapsedTime * speed / (0.0748);
    neptuneTritonMesh.rotation.y = elapsedTime * speed / (-0.0748);
    neptuneProteusMesh.rotation.y = elapsedTime * speed / (0.0748);
}

// DEBUG
// console.log(mercury.axialTilt);
// console.log(MathUtils.degToRad(0.034));
// console.log(MathUtils.degToRad(mercury.axialTilt));

// TODO: remove magic numbers
export function updatePlanets(elapsedTime, speed) 
{
    // Spin planets based on their axial tilt
    planets[0].rotation.x = MathUtils.degToRad(0.034);
    planets[1].rotation.x = MathUtils.degToRad(177.4);
    planets[2].rotation.x = MathUtils.degToRad(23.5);
    planets[3].rotation.x = MathUtils.degToRad(25.2);
    planets[4].rotation.x = MathUtils.degToRad(3.1);
    planets[5].rotation.x = MathUtils.degToRad(26.7);
    planets[6].rotation.x = MathUtils.degToRad(97.8);
    planets[7].rotation.x = MathUtils.degToRad(28.3);

    planets[1].rotation.y = elapsedTime * speed / (-0.01); 
    planets[2].rotation.y = elapsedTime * speed / (1);
    planets[3].rotation.y = elapsedTime * speed / (1.03);
    planets[4].rotation.y = elapsedTime * speed / (0.41);
    planets[5].rotation.y = elapsedTime * speed / (0.43);
    planets[6].rotation.y = elapsedTime * speed / (0.72);
    planets[7].rotation.y = elapsedTime * speed / (0.67);

    // Update planets based on their orbital speed
    orbitalGroups[0].rotation.y = elapsedTime * speed / (0.24);
    orbitalGroups[1].rotation.y = elapsedTime * speed / (0.62);
    orbitalGroups[2].rotation.y = elapsedTime * speed / (1);
    orbitalGroups[3].rotation.y = elapsedTime * speed / (1.88);
    orbitalGroups[4].rotation.y = elapsedTime * speed / (11.86);
    orbitalGroups[5].rotation.y = elapsedTime * speed / (29.46);
    orbitalGroups[6].rotation.y = elapsedTime * speed / (84.01);
    orbitalGroups[7].rotation.y = elapsedTime * speed / (164.8);
}
