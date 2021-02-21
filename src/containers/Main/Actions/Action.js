import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        height: 50,
        width: 130,
        marginTop: 50,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        boxShadow: '1px 1px 8px #111111',
        '&:hover': {
            cursor: 'pointer',
        },
        '&:active': {
            boxShadow: 'none',
        },
    }
});

const Setting = ({
    name,
    action,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer} onClick={action}>
            {name}
        </div>
    );
};

export default Setting;