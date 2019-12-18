const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((sum,blog) => blog.likes ? sum + blog.likes : sum + 0, 0);
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => {
    if( prev.likes > current.likes) {
      return prev;
    }
    return {
      title: current.title,
      author: current.author,
      likes: current.likes
    };
  }, { likes: -1 });
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
