// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

document.addEventListener("keydown", function (e) {
	if (e.which === 123) {
		require('electron').remote.getCurrentWindow().toggleDevTools();
	} else if (e.which === 116) {
		location.reload();
	}
});

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM3', {baudRate: 9600})


const parser = port.pipe(new Readline({ delimiter: '\n' }))
parser.on('data', console.log)
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

function sendCommand(command) {
	port.write(command, function(err) {
	  if (err) { return console.log('Error on write: ', err.message) }
	})
}

function sendCommands(commandList) {
	for (var i = 0; i < commandList.length; i++) {
		sendCommand(commandList[i])
	}
}

const OBSWebSocket = require('obs-websocket-js')
const obs = new OBSWebSocket()
obs.connect()

obs.on('error', err => {
	console.error('socket error:', err);
});

obs.onStreamStatus(data => {
	console.log(data);
})

obs.onSwitchScenes(data => {
	console.log(`New Active Scene: ${data.sceneName}`);
})

function switchScene(sceneName) {
	console.log('Switching scene to ', sceneName)
	obs.setCurrentScene({'scene-name': sceneName})
}

function registerScene(sceneData) {
	document.querySelector(sceneData['button']).addEventListener(
		'click',
		function() {
			switchScene(sceneData['scene'])
		}
	)
}

function updateButton(button, state, trueStyle, falseStyle) {
	if (state) {
		document.getElementById(button).className = trueStyle
	} else {
		document.getElementById(button).className = falseStyle
	}
}

function toggleMute(source, button, mode = null) {
	if (mode == null) {
		obs.toggleMute({'source': source})
	} else {
		obs.setMute({'source': source, 'mute': (mode == true)})
	}
	response = obs.getMute({'source': source}).then(response => {
		console.log(response)
		updateButton(button, response['muted'], "button pulsingRedBG", "button")
	})
}

function toggleStartRecording(source, button) {
	obs.StartStopRecording()
	response = obs.getMute({'source': source}).then(response => {
		console.log(response)
		if (response['muted']) {
			document.getElementById(button).className = "button pulsingRedBG"
		} else {
			document.getElementById(button).className = "button"
		}
	})
}

scenes = [
	{'scene': 'BRB',         'button': '#sceneBRB'},
	{'scene': 'Main',        'button': '#sceneMain'},
	{'scene': 'Waffle Iron', 'button': '#sceneWaffleIron'}
]

for (var i = scenes.length - 1; i >= 0; i--) {
	registerScene(scenes[i])
}

switchports = [
	{'button': '#vidnes',  'command': ['[MS3O01I01]']},
	{'button': '#vidsnes', 'command': ['[MS2O01I03]']},
	{'button': '#vidpsx',  'command': ['[MS2O01I04]']},
	{'button': '#vidgen',  'command': ['[MS3O01I03]']},
	{'button': '#vidn64',  'command': ['[MS2O01I02]']},
	{'button': '#viddc',   'command': ['[MS2O01I01]']},
	{'button': '#vidtg',   'command': ['[MS3O01I04]']}
]

function registerSwitchPort(portData) {
	document.querySelector(portData['button']).addEventListener (
		'click',
		function() {
			sendCommands(portData['command'])
		}
	)
}

for (var i = switchports.length - 1; i >= 0; i--) {
	registerSwitchPort(switchports[i])
}

nateMuted = false
function muteNate() {
	nateMuted = !nateMuted
	toggleMute('VM B1 - Mics', 'nateMute', nateMuted)
	obs.setSceneItemProperties(
		{
			'scene-name':'Main',
			'item': 'fancy cam',
			'visible': !nateMuted
		}
	)
	obs.setSceneItemProperties(
		{
			'scene-name':'raffle time',
			'item': 'fancy cam',
			'visible': !nateMuted
		}
	)
}

document.querySelector('#nateMute').addEventListener (
	'click',
	function() {
		muteNate()
	}
)

document.querySelector('#switchMute').addEventListener (
	'click',
	function() {
		sendCommand('[MUTE]')
	}
)

document.querySelector('#serialSend').addEventListener (
	'click',
	function() {
		sendCommand('[MUTE]')
	}
)

//// switch init ////

// exclusive switching mode, audio follows video
sendCommands(['[SMD1]','[AFV1]'])

// set all the audio input trim levels
sendCommands(
	[
		'[VIN06-180]', // n64
		'[VIN07-110]', // snes
		'[VIN09-035]', // nes
		'[VIN11-140]', // gen
		'[VIN12-000]', // tg16 (noisy audio path)
		'[VIN05-150]', // dc
		'[VIN08-135]'  // psx
	]
)

