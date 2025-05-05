import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
// import {Button} from './Button'
// import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'


type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }


    // const isAddBtnDisabled = !title.trim() || title.trim().length > 30

    return (
        <div>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       style={ {marginRight: '20px'}}
                       value={title}
                       size={'small'}
                       error={!!error}
                       helperText={error}
                       onChange={changeItemTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>

            {/*<Button   variant="contained" onClick={createItemHandler}>+</Button>*/}
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
            {title && <div>max length 30 symbol</div>}
            {title.length > 30 && <div style={{color: 'red'}}>please max length 30 symbol</div>}
        </div>
    )
}