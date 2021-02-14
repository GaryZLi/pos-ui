import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        height: 70,
        width: 70,
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        boxShadow: '1px 1px 8px #111111',

        '&:hover': {
            cursor: 'pointer',
        },
        '&:active': {
            boxShadow: 'none',
        },
    },
});

const Table = ({
    row,
    col,
    position,
}) => {
    const classes = useStyles();

    return (
        <div 
            className={classes.rootContainer}
            style={{
                top: `${position.top}%`,
                left: `${position.left}%`
            }}
        >
            {col}
            {row}
        </div>
    );
};

export default Table;