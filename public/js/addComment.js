const addCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment_text-add-comment').value;
    const blog_id = document.querySelector('#blog_id').value;

    if(comment_text && blog_id) {
        const response = await fetch('/api/users/addComment', {
            method: 'POST',
            body: JSON.stringify({ comment_text, blog_id}),
            headers: { 'Content-Type': 'application/json '},
        });

        if(response.ok) {
            document.location.reload();
        }
        else {
            alert('Failed to add comment.');
        }
    }
}

document.querySelector('.add-comment-form').addEventListener('submit', addCommentFormHandler);
