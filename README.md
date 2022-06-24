# audiosprite-breezy

### Usage

```
npm install audiosprite-breezy
```

```js
const { createSprite } = require('audiosprite-breezy')

const files = ['file1.mp3', 'file2.mp3']
const options = { output: 'result', export: ['mp3'] }

createSprite(files, options)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

### Options

| option         | default value             | description |
| -----------    | -----------               |  -------- |
| output         | 'output'                  | Name for the output files  |
| path           | ''                        | Path for files to be used on final JSON |
| export         | ['ogg','m4a','mp3','ac3'] | Limit exported file types. |
| format         | 'default'                 | Format of the output JSON file (default, howler, howler2, createjs) |
| autoplay       | ''                        | Autoplay sprite name  |
| loop           | []                        | Loop sprite name, can be passed multiple times |
| silence        | 0                         | Add special "silence" track with specified duration. |
| gap            | 1                         | Silence gap between sounds (in seconds) |
| minlength      | 0                         | Minimum sound duration (in seconds) |
| bitrate        | 128                       | Bit rate. Works for: ac3, mp3, mp4, m4a, ogg. |
| vbr            | -1                        | VBR [0-9]. Works for: mp3. -1 disables VBR |
| vbr:vorbis     | -1                        | qscale [0-10 is highest quality]. Works for: webm. -1 disables qscale. |
| samplerate     | 44100                     | Sample rate |
| channels       | 1                         | Number of channels (1=mono, 2=stereo) |
| rawparts       | []                        | Include raw slices(for Web Audio API) in specified formats |
| ignorerounding | 0                         | Bypass sound placement on whole second boundaries (0=round,1=bypass) |

