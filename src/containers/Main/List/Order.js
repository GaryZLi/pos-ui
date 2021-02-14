import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        height: 80,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid black',
        '&:hover': {
            cursor: 'pointer',
        },
        '&:active': {
            backgroundColor: '#d0d3d9',
        }
    },
})

const Order = ({
    num,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <div className={classes.container}
            >
                #{num}
            </div>
        </div>
    );
};

export default Order;