import { makeStyles } from '@material-ui/styles';
import paidIcon from '../../picSrc/paid.svg';

const useStyles = makeStyles({
    rootContainer: {
        width: '100%',
        height: 50,
        display: 'flex',
    },
    col: {
        height: '100%',
    },
});

const columns = [
    order => order.orderNum,
    order => order.phoneNums[0],
    order => order.paid? <img src={paidIcon} style={{height: 30, width: 30}} alt='paid'/> : <div/>,
    order => {
        if (order.togo) return 'Togo 中文';
        else if (order.delivery) return 'Delivery 中文';
        else return 'Dine In 中文';
    },
    order => '$' + (order.total).toLocaleString("en-US", {maximumFractionDigits: 2}),
    order => {
        return `${order.date.getHours() > 12? order.date.getHours() - 12 : order.date.getHours()}:${order.date.getMinutes()} ${order.date.getHours() >= 12? 'PM' : 'AM'}`
    },
]

const Row = ({
    order,
    columnWidths,
    color,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            {columns.map((col, id) => (
                <div
                    key={id}
                    style={{
                        backgroundColor: color,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...columnWidths[id]
                    }}
                >
                    {col(order)}
                </div>
            ))}
        </div>
    );
};

export default Row;