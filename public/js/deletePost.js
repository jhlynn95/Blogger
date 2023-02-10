const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('#idValue').value;
console.log("post_id", postId);
    const response = await fetch(`/api/users/deletePost/${postId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: postId
        })
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
}

document.querySelector('.delete-form').addEventListener('submit', deletePostFormHandler);