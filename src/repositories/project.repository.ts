import { EntityRepository, Repository, getRepository } from 'typeorm'
import { Project, UserProject } from '../entities'

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  /*
    Save: save entity and it's relations
    Update: update entity and it's relations
    Delete: delete entity and it's relations
  */
  async saveProject(projects: Project) {
    const { members, ...rest } = projects
    const createdProject = await getRepository(Project).save(rest)

    for (const id of members) {
      await getRepository(UserProject).save({ userId: `${id}`, projectId: createdProject.id })
    }

    return createdProject
  }

  async updateProject(projectId: string, project: Project) {
    const { members, ...rest } = project
    const currentRelations = await getRepository(UserProject).find({ where: { projectId } })

    if (!!currentRelations.length)
      await getRepository(UserProject).delete(currentRelations.map(project => project.id))

    for (const id of members) {
      await getRepository(UserProject).save({ userId: `${id}`, projectId: projectId })
    }
    return await getRepository(Project).update(projectId, rest)
  }

  async deleteProject(projectId: string) {
    const currentRelations = await getRepository(UserProject).find({ where: { projectId } })

    await getRepository(UserProject).delete(currentRelations.map(project => project.id))
    await getRepository(Project).delete(projectId)
  }
}
