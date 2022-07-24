"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
app_1.default.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
const PORT = process.env.PORT || process.env.MYSQL_PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`); /* eslint-disable-line */ // ignorando warning de lint para o console.log()
});
