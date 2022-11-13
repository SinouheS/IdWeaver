/* eslint-disable unicorn/number-literal-case */
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PCFSoftShadowMap,
  sRGBEncoding,
  ACESFilmicToneMapping,
  BufferGeometry,
  BufferAttribute,
  Color,
  ShaderMaterial,
  Points
} from 'three'
import { bindAll } from 'lodash-es'
import { EventBus } from '~/assets/js/utils/event.js'

export default class Stage {
  SEPARATION = 100
  AMOUNTX = 50
  AMOUNTY = 50

  constructor(opts = {}) {
    this.container = opts.container || document.body

    this.SEPARATION = 100
    this.AMOUNTX = 50
    this.AMOUNTY = 50

    this.particles = 0
    this.count = 0

    this.settings = {
      frontLight: {
        color: new Color(0xbe7c7c),
        intensity: 13.6,
        distance: 26.9,
        penumbra: 0,
        x: 10,
        y: 14,
        z: 14,
      },
      backLight: {
        color: new Color(0xc9f0f0),
        intensity: 13,
        distance: 23,
        penumbra: 0,
        x: -19,
        y: -5.3,
        z: 3,
      },
    }

    this.addListeners()
    this.init()
    this.onResize()
  }

  addListeners() {
    bindAll(this, ['onResize', 'render'])
    EventBus.$on('ON_RESIZE', this.onResize)
    EventBus.$on('ON_TICK', this.render)
  }

  removeListeners() {
    EventBus.$off('ON_RESIZE', this.onResize)
    EventBus.$off('ON_TICK', this.render)
  }

  init() {
    const pixelRatio = window.devicePixelRatio
    const AA = pixelRatio <= 1
    /* Init renderer and canvas */
    this.renderer = new WebGLRenderer({
      antialias: AA,
      alpha: true,
    })
    this.renderer.setPixelRatio(pixelRatio)

    this.renderer.toneMappingExposure = 0.6
    this.renderer.outputEncoding = sRGBEncoding
    this.renderer.toneMapping = ACESFilmicToneMapping
    this.renderer.powerPreference = 'high-performance'

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = PCFSoftShadowMap

    this.container.style.overflow = 'hidden'
    this.container.style.margin = 0
    this.container.appendChild(this.renderer.domElement)

    /* Main scene and camera */
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )

    this.camera.position.z = 1000

    this.createScene()
  }

  createScene() {
    const numParticles = this.AMOUNTX * this.AMOUNTY

    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    let i = 0;
      let j = 0

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i] = ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2 // x
        positions[i + 1] = 0 // y
        positions[i + 2] = iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) / 2 // z

        scales[j] = 1

        i += 3
        j++
      }
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new BufferAttribute(scales, 1))

    this.material = new ShaderMaterial({
      uniforms: {
        color: { value: new Color(0xffaaff) },
      },
      // vertexShader: "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
      // fragmentShader: "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",
      vertexShader:
      "attribute float scale;\nvoid main() {\n  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n  gl_PointSize = scale * ( 300.0 / - mvPosition.z );\n  gl_Position = projectionMatrix * mvPosition;\n}",
    fragmentShader:
      "\nuniform vec3 color;\nvoid main() {\n if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;\ngl_FragColor = vec4( color, 1.0 );}",
    })

    this.particles = new Points(geometry, this.material);
    this.scene.add(this.particles);
  }

  onResize() {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate() {
    requestAnimationFrame(animate());

    render();
  }

  render() {
    this.camera.lookAt(this.scene.position)

    const positions = this.particles.geometry.attributes.position.array
    const scales = this.particles.geometry.attributes.scale.array

    let i = 0
    let j = 0

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i + 1] =
          Math.sin((ix + this.count) * 0.3) * 50 + Math.sin((iy + this.count) * 0.5) * 50

        scales[j] =
          (Math.sin((ix + this.count) * 0.3) + 1) * 20 +
          (Math.sin((iy + this.count) * 0.5) + 1) * 20

        i += 3
        j++
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true
    this.particles.geometry.attributes.scale.needsUpdate = true

    this.renderer.render(this.scene, this.camera)

    this.count += 0.1
  }
}
