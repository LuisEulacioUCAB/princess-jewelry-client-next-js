import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
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
    const response = await fetch('https://geolocation-db.com/json/');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(error.status || 500).end();
  }
}