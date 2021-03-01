import { makeStyles } from '@material-ui/styles';
import PriceSection from './PriceSection';
import OrderList from './OrderList';

const useStyles = makeStyles({
    rootContainer: {
        width: 300,
        height: '100%',
        borderLeft: '1px solid gray',
        borderRight: '1px solid gray',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

const OrderInfo = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.rootContainer}>
            <OrderList/>
            <PriceSection/>
        </div>
    );
};

export default OrderInfo;