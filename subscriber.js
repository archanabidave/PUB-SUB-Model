const Redis = require('ioredis');
const readline = require('readline');

const subscriber = new Redis();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt the user for the channel to subscribe to
rl.question('Enter the channel name to subscribe to: ', (channelName) => {
    // Subscribe to the specified channel
    subscriber.subscribe(channelName);

    // Handle incoming messages
    subscriber.on('message', (channel, message) => {
        console.log(`Received message from ${channel}: ${message}`);
    });

    // Confirm the subscription
    console.log(`You have subscribed to the "${channelName}" channel.`);
});

// Close the readline interface when the user presses Ctrl+C
rl.on('close', () => {
    console.log('Exiting subscriber...');
    subscriber.disconnect();
    process.exit(0);
});
