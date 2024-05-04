import * as THREE from 'three';

export default class CelestialBody {
    constructor(radius, positionX, textureFile = null) {
        this.radius = radius;
        this.positionX = positionX;
        this.textureFile = textureFile;
    }

    getMesh() {
        if (this.mesh === undefined || this.mesh === null) {
            const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
            const texture = new THREE.TextureLoader().load(this.textureFile);
            const material = new THREE.MeshBasicMaterial({ wireframe: false });
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.x += this.positionX;

            // Add an axes helper to the planet
            const axesHelper = new THREE.AxesHelper(this.radius + 2);
            // this.mesh.add(axesHelper);
        }
        return this.mesh;
    }
}