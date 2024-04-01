export interface Student {
    grade: string
  }

export interface Order {
  first: string
  last: string
  email: string
  student: Student[]
}

export function loadCart() : Order {
  try {
    return JSON.parse(localStorage.order) as Order
  } catch(_){
    return {
      first: '',
      last: '',
      email: '',
      student: [{grade: ''}]
    }
  }
  

}

export function storeCart(o: Order) {
  localStorage.order = JSON.stringify(o)
}