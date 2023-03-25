export interface Student {
    first: string
    last: string
    grade: string
  }

export interface Order {
  first: string
  last: string
  email: string
  student: Student[]
}