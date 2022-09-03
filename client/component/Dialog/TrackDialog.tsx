import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle, Button } from '@mui/material';

interface TrackDialog {
    open: boolean;
    title: string;
    description: string;
    FC: Function;
}

const TrackDialog: React.FC<TrackDialog> = ({ open, title, description, FC }) => {

    const onClick = () => {
        FC();
    }

    return (<Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent style={{ paddingBottom: 0 }}>
            <DialogContentText id="alert-dialog-slide-description">
                {description}
            </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: 15 }}>
            <Button >Отмена</Button>
            <Button variant='contained' onClick={onClick}>Подтвердить</Button>
        </DialogActions>
    </Dialog>)
}

export default TrackDialog;