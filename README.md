# SolarSimulationReboot
A simplified solar system simulation using ThreeJS

## Setup
Download and install [Node.js](https://nodejs.org/en/download/) and run the following commands in the project's root directory:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server and click on the link generated [Default:](http://localhost:5173/)
npm run dev

# Build for production in the dist/ directory (optional)
npm run build
```

## Live project
https://solar-simulation-reboot.vercel.app

## Usage

### Control panel
- Click on the controls dropdown arrow to bring up the control panel.

### Navigation Controls

- **Orbit Controls**: Click and drag to orbit the camera around the scene.
- **Pan**: Click and drag with the right mouse button to pan the camera.
- **Zoom**: Use the mouse wheel to zoom in and out.

### Selecting Celestial Bodies
- **Click Selection**: Click on any celestial body to focus the camera on it (desktop only).
- **GUI Selection**: Use the "Follow" dropdown menu in the GUI to select and focus on a specific celestial body.

### Lights
- **Point Light**: Adjust the intensity slider to simulate the light intensity from the sun.
- **Ambient Light**: Use the slider to adjust ambient light. This will affect all objects in the scene.
- **Hemisphere Light**: Adjust the intensity, sky colour, and ground colour to add additional lighting effects to the entire scene.

### Simulation Speed

- **Speed Slider**: Adjust the speed of the simulation using the slider.
- **Reset**: Click the "Reset" button to reset the simulation speed to its default value.

### Performance
- **Stats**: Toggle the `show stats` checkbox to display performance metrics, like framerate, and frametime.
- Click on the performance metrics to switch between them. 

## Credits

- [Three.js](https://threejs.org/) - 3D rendering library
- [Lil-GUI](https://lil-gui.georgealways.com) - GUI library for Three.js
- [Stats.js](https://github.com/mrdoob/stats.js/) - Performance monitoring library
- [NASA-3D-Resources](https://github.com/nasa/NASA-3D-Resources/tree/master) - Moon textures
- [solarsystemscope](https://www.solarsystemscope.com/textures/) - Planet textures
- [wwwtyro.net](https://wwwtyro.net) - Environmental map
- [Ian McEwan, Ashima Arts](https://github.com/ashima/webgl-noise) and [Stefan Gustavson]( https://github.com/stegu/webgl-noise) - noise shader used for the sun.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
