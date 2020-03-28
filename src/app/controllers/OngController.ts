import { Request, Response } from 'express'
import connection from '../../config/database'
import generateUniqueId from '../../utils/generateUniqueId'

class OngController {
  public async index (req: Request, res: Response): Promise<Response> {
    const ongs = await connection('ongs').select('*')

    return res.json(ongs)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    interface BodyInterface {
      name: string
      email: string
      whatsapp: string
      city: string
      uf: string
    }

    const { name, email, whatsapp, city, uf }: BodyInterface = req.body

    const id = generateUniqueId()

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
