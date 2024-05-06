import * as THREE from 'three';

/**
 * Represents a celestial body.
 */
export default class CelestialBody {
    /**
     * Creates a new CelestialBody instance.
     * @param {number} radius - The radius of the celestial body.
     * @param {number} positionX - The initial x position of the celestial body.
     * @param {string|null} textureFile - The file path of the texture for the celestial body.
     */
    constructor(radius, positionX, textureFile = null) {
        this.radius = radius;
        this.positionX = positionX;
        this.textureFile = textureFile;
        this.mesh = null;
    }

    /**
     * Gets the mesh representation of the celestial body.
     * @returns {THREE.Mesh} The mesh representation of the celestial body.
     */
    getMesh() {
        if (this.mesh === undefined || this.mesh === null) {
            const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
            const texture = new THREE.TextureLoader().load(this.textureFile);
            const material = new THREE.MeshBasicMaterial({ wireframe: false });
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.x += this.positionX;

            // Add an axes helper to the planet
            const axesHelper = new THREE.AxesHelper(this.radius * 1.5);
            this.mesh.add(axesHelper);
            axesHelper.visible = false;
        }
        return this.mesh;
    }
}