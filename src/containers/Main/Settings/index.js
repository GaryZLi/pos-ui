import Setting from './Setting';

const styles = {
    rootContainer: {
        height: '100%',
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
};

const Settings = () => {
    return (
        <div style={styles.rootContainer}>
            <Setting
                name='Take out'
                action={() => console.log('takeout')}
            />
            <Setting
                name='Open'
                action={() => console.log('open')}
            />
            <Setting
                name='List'
                action={() => console.log('List')}
            />
        </div>
    );
};

export default Settings;