export interface Task {
  id: number
  title: string
  description: string
  is_completed: boolean
}

export interface Column {
  title: string
  tasks: Task[]
}
