/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, order) => {
    return sum + order.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {

  if (blogs.length > 0) {
    const result = blogs.reduce((previous, current) => {
      return (previous.likes > current.likes) ? previous : current
    })
    return {
      title : result.title,
      author: result.author,
      likes: result.likes
    }
  }
  else return undefined
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(name => name = name.author)
  const result = []

  for (i=0; i<authors.length; i++) {
    const temp = result.map(name => name = name.author)

    if (!temp.includes(authors[i])) {
      result.push({ author: authors[i], blogs: 1 })
    }
    else {
      const index = temp.findIndex(name => name === authors[i])
      result[index] = { author: result[index].author, blogs: result[index].blogs+1 }
    }
  }

  return  result.reduce((prev,curr) => {
    return (prev.blogs > curr.blogs) ? prev : curr
  })
}

const mostLikes = (blogs) => {
  const results = []

  for (i=0; i<blogs.length; i++) {
    const temp = results.map(name => name = name.author)

    if (!temp.includes(blogs[i].author)) {
      results.push(blogs[i])
    }
    else {
      const index = temp.findIndex(name => name === blogs[i].author)
      results[index] = { author: results[index].author, likes: results[index].likes + blogs[i].likes }
    }
  }

  return results.reduce((prev,curr) => {
    return (prev.likes > curr.likes) ? prev : curr
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}