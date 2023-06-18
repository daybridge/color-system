"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxChromaForHue = void 0;
const colorjs_io_1 = __importDefault(require("colorjs.io"));
/**
 * Determines the maximum chroma that can be used for a given lightness and hue
 * that falls within a specified gamut.
 *
 * @param {number} lightness The lightness level.
 * @param {number} hue The hue level.
 * @param {string} gamut The color gamut.
 * @returns The maximum chroma value that can be used.
 */
function maxChromaForHue(lightness, hue, gamut) {
    // Start from the maximum possible chroma (0.37) and decrease by 0.01 in each iteration
    for (let chroma = 0.37; chroma >= 0; chroma -= 0.01) {
        // Construct the color string
        let colorString = `oklch(${lightness}% ${chroma} ${hue})`;
        // Create a Color object
        let color = new colorjs_io_1.default(colorString);
        // Check if the color falls within the specified gamut
        // If it does, this is the maximum chroma we can use for this hue and lightness
        if (color.inGamut(gamut)) {
            return chroma;
        }
    }
    // If no chroma value is found that falls within the gamut, return 0
    return 0;
}
exports.maxChromaForHue = maxChromaForHue;
