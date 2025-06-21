import jwksRsa from 'jwks-rsa';
import { expressjwt as jwt } from 'express-jwt';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`,
  }),
  audience: 'YOUR_AUTH0_API_IDENTIFIER',
  issuer: `https://YOUR_AUTH0_DOMAIN/`,
  algorithms: ['RS256'],
});

module.exports = checkJwt;
