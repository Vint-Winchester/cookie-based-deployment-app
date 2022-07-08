'use strict';
import cookie from 'cookie';
import http from 'http';

const PORT = process.env.PORT || 5000;
let apiFlow = process.env.npm_package_version + '-l' + (process.env.NODE_API_SUFFIX || 0);
console.log('start', apiFlow);

const launch = () => {
    return http.createServer((req, res) => {
        console.log('inside', apiFlow);
        if (req.url === '/') {

            res.setHeader('Set-Cookie', cookie.serialize('api', apiFlow));

            res.writeHead(200);
            res.end(`Main page release: ${apiFlow}`);
        }
    });
}

launch().listen(PORT, 'localhost', () => {
    console.log(`REST API server instance started at: ${PORT}`);
});

process.on('SIGHUP', () => {
    console.log('suffix:', process.env.NODE_API_SUFFIX);
    apiFlow = process.env.npm_package_version + '-l' + +!+process.env.NODE_API_SUFFIX;
    console.log('switch', apiFlow);
    const sec2End = 30000;
    console.log(`Exiting in ${sec2End}`);
    setTimeout(() => {
        process.exit(0);
    }, sec2End);
});
