export interface Task {
  id: string
  title: string
  description: string
  is_completed: boolean
}

export interface Column {
  id: string
  title: string
}

export interface Relation {
  id: string
  column_id: string
  task_id: string
}

export interface Theme {
  id: string
  value: string
}

export interface SortableTask<T = Task> {
  added?: {
    element: T
    newIndex: string
  }
  removed?: {
    element: T
    oldIndex: string
  }
  moved?: {
    element: T
    oldIndex: string
    newIndex: string
  }
}
