const db = require('../Database/dbConnection');

class Dictionary {



    async getNameByIdType(id) {
        
       // const item = await db.query('Select ')
        // return item ? item.name : null;
    }

    async getIdByNameType(name) {
       //  await this.initializeData();
        // const item = this.typesArray.find(entry => entry.name === name);
        // return item ? item.id : null;
    }

    async getNameByIdValue(id) {

        const item = await db.query(`Select db_GetValueById(${id})`);
        const result = item[0][0]
        for (const key in result) {
            if (key.includes("db_GetIdByValue")) {
              return result[key];
            }
          }
          return null; // Return null if no partial key match is found
    }

    async getIdByNameValue(name , typeName) {
      
        const item = await db.query(`Select db_GetIdByValue("${name}" , "${typeName}")`);
        const result = item[0][0]
        for (const key in result) {
            if (key.includes("db_GetIdByValue")) {
              return result[key];
            }
          }
          return null; // Return null if no partial key match is found
    }
}

module.exports = new Dictionary();
