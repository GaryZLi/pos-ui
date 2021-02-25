import { connect } from 'react-redux';
import Main from '../Main';
import Order from '../Order';

const styles = {
    rootContainer: {
        height: '100%',
        width: '100%',
        fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Fira Sans,Ubuntu,Oxygen,Oxygen Sans,Cantarell,Droid Sans,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Lucida Grande,Helvetica,Arial,sans-serif',
        fontSize: 20,
        userSelect: 'none',
    }
};

const screen = {
    'main': <Main />,
    'order': <Order />
};

const View = ({
    screenType,
}) => {

    return (
        <div style={styles.rootContainer}>
            {screen[screenType]}
        </div>
    );
};

const states = ({
    screenType,
}) => ({
    screenType,
});

export default connect(states)(View);