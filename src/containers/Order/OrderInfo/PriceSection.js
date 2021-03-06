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
    subTotal,
    tax,
    updateItems,
}) => {
    const classes = useStyles();
    // subTotal = Math.ceil(subTotal * 100) / 100;
    // const subsubTotal = subTotal / 1.0975;
    // const tax = subTotal - subsubTotal;

    return (
        <div
            className={classes.calculationSection}
            style={{
                backgroundColor: biang ? 'skyblue' : 'white'
            }}
            onClick={() => updateItems('biang')}
        >
            <div className={classes.calculationItem}>
                Subtotal: ${(Math.ceil(subTotal * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={classes.calculationItem}>
                Tax: ${(Math.ceil(tax * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={classes.calculationItem}>
                Total: ${(Math.ceil((tax + subTotal) * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
        </div>
    );
};

const states = ({
    orderList,
    taxRate,
    language,
}) => {
    let subTotal = 0;

    for (const item in orderList.items) {
        subTotal += orderList.items[item].price * orderList.items[item].quantity;
    }

    return {
        subTotal,
        tax: subTotal * taxRate,
        language,
        biang: orderList.biang,
    };

    // return {
    //     subTotal: orderList.subTotal,
    // }
};

const dispatches = {
    updateItems,
};

export default connect(states, dispatches)(PriceSection);