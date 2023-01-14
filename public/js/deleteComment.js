const deleteCommentFormHandler = async (event) => {
    event.preventDefault();

    const commentId = document.querySelector('#idValue').value;
    const blogId = document.querySelector('#blog_Id').value;


    const response = await fetch(`/api/users/deleteComment/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: commentId
        })
    });

    if(response.ok) {
        document.location.replace(`/homepage/blog/${blogId}`)
    } else {
        alert('Failed to delete comment');
    }
}

document.querySelector('.delete-comment-form').addEventListener('submit', deleteCommentFormHandler);