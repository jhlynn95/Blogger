const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const blogId = document.querySelector('#idValue').value;

    const response = await fetch(`/api/users/deletePost/${blogId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: blogId
        })
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
}

document.querySelector('.delete-form').addEventListener('submit', deletePostFormHandler);