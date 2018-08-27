const spawn = require('child_process').spawn
const flow = require('flow-bin')
const colors = require('colors')



function flowServer(){
    
    let flowSpan = spawn('flow', {
        stdio: 'inherit',
        shell: process.platform == 'win32'
    })

    flowSpan.on('exit', function(code, err) {
        console.log(colors.green('flow logs =============='), '\n\n')
    })    
    return flowSpan
}


module.exports = flowServer