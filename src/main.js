import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Planet from './planets';
import GUI from 'lil-gui';
import Stats from 'stats.js'

// Canvas
const canvas = document.querySelector('canvas.webgl');
const aspect = { width: window.innerWidth, height: window.innerHeight };

// Scene
const scene = new THREE.Scene();

// Debug GUI
const gui = new GUI();

// Add frame rate monitor
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(650, 650);
scene.add(gridHelper);

// Camera
const camera = new THREE.PerspectiveCamera(45, aspect.width / aspect.height, 0.1, 1000
);
camera.position.set(-113, 550, 322);
scene.add(camera);

// Add Debug GUI for the camera
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x').min(-500).max(500).step(0.1).name('Camera X').listen();
cameraFolder.add(camera.position, 'y').min(-500).max(500).step(0.1).name('Camera Y').listen();
cameraFolder.add(camera.position, 'z').min(-500).max(500).step(0.1).name('Camera Z').listen();
cameraFolder.open();

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
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

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Sun
const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
const solarSystem = new THREE.Group();
solarSystem.add(sunMesh);

/* Adjusted scale and position of planets
Mercury: Radius = 0.3 units, Position = (11, 0, 0)
Venus: Radius = 0.75 units, Position = (16, 0, 0)
Earth: Radius = 1 unit, Position = (22, 0, 0)
Mars: Radius = 0.53 units, Position = (30, 0, 0)
Jupiter: Radius = 3.5 units, Position = (52, 0, 0)
Saturn: Radius = 3 units, Position = (96, 0, 0)
Uranus: Radius = 1.25 units, Position = (192, 0, 0)
Neptune: Radius = 1.2 units, Position = (300, 0, 0) */

// Mercury
const mercury = new Planet(0.3, 11);
const mercuryMesh = mercury.getMesh();
let mercuryGroup = new THREE.Group();
mercuryGroup.add(mercuryMesh);

// Venus
const venus = new Planet(0.75, 16);
const venusMesh = venus.getMesh();
let venusGroup = new THREE.Group();
venusGroup.add(venusMesh);

// Earth
const earth = new Planet(1, 22);
const earthMesh = earth.getMesh();
let earthGroup = new THREE.Group();
earthGroup.add(earthMesh);

// Mars
const mars = new Planet(0.53, 30);
const marsMesh = mars.getMesh();
let marsGroup = new THREE.Group();
marsGroup.add(marsMesh);

// Jupiter
const jupiter = new Planet(3.5, 52);
const jupiterMesh = jupiter.getMesh();
let jupiterGroup = new THREE.Group();
jupiterGroup.add(jupiterMesh);

// Saturn
const saturn = new Planet(3, 96);
const saturnMesh = saturn.getMesh();
let saturnGroup = new THREE.Group();
saturnGroup.add(saturnMesh);

// Uranus
const uranus = new Planet(1.25, 192);
const uranusMesh = uranus.getMesh();
let uranusGroup = new THREE.Group();
uranusGroup.add(uranusMesh);

// Neptune
const neptune = new Planet(1.2, 300);
const neptuneMesh = neptune.getMesh();
let neptuneGroup = new THREE.Group();
neptuneGroup.add(neptuneMesh);

// Add planet groups to solar system group
solarSystem.add(mercuryGroup, venusGroup, earthGroup, marsGroup, jupiterGroup, saturnGroup, uranusGroup, neptuneGroup);

// Add solar system to scene
scene.add(solarSystem);

// Clock
const clock = new THREE.Clock();

// Update the render loop
const tick = () =>
{
    // Update stats
    stats.begin();

    // Get elapsed time
    const elapsedTime = clock.getElapsedTime();

    // Update planets based on their orbital speed
    mercuryGroup.rotation.y = elapsedTime / 0.24;
    venusGroup.rotation.y = elapsedTime / 0.62;
    earthGroup.rotation.y = elapsedTime / 1;
    marsGroup.rotation.y = elapsedTime / 1.88;
    jupiterGroup.rotation.y = elapsedTime / 11.86;
    saturnGroup.rotation.y = elapsedTime / 29.46;
    uranusGroup.rotation.y = elapsedTime / 84.01;
    neptuneGroup.rotation.y = elapsedTime / 164.8;

    // Update controls
    controls.update();

    // Update the renderer
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);

    // Update stats (end)
    stats.end();
}
tick()