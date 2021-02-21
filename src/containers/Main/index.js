import List from './List';
import Tables from './Tables';
import Actions from './Actions';

const styles = {
    rootContainer: {
        height: '100%',
        width: '100%',
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
            <Actions/>
        </div>
    );
};

export default Main;