const reset = async () => {
    await fetch('reset');
    window.location.href = '/';
};
