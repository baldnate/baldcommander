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
const port = new SerialPort('COM5', {baudRate: 9600})


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

obs.on('StreamStatus', data => {
	console.log(data);
})

obs.on('SwitchScenes', data => {
	console.log(`New Active Scene: ${data.sceneName}`);
})

function switchScene(sceneName) {
	console.log('Switching scene to ', sceneName)
	obs.send('SetCurrentScene', {'scene-name': sceneName})
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
		obs.send('ToggleMute', {'source': source})
	} else {
		obs.send('SetMute' , {'source': source, 'mute': (mode == true)})
	}
	response = obs.send('GetMute', {'source': source}).then(response => {
		console.log(response)
		updateButton(button, response['muted'], "button pulsingRedBG", "button")
	})
}

function toggleStartRecording(source, button) {
	obs.send('StartStopRecording')
	response = obs.send('GetMute', {'source': source}).then(response => {
		console.log(response)
		if (response['muted']) {
			document.getElementById(button).className = "button pulsingRedBG"
		} else {
			document.getElementById(button).className = "button"
		}
	})
}

scenes = [
	{'scene': 'brb',   'button': '#sceneBRB'},
	{'scene': 'Main',  'button': '#sceneMain'},
	{'scene': 'outro', 'button': '#sceneWaffleIron'}
]

for (var i = scenes.length - 1; i >= 0; i--) {
	registerScene(scenes[i])
}

// crop order: [top, bottom, left, right]
switchData = [
	// 240p - comp
	{'button': '#vidnes',  'command': ['[MS3O01I01]'], 'crop': [ 0,  4, 39, 28]},
	{'button': '#vidgen',  'command': ['[MS3O01I03]'], 'crop': [18, 14, 40, 30]},
	{'button': '#vidtg',   'command': ['[MS3O01I04]'], 'crop': [ 4,  4, 33, 37]},

	// 240p - svid
	{'button': '#vidsnes', 'command': ['[MS2O01I03]'], 'crop': [ 0,  4,  36,  32]},
	{'button': '#vidsgb',  'command': ['[MS2O01I03]'], 'crop': [94, 98, 143, 138]},
	{'button': '#vidpsx',  'command': ['[MS2O01I04]'], 'crop': [ 0,  4,  35,  34]},
	{'button': '#vidn64',  'command': ['[MS2O01I02]'], 'crop': [ 2,  4,  12,  12]},	

	// 480i - svid
	{'button': '#vidpsx-480i', 'command': ['[MS2O01I04]'], 'crop': [27, 29, 36, 32]},
	{'button': '#vidn64-480i', 'command': ['[MS2O01I02]'], 'crop': [28, 32, 12, 12]},

	// VGA
	{'button': '#viddc',   'command': ['[MS1O01I03]'], 'crop': [ 0,  4,  47,  25]},

	// vcr - comp
	{'button': '#vidsms',  'command': ['[MS3O01I02]'], 'crop': [50, 46, 46, 40]}

]

function registerSwitchPort(portData) {
	document.querySelector(portData['button']).addEventListener (
		'click',
		function() {
			sendCommands(portData['command'])
			obs.send('SetSceneItemProperties',
				{
					'scene-name': 'Main',
					'item': 'amarec_live',
					'crop': {
						'top': portData['crop'][0],
						'bottom': portData['crop'][1],
						'left': portData['crop'][2],
						'right': portData['crop'][3]
					}
				}
			)
/*			response = obs.send('GetSceneItemProperties',
				{
					'scene-name': 'Main',
					'item': 'amarec_live',
				}
			).then(response => {
				console.log(response)
			})
*/		}
	)
}

for (var i = switchData.length - 1; i >= 0; i--) {
	registerSwitchPort(switchData[i])
}

nateMuted = false
function muteNate() {
	nateMuted = !nateMuted
	toggleMute('VM B1 - Mics', 'nateMute', nateMuted)
	obs.send('SetSceneItemProperties',
		{
			'scene-name':'Main',
			'item': 'fancy cam',
			'visible': !nateMuted
		}
	)
	obs.send('SetSceneItemProperties',
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
		'[VIN05-150]', // dc - WRONG NOW, UPDATE TO VGA AUDIO BANK
		'[VIN08-135]'  // psx
	]
)

