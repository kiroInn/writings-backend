var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer(function (request, response) {
    setResponseHeader(response)
    response.end(JSON.stringify(dispatchRouter(request)))
}).listen(8088, '0.0.0.0');
console.log('server running at : 127.0.0.1:80')

function setResponseHeader(response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200, {'Content-Type': 'application/json'})
}

function dispatchRouter(request) {
    if (isWritingsUrl(request.url)) {
        return dispatchWritings(url.parse(request.url, true).query.user)
    } else {
        return dispatchDefault()
    }
}

function isWritingsUrl(value) {
    return value.indexOf('/api/writings') > -1 && url.parse(value, true).query.user
}

function dispatchWritings(user) {
    console.log(`userName:${user}`)
    console.log(queryWritingsByUser(user))
    return queryWritingsByUser(user)

    // return [{
    //     title: '杏花开',
    //     content: '摄影/至简从心 器材/iphone7p 文字/至简从心 徐徐轻风抚枝头 束束杏花笑低头 只只小蜂忙破头 朵朵花隙挤镜头\n',
    //     date: '前天 00:17',
    //     img: 'http://upload-images.jianshu.io/upload_images/1096130-5fcb19c11dd3da82.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160'
    // }, {
    //     title: '《五律‖玉兰吟》',
    //     content: '三原则：图原创，文原创，诗原创。 山下寻桃李，屋前见玉兰。 清高得自在，淡雅蕴陶然。 向雨轻挥袖，迎风慢展颜。 既生君子骨，何惧倒春寒？ 【五律.新韵】\n',
    //     date: '今天 00:17',
    //     img: 'https://upload-images.jianshu.io/upload_images/2929044-036e2529ae57db16.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160'
    // }, {
    //     title: '《前任3》：再爱也不回头，只是因为“作”么？',
    //     content: '文 ▏焱公子 看完《前任3》，第一感觉是男主孟云和女主林佳实在太“作”。 明明心里有对方，偏偏始终绷着不说。一个电话就能解决的事，却宁可秀给全世界，也不向那个特定的人妥协。 ...\n' +
    //     '\n',
    //     date: '前天 00:17',
    //     img: 'http://upload-images.jianshu.io/upload_images/1096130-5fcb19c11dd3da82.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160'
    // }, {
    //     title: '《看不见的客人》：你以为你比我聪明吗？',
    //     content: '我们有句老话：山外有山，人外有人。 你别自以为是，你别得意忘形，要知道，世上总有比你聪明，比你厉害的人。 可偏偏有人不知好歹，犯了错（罪），不想着承担责任，不想着得到原谅。反...\n' +
    //     '\n',
    //     date: '前天 00:17',
    //     img: 'https://upload-images.jianshu.io/upload_images/3459828-bdb7dd3c1a589057.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/160/h/160'
    // }]
}

function queryWritingsByUser(user) {
    console.log('queryWritingsByUser')
    let rootDir = `/var/www/writings-repository/${user}/`
    let writings = []
    fs.readdirSync(rootDir).forEach(fileName => {
        let filePath = `${rootDir}${fileName}`
        if(fs.lstatSync(filePath).isFile()){
            var writing = {}
            var content = fs.readFileSync(filePath, {encoding: 'utf-8'})
            writing.content = content
            writings.push(writing)
        } else {
            console.error(`${filePath} is not file`)
        }
    })
    return writings
}

function dispatchDefault() {
    return {
        value: 'This is my api server'
    }
}
