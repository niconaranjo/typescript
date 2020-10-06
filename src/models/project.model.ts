//Enum for status
enum ProjectStatus {
  Active,
  Finished,
}

// Project class
class Project {
  id: string;

  constructor(
    public title: string,
    public description: string,
    public numOfPeople: number,
    public status: ProjectStatus
  ) {
    this.id = Math.random().toString();
  }
}

export { ProjectStatus, Project };
