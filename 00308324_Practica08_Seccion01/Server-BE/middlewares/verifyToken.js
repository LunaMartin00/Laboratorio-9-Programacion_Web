import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_fallback';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: 'Acceso denegado: Token no enviado',
      instruction: 'Incluye el token en el header: Authorization: Bearer <token>'
    });
  }

  // Verificar formato del header
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: 'Formato de token inválido',
      instruction: 'El formato debe ser: Bearer <token>'
    });
  }

  const token = parts[1];
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token inválido o expirado',
        error: err.message
      });
    }
    
    // Token válido, adjuntar usuario a la request
    req.user = user;
    next();
  });
};

export default verifyToken;