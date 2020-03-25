import { Request, Response } from 'express'
import connection from '../../config/database'

class IncidentController {
  async index (req: Request, res: Response): Promise<Response> {
    interface QueryInterface {
      page: number;
    }

    const { page = 1 }: QueryInterface = req.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents)
  }

  async store (req: Request, res: Response): Promise<Response> {
    interface BodyInterface {
      title: string;
      description: string;
      value: number;
    }

    const { title, description, value }: BodyInterface = req.body

    const ong_id = req.headers.authorization

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return res.status(201).json({ id })
  }

  async destroy (req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id)
    const ong_id = req.headers.authorization

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }

    await connection('incidents').where('id', id).delete()

    return res.status(204).send()
  }
}

export default new IncidentController()
