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
  /* -------------------------------------------------------------------------- */

  async UpdateProject(req: Request, res: Response) {
    const projectId: string = req.params.id
    const project: Project = req.body

    const { members, ...rest } = project

    if (project.members.length > 0) {
      const currentMembers = await getRepository(UserProject).find({
        where: { projectId },
      })

      await getRepository(UserProject).delete(currentMembers.map(el => el.id))

      for (const id of project.members) {
        await getRepository(UserProject).save({ userId: `${id}`, projectId: projectId })
      }
    }

    const updatedUser = await getRepository(Project).update(projectId, rest)

    res.json(updatedUser)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteProject(req: Request, res: Response) {
    const projectId: string = req.params.id

    const currentMembers = await getRepository(UserProject).find({
      where: { projectId },
    })

    await getRepository(UserProject).delete(currentMembers.map(el => el.id))
    await getRepository(Project).delete(projectId)

    return res.send({ message: 'successfully deleted' })
  }
}
