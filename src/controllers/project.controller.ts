import { getRepository, Repository } from 'typeorm'
import { Request, Response } from 'express'
import { Project, User, UserProject } from '../entities'

const filter = { relations: ['members', 'members.user'] }

export class ProjectController {
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */

  async PostProject(req: Request, res: Response) {
    const project: Project = req.body

    const createdProject = await getRepository(Project).save(project)

    for (const id of project.members)
      await getRepository(UserProject).save({ userId: `${id}`, projectId: createdProject.id })

    res.json(createdProject)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   GET ALL                                  */
  /* -------------------------------------------------------------------------- */

  async GetAllProjects(req: Request, res: Response) {
    const project = await getRepository(Project).find(filter)

    res.json(project)
  }
  /* -------------------------------------------------------------------------- */
  /*                                  GET BY ID                                 */
  /* -------------------------------------------------------------------------- */

  async GetProjectById(req: Request, res: Response) {
    const projectId: string = req.params.id
    const project = await getRepository(Project).findOne(projectId, filter)

    res.json(project)
  }

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE BY ID                                */
  /* -------------------------------------------------------------------------- */ 5

  async UpdateProject(req: Request, res: Response) {
    const projectId: string = req.params.id
    const project: Project = req.body

    const updatedUser = await getRepository(Project).update(projectId, project)

    res.json(updatedUser)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteProject(req: Request, res: Response) {
    const projectId: string = req.params.id
    await getRepository(User).delete(projectId)

    return res.send({ message: 'successfully deleted' })
  }
}
