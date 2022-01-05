import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../shared/utils/auth0';
/**
 * Route ro redirect to aut0 login.
 *
 * @param req - Request from next ctx.
 * @param res - Response from next ctx.
 */
export default async function login(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    await auth0.handleLogin(req, res, {
      getLoginState: () => ({ ...req.query }),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}