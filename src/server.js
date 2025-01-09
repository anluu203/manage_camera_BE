require("dotenv").config()

import express from "express"
import conFigViewEngine from "./config/viewEng";
import initApiRouters from "./routes/api/api";
import bodyParser from "body-parser";
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from "path";


// import connection from "./config/connectDB";
const app = express();
const PORT = process.env.PORT || 8080;

const moduleAlias = require('module-alias')
require('module-alias/register');
moduleAlias.addAlias('@', __dirname + '/src/')

//Dùng express.static để cho phép truy cập thư mục uploads công khai qua URL.
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//config view engine
conFigViewEngine(app);


// Cấu hình CORS để chấp nhận yêu cầu từ localhost:3000
app.use(cors({
    origin: process.env.REACT_URL || 'http://localhost:3000',
    credentials: true, // Cho phép gửi cookie, token qua CORS
}));




//config body-parser
// Thư viện này giúp chuyển data được gửi từ client lên server thành dạng JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


//Cấu hình cookies trong app Nodejs
app.use(cookieParser())

//init api router
initApiRouters(app)


app.listen(PORT, ()=> {
    console.log(`Server is running in http://localhost:${PORT}`);
})
