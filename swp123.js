// swp123 support code

const SerialPort = require('serialport');

const vinmap = {
  VGA: {
    1: '01',
    2: '02',
    3: '03',
    4: '04',
  },
  SVHS: {
    1: '05',
    2: '06',
    3: '07',
    4: '08',
  },
  COMP: {
    1: '09',
    2: '10',
    3: '11',
    4: '12',
  },
};
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

  static vin(bank, port, level) {
    return `[VIN${vinmap[bank][port]}${level}]`;
  }

  static vol(level) {
    return `[VOL01${level}]`;
  }

  blankAll() {
    this.sendCommands([SWP123.cvbs(0), SWP123.svhs(0), SWP123.vga(0)]);
  }
}

module.exports = SWP123;
