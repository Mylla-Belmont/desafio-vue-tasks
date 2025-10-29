export interface Task {
  id: number
  title: string
  description: string
  is_completed: boolean
}

export interface Column {
  id: number
  title: string
  tasks: Task[]
}
