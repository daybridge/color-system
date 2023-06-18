"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShades = void 0;
const maxChromaForHue_1 = require("./maxChromaForHue");
/**
 * Generates color shades based on the input parameters.
 *
 * @param {number} N The number of shades to generate.
 * @param {string} [gamut="srgb"] The color gamut. Default is "srgb".
 * @param {number} [squashFactor=1] The factor used to adjust the lightness values. Default is 1.
 * @returns An array of shades with each shade represented as a pair [lightness, chroma].
 */
function generateShades(N, gamut = "srgb", squashFactor = 1) {
    // Create an array to hold the generated shades
    let shades = [];
    // Loop over the number of shades to be generated
    for (let i = 0; i < N; i++) {
        // Calculate the lightness value for this shade. The calculation is based on the current loop index,
        // the total number of shades, and the squash factor. The result is then converted to a percentage.
        let lightness = Math.pow((1 - Math.cos((Math.PI * i) / (N - 1))) / 2, squashFactor) * 100;
        // Create an array to hold the maximum chroma value for each hue
        let maxChromas = [];
        // Loop over all possible hues (from 0 to 360)
        for (let hue = 0; hue <= 360; hue++) {
            // Calculate the maximum chroma value for this hue and lightness, and add it to the array
            maxChromas.push((0, maxChromaForHue_1.maxChromaForHue)(lightness, hue, gamut));
        }
        // Find the minimum value from the array of maximum chroma values
        // This ensures that the chosen chroma value will work for all possible hues
        let chroma = Math.min(...maxChromas);
        // Format the lightness and chroma values to fixed decimals and add the shade to the array
        let lightnessFormatted = lightness.toFixed(2);
        let chromaFormatted = chroma.toFixed(3);
        shades.push([lightnessFormatted, chromaFormatted]);
    }
    // Return the array of generated shades
    return shades;
}
exports.generateShades = generateShades;
