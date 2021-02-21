import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import PhoneSection from './PhoneSection';
import AddressSection from './AddressSection';

const useStyles = makeStyles({
    rootContainer: {
        height: '100%',
        maxHeight: '100%',
        width: 300,
        marginRight: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
    },
    heading: {
        height: 40,
        marginBottom: 5,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(255, 255, 255, .15)), to(rgba(0, 0, 0, .25))), -webkit-gradient(linear, left top, right bottom, color-stop(0, rgba(255, 255, 255, 0)), color-stop(0.5, rgba(255, 255, 255, .1)), color-stop(0.501, rgba(255, 255, 255, 0)), color-stop(1, rgba(255, 255, 255, 0)))',
    },
    add: {
        fontSize: 40,
        height: 40,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '&:hover': {
            cursor: 'pointer',
        },
        '&:active': {
            fontSize: 30,
        },
    },
});

const sections = {
    Phone: {
        '中文': 'Phone 中文',
        English: 'Phone',
    },
    Address: {
        '中文': 'Address 中文',
        English: 'Address',
    }
};

const UserInfo = ({
    language,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.rootContainer}>
            <div className={classes.heading}>
                {sections.Phone[language]}
            </div>
            <PhoneSection/>
            <div className={classes.heading}>
                {sections.Address[language]}
            </div>
            <AddressSection/>
        </div>
    );
};

const states = ({
    language,
}) => ({
    language,
});

const dispatches = {

};

export default connect(states, dispatches)(UserInfo);