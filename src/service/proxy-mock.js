const shell = require('shelljs')
const proxySpawn = require('child_process').spawn

module.exports = proxyMock

/**
 * [proxyMock 执行proxy-mock]
 * @param  {[type]} domain [代理域名配置]
 * @param  {[type]} recookie [需要转接的cookie]
 * @param  {[type]} publicPath [打印路径]
 * @return {[type]}        [proxy-mock child process]
 */
function proxyMock(port, domain, recookie, publicPath){
    let proxySpawnArg = ['-p', port]
    publicPath = publicPath || ''
    if(domain){
        proxySpawnArg = proxySpawnArg.concat(['-d',serializeDomain(domain).replace(/\*/g,'@')])
    }
    if (recookie) {
        proxySpawnArg = proxySpawnArg.concat(['-c', serializeDomain(recookie)])
    }

    shell.cd('dist')
    console.log('服务地址：', 'http://localhost:' + port + publicPath)
    let proxyProcess = proxySpawn('proxy-mock', proxySpawnArg, {
        stdio: 'inherit',
        shell: process.platform == 'win32'
    })
    

    return proxyProcess
}

/**
 * [serializeDomain 序列化代理domain]
 * @param  {[type Object]} domains [{'/console':'http://dev.dui.ai'}]
 * @return {[type String]}         ['/console=http://dev.dui.ai']
 */
function serializeDomain(domains){
    return Object.keys(domains).map(function(key){
        var merge = `${key}=${domains[key]}`
        return merge
    }).join('&')
}