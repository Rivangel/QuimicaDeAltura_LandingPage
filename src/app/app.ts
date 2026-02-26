import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy, NgZone } from '@angular/core';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class App implements AfterViewInit, OnDestroy {
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
        this.initThree();
        this.initGSAP();
        this.initCursor();
    }

    ngOnDestroy() {
        if (this.requestID !== null) cancelAnimationFrame(this.requestID);
        ScrollTrigger.getAll().forEach(t => t.kill());
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

        // Custom cursor movement
        const cursor = document.querySelector('.custom-cursor') as HTMLElement;
        if (cursor) {
            gsap.to(cursor, {
                x: event.clientX,
                y: event.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        }
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
        // Alejar la cámara para que la figura esté completamente visible (pero un poco más grande)
        this.camera.position.z = 5;

        // Custom particle system for morphing (Plant -> Root -> Spores)
        const geometry = new THREE.BufferGeometry();
        const count = 12000;

        const posPlant = new Float32Array(count * 3);
        const posRoot = new Float32Array(count * 3);
        const posSpores = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const randoms = new Float32Array(count); // For individualized animations in shader

        const colorPlant = new THREE.Color(0x4ade80);  // Green (Leaves)
        const colorPot = new THREE.Color(0x8b5a2b);    // Brown (Pot)
        const colorDNA = new THREE.Color(0x3b82f6);    // Blue (DNA)
        const colorMolecule = new THREE.Color(0xef4444); // Red/Orange (Molecule)

        for (let i = 0; i < count; i++) {
            const t = i / count;

            // Variables specifically to tint the base object
            let rMain = 0.0;
            let gMain = 0.0;
            let bMain = 0.0;

            // --- Shape 1: POT WITH BIRD OF PARADISE PLANT ---
            let px, py, pz;
            if (t < 0.15) {
                // Pot (0 to 0.15)
                const potT = t / 0.15; // 0 to 1
                py = (potT * 2.5) - 4; // -4 to -1.5
                const potRadius = 1.0 + (potT * 0.5); // base 1.0 to top 1.5
                const angle = Math.random() * Math.PI * 2;
                const finalRadius = potRadius * (0.8 + 0.2 * Math.sqrt(Math.random())); // Mostly shell
                px = Math.cos(angle) * finalRadius;
                pz = Math.sin(angle) * finalRadius;

                rMain = colorPot.r; gMain = colorPot.g; bMain = colorPot.b;
            } else {
                // Bird of Paradise Plant (Strelitzia nicolai) (0.15 to 1.0)
                const plantT = (t - 0.15) / 0.85; // 0 to 1
                const numLeaves = 8;

                // Group points into leaves
                const leafGroup = Math.floor(plantT * numLeaves);
                const localT = (plantT * numLeaves) - leafGroup; // 0 to 1 inside this leaf

                // Properties for this specific leaf
                const baseAngle = leafGroup * 2.39996; // Golden angle for natural spiral

                // Varying heights and spreads
                // Heights between 3.5 and 6.5 relative to pot base
                const maxHeight = 3.5 + (leafGroup % 4) * 1.0;
                // How far it bends outwards
                const spread = 0.5 + (leafGroup % 3) * 0.8;

                // 35% stalk, 65% leaf blade
                if (localT < 0.35) {
                    // Stalk
                    const stalkT = localT / 0.35; // 0 to 1

                    py = -1.5 + (stalkT * maxHeight * 0.5);
                    const outward = Math.pow(stalkT, 1.5) * (spread * 0.4); // Bend out gradually

                    const rDist = Math.random() * 0.08; // Stem thickness
                    const aDist = Math.random() * Math.PI * 2;

                    px = Math.cos(baseAngle) * outward + Math.cos(aDist) * rDist;
                    pz = Math.sin(baseAngle) * outward + Math.sin(aDist) * rDist;

                    rMain = colorPlant.r * 0.8; gMain = colorPlant.g * 0.9; bMain = colorPlant.b * 0.5;
                } else {
                    // Leaf blade (paddle shape)
                    const bladeT = (localT - 0.35) / 0.65; // 0 to 1

                    const startY = -1.5 + (maxHeight * 0.5);
                    const endY = -1.5 + maxHeight;
                    py = startY + (bladeT * (endY - startY));

                    const startOutward = spread * 0.4; // Matches end of stalk
                    const endOutward = spread * 1.3; // Curves out more at the tip

                    // Smooth curve out
                    const currentOutward = startOutward + Math.pow(bladeT, 1.2) * (endOutward - startOutward);

                    // Paddle shape using sine wave: wider in middle, thin at ends
                    const maxLeafWidth = 1.0 + (leafGroup % 2) * 0.3; // vary width slightly (1.0 to 1.3)
                    const currentWidth = Math.sin(bladeT * Math.PI) * maxLeafWidth;

                    // Spread points across the width
                    const leafRandomX = (Math.random() - 0.5) * currentWidth;

                    // Add V-fold to the leaf (edges slightly higher than the center vein)
                    const distFromCenter = Math.abs(leafRandomX) / (maxLeafWidth / 2);
                    const vFold = distFromCenter * 0.4;

                    // Angle for spreading the leaf correctly perpendicular to the main stem direction
                    const perpAngle = baseAngle + Math.PI / 2;

                    px = Math.cos(baseAngle) * currentOutward + Math.cos(perpAngle) * leafRandomX;
                    pz = Math.sin(baseAngle) * currentOutward + Math.sin(perpAngle) * leafRandomX;

                    // Add random noise + V-fold
                    py += vFold + (Math.random() - 0.5) * 0.1;

                    rMain = colorPlant.r; gMain = colorPlant.g; bMain = colorPlant.b;
                }
            }
            posPlant[i * 3] = px;
            posPlant[i * 3 + 1] = py;
            posPlant[i * 3 + 2] = pz;

            // --- Shape 2: DNA DOUBLE HELIX ---
            let rx, ry, rz;
            const dnaLength = 8.0; // from -4 to 4
            const numTurns = 3;
            if (t < 0.8) {
                // The two backbones (40% each)
                const strandT = (t < 0.4) ? (t / 0.4) : ((t - 0.4) / 0.4);
                ry = (strandT * dnaLength) - (dnaLength / 2); // -4 to 4

                const angle = strandT * Math.PI * 2 * numTurns + (t < 0.4 ? 0 : Math.PI); // Phase shift 180 for second strand
                const radius = 1.5;

                // Add some thickness to the strands
                const thicknessAngle = Math.random() * Math.PI * 2;
                const rDist = Math.random() * 0.3;

                rx = Math.cos(angle) * radius + Math.cos(thicknessAngle) * rDist;
                rz = Math.sin(angle) * radius + Math.sin(thicknessAngle) * rDist;
            } else {
                // The connecting base pairs (20%)
                const bridgeT = (t - 0.8) / 0.2; // 0 to 1
                const level = Math.floor(bridgeT * (numTurns * 12)); // discrete steps for bridges
                const yLevel = (level / (numTurns * 12)) * dnaLength - (dnaLength / 2);

                ry = yLevel + (Math.random() - 0.5) * 0.1; // minor variation

                const angle = (level / (numTurns * 12)) * Math.PI * 2 * numTurns;
                const radius = 1.5;
                const pX1 = Math.cos(angle) * radius;
                const pZ1 = Math.sin(angle) * radius;

                const pX2 = Math.cos(angle + Math.PI) * radius;
                const pZ2 = Math.sin(angle + Math.PI) * radius;

                const bridgePos = Math.random(); // 0 to 1 along bridge
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
                { x: 0, y: 0, z: 0, r: 1.2 },       // Center
                { x: 2, y: 2, z: 2, r: 0.8 },       // Corner 1
                { x: -2, y: -2, z: 2, r: 0.8 },     // Corner 2
                { x: -2, y: 2, z: -2, r: 0.8 },     // Corner 3
                { x: 2, y: -2, z: -2, r: 0.8 },     // Corner 4
                // Extensions
                { x: 3, y: 4, z: 2, r: 0.5 },
                { x: 3, y: 2, z: 4, r: 0.5 },
                { x: -3, y: -4, z: 2, r: 0.5 },
            ];

            const bonds = [
                [0, 1], [0, 2], [0, 3], [0, 4],
                [1, 5], [1, 6], [2, 7]
            ];

            if (t < 0.6) {
                // ATOMS (Spheres)
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
                // BONDS (Lines between atoms)
                const bondIdx = Math.floor(((t - 0.6) / 0.4) * bonds.length);
                const bondConfig = bonds[bondIdx];
                const nodeA = atoms[bondConfig[0]];
                const nodeB = atoms[bondConfig[1]];

                const bondPos = Math.random(); // 0 to 1
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

            // Mix Colors to give a vibrant transition 
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

            // Random offset for shader animations
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
                    // Stage 1: Plant(0) to Root(1)
                    float step1 = clamp(uProgress, 0.0, 1.0);
                    vec3 mix1 = mix(position, rootPosition, step1);
                    
                    // Stage 2: Root(1) to Spores(2)
                    float step2 = clamp(uProgress - 1.0, 0.0, 1.0);
                    vec3 finalPos = mix(mix1, sporePosition, step2);
                    
                    // Add subtle floating motion using aRandom and uTime
                    finalPos.x += sin(uTime * 0.5 + aRandom * 10.0) * 0.1;
                    finalPos.y += cos(uTime * 0.5 + aRandom * 10.0) * 0.05;
                    finalPos.z += sin(uTime * 0.5 + aRandom * 10.0) * 0.1;
                    
                    vColor = color;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                    // Point size shrinks as it gets further, also depends on Stage 2 to make spores smaller
                    gl_PointSize = (25.0 - (step2 * 10.0)) * (1.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard; // Circular point
                    
                    // Soft gradient fade for particles - Increased intensity
                    float alpha = (1.0 - r);
                    // Boost the color value to make it glow more intensely
                    gl_FragColor = vec4(vColor * 1.5, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particlesMesh = new THREE.Points(geometry, material);
        // Bajar el diseño un poco para que no lo tape la parte de arriba
        this.particlesMesh.position.y = -1.5;
        this.scene.add(this.particlesMesh);

        this.ngZone.runOutsideAngular(() => {
            const animate = () => {
                this.uniformTime.value += 0.02;

                // Parallax and floating effect
                this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.05;
                this.camera.position.y += (-this.mouseY * 0.5 - this.camera.position.y) * 0.05;
                this.camera.lookAt(this.scene.position);

                // Constant rotation
                this.particlesMesh.rotation.y += 0.001;
                // Add spin based on progress (accelerates in Spore phase)
                this.particlesMesh.rotation.y += this.uniformProgress.value * 0.002;

                this.renderer.render(this.scene, this.camera);
                this.requestID = requestAnimationFrame(animate);
            };
            animate();
        });
    }

    private initGSAP() {
        // Morphing animation for the 3 shapes
        // uProgress from 0 to 2 mapped cleanly across the full scroll
        gsap.to(this.uniformProgress, {
            value: 2.0,
            scrollTrigger: {
                trigger: '.scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });

        // Add a general scale up and big rotation over the scroll depth
        gsap.to(this.particlesMesh.rotation, {
            y: Math.PI * 2,
            z: Math.PI * 0.2, // slight tilt
            scrollTrigger: {
                trigger: '.scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });

        gsap.to(this.particlesMesh.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            scrollTrigger: {
                trigger: '.scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            }
        });

        // Reveal items smoothly
        const reveals = gsap.utils.toArray('.reveal-item') as HTMLElement[];
        reveals.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 50%',
                        scrub: 1
                    }
                }
            );
        });

        // Setup numbers counter for Impact
        const stats = gsap.utils.toArray('.stat-number') as HTMLElement[];
        stats.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-target') || '0', 10);
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    once: true
                }
            });
        });

        this.setupInteractions();
    }

    private setupInteractions() {
        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const btn = item.querySelector('.faq-question') as HTMLElement;
            const answer = item.querySelector('.faq-answer') as HTMLElement;
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // close all
                faqItems.forEach(f => {
                    f.classList.remove('active');
                    (f.querySelector('.faq-answer') as HTMLElement).style.height = '0px';
                });

                if (!isActive) {
                    item.classList.add('active');
                    answer.style.height = answer.scrollHeight + 'px';
                }
            });
        });

        // Glow Hover logic for cards
        const glowCards = document.querySelectorAll('.glow-hover, .magnetic');
        glowCards.forEach((card) => {
            card.addEventListener('mousemove', (e: Event) => {
                const ce = e as MouseEvent;
                const rect = (card as HTMLElement).getBoundingClientRect();
                const x = ce.clientX - rect.left;
                const y = ce.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--x', `${x}px`);
                (card as HTMLElement).style.setProperty('--y', `${y}px`);
            });
        });
    }

    private initCursor() {
        const interactables = document.querySelectorAll('a, button, .interactive-list li, .showcase-item, .magnetic');
        const cursor = document.querySelector('.custom-cursor') as HTMLElement;

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }
}
