const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((sum,blog) => blog.likes ? sum + blog.likes : sum + 0, 0);
}

module.exports = {
  dummy,
  totalLikes
}
