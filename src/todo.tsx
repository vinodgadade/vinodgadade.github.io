import { Button, Pagination, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { toDo } from './App';

interface Props {
    list: toDo[];
    searched: boolean;
    starClicked: (index: string) => void;
    deleteClicked: (index: string) => void;
}

const ToDo: React.FunctionComponent<Props> = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = (): number => {
        return Math.ceil(list.length / 4);
    }
    const paginate = (): any => {
        if (props.searched) {
            return list
        } else {
            const per_page_items = 4;
            const offset = (currentPage - 1) * per_page_items;
            const paginatedData = list.slice(offset).slice(0, per_page_items);
            return paginatedData;
        }
    }

    const pageClicked = (e: any, v: any) => {
        setCurrentPage(v)
        console.log(v);
    }

    const { list, starClicked, deleteClicked } = props
    return (
        <>
            <Table>
                <TableBody>
                    {
                        paginate().map((element: toDo, index: number) => {
                            return <TableRow key={index}>
                                <TableCell style={{ width: '80%' }}><Typography>{element.task}</Typography></TableCell>

                                <TableCell><Button onClick={() => { starClicked(element.task) }}>{element.starred ? <StarIcon></StarIcon> : <StarBorderOutlinedIcon></StarBorderOutlinedIcon>}</Button></TableCell>
                                <TableCell><Button onClick={() => { deleteClicked(element.task) }}><DeleteIcon></DeleteIcon></Button></TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
            <div className='pagination-holder'>
                <Stack spacing={2}>
                    <Pagination count={totalPages()} variant="outlined" shape="rounded" onChange={(e, v) => { pageClicked(e, v) }} />
                </Stack>
            </div>

        </>)
}


export default ToDo