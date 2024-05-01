import * as THREE from 'three';

export default class Planet {
    constructor(radius, positionX, textureFile = null) {
        this.radius = radius;
        this.positionX = positionX;
        this.textureFile = textureFile;
    }

    getMesh() {
        if (this.mesh === undefined || this.mesh === null) {
            const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
            const texture = new THREE.TextureLoader().load(this.textureFile);
            const material = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true });
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.x += this.positionX;

            // Add an axes helper to the planet
            const axesHelper = new THREE.AxesHelper(3);
            this.mesh.add(axesHelper);
            
            // DEBUG
            console.log('Planet created at position X: ' + this.positionX + ' with radius: ' + this.radius + ' and texture: ' + this.textureFile);
        }
        return this.mesh;
    }
}