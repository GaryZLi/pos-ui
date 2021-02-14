import List from './List';
import Tables from './Tables';
import Settings from './Settings';

const styles = {
    rootContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor: '#289fc9',
        backgroundColor: '#41b6e8',
        position: 'relative',
        display: 'flex',
    },
};

const Main = () => {
    return (
        <div style={styles.rootContainer}>
            <List/>
            <Tables/>
            <Settings/>
        </div>
    );
};

export default Main;