function countdown(seconds) {
    let count = seconds;
    while (count >= 0) {
        if (count % 2 === 0) {
            console.log(count);
        }
        count--;
    }
}

countdown(10);