# Daybridge Color System

## Introduction
Daybridge uses the OKLCH color model. This model is a perceptually uniform color space, which means it takes into account how human vision perceives color. Compared to other color systems like RGB or HSL, OKLCH provides more consistent results when generating color variations, as the perceived difference between colors is consistent across the color space. This leads to more uniform and aesthetically pleasing color schemes.

This package helps with generating the `L` (luminance) and `C` (chroma) values for our color palettes. Once these are selected, it will be possible to choose an arbitrary value for the hue `H`. Thanks to the properties of OKLCH, all of the hues for a given shade will appear to be of uniform intensity.

We had the following requirements:

- the `L` and `C` values generated for each shade must be compatible with all possible hues in the specified gamut. We don't want to generate any colors that screens can't properly render.
- therefore, we needed to find the maximum chroma value that would work for all hues at a given luminance level.
- the shades we generate need to be closer to each other at luminance values closer to 0% and 100%. When building UI, we need more shades at the extreme ends to create depth and layering.
- The lumimance values need to be symmetrical, so that we can create similar UIs in light mode and dark mode.

## Installation
Install the package globally to use it as a CLI:

```
npm install -g @daybridge/color-system
```

Or install it as a dependency in your project to use it programmatically:

```
npm install --save @daybridge/color-system
```

## Usage
### Command-Line Interface
You can use the tool from the command line as follows:

```
daybridge-colors --shades 10 --gamut p3 --squashFactor 1.5
```

The options are as follows:

- `--shades`: The number of shades to generate.
- `--gamut`: The color gamut. Options are 'srgb' and 'p3'. Default is 'srgb'.
- `--squashFactor`: The squash factor used to adjust the lightness values. Higher squash factors lead to more "bunching" at each end. Default is 1.


### Programmatic Usage
You can also use the generateShades function in your code:

```
const { generateShades } = require('daybridge-colors');

let shades = generateShades(5, 'srgb', 1);
```

The generateShades function takes three parameters:

- `N`: The number of shades to generate.
- `gamut`: The color gamut. Options are 'srgb' and 'p3'. Default is 'srgb'.
- `squashFactor`: The squash factor used to adjust the lightness values. Higher squash factors lead to more "bunching" at each end. Default is 1.

It returns an array of shades with each shade represented as a pair `[lightness, chroma]`.

## Contributing
Contributions are welcome. Please submit a pull request or create an issue for any bugs or feature requests.

