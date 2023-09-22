import { Router } from "express";
import partidoControlador from "../controllers/partidoControlador.js";
import usuarioControlador from "../controllers/usuarioControlador.js";
import passport from "passport";

const router = Router();

//Usuario

router.post("/usuario",
    usuarioControlador.postUsuario)

router.get("/usuario",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getUsuario)

router.get("/usuario/mispartidos",
    passport.authenticate("jwt", {session: false}),
    usuarioControlador.getMisPartidos)

router.post("/usuario/login",
    passport.authenticate("local", {session: false}),
    usuarioControlador.postSignin)


//Partidos

router.post("/partido",
    passport.authenticate("jwt", {session: false}),
    partidoControlador.postPartido)

router.get("/partido",
    partidoControlador.getPartido)

router.get("/partido/:id",
    partidoControlador.getDetallePartido)

router.put("/partido/:id",
    passport.authenticate("jwt", {session: false}),
    partidoControlador.putPartido)

router.delete("/partido/:id",
    passport.authenticate("jwt", {session: false}),
    partidoControlador.deletePartido)

export default router;