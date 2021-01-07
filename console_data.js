// eslint-disable no-unused-vars

const swp = require('./swp123');

module.exports = [
  // 240p - comp
  {
    button: '#vidnes',
    dvs304: [
      '4&', // input select
      '9*0#',
      '122)',
      '12*600#',
      '131(',
      '13*480#',
      '11*800#',
      '42D',
    ],
    swp123: [swp.vga(0), swp.svhs(0), swp.cvbs(1), swp.vga(4), swp.cvbs(1)],
    comp: ['40\r'],
    ratio: '4x3',
  },
  {
    button: '#vidgen',
    dvs304: [
      '4&', // input select
      '9*0#',
      '118)',
      '12*604#',
      '115(',
      '13*451#',
      '11*800#',
      '42D',
    ],
    swp123: [swp.vga(4), swp.svhs(0), swp.cvbs(3), swp.vga(4), swp.cvbs(3)],
    comp: ['40\r'],
    ratio: '4x3',
  },
  {
    button: '#vidtg',
    dvs304: [
      '4&', // input select
      '9*0#',
      '142)',
      '12*624#',
      '133(',
      '13*480#',
      '11*800#',
      '42D',
    ],
    swp123: [swp.vga(0), swp.svhs(0), swp.cvbs(4), swp.vga(4), swp.cvbs(4)],
    comp: ['40\r'],
    ratio: '4x3',
  },

  // 240p - svid
  {
    button: '#vidsnes',
    dvs304: [
      '4&', // input select
      '9*0#', // aspect ratio
      '123)', // H start
      '116(', // V start
      '11*807#', // total pixels
      '12*605#', // active pixels
      '13*447#', // active lines
      '127D', // detail filter
      '26U', // pixel phase
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(3), swp.vga(4), swp.svhs(3)],
    comp: ['40\r'],
    ratio: '4x3',
  },
  {
    button: '#vidsgb',
    dvs304: [
      '4&', // input select
      '9*0#', // aspect ratio
      '123)', // H start
      '116(', // V start
      '11*807#', // total pixels
      '12*605#', // active pixels
      '13*447#', // active lines
      '127D', // detail filter
      '26U', // pixel phase
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(3), swp.vga(4), swp.svhs(3)],
    comp: ['40\r'],
    ratio: '4x3',
  },
  {
    button: '#vidpsx',
    dvs304: [
      '4&', // input select
      '9*0#', // aspect ratio
      '124)', // H start
      '131(', // V start
      '11*798#', // total pixels
      '12*600#', // active pixels
      '13*478#', // active lines
      '127D', // detail filter
      '0U', // pixel phase
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(4), swp.vga(4), swp.svhs(4)],
    comp: ['40\r'],
    ratio: '4x3',
  },
  {
    button: '#vidn64',
    dvs304: [
      '4&', // input select
      '9*0#', // aspect ratio
      '149)', // H start
      '118(', // V start
      '11*807#', // total pixels
      '12*654#', // active pixels
      '13*453#', // active lines
      '127D', // detail filter
      '29U', // pixel phase
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(2), swp.vga(4), swp.svhs(2)],
    comp: ['40\r'],
    ratio: '4x3',
  },

  // 480i - svid - through DVS direct
  {
    button: '#vidpsx-480i',
    dvs304: [
      '3&', // input select
      '9*0#', // aspect ratio
      '57)', // H start
      '80(', // V start
      '12*647#', // active pixels
      '13*463#', // active lines
      '127D', // detail filter
    ],
    comp: ['40\r'],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(4), swp.vga(4), swp.svhs(4)],
    ratio: '4x3',
  },
  {
    button: '#vidn64-480i',
    dvs304: [
      '3&', // input select
      '9*0#', // aspect ratio
      '80)', // H start
      '81(', // V start
      '12*694#', // active pixels
      '13*465#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.cvbs(0), swp.vga(4), swp.svhs(2)],
    comp: ['40\r'],
    ratio: '4x3',
  },

  // swp.VGA
  {
    button: '#viddc',
    dvs304: ['9*0#'],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(3)],
    comp: ['40\r'],
    ratio: '4x3',
  },

  // mister
  {
    button: '#vidmister',
    dvs304: [
      '4&', // input select
      '9*1#', // aspect ratio
      '175)', // H start
      '129(', // V start
      '11*2200#', // total pixels
      '12*1921#', // active pixels
      '13*1076#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(2)],
    comp: ['40\r'],
    ratio: '4x3',
  },

  // vcr - comp
  {
    button: '#vidvcr',
    dvs304: [
      '4&', // input select
      '9*0#',
      '142)',
      '12*624#',
      '133(',
      '13*480#',
      '11*800#',
      '42D',
    ],
    swp123: [swp.vga(0), swp.svhs(0), swp.cvbs(2), swp.vga(4), swp.cvbs(2)],
    comp: ['40\r'],
    ratio: '4x3',
  },

  // XBOX
  {
    button: '#vidxbox-480i',
    dvs304: [
      '2&', // input select
      '9*0#', // aspect ratio
      '111)', // H start
      '117(', // V start
      '11*863#', // total pixels
      '12*691#', // active pixels
      '13*457#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['46\r'],
    ratio: '4x3',
  },
  {
    button: '#vidxbox-480p-4-3',
    dvs304: [
      '2&', // input select
      '9*0#', // aspect ratio
      '128)', // H start
      '128(', // V start
      '11*863#', // total pixels
      '12*725#', // active pixels
      '13*480#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['46\r'],
    ratio: '4x3',
  },
  {
    button: '#vidxbox-480p-16-9',
    dvs304: [
      '2&', // input select
      '9*1#', // aspect ratio
      '128)', // H start
      '128(', // V start
      '11*863#', // total pixels
      '12*725#', // active pixels
      '13*480#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['46\r'],
    ratio: '16x9',
  },
  {
    button: '#vidxbox-720p',
    dvs304: [
      '2&', // input select
      '9*1#', // aspect ratio
      '130)', // H start
      '128(', // V start
      '11*1650#', // total pixels
      '12*1279#', // active pixels
      '13*720#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['46\r'],
    ratio: '16x9',
  },

  {
    button: '#viddvd',
    dvs304: [
      '2&', // input select
      '9*0#', // aspect ratio
      '128)', // H start
      '128(', // V start
      '11*863#', // total pixels
      '12*725#', // active pixels
      '13*480#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['44\r'],
    ratio: '4x3',
  },

  // PS3
  {
    button: '#vidps3',
    dvs304: [
      '2&', // input select
      '9*1#', // aspect ratio
      '111)', // H start
      '117(', // V start
      '11*863#', // total pixels
      '12*691#', // active pixels
      '13*457#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['41\r'],
    ratio: '16x9',
  },

  // 360
  {
    button: '#vid360',
    dvs304: [
      '2&', // input select
      '9*1#', // aspect ratio
      '111)', // H start
      '117(', // V start
      '11*863#', // total pixels
      '12*691#', // active pixels
      '13*457#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['43\r'],
    ratio: '16x9',
  },

  // Wii
  {
    button: '#vidwii-16x9-full',
    dvs304: [
      '2&', // input select
      '9*1#', // aspect ratio
      '111)', // H start
      '117(', // V start
      '11*863#', // total pixels
      '12*691#', // active pixels
      '13*457#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['42\r'],
    ratio: '16x9',
  },
  {
    button: '#vidwii-16x9-narrow',
    dvs304: [
      '2&', // input select
      '9*1#', // aspect ratio
      '88)', // H start
      '129(', // V start
      '11*863#', // total pixels
      '12*645#', // active pixels
      '13*481#', // active lines
      '127D', // detail filter
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(4)],
    comp: ['42\r'],
    ratio: '16x9',
  },
];
