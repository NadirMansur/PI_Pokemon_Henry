//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { SV_PORT } = process.env;
// Syncing all the models at once.
async function main(){
  try {
    await conn.authenticate();
    console.log('Connection has been established successfully.');
    conn.sync({ force: false }).then(() => {
      server.listen(SV_PORT, () => {
        console.log(`%s listening at ${SV_PORT}`); // eslint-disable-line no-console
      });
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();