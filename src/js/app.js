import { GlowParticle } from "./glowparticle.js";

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    const colorObj = {
      r: (c >> 16) & 255,
      g: (c >> 8) & 255,
      b: c & 255,
    };
    return colorObj;
  }
  throw new Error("Bad Hex");
}

export class App {
  constructor() {
    this.COLORS;

    this.stop = false;
    this.frameCount = 0;
    this.fps = 60;

    this.canvas = document.getElementById("jsCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.totalParticles = 10;
    this.particles = [];
    this.maxRadius = 1000;
    this.minRadius = 400;
  }

  draw(color) {
    //console.log("call draw");
    this.COLORS = color;

    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  stopDraw() {
    //console.log("call stop");
    window.cancelAnimationFrame(this.req);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.globalCompositeOperation = "saturation";

    this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];
    //console.log("cc: " + this.COLORS[1]);
    for (let i = 0; i < this.totalParticles; i++) {
      //console.log(hexToRgbA(COLORS[curColor]));
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        hexToRgbA(this.COLORS[curColor])
      );

      if (++curColor >= this.COLORS.length) {
        curColor = 0;
      }

      this.particles[i] = item;
    }
  }

  animate() {
    //console.log("animate");

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      //console.log(this.req);
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      for (let i = 0; i < this.totalParticles; i++) {
        const item = this.particles[i];
        item.animate(this.ctx, this.stageWidth, this.stageHeight);
      }
    }
    this.req = window.requestAnimationFrame(this.animate.bind(this));
  }
}
