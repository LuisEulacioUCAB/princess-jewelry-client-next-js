import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../shared/utils/auth0';

/**
 * Logout the user and clean cookies.
 *
 * @param req - Request from next ctx.
 * @param res - Response from next ctx.
 */
export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {

    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}