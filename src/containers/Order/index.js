import { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import ControlPanel from './ControlPanel';
import Panel from './Panel';
import CustomerInfo from './CustomerInfo';
import OrderList from './OrderList';
import MenuView from './MenuView';
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
        // alignItems: 'stretch',
        // flex: 1,
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
                <OrderList/>
                <ControlPanel/>
                <MenuView/>
            </div>
        </div>
    );
};

const states = ({
}) => ({
});

const dispatches = {
    updateOrderListInfo,
};

export default connect(states, dispatches)(Order);