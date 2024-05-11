import { NextFunction, Request, Response, Router } from "express";

const userRoutes = Router()

const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization?.split(' ')[1] !== "ninja"){
        return res.status(403).json({status: false, message: "You are not logged in."})
    } 
    (req as any).userId = 21; 
    next();
}

userRoutes.post('/add', (req, res) => {
    const {names, email, password} = req.body;
    if(!names || !email || !password)
    {
        return res.status(400).json({status: false, message: "Missing user data."})
    }
    //regiter
    res.status(201).json({status: true, message: "User registerd", user: {id: 21,names, email}})
});

userRoutes.post('/login', (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({status: false, message: "Missing user data."})
    }
    //login
    res.status(200).json({status: true, message: "User logged in.", token: "ninja"})
});

userRoutes.patch('/update', checkToken, (req, res) => {
    const userId = (req as any).userId;
    const {names} = req.body;
    if(!names){
        return res.status(400).json({status: false, message: "Missing user data."})
    }
    //update
    res.status(200).json({status: true, message: "User updated", user: {id: 21,names}})
});

userRoutes.delete('/delete', checkToken, (req, res) => {
    const userId = (req as any).userId;
    //delete
    res.status(200).json({status: true, message: "User deleted",})
});

export default userRoutes;