import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface toDo {
    task: string,
    starred: boolean;
}

interface Props {
    list: toDo[]
    addTask: (task: string) => void
}


const AddTodo: React.FunctionComponent<Props> = (props) => {
    const { list, addTask } = props
    const [text, SetText] = useState('')
    const [snackbarState, toggleSnackbar] = useState(false);

    const verifyAndAdd = (text: string) => {
        const isPresent = list.some((element) => element.task.trim().toLowerCase() === text.trim().toLowerCase());
        if (isPresent) {
            toggleSnackbar(true)
        } else {
            addTask(text)
        }
    }

    const hanldeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        SetText(e.target.value)
    }

    const handleClose = () => {
        toggleSnackbar(false)
    }

    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            verifyAndAdd(text)
        }
    }

    return (<div className='add-todo'>
        <div className='add-todo-textfieled'>
            <Snackbar open={snackbarState} autoHideDuration={5000}>
                <Alert onClose={handleClose} severity="error">
                    To Do task already added
                </Alert>
            </Snackbar>
            <TextField
                InputProps={{
                    placeholder: 'Enter To Do to be added',
                }}
                value={text}
                onKeyDown={handleKeyDown}
                onChange={hanldeOnChange}
                fullWidth>

            </TextField>
        </div>
        <div>
            <Button variant='outlined' disabled={!text} onClick={() => { verifyAndAdd(text) }}>Add To Do</Button>
        </div>
    </div>)
}

export default AddTodo;