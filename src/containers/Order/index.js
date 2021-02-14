import { makeStyles } from '@material-ui/styles';
import List from './List';
import Panel from './Panel';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    orderContainer: {
        width: '100%',
        display: 'flex',
        flex: 1,
    },
})

const Order = () => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <Panel/>
            <div className={classes.orderContainer}>
                <List/>
            </div>
        </div>
    );
};

export default Order;