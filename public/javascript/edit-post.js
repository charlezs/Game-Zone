

async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

function loadPage() {
    let formContainer = document.querySelector("#gameImg");
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    let html = ` 
    <form class="new-post-form" method="POST" action="/api/posts/image/${id}" enctype="multipart/form-data">
        <label>Upload Picture</label>
        <img src="{{img_url}}" id="img-preview" />
        <input type="file" accept="image/*" onchange="loadFile(event)" name="profile-file" id="choose-file" Required />

        <button type="submit" class="btn">Create</button>
    </form>`
    formContainer.innerHTML = html
    }


// // to preview image before it is uploaded-triggered on choose file button
var loadFile = function (event) {
    var output = document.getElementById('img-preview');
    file = event.target.files[0]
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src)
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

loadPage()