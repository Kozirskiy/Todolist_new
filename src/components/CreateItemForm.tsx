import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import {Button} from './Button'

type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
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


    const isAddBtnDisabled = !title.trim() || title.trim().length > 30

    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnEnterHandler}/>

            <Button title={'+'} onClick={createItemHandler} disabledButton={isAddBtnDisabled}/>

            {error && <div className={'error-message'}>{error}</div>}
            {title && <div>max lenht 30 symbol</div>}
            {title.length > 30 && <div style={{color: 'red'}}>please max lenht 30 symbol</div>}
        </div>
    )
}