const SerialPort = require('serialport');

class B200_AVMATRIX {
  constructor(serialport) {
    this.port = new SerialPort(serialport, { baudRate: 9600 });
    this.port.on('error', (err) => {
      console.log('b200 error: ', err.message);
    });
    this.port.on('close', (err) => {
      console.log('b200 port closed');
      if (err) {
        console.log(err);
      }
      this.port.open();
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
