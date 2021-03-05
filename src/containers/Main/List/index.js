import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Order from './Order';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        width: 150,
        backgroundColor: 'white',
        overflow: 'auto',
        borderRight: '1px solid black',
    },
});

const List = ({
    orders,
}) => {
    const classes = useStyles();

    // const a = [];

    // for (let i = 0; i < 10; i++) {
    //     a.push(<Order num={i} price={i }/>);
    // }

    orders = orders.filter(order => !order.paid && !order.deleted && (order.type === 'togo' || order.type === 'delivery'));

    return (
        <div className={classes.rootContainer}>
            {orders.map((order, id) => (
                <Order
                    key={id}
                    num={order.orderNum}
                />
            ))}
        </div>
    );
};

const states = ({
    orders,
}) => ({
    orders,
});

export default connect(states)(List);