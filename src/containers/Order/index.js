import { makeStyles } from '@material-ui/styles';
import List from './List';
import Panel from './Panel';
import UserInfo from './UserInfo';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    orderContainer: {
        height: `calc(100% - 100px)`,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'stretch',
        // flex: 1,
    },
})

const Order = () => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <Panel/>
            <div className={classes.orderContainer}>
                <UserInfo/>
                <List/>
            </div>
        </div>
    );
};

export default Order;