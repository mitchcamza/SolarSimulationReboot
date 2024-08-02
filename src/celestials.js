// import * as THREE from 'three';

// /**
//  * Represents a celestial body.
//  */
// export default class CelestialBody {
//     /**
//      * Creates a new CelestialBody instance.
//      * @param {number} radius - The radius of the celestial body.
//      * @param {number} positionX - The initial x position of the celestial body.
//      * @param {string|null} textureFile - The file path of the texture for the celestial body.
//      */
//     // constructor(radius, positionX, textureFile = null) {
//     //     this.radius = radius;
//     //     this.positionX = positionX;
//     //     this.textureFile = textureFile;
//     //     this.mesh = null;
//     // }
//     constructor(options = {}) {
//         const {
//             radius = 1,
//             positionX = 0,
//             textures = {},
//             emissiveColor = null,
//             shadow = true
//         } = options;

//         this.radius = radius;
//         this.positionX = positionX;
//         this.textures = textures;
//         this.emissiveColor = emissiveColor;
//         this.shadow = shadow;
//         this.mesh = this.createMesh();
//     }

//     /**
//      * Gets the mesh representation of the celestial body.
//      * @returns {THREE.Mesh} The mesh representation of the celestial body.
//      */
//     createMesh() {
//         const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
//         const materialConfig = { map: this.loadTexture(this.textures.color) };

//         if (this.textures.normal) {
//             materialConfig.normalMap = this.loadTexture(this.textures.normal);
//         }
//         if (this.textures.bump) {
//             materialConfig.bumpMap = this.loadTexture(this.textures.bump);
//         }
//         if (this.emissiveColor) {
//             materialConfig.emissive = new THREE.Color(this.emissiveColor);
//             materialConfig.emissiveIntensity = 0.5; // Adjust as needed
//         }

//         const material = new THREE.MeshStandardMaterial(materialConfig);
//         const mesh = new THREE.Mesh(geometry, material);
//         mesh.position.x = this.positionX;

//         if (this.shadow) {
//             mesh.receiveShadow = true;
//             mesh.castShadow = true;
//         }

//         return mesh;
//     }

//     loadTexture(texturePath) {
//         if (!texturePath) return null;
//         const texture = new THREE.TextureLoader().load(texturePath);
//         texture.colorSpace = THREE.SRGBColorSpace;
//         texture.generateMipmaps = false;
//         texture.minFilter = THREE.NearestFilter;
//         return texture;
//     }

//     getMesh() {
//         return this.mesh;
//     }
// }
