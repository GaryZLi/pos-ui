import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        // height: '100%',
        width: '30%',
        overflow: 'auto',

        backgroundColor: 'purple',
    },
});

const List = () => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
ds
        </div>
    );
};

export default List;