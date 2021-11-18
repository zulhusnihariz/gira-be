import { define } from 'typeorm-seeding'
import { Project, UserProject } from '../entities'

define(Project, (projectData: Project) => {
  const project = new Project()

  project.id = projectData.id
  project.title = projectData.title
  project.description = projectData.description

  return project
})

define(UserProject, (userProjectData: UserProject) => {
  const userProject = new UserProject()

  userProject.userId = userProjectData.userId
  userProject.projectId = userProjectData.projectId

  return userProject
})
