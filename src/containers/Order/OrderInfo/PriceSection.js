import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { updateItems } from "../../../redux/actions";

const useStyles = makeStyles({
    calculationSection: {
        borderTop: '5px inset gray',
        width: '100%',
        boxShadow: '8px 8px  #ffffff',
    },
    calculationItem: {
        height: 30,
        padding: 3,
        borderBottom: '1px solid gray',
    },
});

const PriceSection = ({
    biang,
    total,
}) => {
    const classes = useStyles();
    total = Math.ceil(total * 100) / 100;
    const subTotal = total / 1.0975;
    const tax = total - subTotal;

    return (
        <div
            className={classes.calculationSection}
            style={{
                backgroundColor: biang ? 'skyblue' : 'white'
            }}
            onClick={() => updateItems('biang')}
        >
            <div className={classes.calculationItem}>
                Subtotal: ${subTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={classes.calculationItem}>
                Tax: ${tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={classes.calculationItem}>
                Total: ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
        </div>
    );
};

const states = ({
    orderList,
}) => ({
    biang: orderList.biang,
    total: orderList.total,
});

const dispatches = {
    updateItems,
};

export default connect(states, dispatches)(PriceSection);