

document.querySelectorAll('.detail').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        window.location.href = url;
    });
});

document.querySelectorAll('.card-btn').forEach(button => {
    button.addEventListener('click', () => {
        const locate = button.getAttribute('data-url');
        window.location.href = locate;
    });
});
