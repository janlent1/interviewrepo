const testConnectionButton = document.getElementById("testconnection");
const url = 'localhost:8088';
const dirJson = {
    "helloworldapiendpoint": {
        "node_modules": {
            "test.min.js": true
        },
        "src":{
            "index.js": true
        }
    }
}
function nodeTraverser (node) = {
    const subFilesOrDirs = Object.keys(node);
    subFilesOrDirs.forEach()
    if (typeof node === 'object') {
        nodeTraverser()
    }
}
dirJson.forEach(node=>{

})
testConnectionButton.onclick = function(){
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            const newContent = document.createTextNode("Hi there and greetings!");
    }
    xmlHttp.open("GET", `${url}/getAllBooks`, true); // true for asynchronous
    xmlHttp.send(null);
}
function(){
    let fnCache = null
    return function(fnToCache){
        fnToCache = fnCache;
        return def;
    }
}

directory as input display
