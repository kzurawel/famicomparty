class Canvas {
  constructor (canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.imageData = this.context.getImageData(0, 0, 256, 240);

    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, 256, 240);

    this.buf = new ArrayBuffer(this.imageData.data.length);
    this.buf8 = new Uint8ClampedArray(this.buf);
    this.buf32 = new Uint32Array(this.buf);

    for (let i = 0; i < this.buf32.length; ++i) {
      this.buf32[i] = 0xff000000;
    }
  }

  convertNESBuffer (buffer) {
    var i = 0;
    for (var y = 0; y < 240; ++y) {
      for (var x = 0; x < 256; ++x) {
        i = y * 256 + x;
        this.buf32[i] = 0xff000000 | buffer[i];
      }
    }
  }

  writeBuffer () {
    this.imageData.data.set(this.buf8);
    this.context.putImageData(this.imageData, 0, 0);
  }
}

function fetchAndRunROM (romPath, nes, callback) {
  let romData;
  const reader = new FileReader();
  reader.onload = (event) => {
    romData = event.target.result;
    nes.loadROM(romData);
    callback(nes);
  };

  const req = new XMLHttpRequest();
  req.open('GET', romPath, true);
  req.responseType = 'blob';
  req.onload = (event) => {
    reader.readAsBinaryString(req.response);
  };
  req.send(null);
}

function createFrameHandler (nes) {
  let start = Date.now();
  let now, elapsed;
  const fpsInterval = 1000.0 / 60.0;
  const handler = () => {
    requestAnimationFrame(handler);
    now = Date.now();
    elapsed = now - start;
    if (elapsed > fpsInterval) {
      start = now - (elapsed % fpsInterval);
      nes.frame();
    }
  };
  return handler;
}

function keyboard(callback, event) {
  const player = 1;

  switch(event.keyCode){
    case 38: // UP
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_UP); break;
    case 40: // Down
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_DOWN); break;
    case 37: // Left
      callback(player, jsnes.Controller.BUTTON_LEFT); break;
    case 39: // Right
      callback(player, jsnes.Controller.BUTTON_RIGHT); break;
    case 65: // 'a' - qwerty, dvorak
    case 81: // 'q' - azerty
      callback(player, jsnes.Controller.BUTTON_A); break;
    case 83: // 's' - qwerty, azerty
    case 79: // 'o' - dvorak
      callback(player, jsnes.Controller.BUTTON_B); break;
    case 9: // Tab
      callback(player, jsnes.Controller.BUTTON_SELECT); break;
    case 13: // Return
      callback(player, jsnes.Controller.BUTTON_START); break;
    default: break;
  }
}

function mouse(callback, button, event) {
  const player = 1;

  switch(button) {
    case 'up':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_UP); break;
    case 'down':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_DOWN); break;
    case 'left':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_LEFT); break;
    case 'right':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_RIGHT); break;
    case 'a':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_A); break;
    case 'b':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_B); break;
    case 'select':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_SELECT); break;
    case 'start':
      event.preventDefault();
      callback(player, jsnes.Controller.BUTTON_START); break;
    default: break;
  }
}
