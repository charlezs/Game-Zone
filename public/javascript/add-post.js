

async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_url,
            // img_url
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

// var file = {}
//to preview image before it is uploaded-triggered on choose file button
// var loadFile = function(event) {
//     var output = document.getElementById('img-preview');
//     file=event.target.files[0]
//     output.src= URL.createObjectURL(event.target.files[0]);
//     output.onload = function() {
//         URL.revokeObjectURL(output.src)
//     }
// };




// var uploadToCloudinary= function(event) {
//     event.preventDefault();
//     var formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_present', CLOUDINARY_UPLOAD_PRESET);
//     console.log(formData),
//     console.log(file);

//     axios({
//         url: CLOUDINARY_URL,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         data: formData
//     })
//     .then(function(res) {
//         console.log(res);
//     })
//     .catch(function(err){
//         console.error(err);
//     })
  
    // return cloudinary.uploader.upload(output.src).then((result)=>{
    //     console.log(result);
    //     return{
    //         message: "Success",
    //         url: result.url,
    //     };
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     res.status(500).json(err);
    //   });
// }

// function imgFormHandler(event) {
//     event.preventDefault();
//     var file = event.target.files[0];
//     console.log(file);
// };



// document.getElementById('upload').addEventListener('click', uploadToCloudinary);
// document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);


/* <input type="file" accept="image/*" onchange="loadFile(event)" name="profile-file" id="choose-file" Required/>
      <div>
        <input type="submit" value:"Upload" id="upload" />
      </div> */