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
    sourceName: 'amarec_live',
    crop: [0, 4, 39, 28], // [t,b,l,r]
  },
  {
    button: '#vidgen',
    dvs304: [
      '4&', // input select
      '9*0#',
      '117)',
      '12*610#',
      '115(',
      '13*451#',
      '11*800#',
      '42D',
    ],
    swp123: [swp.vga(4), swp.svhs(0), swp.cvbs(3), swp.vga(4), swp.cvbs(3)],
    comp: ['40\r'],
    ratio: '4x3',
    sourceName: 'amarec_live',
    crop: [18, 14, 41, 27], // [t,b,l,r]
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
    sourceName: 'amarec_live',
    crop: [4, 4, 33, 37], // [t,b,l,r]
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
    sourceName: 'amarec_live',
    crop: [16, 16, 36, 32], // [t,b,l,r]
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
    sourceName: 'amarec_live',
    crop: [94, 98, 143, 138], // [t,b,l,r]
  },
  {
    button: '#vidpsx',
    dvs304: [
      '4&', // input select
      '9*0#', // aspect ratio
      '124)', // H start
      '102(', // V start
      '11*807#', // total pixels
      '12*600#', // active pixels
      '13*450#', // active lines
      '127D', // detail filter
      '0U', // pixel phase
    ],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(4), swp.vga(4), swp.svhs(4)],
    comp: ['40\r'],
    ratio: '4x3',
    sourceName: 'amarec_live',
    crop: [0, 4, 35, 34], // [t,b,l,r]
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
    sourceName: 'amarec_live',
    crop: [2, 4, 12, 12], // [t,b,l,r]
  },

  // 480i - svid - through DVS direct
  {
    button: '#vidpsx-480i',
    dvs304: [
      '3&', // input select
      '9*0#', // aspect ratio
      '57)', // H start
      '72(', // V start
      '12*647#', // active pixels
      '13*447#', // active lines
      '127D', // detail filter
    ],
    comp: ['40\r'],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(4), swp.vga(4), swp.svhs(4)],
    ratio: '4x3',
    sourceName: 'hd_cap',
    crop: [0, 0, 0, 0], // [t,b,l,r]
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
    sourceName: 'hd_cap',
    crop: [0, 0, 239, 243], // [t,b,l,r]
  },

  // swp.VGA
  {
    button: '#viddc',
    dvs304: ['9*0#'],
    swp123: [swp.vga(0), swp.cvbs(0), swp.svhs(0), swp.vga(3)],
    comp: ['40\r'],
    ratio: '4x3',
    sourceName: 'hd_cap',
    crop: [0, 0, 0, 0], // [t,b,l,r]
  },

  // vcr - comp
  {
    button: '#vidsms',
    dvs304: ['9*0#'],
    swp123: [swp.vga(4), swp.cvbs(2)],
    comp: ['40\r'],
    ratio: '4x3',
    sourceName: 'amarec_live',
    crop: [50, 46, 46, 40], // [t,b,l,r]
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
    sourceName: 'hd_cap',
    crop: [0, 0, 0, 0], // [t,b,l,r]
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
    sourceName: 'hd_cap',
    crop: [0, 0, 0, 0], // [t,b,l,r]
  },
];
