import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16, 
        // boxShadow: '7px 6px 28px 1px rgba(0, 0, 0, 0.24)', 
        cursor: 'pointer', 
        outline: 'none', 
        transition: '0.09s all',

        // '&:hover': {
        //     cursor: 'pointer',
        //     backgroundColor: '#5db6e3'
        // },
        '&:active': {
            transform: 'scale(0.90)',
            boxShadow: '3px 2px 22px 1px rgba(0, 0, 0, 0.24) inset' 
        }
    },
    icon: {
        height: 50,
        width: 50,
    }
})

const ActionButton = ({
    iconSrc,
    name,
    action,
}) => {
    const classes = useStyles();

    return (
        <div
            className={classes.rootContainer}
            onClick={action}
            // onTouchStart={action}
        >
            <img
                className={classes.icon}
                src={iconSrc}
                alt={`${name} icon`}
                draggable={false}
            />
            {name}
        </div>
    );
};

export default ActionButton;