import Color from 'colorjs.io'

/**
 * Determines the maximum chroma that can be used for a given lightness and hue
 * that falls within a specified gamut.
 *
 * @param {number} lightness The lightness level.
 * @param {number} hue The hue level.
 * @param {string} gamut The color gamut.
 * @returns The maximum chroma value that can be used.
 */
export function maxChromaForHue(lightness: number, hue: number, gamut: string) {
  // Start from the maximum possible chroma (0.37) and decrease by 0.01 in each iteration
  for (let chroma = 0.37; chroma >= 0; chroma -= 0.01) {
    // Construct the color string
    const colorString = `oklch(${lightness}% ${chroma} ${hue})`

    // Create a Color object
    const color = new Color(colorString)

    // Check if the color falls within the specified gamut
    // If it does, this is the maximum chroma we can use for this hue and lightness
    if (color.inGamut(gamut)) {
      return chroma
    }
  }

  // If no chroma value is found that falls within the gamut, return 0
  return 0
}
