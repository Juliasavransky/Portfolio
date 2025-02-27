// Variants for different animations
const animationsList = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { scale: 0.95 },
    visible: { scale: 1 },
  },
  scaleDown: {
    hidden: { scale: 1.05 },
    visible: { scale: 1 },
  },
  rotateLeft: {
    hidden: { rotate: -3 },
    visible: { rotate: 0 },
  },
  rotateRight: {
    hidden: { rotate: 3 },
    visible: { rotate: 0 },
  },
  bounce: {
    hidden: { y: 0 },
    visible: { y: [0, -5, 0] },
  },
  pulse: {
    hidden: { opacity: 1 },
    visible: { opacity: [1, 0.5, 1] },
  },
  shake: {
    hidden: { x: 0 },
    visible: { x: [-2, 2, -2, 2, -2, 2, 0] },
  },
  swing: {
    hidden: { rotate: 0 },
    visible: { rotate: [15, -10, 5, -5, 0] },
  },
  wobble: {
    hidden: { x: 0 },
    visible: { x: [-25, 20, -15, 10, -5, 0], rotate: [-5, 3, -3, 2, -1, 0] },
  },
  flip: {
    hidden: { rotateY: 0 },
    visible: { rotateY: 360 },
  },
  float: {
    hidden: { y: 0 },
    visible: { y: [-10, 0] },
  },
  jello: {
    hidden: { scale: 1 },
    visible: { scale: [1.25, 0.75, 1.15, 0.85, 0.95, 1.05, 1] },
  },
};

export default animationsList;
