import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import Stats from 'stats.js'

// import sun
import { sunMesh } from './sun.js';

// Import planets
import { earthMesh, marsMesh, jupiterMesh, saturnMesh, uranusMesh, neptuneMesh, earthOrbitGroup, marsOrbitGroup, jupiterOrbitGroup, saturnOrbitGroup, uranusOrbitGroup, neptuneOrbitGroup, mercuryOrbitGroup, venusOrbitGroup, mercuryMesh, venusMesh } from './planets.js';

// Import moons
import { earthLunaOrbitGroup, marsLunaOrbitGroup, jupiterLunaOrbitGroup, saturnLunaOrbitGroup, uranusLunaOrbitGroup, neptuneLunaOrbitGroup, neptuneLunaRetrogadeOrbitGroup, earthLunaMesh, marsPhobosMesh, marsDeimosMesh, jupiterIoMesh, jupiterEuropaMesh, jupiterGanymedeMesh, jupiterCallistoMesh, saturnTitanMesh, saturnRheaMesh, uranusTitaniaMesh, uranusOberonMesh, neptuneTritonMesh, neptuneProteusMesh } from './moons.js';

/**
 * Loaders
 */
const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Base
 */
const gui = new GUI();

/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl');
const aspect = { width: window.innerWidth, height: window.innerHeight };

/**
 * Scene
 */
const scene = new THREE.Scene();
scene.scale.set(10, 10, 10);

// Frame rate monitor
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(650, 650);
scene.add(gridHelper);

/** 
 * Environment Map
 */
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/skybox/right.png',
    '/environmentMaps/skybox/left.png',
    '/environmentMaps/skybox/top.png',
    '/environmentMaps/skybox/bottom.png',
    '/environmentMaps/skybox/front.png',
    '/environmentMaps/skybox/back.png'
])
scene.environment = environmentMap
scene.background = environmentMap


/**
 * Lights
 */
const pointLight = new THREE.PointLight(0xffffff, 1000, 0, 2);
pointLight.position.set(0, 0, 0);
pointLight.castShadow = true;
scene.add(pointLight);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, aspect.width / aspect.height, 0.1, 5000);
camera.position.set(-10, 133, 110);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, physicallyCorrectLights: true });
renderer.setSize(aspect.width, aspect.height);

// Handle windows resize for responsiveness
window.addEventListener('resize', () =>
{
    // Update the aspect ratio on resize
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    // Update the camera
    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
});

// Handle fullscreen
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement)
    {
        canvas.requestFullscreen();
    }
    else
    {
        if (document.exitFullscreen)
        {
            document.exitFullscreen();
        }
        else if (document.webkitFullscreen)
        {
            document.webkitExitFullscreen();
        }
    }
});

/**
 * Groups
 */

// Create a group for the solar system and add the sun to the group
const solarSystemGroup = new THREE.Group();
solarSystemGroup.add(sunMesh);

// Add planet orbit groups to solar system
solarSystemGroup.add(mercuryOrbitGroup, venusOrbitGroup, earthOrbitGroup, marsOrbitGroup, jupiterOrbitGroup, saturnOrbitGroup, uranusOrbitGroup, neptuneOrbitGroup);

// Add solar system to scene
scene.add(solarSystemGroup);


/**
 * Controls
 */
// TODO: Show controls in fullscreen mode

// Allow controls to be visible when in fullscreen
gui.domElement.style.zIndex = 1000;

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Camera position controls
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(controls, 'enabled').name('Orbit Controls');
cameraFolder.add(camera.position, 'x').min(-500).max(500).step(0.1).name('Move X').listen();
cameraFolder.add(camera.position, 'y').min(-500).max(500).step(0.1).name('Move Y').listen();
cameraFolder.add(camera.position, 'z').min(-500).max(500).step(0.1).name('Move Z').listen();
cameraFolder.close();

// Speed controls for planets and moons
const speedFolder = gui.addFolder('Speed');
let speedFactor = 0.1;
let speedMultiplier = 1.0;
let speed = speedFactor * speedMultiplier;

// Slider for speed
const speedSlider = speedFolder.add({ speed: 1.0 }, 'speed', 0, 2, 0.1).name('Speed').listen();
speedSlider.onChange((value) => {
    speedMultiplier = value;
    speed = speedFactor * speedMultiplier;
});

// Add a Speed Reset button
speedFolder.add({ Reset: () => { 
    speedMultiplier = 1.0;
    speed = speedFactor * speedMultiplier;
    speedSlider.setValue(1.0);
} }, 'Reset').name('Reset');

// Material Folder
const materialFolder = gui.addFolder('Materials');
materialFolder.add({ Wireframe: false }, 'Wireframe').name('Wireframe').onChange((value) => {
    solarSystemGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.material.wireframe = value; 
        }});
    });

// Toggle MeshNormalMaterial
materialFolder.add({ Normal: false }, 'Normal').name('Normal').onChange((value) => {
    solarSystemGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) 
        {
            if (value) 
            {
                object.userData.originalMaterial = object.material;
                object.material.dispose();
                if (object.material.wireframe) 
                {
                    object.material = new THREE.MeshNormalMaterial({ wireframe: true });
                } 
                else 
                {
                    object.material = new THREE.MeshNormalMaterial();
                }
            } 
            else 
            {
                if (object.userData.originalMaterial) 
                {
                    object.material.dispose();
                    object.material = object.userData.originalMaterial;
                    delete object.userData.originalMaterial;
                }
            }
        }
    });
});

// Helpers folder
const helperFolder = gui.addFolder('Helpers');
helperFolder.add(gridHelper, 'visible').name('Grid Helper').setValue(false);
helperFolder.close();

// Toggle Axes Helper for all celestial bodies
helperFolder.add({ AxesHelper: false }, 'AxesHelper').name('Axes Helper').setValue(false).onChange((value) => {
    solarSystemGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.children[0].visible = value; 
        }});
    }   
);

// Performance folder
const performanceFolder = gui.addFolder('Performance');
performanceFolder.add({ ShowStats: true }, 'ShowStats').name('Show stats').onChange((value) => {
    if (value) { stats.showPanel(0); } 
    else { stats.showPanel(-1); }
});


/**
 * Animation
 */
function updateMoons(elapsedTime, speed) {
    
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

function updatePlanets(elapsedTime, speed) {
    
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

// Add a visible ellipse for each planet's orbit
const ellipseGeometry = new THREE.RingGeometry();
const ellipseMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const ellipse = new THREE.Line(ellipseGeometry, ellipseMaterial);
scene.add(ellipse);



// Clock
const clock = new THREE.Clock();

// Update the render loop
const tick = () =>
{
    // Update stats
    stats.begin();

    // Get elapsed time
    const elapsedTime = clock.getElapsedTime();

    // Update planets and moons
    updatePlanets(elapsedTime, speed);
    updateMoons(elapsedTime, speed);

    // Update the renderer
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

    // Update stats (end)
    stats.end();
}
tick()
