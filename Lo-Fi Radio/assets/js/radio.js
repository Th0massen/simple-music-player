
let audio = null;
let progress = document.querySelector('.audio_duration');
let notification = document.querySelector('#notification');
let radioStatus = false;
let render = null;
let volume = 1.0;
let volumeDisplay = 100;
let hoursPlayed = 0;
let minutesPlayed = 0;
let secondsPlayed = 0;
let playedTotal = null;

// Add songs here to play from the dedicated folder
const music = [
    'Tor - Vaults (Frameworks).mp3',
    'Chris - Equinox.mp3',
    'Bop Alloy - Still Think Different.mp3',
    'Bonobo - Antenna.mp3',
]

const toggleRadio = () => {
    radioStatus = !radioStatus;
    if( radioStatus === true ){
        playMusic();
        document.querySelector('#radiobutton').innerHTML = '❚❚';
    }
    else{
        stopMusic();
        document.querySelector('#radiobutton').innerHTML = '&#9654;';
    }
}

const playMusic = () => {
    hoursPlayed = 0;
    minutesPlayed = 0;
    secondsPlayed = 0;
    let getAudio = music[ Math.floor( Math.random() * music.length) ];
    document.querySelector('#now_playing').innerHTML = 'Now Playing: ' + getAudio;
    audio = new Audio( 'assets/songs/' + getAudio );
    audio.volume = volume;
    audio.setAttribute('preload', 'metadata');
    audio.onloadedmetadata = () => {
        progress.setAttribute('max', Number(audio.duration + 1));
        render = setInterval( () => {
            updateTimer();
            if( audio.currentTime === audio.duration ){
                clearInterval(render);
                playMusic();
            }
        },1000)
        audio.play();
    }
}

const stopMusic = () => {
    audio.pause();
    document.querySelector('#now_playing').innerHTML = '';
    document.querySelector('#duration').innerHTML = '00:00:00';
    clearInterval(render);
}

const toggleVolumeUp = () => {
    if( volume < 1.0 ){
        volume = volume + 0.1;
        audio.volume = volume;
        volumeDisplay += 10;
    }
    notification.style.opacity = 1
    notification.innerHTML = 'Volume: ' + volumeDisplay + '%';
    setTimeout( () => {
        notification.style.opacity = 0;
    }, 2500 )
}

const toggleVolumeDown = () => {
    if( volume > 0 ){
        volume = volume - 0.1;
        audio.volume = volume;
        volumeDisplay -= 10;
    }
    notification.style.opacity = 1;
    notification.innerHTML = 'Volume: ' + volumeDisplay + '%';
    setTimeout( () => {
        notification.style.opacity = 0;
    }, 2500 )
}

const updateTimer = () => {
    secondsPlayed++;
    progress.setAttribute('value', audio.currentTime);
    if( secondsPlayed < 10 ){
        playedTotal = '0' + hoursPlayed + ':0' + minutesPlayed + ':0' + secondsPlayed;
    } else if( secondsPlayed >= 10 ){
        if( secondsPlayed >= 60 ){
            minutesPlayed++;
            secondsPlayed = 0;
        } else{
            playedTotal = '0' + hoursPlayed + ':0' + minutesPlayed + ':' + secondsPlayed;
        }
    }
    document.querySelector('#duration').innerHTML = playedTotal;
}


