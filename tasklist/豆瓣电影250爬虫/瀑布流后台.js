// 更多记录进入消息管理器查看
// 10:41:50 Felix已成为你的好友,开始聊天吧
// Felix  10:41:56
var request = require("request");

var url = "http://192.168.8.126:8082/message/user";

var options = {
    url: url,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer 04b206bf-1bdc-497a-9508-c91e0967a0fb',
        'opt': '{"orgId":"7f626d32-fba9-c55f-17bc-70211d862518","tenantId":"05690a6f-1b53-2e3b-5b2d-b815c65aacac","id":"05690a6f-1b53-2e3b-5b2d-b815c65aacac"}'
    },
    body: JSON.stringify({
        "pageIndex": 1,
        "pageSize": 100
    })
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}
request(options, callback);
