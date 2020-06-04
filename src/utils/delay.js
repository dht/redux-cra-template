/**
 * Generic delay method (isomorphic)
 */
const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

module.exports = delay;
