console.log('asdfasdfsadfasfddasfasdfafdsadsf');

const OriginalWebsocket = window.WebSocket
let interval = undefined;
const ProxiedWebSocket = function() {
    const ws = new OriginalWebsocket(...arguments)
    const originalSend = ws.send
    const proxiedSend = function() {
    let proxied = this;
    let content = new TextDecoder("utf-8").decode(arguments[0])
    if (content.includes("QUESTION_ANSWERED")) {
        if (interval != undefined) clearInterval(interval)
        interval = setInterval(() => {
            originalSend.apply(proxied, arguments)
        }, 1000)
    }
    return originalSend.apply(this, arguments)
    }
    ws.send = proxiedSend
    return ws;
};
window.WebSocket = ProxiedWebSocket;
