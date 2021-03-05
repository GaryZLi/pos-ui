import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        width: '100%',
        height: 50,
        display: 'flex',
    },
    col: {
        height: '100%',
        borderRight: '1px solid black',
    }
});

const Row = ({
    order,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <div className={classes.col}>
                hi
            </div>
            <div className={classes.col}>
                LOL
            </div>
        </div>
    );
};

export default Row;