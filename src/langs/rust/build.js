const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

exports.task = (done) => {
    const buildDir = `${__dirname}/../../../build/wasm`;

    exec('cargo  +nightly build --target wasm32-unknown-unknown --release', { cwd: __dirname })
        .then(({ stdout }) => {
            console.log(stdout);

            fs.copyFileSync(`${__dirname}/target/wasm32-unknown-unknown/release/wasm_wheel.wasm`, `${buildDir}/wheel-part-rust.wasm`);
            done();
        }, ({ stderr, cmd }) => {
            console.log(stderr);
            throw Error(`Error when running: ${cmd}`);
        });
};