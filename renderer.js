// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

class DVS304 {
	constructor(ip) {
		//http://192.168.1.200/nortxe_cmd.html?cmd=9%2A0%23
		this.base_url = `http://${ip}/nortxe_cmd.html?cmd=`;
	}

	dvs_escape(text) {
		var escaped_text = '';
		for (var i = 0; i < text.length; i++) {
			var char = text.charAt(i);
			if (char.match(/[a-z0-9]/i)) {
				escaped_text += char;
			} else {
				escaped_text += `%${char.charCodeAt(0).toString(16)}`;
			}
		}
		return escaped_text;
	}

	build_url(command) {
		return `${this.base_url}${this.dvs_escape(command)}`
	}

	cmd(command) {
		var url = this.build_url(command);
		console.log(url);
		fetch(url)
		.then(function(resp) {
			if (resp.status != 200) {
				console.log(resp);
			}
		});
	}

	cmds(commandList) {
		this.cmd(commandList.join(''))
	}

	// cmds(commandList) {
	// 	for (var i = 0; i < commandList.length; i++) {
	// 		this.cmd(commandList[i])
	// 	}
	// }

}

dvs304 = new DVS304('192.168.1.200');

document.addEventListener("keydown", function (e) {
	if (e.which === 123) {
		require('electron').remote.getCurrentWindow().toggleDevTools();
	} else if (e.which === 116) {
		location.reload();
	}
});

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM4', {baudRate: 9600})


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

function cvbs(port) {
	return `[MS3O01I0${port}]`;
}

function svhs(port) {
	return `[MS2O01I0${port}]`;
}

function vga(port) {
	return `[MS1O01I0${port}]`;
}

function swp123_blank_all() {
	sendCommands([cvbs(0), svhs(0), vga(0)]);
}

// crop order: [top, bottom, left, right]
switchData = [
	// 240p - comp
	{
		'button': '#vidnes',
		'dvs304': [
			'9*0#',
			'122)',
			'12*600#',
			'131(',
			'13*480#',
			'11*800#',
			'42D'
		],
		'swp123': [vga(0), svhs(0), cvbs(1), vga(4), cvbs(1)],
		'crop': [ 0,  4, 39, 28]
	},
	{
		'button': '#vidgen',      'dvs304': ['9*0#'], 'swp123': [vga(4), cvbs(3)], 'crop': [18, 14, 40, 30]
	},
	{
		'button': '#vidtg',
		'dvs304': [
			'9*0#',
			'142)',
			'12*624#',
			'133(',
			'13*480#',
			'11*800#',
			'42D'
		],
		'swp123': [vga(4), cvbs(4)],
		'crop': [ 4,  4, 33, 37]
	},

	// 240p - svid
	{'button': '#vidsnes',     'dvs304': ['9*0#'], 'swp123': [vga(4), svhs(3)], 'crop': [ 0,  4,  36,  32]},
	{'button': '#vidsgb',      'dvs304': ['9*0#'], 'swp123': [vga(4), svhs(3)], 'crop': [94, 98, 143, 138]},
	{'button': '#vidpsx',      'dvs304': ['9*0#'], 'swp123': [vga(4), svhs(4)], 'crop': [ 0,  4,  35,  34]},
	{'button': '#vidn64',      'dvs304': ['9*0#'], 'swp123': [vga(4), svhs(2)], 'crop': [ 2,  4,  12,  12]},

	// 480i - svid
	{'button': '#vidpsx-480i', 'dvs304': ['9*0#'], 'swp123': [vga(4), svhs(4)], 'crop': [27, 29, 36, 32]},
	{'button': '#vidn64-480i', 'dvs304': ['9*0#'], 'swp123': [vga(4), svhs(2)], 'crop': [28, 32, 12, 12]},

	// VGA
	{'button': '#viddc',       'dvs304': ['9*0#'], 'swp123': [vga(3)], 'crop': [ 0,  4,  47,  25]},

	// vcr - comp
	{'button': '#vidsms',      'dvs304': ['9*0#'], 'swp123': [vga(4), cvbs(2)], 'crop': [50, 46, 46, 40]}

]

function registerSwitchPort(portData) {
	document.querySelector(portData['button']).addEventListener (
		'click',
		function() {
			//swp123_blank_all();
			sendCommands(portData['swp123']);
			sleep(500);
			dvs304.cmds(portData['dvs304']);
			obs.send('SetSceneItemProperties',
				{
					'scene-name': '4x3 frame',
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

document.querySelector('#vid-blank').addEventListener(
	'click',
	function() {
		swp123_blank_all();
	}
);

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
	);
}

document.querySelector('#nateMute').addEventListener (
	'click',
	function() {
		muteNate()
	}
);

document.querySelector('#switchMute').addEventListener (
	'click',
	function() {
		sendCommand('[MUTE]')
	}
);

//// stack init ////

sendCommands(
	[
		'[SMD0]', // separate switcher mode
		'[AFV1]'  // audio follow video enabled
	]
);

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
);

// dvs304 global state
dvs304.cmds(
	[
		'1X',    // executive mode enable
		'52*1#', // enhanced mode enable (AGC on)
		'1M',    // auto memory enable
		'77*0#', // refresh lock
		'55*0#', // auto image disable
		'10*0#', // auto switch disable
		''
	]
);