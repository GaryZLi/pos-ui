import { makeStyles } from '@material-ui/styles';
import Order from './Order';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: 150,
        backgroundColor: 'white',
        overflow: 'auto',
        borderRight: '1px solid black',
    },
});

const List = () => {
    const classes = useStyles();

    const a = [];

    for (let i = 0; i < 10; i++) {
        a.push(<Order num={i} price={i }/>);
    }

    return (
        <div className={classes.rootContainer}>
            {a}
        </div>
    );
};

export default List;