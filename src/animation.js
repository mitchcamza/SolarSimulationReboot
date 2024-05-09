import { earthMesh, marsMesh, jupiterMesh, saturnMesh, uranusMesh, neptuneMesh, earthOrbitGroup, marsOrbitGroup, jupiterOrbitGroup, saturnOrbitGroup, uranusOrbitGroup, neptuneOrbitGroup, mercuryOrbitGroup, venusOrbitGroup, mercuryMesh, venusMesh } from './planets.js';
import { earthLunaOrbitGroup, marsLunaOrbitGroup, jupiterLunaOrbitGroup, saturnLunaOrbitGroup, uranusLunaOrbitGroup, neptuneLunaOrbitGroup, neptuneLunaRetrogadeOrbitGroup, earthLunaMesh, marsPhobosMesh, marsDeimosMesh, jupiterIoMesh, jupiterEuropaMesh, jupiterGanymedeMesh, jupiterCallistoMesh, saturnTitanMesh, saturnRheaMesh, uranusTitaniaMesh, uranusOberonMesh, neptuneTritonMesh, neptuneProteusMesh } from './moons.js';

/**
 * Animation
 */
/**
 * Updates the positions of the moons based on the elapsed time and speed.
 * 
 * @param {number} elapsedTime - The elapsed time in seconds.
 * @param {number} speed - The speed factor.
 */
export function updateMoons(elapsedTime, speed) {

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
export function updatePlanets(elapsedTime, speed) {

    // Spin planets based on their axial tilt
    mercuryMesh.rotation.y = elapsedTime * speed / (0.01);
    venusMesh.rotation.y = elapsedTime * speed / (-0.01); // venus spins in the opposite direction
    earthMesh.rotation.y = elapsedTime * speed / (1);
    marsMesh.rotation.y = elapsedTime * speed / (1.03);
    jupiterMesh.rotation.y = elapsedTime * speed / (0.41);
    saturnMesh.rotation.y = elapsedTime * speed / (0.43);
    uranusMesh.rotation.y = elapsedTime * speed / (0.72);
    neptuneMesh.rotation.y = elapsedTime * speed / (0.67);

    // Update planets based on their orbital speed
    mercuryOrbitGroup.rotation.y = elapsedTime * speed / (0.24);
    venusOrbitGroup.rotation.y = elapsedTime * speed / (0.62);
    earthOrbitGroup.rotation.y = elapsedTime * speed / (1);
    marsOrbitGroup.rotation.y = elapsedTime * speed / (1.88);
    jupiterOrbitGroup.rotation.y = elapsedTime * speed / (11.86);
    saturnOrbitGroup.rotation.y = elapsedTime * speed / (29.46);
    uranusOrbitGroup.rotation.y = elapsedTime * speed / (84.01);
    neptuneOrbitGroup.rotation.y = elapsedTime * speed / (164.8);
}
