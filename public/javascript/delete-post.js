async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
<<<<<<< HEAD
=======
  console.log("=========================", id);
>>>>>>> 21ab0f895d0c9453eca4ea3be76691e281c49b6c
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

<<<<<<< HEAD
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
=======
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
>>>>>>> 21ab0f895d0c9453eca4ea3be76691e281c49b6c
