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
  let lastValidChroma = 0

  // Start from the maximum possible chroma (0.37) and decrease by 0.01 in each iteration
  for (let chroma = 0.37; chroma >= 0; chroma -= 0.01) {
    // Construct the color string
    const colorString = `oklch(${lightness}% ${chroma} ${hue})`

    // Create a Color object
    const color = new Color(colorString)

    // Check if the color falls within the specified gamut
    // If it does, store this as the last valid chroma and break the loop
    if (color.inGamut(gamut)) {
      lastValidChroma = chroma
      break
    }
  }

  // Once we find a matching chroma, go up in increments of 0.001 until we exceed the color space again
  for (let chroma = lastValidChroma; chroma <= 0.37; chroma += 0.001) {
    const colorString = `oklch(${lightness}% ${chroma} ${hue})`
    const color = new Color(colorString)

    if (!color.inGamut(gamut)) {
      break
    }
    lastValidChroma = chroma
  }

  // Return the last chroma value that was in the color space
  return lastValidChroma
}
