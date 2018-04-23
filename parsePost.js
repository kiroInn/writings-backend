module.exports = {
    getTitle: function (data) {
        let metas = data.split('---')[0]
        let title = metas.split("\n")[0].split(': ')[1]
        return title
    },
    getDate: function (data) {
        let metas = data.split('---')[0]
        let date = metas.split("\n")[1].split(': ')[1]
        return date
    },
    getImg: function (data) {
        let metas = data.split('---')[0]
        let img = metas.split("\n")[2].split(': ')[1]
        return img
    },
    getContent: function (data) {
        return data.split('---')[1]
    }
}