const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Task1', teamImg:'/images/alphabet.png' },
      'task-2': { id: 'task-2', content: 'Task2', teamImg:'/images/alphabet.png' },
      'task-3': { id: 'task-3', content: 'Task3', teamImg:'/images/alphabet.png' },
      'task-4': { id: 'task-4', content: 'Task4', teamImg:'/images/alphabet.png' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Pending',
        taskIds: [],
      },
      'column-4':{
          id:'column-4',
          title:'Done',
          taskIds:[]
      },
      'column-5':{
          id:'column-5',
          title:'On Hold',
          taskIds:[]
      }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3','column-4','column-5'],
    popup:'none',
    newname:"",
    addCard:false,
    previd:'column-1'
  };
  
  export default initialData;
  