import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../../shared/utils/auth0';


/**
 * Callback where the user will be redirected after login and get the token id.
 *
 * @param req - Request from next ctx.
 * @param res - Response from next ctx.
 * @returns User session.
 */
const callBack = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    await auth0.handleCallback(req, res, {
      // eslint-disable-next-line
      afterCallback: async (req, res, session, state) => {
        return {
          ...session,
        };
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default callBack;