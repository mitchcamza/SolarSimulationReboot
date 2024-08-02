import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import Stats from 'stats.js'

// import sun
import { sunMesh, sunlightColor } from './sun.js';

// Import planets and moons
import { earthOrbitGroup, marsOrbitGroup, jupiterOrbitGroup, saturnOrbitGroup, uranusOrbitGroup, neptuneOrbitGroup, mercuryOrbitGroup, venusOrbitGroup, mercuryMesh, venusMesh, earthMesh, marsMesh, jupiterMesh, saturnMesh, uranusMesh, neptuneMesh } from './planets.js';

// Import animation functions
import { updatePlanets, updateMoons } from './animation.js';

/**
 * Loaders
 */
const environmentMapTextureLoader = new THREE.CubeTextureLoader();

/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl');
const aspect = { width: window.innerWidth, height: window.innerHeight };

/**
 * Scene
 */
const scene = new THREE.Scene();
// scene.scale.set(10, 10, 10);

/**
 * Performance stats
 */
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

/**
 * Helpers
 */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(650, 650);
scene.add(gridHelper);

/**
 * Environment map
 */
const environmentMap = environmentMapTextureLoader.load([
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

// Point light
const pointLight = new THREE.PointLight(sunlightColor, 6000, 1000, 2);
pointLight.position.copy(sunMesh.position);
pointLight.castShadow = true;
sunMesh.add(pointLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-76, 28, 70);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, physicallyCorrectLights: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.castShadow = true;

// Handle window resize for responsiveness
window.addEventListener('resize', () =>
{
    // Update the aspect ratio on resize
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    // Update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
 * Orbital Groups
 */
const solarSystemGroup = new THREE.Group();
solarSystemGroup.add(sunMesh);

// Add planet orbit groups to solar system
solarSystemGroup.add(mercuryOrbitGroup, venusOrbitGroup, earthOrbitGroup, marsOrbitGroup, jupiterOrbitGroup, saturnOrbitGroup, uranusOrbitGroup, neptuneOrbitGroup);

// Add solar system to scene
scene.add(solarSystemGroup);


/**
 * Controls
 */
const gui = new GUI();

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 40;
controls.maxDistance = 300;

// Add light controls to the GUI
const lightsFolder = gui.addFolder('Lights')
lightsFolder
    .add(pointLight, 'intensity')
    .min(0)
    .max(10000)
    .step(1)
    .name('Point Light Intensity')
    .listen()

lightsFolder
    .add(ambientLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Ambient Light Intensity')
    .listen();

// Camera position controls
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(controls, 'enabled').name('Orbit Controls');
cameraFolder.add(camera.position, 'x').min(-500).max(500).step(0.1).name('Move X').listen();
cameraFolder.add(camera.position, 'y').min(-500).max(500).step(0.1).name('Move Y').listen();
cameraFolder.add(camera.position, 'z').min(-500).max(500).step(0.1).name('Move Z').listen();

// Reset camera position
cameraFolder.add({ Reset: () => {
    camera.position.set(-10, 133, 110);
    camera.lookAt(sunMesh.position);
} }, 'Reset').name('Reset');

cameraFolder.close();

// Add a list of planet names to the GUI
const celestials = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
const followFolder = gui.addFolder('Follow');

// Add a button for each planet to focus the camera on the planet
celestials.forEach((celestial) => {
    followFolder.add({ [`Follow${celestial}`]: () => {
        const offset = new THREE.Vector3(0, 0, 50); // Set the offset distance from the target
        const targetPosition = eval(`${celestial.toLowerCase()}Mesh`).position.clone().add(offset); // Calculate the target position with offset
        camera.position.copy(targetPosition);
        camera.lookAt(eval(`${celestial.toLowerCase()}Mesh`).position);
    }
    }, `Follow${celestial}`).name(celestial);
});
followFolder.close();

// Handle planet click event
/**
 * Handles the click event on a planet.
 * @param {string} name - The name of the planet that was clicked.
 */
function handlePlanetClick(name) {
    let planetMesh;
    // Determine which planet was clicked and get its corresponding Three.js mesh
    switch(name) {
        case 'Mercury':
            planetMesh = mercuryMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Venus':
            planetMesh = venusMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Earth':
            planetMesh = earthMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Mars':
            planetMesh = marsMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Jupiter':
            planetMesh = jupiterMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Saturn':
            planetMesh = saturnMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Uranus':
            planetMesh = uranusMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        case 'Neptune':
            planetMesh = neptuneMesh;
            console.log('Clicked on', planetMesh.name)
            break;
        default:
            console.error('Invalid planet name:', name);
            return;
    }

    // Focus the camera on the selected planet
    focusCameraOnObject(planetMesh);
}

// Function to focus the camera on a specific object
function focusCameraOnObject(object) {
    // Calculate the position to focus the camera on
    const targetPosition = object.position.clone();
    // Animate the camera's position to focus on the target position
    new TWEEN.Tween(camera.position)
        .to(targetPosition.clone().add(new THREE.Vector3(0, 10, 30)), 1000) // Example offset for better view
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
}

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
speedFolder.close();

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
materialFolder.close();

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

// Add a point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
pointLightHelper.visible = false;
helperFolder.add(pointLightHelper, 'visible').name('Point Light Helper').listen();
scene.add(pointLightHelper);

// Performance folder
const performanceFolder = gui.addFolder('Performance');
performanceFolder.add({ ShowStats: true }, 'ShowStats').name('Show stats').onChange((value) => {
    if (value) { stats.showPanel(0); } 
    else { stats.showPanel(-1); }
});
performanceFolder.close();


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
