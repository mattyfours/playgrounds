const CONFIG = {
  radius: 15,
  strokeWidth: 3,
  delayThrottle: 0.2,
  transitionDurationMs: 300,
  textRotationSpeedMs: 10000,
  states: {
    default: {
      fillColor: '#FF7EEA',
      strokeColor: '#FF7EEA',
      radius: 15,
      strokeWidth: 3,
      label: '',
    },
    link: {
      fillColor: 'rgba(0,0,0,0)',
      strokeColor: '#000000',
      radius: 40,
      strokeWidth: 3,
      label: 'CLICK ME',
    }
  },
  ringText: {
    font: 'bold 15px Montserrat, sans-serif',
    letterSpacingRad: 0.4,
    ringPadding: 8,
  },
  animationPaths: {
    figureEight: {
      movementAmount: 100,
      percentagePath: [
      ]
    }
  }
}

function drawTextAroundRing(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  ringRadius: number,
  startAngle: number,
  color: string
) {
  if (!text) { return }

  const { font, letterSpacingRad } = CONFIG.ringText
  const chars = [...text]

  ctx.save()
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const totalArc = letterSpacingRad * (chars.length - 1)
  const firstAngle = startAngle - totalArc / 2

  chars.forEach((char, i) => {
    const angle = firstAngle + i * letterSpacingRad
    const x = cx + Math.cos(angle) * ringRadius
    const y = cy + Math.sin(angle) * ringRadius

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle + Math.PI / 2)
    ctx.fillText(char, 0, 0)
    ctx.restore()
  })

  ctx.restore()
}

class CursorContainer extends HTMLElement {
  private controller: AbortController | null = new AbortController()
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D | null = null
  private mouseCoordinates: { x: number, y: number } = { x: 0, y: 0 }
  private isDrawing: boolean = false
  private cursor: Cursor | null = null
  private targetElements: HTMLElement[] = []
  private cursorState: string = 'default'

  constructor() {
    super()
  }

  connectedCallback() {
    this.isDrawing = true
    this.initCanvas()
    this.initEvents()
    if (!this.ctx || !this.canvas) { return }
    this.cursor = new Cursor(this.ctx, this.canvas)
    this.draw()
  }

  disconnectedCallback() {
    this.isDrawing = false
    this.controller?.abort()
  }

  get _targetElements() {
    return Array.from(document.querySelectorAll('[data-cursor]')) as HTMLElement[]
  }

  initEvents() {
    this.controller = new AbortController()

    window.addEventListener('resize', () => {
      this.setCanvasSize()
    }, {signal: this.controller?.signal})

    window.addEventListener('mousemove', (event) => {
      this.mouseCoordinates = {
        x: event.clientX,
        y: event.clientY
      }
    }, {signal: this.controller?.signal})

    this.targetElements = this._targetElements
    this.targetElements.forEach((element) => {
      element.addEventListener('mouseover', () => {
        this.cursorState = element.getAttribute('data-cursor') || 'default'
      }, { signal: this.controller?.signal })

      element.addEventListener('mouseout', () => {
        this.cursorState = element.getAttribute('data-cursor') || 'default'
      }, { signal: this.controller?.signal })
    })
  }

  initCanvas() {
    try {
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      if (!this.ctx) { throw new Error('Failed to get canvas context') }
      this.setCanvasSize()
      this.appendChild(this.canvas)
    } catch (error) {
      console.error('[animated-cursor] Error initializing canvas', error)
    }
  }

  setCanvasSize() {
    if (!this.canvas || !this.ctx) { return }

    const dpr = window.devicePixelRatio || 1
    const width = this.clientWidth
    const height = this.clientHeight

    this.canvas.width = Math.round(width * dpr)
    this.canvas.height = Math.round(height * dpr)
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  draw() {
    if (!this.ctx || !this.canvas) { return }
    this.ctx.clearRect(0, 0, this.clientWidth, this.clientHeight)

    this.cursor?.draw({
      x: this.mouseCoordinates.x,
      y: this.mouseCoordinates.y,
      state: this.cursorState
    })
    if (this.isDrawing) {
      requestAnimationFrame(this.draw.bind(this))
    }
  }
}

class Cursor {
  private ctx: CanvasRenderingContext2D | null = null
  private canvas: HTMLCanvasElement | null = null
  private targetCoordinates: {x: number, y: number} = {x: 0, y: 0}
  private currentCoordinates: {x: number, y: number} | null = null
  private lastMotionAngle = 0
  private currentRadius = CONFIG.states.default.radius
  private radiusTarget = CONFIG.states.default.radius
  private radiusFrom = CONFIG.states.default.radius
  private radiusTransitionStartMs = 0

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx
    this.canvas = canvas
  }

