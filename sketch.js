let imgHomero;
let x = 300;
let y = 200;
let tam = 80;
let v = 2;

let imgRos;
let x1 = -10;
let y1 = -10;
let tam1 = 20;

let homero;
let rosquilla;

async function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  imgRos = await loadImage('ros.jpg');
  imgHomero = await loadImage('homerSF.png');

  homero = new simpsons(imgHomero, x, y, tam - 20, tam);
  rosquilla = new comida(imgRos, x1, y1, tam1);
}

function draw() {
  background(220);

  homero.mostrar();
  homero.mover();
  homero.escapar();
  homero.lanzar();

  rosquilla.existir();
  rosquilla.mover();
}
//-----------------------------
class simpsons {
  constructor(imgHomero, x1, y1, ancho, alto) {
    this.imgHomero = imgHomero;
    this.x1 = x1;
    this.y1 = y1;
    this.ancho = ancho;
    this.alto = alto;
  }
  mostrar() {
    image(this.imgHomero, this.x1, this.y1, this.ancho, this.alto);
  }
  mover() {
    if (key == 'a') {
      this.x1 = this.x1 - v;
    }
    if (key == 'd') {
      this.x1 = this.x1 + v;
    }
    if (key == 'w') {
      this.y1 = this.y1 - v;
    }
    if (key == 's') {
      this.y1 = this.y1 + v;
    }
  }
  escapar() {
    if (mouseX > (this.x1 - 25) && mouseX < (this.x1 + 25) && mouseY > (this.y1 - 25) && mouseY < (this.y1 + 25)) {
      this.x1 = random(400 - tam / 2);
      this.y1 = random(400 - tam / 2);
    }
  }
  lanzar() {
    // Solo lanza si la rosquilla no esta ya volando.
    if (key == 'o' && !rosquilla.activa) {
      rosquilla.tirar(this.x1, this.y1);
    }
  }
}

class comida {
  constructor(img, x1, y1, tam) {
    this.img = img;
    this.x1 = x1;
    this.y1 = y1;
    this.tam = tam;
    this.activa = false; // indica si la rosquilla esta en movimiento
  }
  existir() {
    image(this.img, this.x1, this.y1, this.tam, this.tam);
  }
  tirar(x, y) {
    // Coloca la rosquilla justo donde esta Homero.
    this.x1 = x;
    this.y1 = y;
    this.activa = true;
  }
  mover() {
    // Si no fue lanzada, se queda quieta.
    if (!this.activa) return;

    // Se mueve hacia la derecha desde Homero.
    this.x1 = this.x1 + v;

    // Cuando sale de la pantalla, queda lista para lanzarse otra vez.
    if (this.x1 > width + this.tam) {
      this.activa = false;
      this.x1 = -10;
      this.y1 = -10;
    }
  }
}
