class DVS304 {
  constructor(ip) {
    // http://192.168.1.200/nortxe_cmd.html?cmd=9%2A0%23
    this.base_url = `http://${ip}/nortxe_cmd.html?cmd=`;
  }

  static dvsEscape(text) {
    let escapedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char.match(/[a-z0-9]/i)) {
        escapedText += char;
      } else {
        escapedText += `%${char.charCodeAt(0).toString(16)}`;
      }
    }
    return escapedText;
  }

  buildURL(command) {
    return `${this.base_url}${DVS304.dvsEscape(command)}`;
  }

  cmd(command) {
    const url = this.buildURL(command);
    console.log(url);
    fetch(url)
      .then((resp) => {
        if (resp.status !== 200) {
          console.log(resp);
        }
      });
  }

  cmds(commandList) {
    this.cmd(commandList.join(''));
  }
}

module.exports = DVS304;
