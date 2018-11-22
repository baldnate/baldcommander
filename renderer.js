// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

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

const OBSWebSocket = require('obs-websocket-js')
const obs = new OBSWebSocket()
obs.connect()

function switchScene(sceneName) {
	console.log('Switching scene to ', sceneName)
	obs.setCurrentScene({'scene-name': sceneName})
}

function registerScene(sceneData) {
	document.querySelector(sceneData['button']).addEventListener('click', function(){
		switchScene(sceneData['scene'])
	})	
}

function toggleMute(source, button) {
	obs.toggleMute({'source': source})
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
	{
		'scene': 'BRB',
		'button': '#sceneBRB'
	},
	{
		'scene': 'Main',
		'button': '#sceneMain'
	},
	{
		'scene': 'Waffle Iron',
		'button': '#sceneWaffleIron'
	}
]

for (var i = scenes.length - 1; i >= 0; i--) {
	registerScene(scenes[i])
}

switchports = [
	{
		'button': '#vidnes',
		'command': '[MS3O01I01]'
	},
	{
		'button': '#vidgen',
		'command': '[MS3O01I03]'
	},
	{
		'button': '#vidn64',
		'command': '[MS3O01I04]'
	},
	{
		'button': '#vidtg',
		'command': '[MS3O01I02]'
	},
]

function registerSwitchPort(portData) {
	document.querySelector(portData['button']).addEventListener('click', function(){
		sendCommand(portData['command'])
	})		
}

for (var i = switchports.length - 1; i >= 0; i--) {
	registerSwitchPort(switchports[i])
}


document.querySelector('#micMute').addEventListener('click', function(){toggleMute('VM B1 - Mics', 'micMute')})
