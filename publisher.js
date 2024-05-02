const Redis = require('ioredis');
const readline = require('readline');

const publisher = new Redis();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt the user for the channel and message to publish
rl.question('Enter the channel name to publish to: ', (channelName) => {
    rl.question('Enter the message to publish: ', (message) => {
        // Publish the message to the specified channel
        publisher.publish(channelName, message);

        // Confirm the message publication
        console.log(`Message "${message}" published to the "${channelName}" channel.`);

        // Close the Redis connection and exit
        publisher.disconnect();
        process.exit(0);
    });
});

// Close the readline interface when the user presses Ctrl+C
rl.on('close', () => {
    console.log('Exiting publisher...');
    publisher.disconnect();
    process.exit(0);
});
