import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import smartStore from '../../assets/smart-store-2.png'

const palette = {
  white: '#ffffff',
  blue: '#1765ee',
  green: '#00a878',
  yellow: '#ffbd22',
  red: '#ef5261',
  ink: '#202c3c',
  pale: '#eaf0f7',
}

export default function HeroIllustration() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      setUnavailable(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.VSMShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NeutralToneMapping
    renderer.toneMappingExposure = 1
    renderer.setClearColor(0xffffff, 0)
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;'
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const environmentGenerator = new THREE.PMREMGenerator(renderer)
    const studio = new RoomEnvironment()
    const environment = environmentGenerator.fromScene(studio, 0.04)
    scene.environment = environment.texture
    scene.environmentIntensity = 0.45
    studio.dispose()
    environmentGenerator.dispose()
    const camera = new THREE.OrthographicCamera(-4, 4, 3.3, -3.3, 0.1, 60)
    camera.position.set(9, 9.6, 9)
    camera.lookAt(0, 0.6, 0)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xc5d4df, 0.8))
    const sunlight = new THREE.DirectionalLight(0xfffaf2, 2)
    sunlight.position.set(-3, 14, 5)
    sunlight.castShadow = true
    sunlight.shadow.mapSize.set(1024, 1024)
    Object.assign(sunlight.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 0.5, far: 25 })
    sunlight.shadow.radius = 4
    sunlight.shadow.blurSamples = 8
    sunlight.shadow.normalBias = 0.035
    sunlight.shadow.bias = -0.0005
    scene.add(sunlight)

    const fillLight = new THREE.DirectionalLight(0xdceaff, 0.65)
    fillLight.position.set(5, 4, -3)
    scene.add(fillLight)

    const materials = new Map<string, THREE.MeshPhysicalMaterial>()
    const textures: THREE.CanvasTexture[] = []
    const surfaces: THREE.Material[] = []
    const labels: { node: HTMLSpanElement; parent: THREE.Object3D; anchor: THREE.Vector3 }[] = []
    const material = (color: string) => {
      if (!materials.has(color)) {
        const metallic = color === palette.pale || color === '#b8c5d4'
        materials.set(color, new THREE.MeshPhysicalMaterial({
          color,
          roughness: metallic ? 0.28 : color === palette.ink ? 0.36 : 0.45,
          metalness: metallic ? 0.65 : 0.08,
          clearcoat: metallic ? 0.25 : 0.2,
          clearcoatRoughness: 0.22,
        }))
      }
      return materials.get(color)!
    }
    const box = (parent: THREE.Object3D, size: [number, number, number], position: [number, number, number], color: string) => {
      const radius = Math.min(...size) * 0.24
      const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 3, Math.min(radius, 0.08)), material(color))
      mesh.position.set(...position)
      mesh.castShadow = true
      mesh.receiveShadow = true
      parent.add(mesh)
      return mesh
    }
    const cylinder = (parent: THREE.Object3D, radius: number, height: number, position: [number, number, number], color: string) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 24), material(color))
      mesh.position.set(...position)
      mesh.castShadow = true
      mesh.receiveShadow = true
      parent.add(mesh)
      return mesh
    }
    const screen = (parent: THREE.Object3D, width: number, height: number, position: [number, number, number], kind: 'pos' | 'analytics' | 'payment' | 'orders') => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 384
      const context = canvas.getContext('2d')!
      context.fillStyle = '#f8fafc'
      context.fillRect(0, 0, 512, 384)
      context.fillStyle = palette.ink
      context.fillRect(0, 0, 512, 64)
      context.fillStyle = palette.white
      context.font = '600 27px sans-serif'
      context.fillText(kind === 'pos' ? 'SnapBizz POS' : kind === 'analytics' ? 'Business insights' : kind === 'orders' ? 'SnapOrder' : 'Payment received', 24, 42)
      if (kind === 'pos' || kind === 'orders') {
        const colors = [palette.blue, palette.green, palette.yellow, palette.red]
        colors.forEach((color, index) => {
          context.fillStyle = color
          context.fillRect(24 + (index % 2) * 150, 90 + Math.floor(index / 2) * 115, 128, 92)
          context.fillStyle = '#ffffff99'
          context.fillRect(40 + (index % 2) * 150, 150 + Math.floor(index / 2) * 115, 72, 8)
        })
        context.fillStyle = '#e4eaf2'
        context.fillRect(340, 90, 148, 207)
        context.fillStyle = palette.green
        context.fillRect(340, 315, 148, 44)
      } else if (kind === 'analytics') {
        context.strokeStyle = '#dce4ee'
        for (let row = 0; row < 4; row++) {
          context.beginPath()
          context.moveTo(28, 140 + row * 58)
          context.lineTo(484, 140 + row * 58)
          context.stroke()
        }
        ;[70, 120, 90, 160, 135, 205, 180, 230].forEach((heightValue, index) => {
          context.fillStyle = index > 5 ? palette.green : palette.blue
          context.fillRect(32 + index * 57, 350 - heightValue, 36, heightValue)
        })
      } else {
        context.fillStyle = '#e1f4e9'
        context.beginPath()
        context.arc(256, 185, 72, 0, Math.PI * 2)
        context.fill()
        context.strokeStyle = palette.green
        context.lineWidth = 15
        context.lineCap = 'round'
        context.beginPath()
        context.moveTo(220, 183)
        context.lineTo(246, 207)
        context.lineTo(292, 158)
        context.stroke()
        context.fillStyle = palette.ink
        context.font = '600 32px sans-serif'
        context.fillText('UPI / CARD', 163, 315)
      }
      const reflection = context.createLinearGradient(0, 0, 512, 384)
      reflection.addColorStop(0, 'rgba(255,255,255,0.12)')
      reflection.addColorStop(0.48, 'rgba(255,255,255,0.03)')
      reflection.addColorStop(0.49, 'rgba(255,255,255,0.06)')
      reflection.addColorStop(1, 'rgba(255,255,255,0)')
      context.fillStyle = reflection
      context.fillRect(0, 0, 512, 384)
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4)
      textures.push(texture)
      const surface = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
      surfaces.push(surface)
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), surface)
      mesh.position.set(...position)
      parent.add(mesh)
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: palette.white, transparent: true, opacity: 0.035,
        roughness: 0.06, metalness: 0.15, clearcoat: 1, depthWrite: false,
      })
      surfaces.push(glassMaterial)
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(width, height), glassMaterial)
      glass.position.set(position[0], position[1], position[2] + 0.003)
      parent.add(glass)
      return mesh
    }

    const label = (parent: THREE.Object3D, title: string, height: number) => {
      const node = document.createElement('span')
      node.textContent = title
      node.setAttribute('aria-hidden', 'true')
      node.className = 'pointer-events-none absolute whitespace-nowrap text-xs font-semibold text-ink transition-opacity duration-150 motion-reduce:transition-none'
      node.style.transform = 'translate(-50%, -100%)'
      node.style.opacity = '0'
      node.style.textShadow = '0 0 5px white, 0 0 10px white, 0 1px 2px white'
      host.appendChild(node)
      labels.push({ node, parent, anchor: new THREE.Vector3(0, height, 0) })
    }

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.09 }))
    surfaces.push(floor.material)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.06
    floor.receiveShadow = true
    scene.add(floor)

    const modules: THREE.Group[] = []
    const moduleAt = (position: [number, number, number], name: string) => {
      const group = new THREE.Group()
      group.position.set(...position)
      group.name = name
      scene.add(group)
      modules.push(group)
      return group
    }

    const store = moduleAt([0, 0, 0], 'Retail checkout')
    box(store, [2.44, 0.08, 2.24], [0, -0.02, 0], '#b8c5d4')
    box(store, [2.5, 0.16, 2.3], [0, 0.04, 0], palette.blue)
    box(store, [2.38, 0.025, 2.18], [0, 0.135, 0], palette.white)
    for (let tile = 1; tile < 4; tile++) {
      box(store, [0.012, 0.003, 2.18], [-1.19 + tile * 0.595, 0.15, 0], '#d6e2f0')
      box(store, [2.38, 0.003, 0.012], [0, 0.15, -1.09 + tile * 0.545], '#d6e2f0')
    }
    box(store, [2.4, 2.1, 0.12], [0, 1.2, -1.02], '#e8f1ff')
    box(store, [0.12, 2.1, 2.1], [-1.18, 1.2, -0.03], palette.white)
    box(store, [2.55, 0.13, 0.45], [0, 2.3, -0.86], palette.blue)
    for (let shelf = 0; shelf < 3; shelf++) {
      const shelfHeight = 0.53 + shelf * 0.49
      box(store, [2.05, 0.06, 0.32], [0, shelfHeight, -0.79], palette.white)
      for (let product = 0; product < 7; product++) {
        const productColor = [palette.green, palette.yellow, palette.red, palette.blue][(product + shelf) % 4]
        const productHeight = product % 2 ? 0.27 : 0.34
        const productPosition = -0.87 + product * 0.29
        box(store, [0.17, productHeight, 0.16], [productPosition, shelfHeight + 0.03 + productHeight / 2, -0.79], productColor)
        box(store, [0.12, 0.07, 0.006], [productPosition, shelfHeight + productHeight * 0.55, -0.707], palette.white)
      }
    }
    box(store, [0.065, 1.9, 0.065], [1.18, 1.1, -0.96], palette.blue)
    box(store, [0.065, 1.9, 0.065], [1.18, 1.1, 0.25], palette.blue)
    box(store, [0.065, 0.06, 1.25], [1.18, 1.86, -0.35], palette.blue)
    box(store, [0.065, 0.06, 1.25], [1.18, 0.42, -0.35], palette.blue)
    const windowMaterial = new THREE.MeshPhysicalMaterial({ color: '#91d9f5', transparent: true, opacity: 0.16, roughness: 0.1, metalness: 0.1, depthWrite: false, side: THREE.DoubleSide })
    surfaces.push(windowMaterial)
    const shopWindow = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.36), windowMaterial)
    shopWindow.rotation.y = Math.PI / 2
    shopWindow.position.set(1.18, 1.14, -0.35)
    store.add(shopWindow)

    box(store, [0.1, 1.93, 0.1], [-1.18, 1.12, 1.03], palette.blue)
    box(store, [0.1, 1.93, 0.1], [1.18, 1.12, 1.03], palette.blue)
    box(store, [2.58, 0.4, 0.18], [0, 2.26, 1.05], palette.blue)
    const storefrontCanvas = document.createElement('canvas')
    storefrontCanvas.width = 1024
    storefrontCanvas.height = 192
    const storefrontContext = storefrontCanvas.getContext('2d')!
    storefrontContext.fillStyle = palette.blue
    storefrontContext.fillRect(0, 0, 1024, 192)
    storefrontContext.fillStyle = palette.white
    storefrontContext.font = '700 116px sans-serif'
    storefrontContext.textAlign = 'center'
    storefrontContext.textBaseline = 'middle'
    storefrontContext.fillText('SnapBizz', 512, 102)
    const storefrontTexture = new THREE.CanvasTexture(storefrontCanvas)
    storefrontTexture.colorSpace = THREE.SRGBColorSpace
    textures.push(storefrontTexture)
    const storefrontMaterial = new THREE.MeshBasicMaterial({ map: storefrontTexture, toneMapped: false })
    surfaces.push(storefrontMaterial)
    const storefrontSign = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.34), storefrontMaterial)
    storefrontSign.position.set(0, 2.26, 1.145)
    store.add(storefrontSign)
    for (let stripe = 0; stripe < 10; stripe++) {
      box(store, [0.253, 0.11, 0.38], [-1.138 + stripe * 0.253, 2.02, 1.12], stripe % 2 ? palette.white : palette.blue)
      box(store, [0.253, 0.16, 0.045], [-1.138 + stripe * 0.253, 1.94, 1.29], stripe % 2 ? palette.white : palette.blue)
    }
    box(store, [1.75, 0.7, 0.62], [0, 0.5, 0.35], '#dceaff')
    box(store, [1.85, 0.1, 0.74], [0, 0.9, 0.35], palette.ink)
    box(store, [1.76, 0.025, 0.66], [0, 0.96, 0.35], '#b8c5d4')
    box(store, [1.75, 0.08, 0.025], [0, 0.38, 0.67], palette.blue)
    box(store, [0.42, 0.06, 0.32], [0.1, 0.99, 0.32], palette.ink)
    box(store, [0.1, 0.32, 0.1], [0.1, 1.13, 0.24], palette.ink)
    const terminal = new THREE.Group()
    terminal.position.set(0.1, 1.42, 0.26)
    terminal.rotation.x = -0.17
    store.add(terminal)
    box(terminal, [1.02, 0.75, 0.12], [0, 0, 0], '#b8c5d4')
    box(terminal, [0.99, 0.72, 0.05], [0, 0, 0.065], palette.ink)
    screen(terminal, 0.87, 0.59, [0, 0.015, 0.095], 'pos')
    const powerLight = cylinder(terminal, 0.012, 0.008, [0.43, -0.3, 0.095], palette.green)
    powerLight.rotation.x = Math.PI / 2
    box(store, [0.33, 0.25, 0.35], [-0.62, 1.1, 0.43], palette.ink)
    box(store, [0.29, 0.06, 0.31], [-0.62, 1.24, 0.43], palette.pale)
    box(store, [0.22, 0.012, 0.05], [-0.62, 1.275, 0.5], palette.ink)
    const receipt = box(store, [0.19, 0.012, 0.35], [-0.62, 1.29, 0.66], palette.white)
    receipt.rotation.x = 0.12
    for (let line = 0; line < 5; line++) {
      box(store, [line === 4 ? 0.08 : 0.14, 0.003, 0.008], [-0.62, 1.305, 0.55 + line * 0.04], '#8a93a6')
    }

    label(store, 'Retail & POS', 2.85)

    const inventory = moduleAt([-2.55, 0, 1.3], 'Inventory')
    box(inventory, [1.25, 0.14, 1.18], [0, 0.03, 0], '#adedd6')
    const parcelPositions: [number, number, number][] = [[-0.27, 0.37, 0.22], [0.29, 0.37, 0.22], [0, 0.88, 0.06]]
    parcelPositions.forEach((position, index) => {
      box(inventory, [0.49, 0.48, 0.49], position, index === 2 ? palette.green : palette.yellow)
      box(inventory, [0.1, 0.49, 0.5], [position[0], position[1], position[2]], '#fff2c9')
      box(inventory, [0.16, 0.1, 0.008], [position[0] + 0.09, position[1], position[2] + 0.25], palette.white)
      for (let stripe = 0; stripe < 5; stripe++) {
        box(inventory, [0.009, 0.06, 0.009], [position[0] + 0.035 + stripe * 0.022, position[1], position[2] + 0.256], palette.ink)
      }
    })
    label(inventory, 'Inventory', 1.5)

    const analytics = moduleAt([2.05, 0, -1.9], 'Business analytics')
    box(analytics, [1.65, 0.14, 1.1], [0, 0.03, 0], '#ffb5bf')
    box(analytics, [0.6, 0.065, 0.4], [0, 0.2, 0], '#b8c5d4')
    box(analytics, [0.12, 0.52, 0.12], [0, 0.45, 0], '#b8c5d4')
    box(analytics, [1.48, 1.06, 0.12], [0, 1.1, 0], palette.red)
    box(analytics, [1.44, 1.02, 0.04], [0, 1.1, 0.065], palette.ink)
    screen(analytics, 1.32, 0.87, [0, 1.12, 0.09], 'analytics')
    box(analytics, [0.62, 0.035, 0.23], [0, 0.15, 0.32], palette.white)
    for (let row = 0; row < 3; row++) {
      for (let key = 0; key < 8; key++) {
        box(analytics, [0.052, 0.012, 0.045], [-0.25 + key * 0.07, 0.175, 0.25 + row * 0.06], '#b8c5d4')
      }
    }
    label(analytics, 'Business insights', 1.95)

    const payment = moduleAt([2.55, 0, 0.7], 'Connected payments')
    box(payment, [1.15, 0.14, 1.15], [0, 0.03, 0], '#ffe18b')
    box(payment, [0.67, 1.18, 0.25], [0, 0.77, 0], palette.blue)
    box(payment, [0.63, 1.14, 0.1], [0, 0.77, 0.13], palette.ink)
    screen(payment, 0.5, 0.6, [0, 0.98, 0.185], 'payment')
    for (let row = 0; row < 3; row++) {
      for (let key = 0; key < 3; key++) {
        const keyColor = row === 2 ? [palette.red, palette.yellow, palette.green][key] : palette.pale
        box(payment, [0.12, 0.068, 0.035], [-0.16 + key * 0.16, 0.55 - row * 0.105, 0.19], keyColor)
      }
    }
    box(payment, [0.38, 0.014, 0.04], [0, 1.37, -0.025], palette.ink)
    box(payment, [0.33, 0.012, 0.25], [0, 1.385, 0.05], palette.white)
    for (let coin = 0; coin < 3; coin++) {
      cylinder(payment, 0.12, 0.035, [0.4, 0.14 + coin * 0.037, 0.3], palette.yellow)
    }
    label(payment, 'Payments', 1.75)

    const bank = moduleAt([-2.5, 0, -1.7], 'Bank and fintech partners')
    box(bank, [1.85, 0.16, 1.3], [0, 0.04, 0], '#b7dbff')
    box(bank, [1.65, 0.12, 1.05], [0, 0.18, 0], palette.white)
    box(bank, [1.6, 1.1, 0.15], [0, 0.8, -0.4], palette.pale)
    for (let column = 0; column < 4; column++) {
      const columnPosition = -0.6 + column * 0.4
      cylinder(bank, 0.085, 1.05, [columnPosition, 0.8, 0.27], palette.white)
      box(bank, [0.24, 0.1, 0.24], [columnPosition, 0.3, 0.27], '#b8c5d4')
      box(bank, [0.24, 0.1, 0.24], [columnPosition, 1.31, 0.27], palette.white)
    }
    box(bank, [1.85, 0.14, 1.1], [0, 1.42, 0], palette.blue)
    const pediment = new THREE.Shape()
    pediment.moveTo(-0.9, 0)
    pediment.lineTo(0, 0.45)
    pediment.lineTo(0.9, 0)
    pediment.closePath()
    const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(pediment, { depth: 0.88, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 2, steps: 1 }), material(palette.blue))
    roof.position.set(0, 1.5, -0.44)
    roof.castShadow = true
    bank.add(roof)
    const bankEmblem = cylinder(bank, 0.11, 0.025, [0, 1.68, 0.48], palette.yellow)
    bankEmblem.rotation.x = Math.PI / 2
    label(bank, 'Bank partners', 2.35)

    const orders = moduleAt([0.15, 0, 2.7], 'Online orders')
    box(orders, [1.4, 0.14, 1.15], [0, 0.03, 0], '#a2e7dc')
    const mobile = new THREE.Group()
    mobile.position.set(-0.18, 0.9, -0.05)
    mobile.rotation.x = -0.12
    orders.add(mobile)
    box(mobile, [0.78, 1.38, 0.15], [0, 0, 0], palette.green)
    box(mobile, [0.73, 1.33, 0.05], [0, 0, 0.085], palette.ink)
    screen(mobile, 0.63, 1.12, [0, -0.01, 0.115], 'orders')
    box(mobile, [0.17, 0.025, 0.01], [0, 0.61, 0.12], palette.ink)
    box(orders, [0.4, 0.42, 0.42], [0.41, 0.32, 0.2], palette.yellow)
    box(orders, [0.07, 0.43, 0.43], [0.41, 0.32, 0.2], '#fbe5a7')
    label(orders, 'Online orders', 1.9)

    const packets: { mesh: THREE.Mesh; path: THREE.CurvePath<THREE.Vector3>; phase: number }[] = []
    const connect = (points: [number, number, number][], color: string, phase: number) => {
      const path = new THREE.CurvePath<THREE.Vector3>()
      points.slice(1).forEach((point, index) => path.add(new THREE.LineCurve3(new THREE.Vector3(...points[index]), new THREE.Vector3(...point))))
      const wire = new THREE.Mesh(new THREE.TubeGeometry(path, 24, 0.026, 6, false), material(color))
      scene.add(wire)
      const packet = box(scene, [0.09, 0.09, 0.09], points[0], color)
      packets.push({ mesh: packet, path, phase })
    }
    connect([[-0.7, 0.03, 0.7], [-1.4, 0.03, 0.7], [-1.4, 0.03, 1.3], [-2.55, 0.03, 1.3]], palette.green, 0)
    connect([[0.8, 0.03, 0.65], [1.4, 0.03, 0.65], [1.4, 0.03, 0.7], [2.55, 0.03, 0.7]], palette.blue, 0.2)
    connect([[0.6, 0.03, -0.8], [0.6, 0.03, -1.9], [2.05, 0.03, -1.9]], palette.yellow, 0.4)
    connect([[-0.6, 0.03, -0.8], [-0.6, 0.03, -1.7], [-2.5, 0.03, -1.7]], palette.blue, 0.6)
    connect([[0.1, 0.03, 0.8], [0.1, 0.03, 1.8], [0.15, 0.03, 1.8], [0.15, 0.03, 2.7]], palette.green, 0.8)

    scene.updateMatrixWorld(true)
    camera.updateMatrixWorld(true)
    const framing = new THREE.Box3()
    modules.forEach((group) => {
      const bounds = new THREE.Box3().setFromObject(group)
      for (const horizontal of [bounds.min.x, bounds.max.x]) {
        for (const vertical of [bounds.min.y, bounds.max.y]) {
          for (const depth of [bounds.min.z, bounds.max.z]) {
            framing.expandByPoint(new THREE.Vector3(horizontal, vertical, depth).applyMatrix4(camera.matrixWorldInverse))
          }
        }
      }
    })
    labels.forEach(({ parent, anchor }) => {
      framing.expandByPoint(anchor.clone().applyMatrix4(parent.matrixWorld).applyMatrix4(camera.matrixWorldInverse))
    })

    const pointer = new THREE.Vector2(2, 2)
    const labelPosition = new THREE.Vector3()
    const raycaster = new THREE.Raycaster()
    let hovered: THREE.Group | undefined
    let visible = true
    let dirty = true
    let elapsed = 0
    let lastTime = 0
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.04)
      lastTime = time
      if (!visible || (motionPreference.matches && !dirty)) return
      if (!motionPreference.matches) elapsed += delta
      modules.forEach((group) => {
        group.position.y = THREE.MathUtils.lerp(group.position.y, !motionPreference.matches && group === hovered ? 0.14 : 0, 0.12)
      })
      packets.forEach(({ mesh, path, phase }) => mesh.position.copy(path.getPointAt((elapsed * 0.16 + phase) % 1)))
      renderer.render(scene, camera)
      labels.forEach(({ node, parent, anchor }) => {
        labelPosition.copy(anchor).applyMatrix4(parent.matrixWorld).project(camera)
        node.style.left = `${(labelPosition.x * 0.5 + 0.5) * host.clientWidth}px`
        node.style.top = `${(-labelPosition.y * 0.5 + 0.5) * host.clientHeight}px`
        node.style.opacity = parent === hovered ? '1' : '0'
      })
      dirty = false
    }
    const resize = () => {
      const width = host.clientWidth
      const height = host.clientHeight
      if (!width || !height) return
      const aspect = width / height
      labels.forEach(({ node }) => { node.style.display = window.innerWidth < 640 ? 'none' : '' })
      const center = framing.getCenter(new THREE.Vector3())
      const size = framing.getSize(new THREE.Vector3())
      const halfHeight = Math.max(size.y / 2 + 0.35, (size.x / 2 + 0.35) / aspect)
      camera.left = center.x - halfHeight * aspect
      camera.right = center.x + halfHeight * aspect
      camera.top = center.y + halfHeight
      camera.bottom = center.y - halfHeight
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      dirty = true
    }
    const movePointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = host.getBoundingClientRect()
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -((event.clientY - bounds.top) / bounds.height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(modules, true)[0]?.object
      hovered = modules.find((group) => {
        let ancestor: THREE.Object3D | undefined = hit
        while (ancestor) {
          if (ancestor === group) return true
          ancestor = ancestor.parent ?? undefined
        }
        return false
      })
      dirty = true
    }
    const leavePointer = () => {
      hovered = undefined
      dirty = true
    }
    const changeMotion = () => {
      hovered = undefined
      modules.forEach((group) => { group.position.y = 0 })
      dirty = true
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      dirty = true
    })
    visibilityObserver.observe(host)
    host.addEventListener('pointermove', movePointer)
    host.addEventListener('pointerleave', leavePointer)
    motionPreference.addEventListener('change', changeMotion)
    resize()
    renderer.setAnimationLoop(render)

    return () => {
      renderer.setAnimationLoop(null)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      host.removeEventListener('pointermove', movePointer)
      host.removeEventListener('pointerleave', leavePointer)
      motionPreference.removeEventListener('change', changeMotion)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose()
      })
      materials.forEach((surface) => surface.dispose())
      surfaces.forEach((surface) => surface.dispose())
      textures.forEach((texture) => texture.dispose())
      labels.forEach(({ node }) => node.remove())
      environment.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="w-full">
      <div
        role="img"
        aria-label="Connected SnapBizz ecosystem: a retail checkout linked to bank and fintech partners, inventory, online orders, digital payments, and business analytics"
        className="relative aspect-7/5 w-full"
      >
        <div ref={hostRef} data-hero-isometric className="absolute inset-0" />
        {unavailable ? <img src={smartStore} alt="" className="absolute inset-0 h-full w-full object-contain" /> : null}
      </div>
      <ul aria-label="Ecosystem connections" className="mt-4 grid grid-cols-3 gap-x-3 gap-y-3 sm:hidden">
        {[
          { title: 'Retail & POS', color: palette.blue },
          { title: 'Bank partners', color: '#b7dbff' },
          { title: 'Inventory', color: palette.yellow },
          { title: 'Payments', color: '#ffe18b' },
          { title: 'Online orders', color: palette.green },
          { title: 'Insights', color: palette.red },
        ].map((item) => (
          <li key={item.title} className="flex items-center gap-1.5 text-[11px] font-medium text-ink-700">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ backgroundColor: item.color }} aria-hidden="true" />
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}