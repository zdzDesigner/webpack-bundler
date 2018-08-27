
/**
 * [getArgv 获取npm run 中的参数]
 * @return {[type]} [description]
 */
function getAllArgv() {
    var argv
    try {
        argv = JSON.parse(process.env.npm_config_argv).original
    } catch (ex) {
        argv = process.argv
    }
    return argv.slice(2)
}
/**
 * [getPort 获取端口]
 * @return {[]} [undefined || port]
 */
function getArgv() {
    var argv = getAllArgv(), port, mock, flow, 
        tokens = ['-p','mock','flow']
            
    // console.log(argv)
    tokens.forEach((key)=>{
        var index = argv.indexOf(key)
        if(~index){
            '-p' == key && (port = argv[index+1])
            'mock'  == key && (mock = true)
            'flow'  == key && (flow = true)
        }
    })
    
    // console.log({port,mock})
    return {port, mock, flow}
}

let env = getArgv()
let port = env.port
let mock = env.mock || false
let isflow = env.flow || false

module.exports = {
    port,
    mock,
    isflow
}