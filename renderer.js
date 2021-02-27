// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron');
const OBSWebSocket = require('obs-websocket-js');
const consoleData = require('./console_data');
const SWP123 = require('./swp123');
const DVS304 = require('./dvs304');
const B200_AVMATRIX = require('./b200_avmatrix');

const swp123 = new SWP123('COM4');
const dvs304 = new DVS304('192.168.1.200');
const b200avmatrix = new B200_AVMATRIX('COM3');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener('keydown', (e) => {
  if (e.which === 123) {
    electron.remote.getCurrentWindow().toggleDevTools();
  } else if (e.which === 116) {
    window.location.reload();
  }
});

const obs = new OBSWebSocket();
obs.connect();

obs.on('error', (err) => {
  console.error('socket error:', err);
});

obs.on('StreamStatus', (data) => {
  console.log(data);
});

obs.on('SwitchScenes', (data) => {
  console.log(`New Active Scene: ${data.sceneName}`);
});

function switchScene(scene, transition) {
  console.log('Switching scene to ', scene);
  obs.send('SetCurrentTransition', { 'transition-name': transition });
  obs.send('SetCurrentScene', { 'scene-name': scene });
}

function registerScene(sceneData) {
  document.querySelector(sceneData.button).addEventListener(
    'click',
    () => {
      switchScene(sceneData.scene, sceneData.transition);
    },
  );
}

function updateButton(button, state, trueStyle, falseStyle) {
  if (state) {
    document.getElementById(button).className = trueStyle;
  } else {
    document.getElementById(button).className = falseStyle;
  }
}

function toggleMute(source, button, mode) {
  obs.send('SetMute', { source, mute: (mode === true) });
  if (button) {
    obs.send('GetMute', { source }).then((response) => {
      updateButton(button, response.muted, 'button pulsingRedBG', 'button');
    });
  }
}

// eslint-disable-next-line no-unused-vars
function toggleStartRecording(source, button) {
  obs.send('StartStopRecording');
  obs.send('GetMute', { source }).then((response) => {
    if (response.muted) {
      document.getElementById(button).className = 'button pulsingRedBG';
    } else {
      document.getElementById(button).className = 'button';
    }
  });
}

const scenes = [
  { scene: 'brb 2', button: '#sceneBRB', transition: 'TBC - short' },
  { scene: 'station id', button: '#sceneOutro', transition: 'TBC - short' },
  { scene: 'traffic', button: '#sceneVortex', transition: 'TBC - short' },
  { scene: 'bald cinema', button: '#sceneCinema', transition: 'TBC - long' },
  { scene: 'intro 2', button: '#sceneIntro', transition: 'Cut' },
  { scene: 'VCR STOP', button: '#sceneVCRSTOP', transition: 'Cut' },
  { scene: 'Game - 4x3', button: '#ratio-4x3', transition: 'TBC - short' },
  { scene: 'Game - 16x9', button: '#ratio-16x9', transition: 'TBC - short' },
  { scene: 'Game - tate', button: '#ratio-tate', transition: 'TBC - short' },
];

for (let i = scenes.length - 1; i >= 0; i--) {
  registerScene(scenes[i]);
}

function registerSwitchPort(portData) {
  document.querySelector(portData.button).addEventListener(
    'click',
    async () => {
      swp123.sendCommands(portData.swp123);
      b200avmatrix.sendCommands(portData.comp);
      await sleep(300);
      dvs304.cmds(portData.dvs304);
    },
  );
}

for (let i = consoleData.length - 1; i >= 0; i--) {
  registerSwitchPort(consoleData[i]);
}

document.querySelector('#vid-blank').addEventListener(
  'click',
  () => {
    swp123.blankAll();
    b200avmatrix.sendCommand('40\r');
  },
);

let nateMuted = false;
function muteNate() {
  nateMuted = !nateMuted;
  toggleMute('VM B1 - Mics', 'nateMute', nateMuted);
  obs.send('SetSceneItemProperties',
    {
      'scene-name': 'nateCam',
      item: 'fancy cam',
      visible: !nateMuted,
    });
  obs.send('SetSceneItemProperties',
    {
      'scene-name': 'nateCam',
      item: 'VCR text',
      visible: !nateMuted,
    });
  obs.send('SetSceneItemProperties',
    {
      'scene-name': 'nateCam',
      item: 'natecam bg color',
      visible: !nateMuted,
    });
}

document.querySelector('#nateMute').addEventListener(
  'click',
  () => {
    muteNate();
  },
);

document.querySelector('#switchMute').addEventListener(
  'click',
  () => {
    swp123.sendCommand('[MUTE]');
  },
);

// // stack init ////

swp123.sendCommands(
  [
    '[SMD0]', // separate switcher mode
    '[AFV1]', // audio follow video enabled
  ],
);

b200avmatrix.sendCommands('01\r');

// set all the audio input trim levels
swp123.sendCommands(
  [
    '[VIN06-180]', // n64
    '[VIN07-110]', // snes
    '[VIN09-035]', // nes
    '[VIN11-140]', // gen
    '[VIN12-000]', // tg16 (noisy audio path)
    SWP123.vin('VGA', 1, '-640'), // Empty
    SWP123.vin('VGA', 2, '000'), // MiSTer
    SWP123.vin('VGA', 3, '-150'), // DC
    SWP123.vin('VGA', 4, '000'), // DVS Output
    '[VIN08-135]', // psx
  ],
);

// dvs304 global state
dvs304.cmds(
  [
    '1X', // executive mode enable
    '52*1#', // enhanced mode enable (AGC on)
    '1M', // auto memory enable
    '77*0#', // refresh lock
    '55*0#', // auto image disable
    '10*0#', // auto switch disable
    '',
  ],
);
