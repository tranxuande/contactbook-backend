const app = require("./app");
const config = require("./config");
const MongoDB = require("./utils/mongodb.util");

async function startServer() {
    try {
      await MongoDB.connect(config.db.uri);
      console.log("ket noi thanh cong voi MongoDB!");

      const PORT = config.app.port;
      app.listen(PORT, () => {
       console.log(`server is running on port ${PORT}.`);
       });

    } catch (error) {
        console.log("khong the ke noi den MongoDB!", error);
        process.exit();
    }
}

startServer();
