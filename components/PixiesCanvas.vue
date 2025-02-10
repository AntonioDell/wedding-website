<template>
  <div ref="container" class="container">
    <canvas ref="pixie" class="pixie"></canvas>
  </div>
</template>
<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { height: windowHeight, width: windowWidth } = useWindowSize();

const pixieCanvas = useTemplateRef("pixie");
const containerDiv = useTemplateRef("container");

watch([windowHeight, windowWidth], () => {
  setupCanvas();
});

onMounted(() => {
  setupCanvas();
});

let i1: NodeJS.Timeout, i2: NodeJS.Timeout;
function setupCanvas() {
  if (!pixieCanvas.value || !containerDiv.value) return;
  pixieCanvas.value.width = windowWidth.value;
  pixieCanvas.value.height = windowHeight.value;
  containerDiv.value.style.width = windowWidth.value + "";
  containerDiv.value.style.height = windowHeight.value + "";
  const context = pixieCanvas.value.getContext("2d");
  if (!context) return;

  const pixies: Circle[] = new Array();
  for (let i = 0; i < 50; i++) {
    pixies[i] = new Circle();
    pixies[i].reset(windowWidth.value, windowHeight.value);
  }
  if (i1 && i2) {
    clearInterval(i1);
    clearInterval(i2);
  }
  i1 = setInterval(() => draw(context, pixies), 50);
  i2 = setInterval(() => draw(context, pixies), 70);
}

function draw(context: CanvasRenderingContext2D, pixies: Circle[]) {
  context.clearRect(0, 0, windowWidth.value, windowHeight.value);
  for (let i = 0; i < pixies.length; i++) {
    pixies[i].fade();
    pixies[i].move();
    pixies[i].draw(context);
  }
}

class Circle {
  s = {
    ttl: 8000,
    xmax: 5,
    ymax: 2,
    rmax: 10,
    rt: 1,
    xdef: 960,
    ydef: 540,
    xdrift: 4,
    ydrift: 4,
    random: true,
    blink: true,
  };
  x!: number;
  y!: number;
  r!: number;
  dx!: number;
  dy!: number;
  hl!: number;
  rt!: number;
  stop!: number;
  windowWidth!: number;
  windowHeight!: number;

  reset(windowWidth: number, windowHeight: number) {
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;
    this.x = this.s.random ? windowWidth * Math.random() : this.s.xdef;
    this.y = this.s.random ? windowHeight * Math.random() : this.s.ydef;
    this.r = (this.s.rmax - 1) * Math.random() + 1;
    this.dx = Math.random() * this.s.xmax * (Math.random() < 0.5 ? -1 : 1);
    this.dy = Math.random() * this.s.ymax * (Math.random() < 0.5 ? -1 : 1);
    this.hl = (this.s.ttl / 50) * (this.r / this.s.rmax);
    this.rt = Math.random() * this.hl;
    this.s.rt = Math.random() + 1;
    this.stop = Math.random() * 0.2 + 0.4;
    this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
  }

  fade() {
    this.rt += this.s.rt;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
      this.s.rt = this.s.rt * -1;
    else if (this.rt >= this.hl)
      this.reset(this.windowWidth, this.windowHeight);
    const newo = 1 - this.rt / this.hl;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    const cr = this.r * newo;
    const radialGradient = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      cr <= 0 ? 1 : cr
    );
    radialGradient.addColorStop(0.0, "rgba(238,180,28," + newo + ")");
    radialGradient.addColorStop(
      this.stop,
      "rgba(238,180,28," + newo * 0.2 + ")"
    );
    radialGradient.addColorStop(1.0, "rgba(238,180,28,0)");
    context.fillStyle = radialGradient;
    context.fill();
  }

  move() {
    this.x += (this.rt / this.hl) * this.dx;
    this.y += (this.rt / this.hl) * this.dy;
    if (this.x > this.windowWidth || this.x < 0) this.dx *= -1;
    if (this.y > this.windowHeight || this.y < 0) this.dy *= -1;
  }
}
</script>
<style>
.container {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#040429', EndColorStr='#257eb7');
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#040429', EndColorStr='#257eb7')";
}

.pixie {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
