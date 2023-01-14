const addPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#add-post-title').value;
    const content = document.querySelector('#add-post-content').value;

    if(title && content) {
        const response = await fetch('/api/users/addPost', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json '},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to add post.');
        }
    }
}

document.querySelector('.add-post-form').addEventListener('submit', addPostFormHandler);
