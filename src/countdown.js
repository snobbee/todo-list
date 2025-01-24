// Function to create a countdown that skips odd numbers
function countdown(seconds) {
    for (let i = seconds; i >= 0; i--) {
        if (i % 2 !== 0) continue; // Skip odd numbers
        console.log(i);
    }
}
