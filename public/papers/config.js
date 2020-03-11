// name: {
//   target_foramt: size to save, e.g., a3, a4
//   width: mm,
//   height: mm,
//   line_count: line numbers,
//   start: {
//     x: start.x / full width,
//     y: start.y / full height
//   },
//   end: {
//     x: end.x / full width,
//     y: end.y / full height
//   },
//   default_font_size: font size when font scale is 1.0
// }

export default {
  'A4-source-line-vertical': {
    target_foramt: 'a4',
    width: 210,
    height: 297,
    line_count: 22,
    start: {
      x: 0.056,
      y: 0.13,
    },
    end: {
      x: 0.944,
      y: 0.908,
    },
    default_font_size: 75,
  },
  'A4-source-noline-vertical': {
    target_foramt: 'a4',
    width: 210,
    height: 297,
    // line_count: 0,
    start: {
      x: 0.056,
      y: 0.13,
    },
    end: {
      x: 0.944,
      y: 0.908,
    },
    default_font_size: 75,
  },
  'A5-photo-line-vertical': {
    target_foramt: 'a5',
    width: 148,
    height: 210,
    line_count: 20,
    start: {
      x: 0.075,
      y: 0.15,
    },
    end: {
      x: 0.902,
      y: 0.928,
    },
    default_font_size: 60,
  },
};
