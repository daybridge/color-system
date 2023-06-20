#!/usr/bin/env node
// Import necessary packages
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generateShades } from '.'

interface Arguments {
  shades: number
  gamut: string
  squashFactorDark: number
  squashFactorLight: number
  lightnessRange: string
}

// Parse the command line arguments
const argv = yargs(hideBin(process.argv))
  // The number of shades to generate
  .option('shades', {
    alias: 's',
    description: 'Number of shades',
    type: 'number',
    demandOption: true,
  })
  // The color gamut
  .option('gamut', {
    alias: 'g',
    description: 'Color gamut',
    type: 'string',
    default: 'srgb',
  })
  // The squash factor for the darker shades
  .option('squashFactorDark', {
    alias: 'f1',
    description: 'Squash factor for darker shades',
    type: 'number',
    default: 1,
  })
  // The squash factor for the lighter shades
  .option('squashFactorLight', {
    alias: 'f2',
    description: 'Squash factor for lighter shades',
    type: 'number',
    default: 1,
  })
  // The lightness range
  .option('lightnessRange', {
    alias: 'r',
    description: 'Lightness range (format: min,max)',
    type: 'string',
    default: '20,100',
  })
  // Show help information
  .help()
  .alias('help', 'h').argv as Arguments

// Validate and cast the command line arguments
const shadesCount = Number(argv.shades)
const gamut = String(argv.gamut)
const squashFactorDark = Number(argv.squashFactorDark)
const squashFactorLight = Number(argv.squashFactorLight)
const lightnessRange = argv.lightnessRange.split(',').map(Number)

// Generate color shades
const shades = generateShades(
  shadesCount,
  gamut,
  squashFactorDark,
  squashFactorLight,
  lightnessRange,
)

// Iterate over the generated shades
for (const [index, shade] of shades.entries()) {
  // Extract lightness and chroma from the shade
  const lightness = Number(shade[0])
  const chroma = Number(shade[1])

  // Print the shade information and ASCII block
  console.log(
    `Shade ${index + 1}: (Lightness: ${lightness.toFixed(
      2,
    )}, Chroma: ${chroma.toFixed(3)})`,
  )
}
