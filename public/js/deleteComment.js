const deleteCommentFormHandler = async (event) => {
    event.preventDefault();

    const commentId = document.querySelector('#idValue').value;
    const postId = document.querySelector('#post_Id').value;


    const response = await fetch(`/api/users/deleteComment/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: commentId
        })
    });

    if(response.ok) {
        document.location.replace(`/homepage/post/${postId}`)
    } else {
        alert('Failed to delete comment');
    }
}

document.querySelector('.delete-comment-form').addEventListener('submit', deleteCommentFormHandler);