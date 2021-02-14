import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        height: 100,
        width: '100%',
        backgroundColor: 'red',
    },
});

const Panel = () => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            
        </div>
    );
};

export default Panel;