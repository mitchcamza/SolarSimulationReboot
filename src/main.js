/**
 * @file main.js
 * @brief Main file for the solar system simulation.
 * @details This file contains the main setup for the solar system simulation. It creates the scene, camera, renderer, and controls. It also adds the sun, planets, moons, and orbital groups to the scene. The file also contains the render loop and event listeners for mouse clicks and window resizing. The file also contains the GUI setup for controlling the lights, camera, and speed of the simulation.
 * @author Mitch Campbell
 * @copyright 2024
 */


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import Stats from 'stats.js'
import gsap from 'gsap';


// import sun
import { sun } from './sun.js';

// Import planets and orbital groups
import { planetData, orbitalGroups } from './planets.js';

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
scene.background = environmentMap


/**
 * Lights
 */

const sunlightColor = new THREE.Color(0xffe7ba);

// Point light
const pointLight = new THREE.PointLight(sunlightColor, 16000, 1000, 2);
pointLight.position.copy(sun.position);
sun.add(pointLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(
    0x87CEEB, // Sky color (light blue)
    0x4B0082, // Ground color (indigo)
    0.3 // Intensity
);
scene.add(hemisphereLight);

/**
 * Camera
 */
export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.lookAt(0, 0, 0);
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    antialias: true, 
    physicallyCorrectLights: true, 
    powerPreference: "high-performance", 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.castShadow = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;

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

            // Ensure GUI is visible in fullscreen
            gui.domElement.style.zIndex = '9999';
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

        // Reset GUI z-index when exiting fullscreen
        gui.domElement.style.zIndex = '9999';
    }
});

/**
 * Orbital Groups
 */
const solarSystemGroup = new THREE.Group();
solarSystemGroup.add(sun);

// Add planet orbit groups to solar system group
orbitalGroups.forEach((group) => { solarSystemGroup.add(group); });

// Add solar system to scene
scene.add(solarSystemGroup);


/**
 * Controls
 */
const gui = new GUI();
gui.domElement.style.cssText = 'position: absolute; top: 0px; right: 0px; z-index: 100;';
gui.close();

// Set initial camera position based on sun radius
const initialDistance = sun.geometry.parameters.radius * 5;
camera.position.set(0, 0, initialDistance);
camera.lookAt(0, 0, 0);

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = sun.geometry.parameters.radius * 1.5;
controls.maxDistance = initialDistance * 5;

// Allow user to take control after focussing on selected planet
controls.addEventListener('start', onControlsStart);
controls.addEventListener('end', onControlsEnd);

let userInteracting = false;

function onControlsStart() 
{
    userInteracting = true;
    if (objectToFollow) 
    {
        objectToFollow = null;
        console.log('Camera freed from following object');
    }
}

function onControlsEnd() 
{
    userInteracting = false;
}

// Add light controls to the GUI
const lightsFolder = gui.addFolder('Lights')
lightsFolder
    .add(pointLight, 'intensity')
    .min(0)
    .max(20000)
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

const hemisphereLightFolder = lightsFolder.addFolder('Hemisphere Light');
hemisphereLightFolder.add(hemisphereLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.01)
    .name('Intensity');
hemisphereLightFolder.addColor(hemisphereLight, 'color').name('Sky Color');
hemisphereLightFolder.addColor(hemisphereLight, 'groundColor').name('Ground Color');
lightsFolder.close();

// Create the GUI and add the "Follow" folder
let followFolder = gui.addFolder('Follow');
followFolder.name = 'Follow';

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;
let objectToFollow = null;

// Handle mouse click events
function onMouseClick(event)
{
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;      // Normalize the x position
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;    // Normalize the y position

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Check if the object is a celestial body
    if (intersects.length > 0)
    {
        // Get the first intersected object
        const clickedObject = intersects[0].object;

        // Check if the object is a celestial body
        if (clickedObject.parent && clickedObject.parent.userData)
        {
            // Get the celestial body name
            const celestialName = clickedObject.parent.userData.name;
            
            const celestial = followFolder.controllers.find((controller) => controller.property === `Follow${celestialName}`);
            
            // Focus the camera on the celestial body
            if (celestial) 
            { 
                celestial.__li.click() 
            };

            if (selectedObject !== clickedObject)
            {
                selectedObject = clickedObject;
                focusOnObject(selectedObject);
            }
        }
    }
}
window.addEventListener('click', onMouseClick);

// Focus the camera on the selected object
function focusOnObject(object) 
{
    if (!object.isMesh) { return; }
    
    const objectPosition = new THREE.Vector3();
    object.getWorldPosition(objectPosition);
    
    // Calculate the radius of the object
    const radius = object.geometry.boundingSphere ? object.geometry.boundingSphere.radius : object.geometry.parameters.radius;
    
    // Calculate camera distance based on object size and field of view
    const fov = camera.fov * (Math.PI / 180);
    const distance = (radius * 2.5) / Math.tan(fov / 2);
    
    // Calculate camera offset
    const cameraOffset = new THREE.Vector3(distance, distance * 0.5, distance);
    const targetPosition = objectPosition.clone().add(cameraOffset);
    
    // Animate camera position and lookAt
    gsap.to(camera.position, {
        duration: 2,
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        ease: 'power2.inOut',
        onUpdate: () => {
            camera.lookAt(objectPosition);
            controls.target.copy(objectPosition);
        },
        onComplete: () => {
            controls.minDistance = radius * 1.5;
            controls.maxDistance = distance * 2;
        }
    });
    
    objectToFollow = object;
}

// Add a list of planet names to the GUI
const celestials = []
const celestialNames = ['Sun'].concat(planetData.map((planet) => planet.name));
celestials.push(sun);
planetData.forEach((planet) => { celestials.push(planet.mesh); });

// Add a "Follow" button for each celestial body
celestialNames.forEach((celestial) => {
    followFolder.add({ [`Follow${celestial}`]: () => {
        focusOnObject(celestials[celestialNames.indexOf(celestial)]);
    }
    }, `Follow${celestial}`).name(celestial);
});

followFolder.open();

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

/**
 * Performance stats
 */
const stats = new Stats();
const performanceFolder = gui.addFolder('Performance');
performanceFolder.add({ ShowStats: false }, 'ShowStats')
    .name('Show stats')
    .listen()
    .onChange((value) => {
        if (value) 
        { 
            stats.showPanel(0); 
            document.body.appendChild(stats.dom);
        } 
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

    // Update camera position to follow selected planet
    if (objectToFollow) 
    {
        const objectPosition = new THREE.Vector3();
        objectToFollow.getWorldPosition(objectPosition);
        controls.target.copy(objectPosition);
    }

    // Update controls
    controls.update();

    // Update shader time uniform
    sun.material.uniforms.uTime.value = elapsedTime;

    // Update the renderer
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

    // Update stats (end)
    stats.end();
}
tick()
