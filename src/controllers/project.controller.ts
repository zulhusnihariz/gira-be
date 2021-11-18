import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Project } from '../entities'

import { ProjectRepository } from '../repositories/project.repository'

const filter = { relations: ['members', 'members.user'] }

export class ProjectController {
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */

  async PostProject(req: Request, res: Response) {
    const project: Project = req.body
    const createdProject = await getCustomRepository(ProjectRepository).saveProject(project)
    res.json(createdProject)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GET ALL                                  */
  /* -------------------------------------------------------------------------- */

  async GetAllProjects(req: Request, res: Response) {
    const project = await getCustomRepository(ProjectRepository).find(filter)

    res.json(project)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  GET BY ID                                 */
  /* -------------------------------------------------------------------------- */

  async GetProjectById(req: Request, res: Response) {
    const projectId: string = req.params.id
    const project = await getCustomRepository(ProjectRepository).findOne(projectId, filter)

    res.json(project)
  }

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE BY ID                                */
  /* -------------------------------------------------------------------------- */

  async UpdateProject(req: Request, res: Response) {
    const projectId: string = req.params.id
    const project: Project = req.body

    const updatedProject = await getCustomRepository(ProjectRepository).updateProject(
      projectId,
      project,
    )

    res.json(updatedProject)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  async DeleteProject(req: Request, res: Response) {
    const projectId: string = req.params.id
    await getCustomRepository(ProjectRepository).deleteProject(projectId)

    return res.send({ message: 'successfully deleted' })
  }
}
