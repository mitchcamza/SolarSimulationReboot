import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import CelestialBody from './celestials';
import GUI from 'lil-gui';
import Stats from 'stats.js'

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
 * Stars
 */

// Sun
const sunRadius = 15;
const sun = new CelestialBody(sunRadius, 0, '/textures/2k_sun.jpg');
const sunMesh = sun.getMesh();

// Modify material to be emissive
sunMesh.material = new THREE.MeshLambertMaterial({
    map: sunMesh.material.map, // Preserve the existing texture
    emissive: 0xffffff, // Set the emissive color to white
    emissiveIntensity: 1, // Adjust intensity as needed
    side: THREE.FrontSide // Ensure the material is visible from the inside
});

const solarSystemGroup = new THREE.Group();
solarSystemGroup.add(sunMesh);


/**
 * Planets  
 */
// Mercury
const mercuryRadius = 0.38;
const mercury = new CelestialBody(mercuryRadius, 25);
const mercuryMesh = mercury.getMesh();
let mercuryOrbitGroup = new THREE.Group();
mercuryOrbitGroup.add(mercuryMesh);

// Venus
const venusRadius = 0.95;
const venus = new CelestialBody(venusRadius, 40);
const venusMesh = venus.getMesh();
let venusOrbitGroup = new THREE.Group();
venusOrbitGroup.add(venusMesh);

// Earth
const earthRadius = 1;
const earth = new CelestialBody(earthRadius, 55);
const earthMesh = earth.getMesh();
let earthOrbitGroup = new THREE.Group();
earthOrbitGroup.add(earthMesh);

// Mars
const marsRadius = 0.53;
const mars = new CelestialBody(marsRadius, 70);
const marsMesh = mars.getMesh();
let marsOrbitGroup = new THREE.Group();
marsOrbitGroup.add(marsMesh);

// Jupiter
const jupiterRadius = 3.5;
const jupiter = new CelestialBody(jupiterRadius, 85);
const jupiterMesh = jupiter.getMesh();
let jupiterOrbitGroup = new THREE.Group();
jupiterOrbitGroup.add(jupiterMesh);

// Saturn
const saturnRadius = 3;
const saturn = new CelestialBody(saturnRadius, 100);
const saturnMesh = saturn.getMesh();
let saturnOrbitGroup = new THREE.Group();
saturnOrbitGroup.add(saturnMesh);

// Uranus
const uranusRadius = 1.25;
const uranus = new CelestialBody(uranusRadius, 115);
const uranusMesh = uranus.getMesh();
let uranusOrbitGroup = new THREE.Group();
uranusOrbitGroup.add(uranusMesh);

// Neptune
const neptuneRadius = 1.2;
const neptune = new CelestialBody(neptuneRadius, 130);
const neptuneMesh = neptune.getMesh();
let neptuneOrbitGroup = new THREE.Group();
neptuneOrbitGroup.add(neptuneMesh);

/**
 * Moons
 */

// Note: Mercury and Venus do not have moons
// TODO: Calculate moon radii and relative positions based on their parent planet

/// Earth's moons (x1)
const earthLunaOrbitGroup = new THREE.Group();
earthLunaOrbitGroup.position.x = earthMesh.position.x;

    // Luna
    const earthLuna = new CelestialBody(earthRadius * 0.273, earthMesh.position.x);
    const earthLunaMesh = earthLuna.getMesh();
    earthLunaMesh.position.set(earthRadius + 1, 0, 0);
    earthLunaOrbitGroup.add(earthLunaMesh);

/// Mars' moons (x2)
const marsLunaOrbitGroup = new THREE.Group();
marsLunaOrbitGroup.position.x = marsMesh.position.x;

    // Phobos
    const marsPhobos = new CelestialBody(marsRadius * 0.209, marsMesh.position.x);
    const marsPhobosMesh = marsPhobos.getMesh();
    marsPhobosMesh.position.set((marsRadius + 1.67), 0, 0);
    marsLunaOrbitGroup.add(marsPhobosMesh);

    // Deimos
    const marsDeimos = new CelestialBody(marsRadius * 0.423, marsMesh.position.x);
    const marsDeimosMesh = marsDeimos.getMesh();
    marsDeimosMesh.position.set((marsRadius + 1.97) * -1, 0, 0);
    marsLunaOrbitGroup.add(marsDeimosMesh);

/// Jupiter's moons (x4)
const jupiterLunaOrbitGroup = new THREE.Group();
jupiterLunaOrbitGroup.position.x = jupiterMesh.position.x;

    // Io
    const jupiterIo = new CelestialBody(jupiterRadius * 0.058, jupiterMesh.position.x);
    const jupiterIoMesh = jupiterIo.getMesh();
    jupiterIoMesh.position.set(jupiterRadius + 3, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterIoMesh);

    // Europa
    const jupiterEuropa = new CelestialBody(jupiterRadius * 0.036, jupiterMesh.position.x);
    const jupiterEuropaMesh = jupiterEuropa.getMesh();
    jupiterEuropaMesh.position.set((jupiterRadius + 3.5) * -1, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterEuropaMesh);

    // Ganymede
    const jupiterGanymede = new CelestialBody(jupiterRadius * 0.026, jupiterMesh.position.x);
    const jupiterGanymedeMesh = jupiterGanymede.getMesh();
    jupiterGanymedeMesh.position.set((jupiterRadius + 0.8) * -1, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterGanymedeMesh);

    // Callisto
    const jupiterCallisto = new CelestialBody(jupiterRadius * 0.021, jupiterMesh.position.x);
    const jupiterCallistoMesh = jupiterCallisto.getMesh();
    jupiterCallistoMesh.position.set(jupiterRadius + 0.5, 0, 0);
    jupiterLunaOrbitGroup.add(jupiterCallistoMesh);

