<template>
  <h1>Hello World</h1>
</template>
<script>
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  name: 'SeaBackground',
  // data() {
  //   return {
  //     scene: undefined,
  //     camera: undefined,
  //     renderer: undefined,
  //   }
  // },
  // methods: {
  //   renderScene() {
  //     this.render.render(this.scene, this.camera)
  //   },
  //   init() {
  //     // creating scene
  //     this.scene = new THREE.Scene()
  //     this.scene.background = null

  //     // generating renderer
  //     this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

  //     // specifying encoding
  //     this.renderer.outputEncoding = THREE.sRGBEncoding

  //     // specifying screen pixel ratio
  //     this.renderer.setPixelRatio(window.devicePixelRatio)

  //     // configurating size and adding renderer to DOM
  //     const container = document.getElementById(this.containerId)
  //     this.renderer.setSize(container.offsetWidth, container.offsetHeight)
  //     container.appendChild(this.renderer.domElement)

  //     // setting up and positioning camera
  //     this.camera = new THREE.PerspectiveCamera(
  //       45,
  //       container.offsetWidth / container.offsetHeight,
  //       0.25,
  //       20
  //     )
  //     this.camera.position.set(
  //       this.modelSettings.cameraPosition[0],
  //       this.modelSettings.cameraPosition[1],
  //       this.modelSettings.cameraPosition[2]
  //     )

  //     // adding controls to camera
  //     const controls = new OrbitControls(this.camera, this.renderer.domElement)
  //     controls.minDistance = 2
  //     controls.maxDistance = 5
  //     // controls.enablePan = false;
  //     controls.target.set(0, 0, 0)
  //     controls.addEventListener('change', this.renderScene)

  //     // setting up lights

  //     const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  //     directionalLight.position.set(0, 1, 0)
  //     directionalLight.castShadow = true
  //     this.scene.add(directionalLight)
  //     const light = new THREE.PointLight(0xffffcc, 1)
  //     light.position.set(0, 600, 1000)
  //     this.scene.add(light)
  //     const light2 = new THREE.PointLight(0xe6f7ff, 1)
  //     light2.position.set(1000, 200, 0)
  //     this.scene.add(light2)
  //     const light3 = new THREE.PointLight(0xfff2e6, 1)
  //     light3.position.set(0, 200, -1000)
  //     this.scene.add(light3)
  //     const light4 = new THREE.PointLight(0xc4c400, 1)
  //     light4.position.set(-1000, 600, 1000)
  //     this.scene.add(light4)

  //     // loading 3D models
  //     const loader = new GLTFLoader()
  //     loader.load(this.modelSettings.link, (data) => {
  //       const object = data.scene
  //       object.position.set(0, 0, 0)
  //       if (this.modelSettings.scale)
  //         object.scale.set(
  //           this.modelSettings.scale,
  //           this.modelSettings.scale,
  //           this.modelSettings.scale
  //         )
  //       this.scene.add(object)
  //       this.renderScene()
  //     })
  //   },
  // },
}
</script>
