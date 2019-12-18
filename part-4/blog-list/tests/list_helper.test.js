const listHelper = require('../utils/list_helper')
const blogData = require('../utils/dummy_data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty it returns 0', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([blogData[0]]);
    expect(result).toBe(blogData[0].likes);
  });
  test('when list has multiple blogs equals the sum of likes of each blog', () => {
    const result = listHelper.totalLikes(blogData);
    expect(result).toBe(36);
  });
  test('when list has blogs with no likes equals the sum of likes of each blog', () => {
    delete blogData[0].likes; // equals to 7
    const result = listHelper.totalLikes(blogData);
    expect(result).toBe(29);
  });
})

describe('favoriteBlog', () => {
  test('when list has multiple blogs equals blog with more likes', () => {
    const result = listHelper.favoriteBlog(blogData);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    });
  });
});

describe('mostBlogs', () => {
  test('when list is empty equals empty object', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });
  test('when list has multiple blogs equals the author with more blogs', () => {
    const result = listHelper.mostBlogs(blogData);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});