  updateRadius(targetRadius: number) {
    if (targetRadius !== this.radiusTarget) {
      this.radiusTarget = targetRadius
      this.radiusFrom = this.currentRadius
      this.radiusTransitionStartMs = performance.now()
    }

    const elapsed = performance.now() - this.radiusTransitionStartMs
    const progress = Math.min(elapsed / CONFIG.transitionDurationMs, 1)
    this.currentRadius =
      this.radiusFrom + (this.radiusTarget - this.radiusFrom) * progress
  }

  getStateConfig(state: string) {
    return CONFIG.states[state as keyof typeof CONFIG.states] || CONFIG.states.default
  }

  updateCurrentCoordinatesAndSetOvalShape({
    x,
    y,
    strokeWidth
  }: {
    x: number
    y: number
    strokeWidth: number
  }) {
    this.targetCoordinates = {x, y}

    if (this.currentCoordinates === null) {
      this.currentCoordinates = {x, y}
    }

    const xStep = this.targetCoordinates.x - this.currentCoordinates.x
    const yStep = this.targetCoordinates.y - this.currentCoordinates.y
    const delayThrottle = Math.hypot(xStep, yStep)

    this.currentCoordinates.x += xStep * CONFIG.delayThrottle
    this.currentCoordinates.y += yStep * CONFIG.delayThrottle

    const baseRadius = this.currentRadius - strokeWidth
    const stretch = Math.min(delayThrottle / 40, 1)

    if (delayThrottle > 0.5) {
      this.lastMotionAngle = Math.atan2(yStep, xStep)
    }

    const radiusAlongMotion = baseRadius + stretch * baseRadius * 1.1
    const radiusPerpendicular = baseRadius * (1 - stretch * 0.1)
    const tailOffset = stretch * baseRadius * 0.5

    const cx =
      this.currentCoordinates.x - Math.cos(this.lastMotionAngle) * tailOffset
    const cy =
      this.currentCoordinates.y - Math.sin(this.lastMotionAngle) * tailOffset

    return {
      x: cx,
      y: cy,
      radiusX: radiusAlongMotion,
      radiusY: radiusPerpendicular,
      rotation: this.lastMotionAngle
    }
  }

  draw({x, y, state}: {x: number, y: number, state: string}) {
    const stateConfig = this.getStateConfig(state)
    if (!this.ctx || !this.canvas || !stateConfig) { return }

    this.updateRadius(stateConfig.radius)

    const {
      x: ellipseX,
      y: ellipseY,
      radiusX,
      radiusY,
      rotation,
    } = this.updateCurrentCoordinatesAndSetOvalShape({
      x,
      y,
      strokeWidth: stateConfig.strokeWidth
    })

    this.ctx.beginPath()
    this.ctx.ellipse(
      ellipseX,
      ellipseY,
      radiusX,
      radiusY,
      rotation,
      0,
      2 * Math.PI
    )
    this.ctx.fillStyle = stateConfig.fillColor
    this.ctx.lineWidth = stateConfig.strokeWidth
    this.ctx.strokeStyle = stateConfig.strokeColor
    this.ctx.stroke()
    this.ctx.fill()

    const label = stateConfig.label ?? ''
    if (label) {
      const ringRadius =
        this.currentRadius + CONFIG.ringText.ringPadding
      const startAngle =
        -Math.PI / 2 +
        (performance.now() / CONFIG.textRotationSpeedMs) * (2 * Math.PI)

      drawTextAroundRing(
        this.ctx,
        label,
        ellipseX,
        ellipseY,
        ringRadius,
        startAngle,
        stateConfig.strokeColor
      )
    }
  }
}

if (window.customElements.get('cursor-container') === undefined) {
  window.customElements.define('cursor-container', CursorContainer)
}

export default CursorContainer