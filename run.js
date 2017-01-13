import Mopidy from 'mopidy'

const mopidy = new Mopidy({
    webSocketUrl: 'ws://192.168.0.24:6680/mopidy/ws/',
    callingConvention: 'by-position-or-by-name',
    console: true
})

const consoleError = console.error.bind(console)

const printCurrentTrack = (track) => {
    if (track) {
        console.log('Currently playing:', track.name, 'by',
            track.artists[0].name, 'from', track.album.name)
    } else {
        console.log('No current track')
    }
}

mopidy.on('state:online', () => {
    mopidy.playback.getCurrentTrack()
        .catch(consoleError)
        .done(printCurrentTrack)
})

mopidy.on('event:trackPlaybackStarted', (e) => {
    console.log(e)
})

mopidy.on('websocket:error', (e) => {
    console.log('Error : ', e)
})

process.on('uncaughtException', (err) => {
    // handle the error safely
    console.log('Process Exit : ', err)
})
