import { InputAdornment, Table, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';
import data from "./sample-data.json";
import ToDo from './todo';
import AddTodo from './AddTodo';

export interface toDo {
  task: string,
  starred: boolean;
}

const App: React.FunctionComponent = () => {
  const [searchEnabled, toggleSearch] = useState(false);
  const [searchdeData, setSearchData] = useState(data);

  const sortData = (data: toDo[]) => {
    return data.sort((first, second) => {
      return Number(second.starred) - Number(first.starred)
    })
  }
  const [todoList, updateTodoList] = useState(sortData(data))

  const starClicked = (task: string): void => {
    const index = todoList.findIndex((element) => element.task === task)
    todoList[index] = {
      task: todoList[index].task,
      starred: !todoList[index].starred
    }
    todoList.sort((first, second) => {
      return Number(second.starred) - Number(first.starred)
    })
    updateTodoList([...todoList])
  }

  const deleteClicked = (task: string): void => {
    updateTodoList(todoList.filter(function (element) {
      return element.task !== task;
    }))
  }

  const addTask = (task: string): void => {
    updateTodoList([...todoList, { task: task, starred: false }])
  }

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      toggleSearch(false)
    } else {
      if (!searchEnabled)
        toggleSearch(true)
      const newList = todoList.filter((element) =>
        element.task.toLowerCase().indexOf(e.target.value.trim().toLowerCase()) > -1
      );
      setSearchData(newList);
    }
  }

  return (
    <div className='app-container'>
      <div className='header'>
        To Do APP
      </div>
      <div className='content margin' >
        <div className='search' >
          <TextField
            InputProps={{
              placeholder: 'search',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={search}
            fullWidth>

          </TextField>

        </div>
        <AddTodo list={todoList} addTask={addTask}></AddTodo>
        <ToDo list={searchEnabled ? searchdeData : todoList} searched={searchEnabled} starClicked={starClicked} deleteClicked={deleteClicked}></ToDo>
        <Table>

        </Table>
      </div>
    </div>
  );
}

export default App;
