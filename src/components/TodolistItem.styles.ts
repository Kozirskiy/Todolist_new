import { SxProps, Theme } from '@mui/material'

export const containerSx: SxProps<Theme> = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const getListItemSx = (isDone:boolean):SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1
})