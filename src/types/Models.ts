export interface Task {
  id: number
  title: string
  description: string
  is_completed: boolean
}

export interface Column {
  id: number
  title: string
}

export interface Relation {
  id: number
  column_id: number
  task_id: number
}
