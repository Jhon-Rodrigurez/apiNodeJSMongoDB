import passport from "passport";
import UsuarioAutenticacion from "./UsuarioAutenticacion.js";
import router from "../routes/rutas.js";
import TokenAutorizacion from "./TokenAutorizacion.js";
import cors from "cors";

const whiteList= ["http://localhost:3000", "http://partidosfesc.com"]

const opcionesCors = {
    "origin": (origen, callback)=> {
        if(whiteList.indexOf(origen) != -1 || !origen) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por cors"))
        }
    },
    "allowedHeaders": "*",
    "methods": "*"
}

const configuracionSeguridad = (app)=> {

    app.use(cors(opcionesCors));
    app.use("/", router);
    passport.use(UsuarioAutenticacion.localEstrategia);
    passport.use(TokenAutorizacion.jwtEstrategia);
}

export {configuracionSeguridad}