/// Saturn's moons (x2)
const saturnLunaOrbitGroup = new THREE.Group();
saturnLunaOrbitGroup.position.x = saturnMesh.position.x;

    // Titan
    const saturnTitan = new CelestialBody(saturnRadius * 0.128, saturnMesh.position.x);
    const saturnTitanMesh = saturnTitan.getMesh();
    saturnTitanMesh.position.set(saturnRadius + 4, 0, 0);
    saturnLunaOrbitGroup.add(saturnTitanMesh);

    // Rhea
    const saturnRhea = new CelestialBody(saturnRadius * 0.067, saturnMesh.position.x);
    const saturnRheaMesh = saturnRhea.getMesh();
    saturnRheaMesh.position.set((saturnRadius + 4.5) * -1, 0, 0);
    saturnLunaOrbitGroup.add(saturnRheaMesh);

/// Uranus' moons (x2)
const uranusLunaOrbitGroup = new THREE.Group();
uranusLunaOrbitGroup.position.x = uranusMesh.position.x;

    // Titania
    const uranusTitania = new CelestialBody(uranusRadius * 0.16, uranusMesh.position.x);
    const uranusTitaniaMesh = uranusTitania.getMesh();
    uranusTitaniaMesh.position.set(uranusRadius + 5, 0, 0);
    uranusLunaOrbitGroup.add(uranusTitaniaMesh);

    // Oberon
    const uranusOberon = new CelestialBody(uranusRadius * 0.08, uranusMesh.position.x);
    const uranusOberonMesh = uranusOberon.getMesh();
    uranusOberonMesh.position.set((uranusRadius + 5.5) * -1, 0, 0);
    uranusLunaOrbitGroup.add(uranusOberonMesh);

/// Neptune's moons (x2) 
// Note: Neptune has 14 known moons, but only 2 are shown here 
// TODO: Add more moons
const neptuneLunaOrbitGroup = new THREE.Group();
const neptuneLunaRetrogadeOrbitGroup = new THREE.Group();
neptuneLunaOrbitGroup.position.x = neptuneMesh.position.x;
neptuneLunaRetrogadeOrbitGroup.position.x = neptuneMesh.position.x;


    // Triton
    const neptuneTriton = new CelestialBody(neptuneRadius * 0.45, neptuneMesh.position.x);
    const neptuneTritonMesh = neptuneTriton.getMesh();
    neptuneTritonMesh.position.set(neptuneRadius + 9, 0, 0);
    neptuneLunaRetrogadeOrbitGroup.add(neptuneTritonMesh);

    // Proteus 
    const neptuneProteus = new CelestialBody(neptuneRadius * 0.17, neptuneMesh.position.x);
    const neptuneProteusMesh = neptuneProteus.getMesh();
    neptuneProteusMesh.position.set((neptuneRadius + 3) * -1, 0, 0);
    neptuneLunaOrbitGroup.add(neptuneProteusMesh);

// Add moons to their respective planets
earthOrbitGroup.add(earthLunaOrbitGroup);
marsOrbitGroup.add(marsLunaOrbitGroup);
jupiterOrbitGroup.add(jupiterLunaOrbitGroup);
saturnOrbitGroup.add(saturnLunaOrbitGroup);
uranusOrbitGroup.add(uranusLunaOrbitGroup);
neptuneOrbitGroup.add(neptuneLunaOrbitGroup);
neptuneOrbitGroup.add(neptuneLunaRetrogadeOrbitGroup);

// Add planets to solar system
solarSystemGroup.add(mercuryOrbitGroup, venusOrbitGroup, earthOrbitGroup, marsOrbitGroup, jupiterOrbitGroup, saturnOrbitGroup, uranusOrbitGroup, neptuneOrbitGroup);

// Add solar system to scene
scene.add(solarSystemGroup);


/**
 * Controls
 */

// Allow controls to be visible when in fullscreen
gui.domElement.style.zIndex = 1000;

// Orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Camera position controls
const cameraFolder = gui.addFolder('Camera');
const cameraPosition = cameraFolder.addFolder('Position');
cameraPosition.add(camera.position, 'x').min(-500).max(500).step(0.1).name('Move X').listen();
cameraPosition.add(camera.position, 'y').min(-500).max(500).step(0.1).name('Move Y').listen();
cameraPosition.add(camera.position, 'z').min(-500).max(500).step(0.1).name('Move Z').listen();
cameraPosition.close();
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
materialFolder.add({ Wireframe: false }, 'Wireframe').name('Toggle Wireframe').onChange((value) => {
    solarSystemGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.material.wireframe = value; 
        }});
    });

// Toggle MeshNormalMaterial
materialFolder.add({ Normal: false }, 'Normal').name('Toggle Normal').onChange((value) => {
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

// Debug folder
const debugFolder = gui.addFolder('Debug');
debugFolder.add(controls, 'enabled').name('Orbit Controls');
debugFolder.add(gridHelper, 'visible').name('Grid Helper').setValue(false);
debugFolder.close();

// TODO: Add axes helper toggle to all celestial bodies
// TODO: Show controls in fullscreen mode


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
