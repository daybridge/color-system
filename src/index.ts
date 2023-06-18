// Import necessary packages
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generateShades } from './generateShades'

interface Arguments {
  shades: number
  gamut: string
  squashFactor: number
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
  // The squash factor for the lightness scale
  .option('squashFactor', {
    alias: 'f',
    description: 'Squash factor',
    type: 'number',
    default: 1,
  })
  // Show help information
  .help()
  .alias('help', 'h').argv as Arguments

// Validate and cast the command line arguments
const shadesCount = Number(argv.shades)
const gamut = String(argv.gamut)
const squashFactor = Number(argv.squashFactor)

// Generate color shades
const shades = generateShades(shadesCount, gamut, squashFactor)

// Iterate over the generated shades
for (const [index, shade] of shades.entries()) {
  // Extract lightness and chroma from the shade
  const lightness = Number(shade[0])
  const chroma = Number(shade[1])

  // Print the shade information and ASCII block
  console.log(
    `Shade ${index + 1}: (Lightness: ${lightness.toFixed(
      2,
    )}, Chroma: ${chroma.toFixed(2)})`,
  )
}
