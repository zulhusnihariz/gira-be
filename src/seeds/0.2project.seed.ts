import { Factory, Seeder } from 'typeorm-seeding'
import { Project, UserProject } from '../entities'

import * as projects from '../server/projects.json'

export default class createProjects implements Seeder {
  public async run(factory: Factory) {
    // populate 'project' table
    for (const key of Object.keys(projects.details)) {
      const project = await factory(Project)().create(projects.details[key])

      // populate 'user_project' table
      for (const member of projects.details[key].members) {
        await factory(UserProject)().create({ userId: member, projectId: project.id })
      }
    }
  }
}
