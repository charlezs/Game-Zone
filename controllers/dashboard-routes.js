const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      //ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      //adding in img
      // 'img_url',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      //adding in img
      // 'img_url',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});









// async function uploadToCloudinary(locaFilePath) {
//   var mainFolderName = "main";

//   var filePathOnCloudinary =
//     mainFolderName + "/" + locaFilePath;

//   return cloudinary.uploader
//     .upload(locaFilePath)
//     .then((result) => {
//       fs.unlinkSync(locaFilePath);

//       return {
//         message: "Success",
//         url: result.url,
//       };
//     })
//     .catch((error) => {

//       // Remove file from local uploads folder
//       fs.unlinkSync(locaFilePath);
//       return { message: "Fail" };
//     });
// }

// function buildSuccessMsg(urlList) {

//   // Building success msg to display on screen
//   var response = `<h1>
//                  <a href="/">Click to go to Home page</a><br>
//                 </h1><hr>`;
//   for (var i = 0; i < urlList.length; i++) {
//     response += "File uploaded successfully.<br><br>";
//     response += `FILE URL: <a href="${urlList[i]}">
//                   ${urlList[i]}</a>.<br><br>`;
//     response += `<img src="${urlList[i]}" width="200" height="200"/><br><hr>`;
//   }

//   response += `<br>
// <p>Now you can store this url in database or 
// // do anything with it  based on use case.</p>
// `;
//   return response;
// }

// // router.post(
// //     "/upload",
// //     upload.single('profile-file'),
// //     async(req, res, next) => {
// //         console.log(JSON.stringify(req.file));
// //         var locaFilePath = req.file.path;
// //         var result = await uploadToCloudinary(locaFilePath);
// //         var response = buildSuccessMsg([result.url]);
// //         return res.send(response);
// //     }
// // );
// router.post(
//   "/",
//   upload.single('profile-file'),
//   async (req, res, next) => {
//     console.log(JSON.stringify(req.file));
//     var localFilePath = req.file.path;
//      var result = await uploadToCloudinary(localFilePath);
//     //  var response = buildSuccessMsg([result.url]);
//     return res.send(result);

//   });


module.exports = router;