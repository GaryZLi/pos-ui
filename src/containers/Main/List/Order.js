import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { updateOrderListInfo } from '../../../redux/actions';

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
    updateOrderListInfo,
}) => {
    const classes = useStyles();
    
    return (
        <div
            className={classes.rootContainer}
            onMouseDown={() => {
                updateOrderListInfo('open', num);
            }}
        >
            <div className={classes.container}
            >
                #{num}
            </div>
        </div>
    );
};

const dispatches = {
    updateOrderListInfo,
};

export default connect(null, dispatches)(Order);