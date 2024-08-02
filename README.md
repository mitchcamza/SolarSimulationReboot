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

![Untitled design-2](https://github.com/mitchcamza/SolarSimulationReboot/assets/63720891/eccd0bb9-47b0-4d76-9e5f-9fa8d101cd28)

## Usage

### Navigation Controls

- **Orbit Controls**: Click and drag to orbit the camera around the scene.

### Celestial Body Controls

- **Follow**: Use the dropdown menu to focus the camera on a specific celestial body.
- **Reset**: Click the "Reset" button to reset the camera position to its initial state.

### Simulation Speed

- **Speed Slider**: Adjust the speed of the simulation using the slider.
- **Reset**: Click the "Reset" button to reset the simulation speed to its default value.

### Visualization Options

- **Wireframe**: Toggle wireframe mode for all celestial bodies.
- **Normal**: Toggle normal material display for all celestial bodies.
- **Grid Helper**: Toggle grid helper visibility.
- **Axes Helper**: Toggle axes helper visibility for all celestial bodies.
- **Show Stats**: Toggle performance stats display.

## Credits

- [Three.js](https://threejs.org/) - 3D rendering library
- [Lil-GUI](https://lil-gui.georgealways.com) - GUI library for Three.js
- [Stats.js](https://github.com/mrdoob/stats.js/) - Performance monitoring library
- [NASA-3D-Resources](https://github.com/nasa/NASA-3D-Resources/tree/master) - Moon textures
- [solarsystemscope](https://www.solarsystemscope.com/textures/) - Planet textures
- [wwwtyro.net](https://wwwtyro.net) - Environmental map

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
