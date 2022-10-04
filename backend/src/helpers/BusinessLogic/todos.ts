import { TodosAccess } from '../DataLayer/todosAcess'
import { bucketName } from '../attachmentUtils'
import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { v4 as uuidv4 } from 'uuid'
import { TodoUpdate } from '../../models/TodoUpdate'

// TODO: Implement businessLogic

const todosAccess = new TodosAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return todosAccess.getAllToDos(userId)
}

export function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  const todoId = uuidv4()
  const timestamp = new Date().toISOString()

  return todosAccess.createToDo({
    userId: userId,
    todoId: todoId,
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`,
    createdAt: timestamp,
    done: false,
    ...createTodoRequest
  })
}

export function updateToDoItem(
  updateTodoRequest: UpdateTodoRequest,
  todoId: string,
  userId: string
): Promise<TodoUpdate> {
  return todosAccess.updateToDoItem(updateTodoRequest, todoId, userId)
}

export function deleteToDoItem(
  todoId: string,
  userId: string
): Promise<string> {
  return todosAccess.deleteToDoItem(todoId, userId)
}