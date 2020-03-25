import { Request, Response } from 'express'
import connection from '../../config/database'

class SessionController {
  async store (req: Request, res: Response): Promise<Response> {
    interface BodyInterface {
      id: string
    }

    const { id }: BodyInterface = req.body

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first()

    if (!ong) {
      return res.status(400).json({ error: 'No ONG found with this ID.' })
    }

    return res.json(ong)
  }
}

export default new SessionController()
