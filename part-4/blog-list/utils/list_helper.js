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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  let authors = {};
  blogs.map(blog => {
    if(blog.author in authors){
      authors[blog.author] += 1;
    } else {
      authors[blog.author] = 1;
    }
  });

  let mostAuthor = [];
  Object.getOwnPropertyNames(authors).forEach(author => {
    let currentBlogs = authors[author];
    if (mostAuthor.length === 0 || currentBlogs > mostAuthor.blogs) {
      mostAuthor = {
        author: author,
        blogs: currentBlogs
      };
    }
  });
  return mostAuthor;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
