// swp123 support code

const SerialPort = require('serialport');

class SWP123 {
  constructor(serialport) {
    this.port = new SerialPort(serialport, { baudRate: 9600 });
    this.port.on('error', (err) => {
      if (err) {
        console.log('swp123 error: ', err);
      }
    });
    this.port.on('close', (err) => {
      console.log('swp123 port closed');
      if (err) {
        console.log(err);
      }
      this.port.open();
    });
  }

  sendCommands(commandList) {
    for (let i = 0; i < commandList.length; i++) {
      this.port.write(commandList[i]);
    }
  }

  sendCommand(command) {
    this.sendCommands([command]);
  }

  static cvbs(port) {
    return `[MS3O01I0${port}]`;
  }

  static svhs(port) {
    return `[MS2O01I0${port}]`;
  }

  static vga(port) {
    return `[MS1O01I0${port}]`;
  }

  blankAll() {
    this.sendCommands([SWP123.cvbs(0), SWP123.svhs(0), SWP123.vga(0)]);
  }
}

module.exports = SWP123;
