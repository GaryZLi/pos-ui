import { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import ControlPanel from './ControlPanel';
import Panel from './Panel';
import CustomerInfo from './CustomerInfo';
import OrderInfo from './OrderInfo';
import OrderView from './OrderView';
import {
    updateOrderListInfo,
} from '../../redux/actions';

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
    },
})

const Order = ({
    updateOrderListInfo,
}) => {
    const classes = useStyles();

    useEffect(() => {
        updateOrderListInfo('date');

        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.rootContainer}>
            <Panel/>
            <div className={classes.orderContainer}>
                <CustomerInfo/>
                <OrderInfo/>
                <ControlPanel/>
                <OrderView/>
            </div>
        </div>
    );
};

const dispatches = {
    updateOrderListInfo,
};

export default connect(null, dispatches)(Order);