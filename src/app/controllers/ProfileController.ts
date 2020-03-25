import { Request, Response } from 'express'
import connection from '../../config/database'

class ProfileController {
  async index (req: Request, res: Response): Promise<Response> {
    const ong_id = req.headers.authorization

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)

    return res.json(incidents)
  }
}

export default new ProfileController()
