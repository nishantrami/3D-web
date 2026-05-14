import { useEffect, useState } from 'react';

const Loader = ({ onLoaded }) => {
    const [opacity, setOpacity] = useState(1);
    const [display, setDisplay] = useState('flex');

    useEffect(() => {
        const hideTimeout = setTimeout(() => {
            setOpacity(0);
            setTimeout(() => {
                setDisplay('none');
                if (onLoaded) onLoaded();
            }, 800);
        }, 1000); // Original set to 1000 or wait for load event, we simulate basic load

        return () => clearTimeout(hideTimeout);
    }, [onLoaded]);

    return (
        <div className="loader" style={{ opacity, display, transition: 'opacity 0.8s ease' }}>
            <div className="loader-content"></div>
        </div>
    );
};

export default Loader;
