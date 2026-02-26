import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy, NgZone } from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'app-webgl-background',
    standalone: true,
    imports: [],
    templateUrl: './webgl-background.html',
    styleUrls: ['./webgl-background.scss']
})
export class WebglBackground implements AfterViewInit, OnDestroy {
    @ViewChild('webglCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private particlesMesh!: THREE.Points;
    private requestID: number | null = null;

    private uniformTime = { value: 0.0 };
    private uniformProgress = { value: 0.0 };

    private mouseX = 0;
    private mouseY = 0;

    constructor(private ngZone: NgZone) { }

    ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            this.initThree();
        });
    }

    ngOnDestroy() {
        if (this.requestID !== null) cancelAnimationFrame(this.requestID);
        if (this.renderer) this.renderer.dispose();
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    @HostListener('window:resize')
    onResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    private initThree() {
        const canvas = this.canvasRef.nativeElement;
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        const geometry = new THREE.BufferGeometry();
        const count = 12000;

        const posPlant = new Float32Array(count * 3);
        const posRoot = new Float32Array(count * 3);
        const posSpores = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const randoms = new Float32Array(count);

        const colorPlant = new THREE.Color(0x5E794B);   // page green
        const colorPot = new THREE.Color(0xC4964A);     // page amber
        const colorDNA = new THREE.Color(0x8aad6e);     // lighter green
        const colorMolecule = new THREE.Color(0xd4a85a); // lighter amber

        for (let i = 0; i < count; i++) {
            const t = i / count;

            let rMain = 0.0;
            let gMain = 0.0;
            let bMain = 0.0;

            // --- Shape 1: POT WITH BIRD OF PARADISE PLANT ---
            let px, py, pz;
            if (t < 0.15) {
                const potT = t / 0.15;
                py = (potT * 2.5) - 4;
                const potRadius = 1.0 + (potT * 0.5);
                const angle = Math.random() * Math.PI * 2;
                const finalRadius = potRadius * (0.8 + 0.2 * Math.sqrt(Math.random()));
                px = Math.cos(angle) * finalRadius;
                pz = Math.sin(angle) * finalRadius;
                rMain = colorPot.r; gMain = colorPot.g; bMain = colorPot.b;
            } else {
                const plantT = (t - 0.15) / 0.85;
                const numLeaves = 8;
                const leafGroup = Math.floor(plantT * numLeaves);
                const localT = (plantT * numLeaves) - leafGroup;
                const baseAngle = leafGroup * 2.39996;
                const maxHeight = 3.5 + (leafGroup % 4) * 1.0;
                const spread = 0.5 + (leafGroup % 3) * 0.8;

                if (localT < 0.35) {
                    const stalkT = localT / 0.35;
                    py = -1.5 + (stalkT * maxHeight * 0.5);
                    const outward = Math.pow(stalkT, 1.5) * (spread * 0.4);
                    const rDist = Math.random() * 0.08;
                    const aDist = Math.random() * Math.PI * 2;
                    px = Math.cos(baseAngle) * outward + Math.cos(aDist) * rDist;
                    pz = Math.sin(baseAngle) * outward + Math.sin(aDist) * rDist;
                    rMain = colorPlant.r * 0.8; gMain = colorPlant.g * 0.9; bMain = colorPlant.b * 0.5;
                } else {
                    const bladeT = (localT - 0.35) / 0.65;
                    const startY = -1.5 + (maxHeight * 0.5);
                    const endY = -1.5 + maxHeight;
                    py = startY + (bladeT * (endY - startY));
                    const startOutward = spread * 0.4;
                    const endOutward = spread * 1.3;
                    const currentOutward = startOutward + Math.pow(bladeT, 1.2) * (endOutward - startOutward);
                    const maxLeafWidth = 1.0 + (leafGroup % 2) * 0.3;
                    const currentWidth = Math.sin(bladeT * Math.PI) * maxLeafWidth;
                    const leafRandomX = (Math.random() - 0.5) * currentWidth;
                    const distFromCenter = Math.abs(leafRandomX) / (maxLeafWidth / 2);
                    const vFold = distFromCenter * 0.4;
                    const perpAngle = baseAngle + Math.PI / 2;
                    px = Math.cos(baseAngle) * currentOutward + Math.cos(perpAngle) * leafRandomX;
                    pz = Math.sin(baseAngle) * currentOutward + Math.sin(perpAngle) * leafRandomX;
                    py += vFold + (Math.random() - 0.5) * 0.1;
                    rMain = colorPlant.r; gMain = colorPlant.g; bMain = colorPlant.b;
                }
            }
            posPlant[i * 3] = px;
            posPlant[i * 3 + 1] = py;
            posPlant[i * 3 + 2] = pz;

            // --- Shape 2: DNA DOUBLE HELIX ---
            let rx, ry, rz;
            const dnaLength = 8.0;
            const numTurns = 3;
            if (t < 0.8) {
                const strandT = (t < 0.4) ? (t / 0.4) : ((t - 0.4) / 0.4);
                ry = (strandT * dnaLength) - (dnaLength / 2);
                const angle = strandT * Math.PI * 2 * numTurns + (t < 0.4 ? 0 : Math.PI);
                const radius = 1.5;
                const thicknessAngle = Math.random() * Math.PI * 2;
                const rDist = Math.random() * 0.3;
                rx = Math.cos(angle) * radius + Math.cos(thicknessAngle) * rDist;
                rz = Math.sin(angle) * radius + Math.sin(thicknessAngle) * rDist;
            } else {
                const bridgeT = (t - 0.8) / 0.2;
                const level = Math.floor(bridgeT * (numTurns * 12));
                const yLevel = (level / (numTurns * 12)) * dnaLength - (dnaLength / 2);
                ry = yLevel + (Math.random() - 0.5) * 0.1;
                const angle = (level / (numTurns * 12)) * Math.PI * 2 * numTurns;
                const radius = 1.5;
                const pX1 = Math.cos(angle) * radius;
                const pZ1 = Math.sin(angle) * radius;
                const pX2 = Math.cos(angle + Math.PI) * radius;
                const pZ2 = Math.sin(angle + Math.PI) * radius;
                const bridgePos = Math.random();
                const noiseX = (Math.random() - 0.5) * 0.15;
                const noiseZ = (Math.random() - 0.5) * 0.15;
                rx = pX1 + (pX2 - pX1) * bridgePos + noiseX;
                rz = pZ1 + (pZ2 - pZ1) * bridgePos + noiseZ;
            }
            posRoot[i * 3] = rx;
            posRoot[i * 3 + 1] = ry;
            posRoot[i * 3 + 2] = rz;

            // --- Shape 3: MOLECULAR MODEL ---
            let sx, sy, sz;
            const atoms = [
                { x: 0, y: 0, z: 0, r: 1.2 },
                { x: 2, y: 2, z: 2, r: 0.8 },
                { x: -2, y: -2, z: 2, r: 0.8 },
                { x: -2, y: 2, z: -2, r: 0.8 },
                { x: 2, y: -2, z: -2, r: 0.8 },
                { x: 3, y: 4, z: 2, r: 0.5 },
                { x: 3, y: 2, z: 4, r: 0.5 },
                { x: -3, y: -4, z: 2, r: 0.5 },
            ];
            const bonds = [
                [0, 1], [0, 2], [0, 3], [0, 4],
                [1, 5], [1, 6], [2, 7]
            ];

            if (t < 0.6) {
                const atomIdx = Math.floor((t / 0.6) * atoms.length);
                const atom = atoms[atomIdx];
                const u = Math.random();
                const v = Math.random();
                const theta = u * 2.0 * Math.PI;
                const phi = Math.acos(2.0 * v - 1.0);
                const r = Math.cbrt(Math.random()) * atom.r;
                sx = atom.x + r * Math.sin(phi) * Math.cos(theta);
                sy = atom.y + r * Math.sin(phi) * Math.sin(theta);
                sz = atom.z + r * Math.cos(phi);
            } else {
                const bondIdx = Math.floor(((t - 0.6) / 0.4) * bonds.length);
                const bondConfig = bonds[bondIdx];
                const nodeA = atoms[bondConfig[0]];
                const nodeB = atoms[bondConfig[1]];
                const bondPos = Math.random();
                const noiseX = (Math.random() - 0.5) * 0.2;
                const noiseY = (Math.random() - 0.5) * 0.2;
                const noiseZ = (Math.random() - 0.5) * 0.2;
                sx = nodeA.x + (nodeB.x - nodeA.x) * bondPos + noiseX;
                sy = nodeA.y + (nodeB.y - nodeA.y) * bondPos + noiseY;
                sz = nodeA.z + (nodeB.z - nodeA.z) * bondPos + noiseZ;
            }
            posSpores[i * 3] = sx;
            posSpores[i * 3 + 1] = sy;
            posSpores[i * 3 + 2] = sz;

            // Mix colors
            let mixedColor;
            if (Math.random() > 0.6) {
                mixedColor = new THREE.Color(rMain, gMain, bMain);
            } else if (Math.random() > 0.3) {
                mixedColor = new THREE.Color(rMain, gMain, bMain).lerp(colorDNA, Math.random());
            } else {
                mixedColor = new THREE.Color(rMain, gMain, bMain).lerp(colorMolecule, Math.random());
            }
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            randoms[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(posPlant, 3));
        geometry.setAttribute('rootPosition', new THREE.BufferAttribute(posRoot, 3));
        geometry.setAttribute('sporePosition', new THREE.BufferAttribute(posSpores, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uProgress: this.uniformProgress,
                uTime: this.uniformTime
            },
            vertexShader: `
                uniform float uProgress;
                uniform float uTime;
                attribute vec3 rootPosition;
                attribute vec3 sporePosition;
                attribute vec3 color;
                attribute float aRandom;
                varying vec3 vColor;

                void main() {
                    float step1 = clamp(uProgress, 0.0, 1.0);
                    vec3 mix1 = mix(position, rootPosition, step1);

                    float step2 = clamp(uProgress - 1.0, 0.0, 1.0);
                    vec3 finalPos = mix(mix1, sporePosition, step2);

                    finalPos.x += sin(uTime * 0.5 + aRandom * 10.0) * 0.1;
                    finalPos.y += cos(uTime * 0.5 + aRandom * 10.0) * 0.05;
                    finalPos.z += sin(uTime * 0.5 + aRandom * 10.0) * 0.1;

                    vColor = color;

                    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                    gl_PointSize = (25.0 - (step2 * 10.0)) * (1.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard;
                    float alpha = (1.0 - r) * 0.85;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.NormalBlending,
            depthWrite: false
        });

        this.particlesMesh = new THREE.Points(geometry, material);
        this.particlesMesh.position.y = -1.5;
        this.scene.add(this.particlesMesh);

        const animate = () => {
            const scrollH = document.documentElement.scrollHeight - window.innerHeight;
            const targetProgress = scrollH > 0 ? Math.min((window.scrollY / scrollH) * 2, 2) : 0;
            this.uniformProgress.value += (targetProgress - this.uniformProgress.value) * 0.05;

            const targetRotY = (window.scrollY / (scrollH || 1)) * Math.PI * 2;
            this.particlesMesh.rotation.y += (targetRotY - this.particlesMesh.rotation.y) * 0.05;
            this.particlesMesh.rotation.y += 0.0005;

            const targetRotZ = (window.scrollY / (scrollH || 1)) * Math.PI * 0.2;
            this.particlesMesh.rotation.z += (targetRotZ - this.particlesMesh.rotation.z) * 0.05;

            const targetScale = 1 + (window.scrollY / (scrollH || 1)) * 0.2;
            this.particlesMesh.scale.setScalar(
                this.particlesMesh.scale.x + (targetScale - this.particlesMesh.scale.x) * 0.05
            );

            this.uniformTime.value += 0.02;

            this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouseY * 0.5 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);

            this.renderer.render(this.scene, this.camera);
            this.requestID = requestAnimationFrame(animate);
        };
        animate();
    }
}
