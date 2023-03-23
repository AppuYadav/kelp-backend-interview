const csv = require('csv-parser')
const fs = require('fs')
const key_to_obj = async (keyExtract, convertJsonObj, value, initialObj= {}) => {
    const key = keyExtract.shift();
    if(!convertJsonObj[key]){
      if(keyExtract.length === 0){
        convertJsonObj[key] = value;
      } else {
        initialObj[key] = {}
        convertJsonObj[key] = {}
      }
    }
    if(keyExtract.length === 0){
      // console.log(convertJsonObj)
      return convertJsonObj
    }
    return await key_to_obj(keyExtract, convertJsonObj, value, initialObj)
}
  
const csv_to_json = async (path, delete_status=true) => {
    return new Promise((resolve, reject) => {
        const jsonData = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', async row => {
                let convertJsonObj = {}
                for (const [key, value] of Object.entries(row)) {
                    let keyExtract = key.split('.');
                    convertJsonObj = await key_to_obj(keyExtract, convertJsonObj, value)
                }
                console.log(convertJsonObj)
                jsonData.push(convertJsonObj)
            })
            .on("error", err => {
                reject(err);
            })
            .on('end', async () => {
                console.log("CSV file successfully processed");
                if(delete_status){
                    fs.unlinkSync(path);   // remove temp file
                }
                resolve(jsonData);
            });
    });
}

module.exports = {
    csv_to_json
}