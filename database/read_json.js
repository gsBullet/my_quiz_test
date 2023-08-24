const fs = require('fs');
function read_json(filePath) {
    
    const json_data = fs.readFileSync(filePath);
    const todo_list = JSON.parse(json_data);
    return todo_list;
    
}
module.exports = read_json;