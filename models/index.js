// import all models
const Post = require('./Post');
const User = require('./User');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  // onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',

  foreignKey: 'user_id',
  // onDelete: 'SET NULL'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  // onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  // onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  // onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id',
  // onDelete: 'cascade'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id',
  // onDelete: 'cascade'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

module.exports = { User, Post, Vote, Comment };
