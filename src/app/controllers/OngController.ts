import crypto from 'crypto'
import { Request, Response } from 'express'
import connection from '../../config/database'

class OngController {
  public async index (req: Request, res: Response): Promise<Response> {
    const ongs = await connection('ongs').select('*')

    return res.json(ongs)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    interface BodyInterface {
      name: string;
      email: string;
      whatsapp: string;
      city: string;
      uf: string;
    }

    const { name, email, whatsapp, city, uf }: BodyInterface = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return res.status(201).json({ id })
  }
}

export default new OngController()
