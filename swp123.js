// swp123 support code

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

class SWP123 {
  constructor(serialport) {
    this.port = new SerialPort(serialport, { baudRate: 9600 });
    this.swpparser = this.port.pipe(new Readline({ delimiter: '\n' }));
    this.swpparser.on('data', console.log);
    this.port.on('error', (err) => {
      console.log('swp error: ', err.message);
    });
  }

  sendCommand(command) {
    this.port.write(command, (err) => {
      if (err) { console.log('Error on write: ', err.message); }
    });
  }

  sendCommands(commandList) {
    for (let i = 0; i < commandList.length; i++) {
      this.sendCommand(commandList[i]);
    }
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
