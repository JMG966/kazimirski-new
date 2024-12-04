const captureViewportPosition = () => {
    const position = {
        x: window.scrollX,
        y: window.scrollY
    };
    return position;
};

const restoreViewportPosition = (position) => {
    if (position) {
        window.scrollTo({
            left: position.x,
            top: position.y,
            behavior: 'instant'
        });
    }
};

const focusRacine = (ref) => {
    if (ref?.current) {
        ref.current.scrollIntoView({
            behavior: 'instant',
            block: 'start'
        });
    }
};

module.exports = {
    captureViewportPosition,
    restoreViewportPosition,
    focusRacine
};
