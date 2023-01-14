const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-update').value;
    const content = document.querySelector('#content-update').value;
    const blogId = document.querySelector('#idvalue').value;

    if(title && content) {
        const response = await fetch(`/api/users/updatePost/${blogId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json '},
        });
        console.log(response.ok)
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    }
}

document.querySelector('.update-form').addEventListener('submit', updatePostFormHandler);
