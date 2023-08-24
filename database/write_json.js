const fs = require('fs');
function write_json(filePath,todo_data) {
    const data = JSON.stringify(todo_data)
    fs.writeFileSync(filePath,data);
}
module.exports = write_json;