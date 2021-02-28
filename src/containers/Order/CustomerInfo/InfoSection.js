import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
});

const sections = {
    English: {
        total: 'Total: ',
        orders: '# of Orders: ',
    },
    '中文': {
        total: 'total 中文: ',
        orders: '# of Orders 中文: ',
    }
};

const InfoSection = ({
    customerInfo,
    language,
}) => {
    const classes = useStyles();

    if (!customerInfo) return <></>;

    return (
        <div className={classes.rootContainer}>
            <div className={classes.container}>
                <div style={{marginRight: 10}}>
                    {sections[language].orders}
                </div>
                <div>
                    {parseFloat(customerInfo.totalOrders).toLocaleString()}
                </div>
            </div>
            <div className={classes.container}>
                <div style={{marginRight: 10}}>
                    {sections[language].total}
                </div>
                <div>
                    ${parseFloat(customerInfo.totalSpent).toLocaleString()}
                </div>
            </div>
        </div>
    )
};

const states = ({
    language,
    orderList,
}) => ({
    language,
    customerInfo: orderList.customerInfo,
});

export default connect(states)(InfoSection);