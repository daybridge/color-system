"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary packages
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const generateShades_1 = require("./generateShades");
// Parse the command line arguments
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    // The number of shades to generate
    .option('shades', {
    alias: 's',
    description: 'Number of shades',
    type: 'number',
    demandOption: true
})
    // The color gamut
    .option('gamut', {
    alias: 'g',
    description: 'Color gamut',
    type: 'string',
    default: 'srgb'
})
    // The squash factor for the lightness scale
    .option('squashFactor', {
    alias: 'f',
    description: 'Squash factor',
    type: 'number',
    default: 1
})
    // Show help information
    .help()
    .alias('help', 'h')
    .argv;
// Validate and cast the command line arguments
const shadesCount = Number(argv.shades);
const gamut = String(argv.gamut);
const squashFactor = Number(argv.squashFactor);
// Generate color shades
const shades = (0, generateShades_1.generateShades)(shadesCount, gamut, squashFactor);
// Iterate over the generated shades
for (const [index, shade] of shades.entries()) {
    // Extract lightness and chroma from the shade
    let lightness = Number(shade[0]);
    let chroma = Number(shade[1]);
    // Print the shade information and ASCII block
    console.log(`Shade ${index + 1}: (Lightness: ${lightness.toFixed(2)}, Chroma: ${chroma.toFixed(2)})`);
}
