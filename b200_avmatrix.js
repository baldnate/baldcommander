const SerialPort = require('serialport');
const Regex = require('@serialport/parser-regex');

class B200_AVMATRIX {
  constructor(serialport) {
    this.port = new SerialPort(serialport, { baudRate: 9600 });
    this.compparser = this.port.pipe(new Regex({ regex: /o.i./ }));
    this.compparser.on('data', console.log);
    this.port.on('error', (err) => {
      console.log('comp error: ', err.message);
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
}

module.exports = B200_AVMATRIX;
