const updateCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#edit-comment_text').value;
    const commentId = document.querySelector('#idvalue').value;
    const postId = document.querySelector('#postId').value;

    if(comment_text) {
        const response = await fetch(`/api/users/updateComment/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({ comment_text }),
            headers: { 'Content-Type': 'application/json'},
        });
        if(response.ok) {
            document.location.replace(`/homepage/post/${postId}`);
        } else {
            alert('Failed to update comment');
        }
    }
}

document.querySelector('.edit-comment-form').addEventListener('submit', updateCommentFormHandler);