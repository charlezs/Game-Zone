const router = require('express').Router();
const { Post, User, Vote, Comment } = require("../../models");
const sequelize = require('../../config/connection');
const upload = require('../../utils/multer');
const cloudinary = require('../../utils/cloudinary');
const fs = require("fs");

// get all users
router.get('/', (req, res) => {
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'post_url',
      'title',
      'created_at',
      // Bring up image in post
      'img_url',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      // include the Comment model here:
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
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        // Adding in image
        'img_url',
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id,
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/upvote', (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

  router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });










  async function uploadToCloudinary(locaFilePath) {
    var mainFolderName = "main";
  
    var filePathOnCloudinary =
      mainFolderName + "/" + locaFilePath;
  
    return cloudinary.uploader
      .upload(locaFilePath)
      .then((result) => {
        fs.unlinkSync(locaFilePath);
  
        return {
          message: "Success",
          url: result.url,
        };
      })
      .catch((error) => {
  
        // Remove file from local uploads folder
        fs.unlinkSync(locaFilePath);
        return { message: "Fail" };
      });
  }
  
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
  
  // router.post(
  //     "/upload",
  //     upload.single('profile-file'),
  //     async(req, res, next) => {
  //         console.log(JSON.stringify(req.file));
  //         var locaFilePath = req.file.path;
  //         var result = await uploadToCloudinary(locaFilePath);
  //         var response = buildSuccessMsg([result.url]);
  //         return res.send(response);
  //     }
  // );
  router.post(
    "/image",
    upload.single('profile-file'),
    async (req, res, next) => {
      console.log(JSON.stringify(req.file));
      var localFilePath = req.file.path;
       var result = await uploadToCloudinary(localFilePath);
     
      return res.send(result);
  
    });
  
  
  module.exports = router;




































  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;
