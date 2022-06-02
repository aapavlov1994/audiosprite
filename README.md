# audiosprite-breezy

### Usage

```
npm install audiosprite-breezy
```

```js
var audiosprite = require('audiosprite-breezy')

var files = ['file1.mp3', 'file2.mp3']
var opts = { output: 'result' }

audiosprite(files, opts)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
```

### Options

```
> audiosprite --help
info: Usage: audiosprite [options] file1.mp3 file2.mp3 *.wav
info: Options:
  --output, -o          Name for the output files.                                               [default: "output"]
  --path, -u            Path for files to be used on final JSON.                                 [default: ""]
  --export, -e          Limit exported file types. Comma separated extension list.               [default: "ogg,m4a,mp3,ac3"]
  --format, -f          Format of the output JSON file (jukebox, howler, howler2, createjs).     [default: "jukebox"]
  --log, -l             Log level (debug, info, notice, warning, error).                         [default: "info"]
  --autoplay, -a        Autoplay sprite name.                                                    [default: null]
  --loop                Loop sprite name, can be passed multiple times.                          [default: null]
  --silence, -s         Add special "silence" track with specified duration.                     [default: 0]
  --gap, -g             Silence gap between sounds (in seconds).                                 [default: 1]
  --minlength, -m       Minimum sound duration (in seconds).                                     [default: 0]
  --bitrate, -b         Bit rate. Works for: ac3, mp3, mp4, m4a, ogg.                            [default: 128]
  --vbr, -v             VBR [0-9]. Works for: mp3. -1 disables VBR.                              [default: -1]
  --samplerate, -r      Sample rate.                                                             [default: 44100]
  --channels, -c        Number of channels (1=mono, 2=stereo).                                   [default: 1]
  --rawparts, -p        Include raw slices(for Web Audio API) in specified formats.              [default: ""]
  --ignorerounding, -i  Bypass sound placement on whole second boundaries (0=round,1=bypass).    [default: 0]
  --help, -h            Show this help message.
}
```