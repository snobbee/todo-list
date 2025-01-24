export const startCountdown = (duration) => {
    let timer = duration, minutes, seconds;
    const countdownInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        console.log(`Countdown: ${minutes}:${seconds}`);

        if (--timer < 0) {
            clearInterval(countdownInterval);
            console.log('Countdown finished!');
        }
    }, 1000);
};