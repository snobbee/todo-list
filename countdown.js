function countdown(seconds) {
    let timer = setInterval(function() {
        if (seconds <= 0) {
            clearInterval(timer);
            console.log('Countdown finished!');
        } else {
            console.log(seconds + ' seconds remaining');
            seconds--;
        }
    }, 1000);
}

countdown(10);