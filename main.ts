import startServer from './src/server';

const port = 3001;
const main = startServer();
main.listen(port, () => {
    console.log('listening on port ', port)
});

process.on('uncaughtException', function (exception) {
    console.error(exception);
});
