import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const VerifyTokenMiddleware = ( req: Request, res: Response, next: NextFunction ) => { 
    const headerValue = req.headers['authorization'];

    try {
        if (headerValue != null) {
            const token = headerValue.split(' ')[1];

            jwt.verify(token, 'secret', (err) => {
                if (err) {
                    return res.status(403).send('You do not have permission to view this content');
                } 
            
                else { 
                    next() 
                }
            });
        }
        
        else {
            return res.status(401).send('Unauthorized: There is no authorization header');
        }
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Token verification failed' });
    }
}

export default VerifyTokenMiddleware