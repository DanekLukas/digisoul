import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'

type Props = {
  info: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Info = ({ info, open, setOpen }: Props) => {
  const confirm = 'OK'
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{info}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {confirm}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Info
