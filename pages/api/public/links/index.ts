// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import * as linksService from '../../../../services/links.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await linksService.getAllData();
  res.status(200).json(data)
}
