import uuid from '../utils/uuid'

const boardData = {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
        },
        {
          description: '',
          name: 'and third',
          id: uuid(),
        },
      ],
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
        },
      ],
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
        },
      ],
    },
  ],
}

export default boardData
