/* eslint-disable quotes */
const _ = require('lodash')

const dummy = () => {
  return 1
}


//
// Summary: Returns the sum of the likes from an array of blogs
const totalLikes = (blogs) => {
  return blogs.reduce((sumLikes, blog) => {
    return sumLikes + blog.likes
  }, 0)
}


//
// Summary: Return the blog with the most likes from an array of blogs
const mostLikes = (blogs) => {
  if(blogs.length ===  0) { //hanldes empty array
    return null
  }

  return blogs.reduce((favouriteBlog, blog) => {
    //Long-form
    // if(favouriteBlog.likes < blog.likes) {
    //   return blog
    // }
    // return favouriteBlog

    //Short-form
    return favouriteBlog.likes < blog.likes ? blog : favouriteBlog
  }, blogs[0])
}


//
// Summary: returns the author that has the largest amount of blogs
const mostBlogs = (blogs) => {
  const authors =  blogs.map(blog => blog.author) // extract only author names in new array
  const authorsCountObject = _.countBy(authors) //count frequency of author names, and return object with author name and freq

  const authorsCountArray = Object.entries(authorsCountObject) // convert object into an array of arrays
  const mostArticlesAuthor = authorsCountArray.reduce((mostArticlesAuthor, author) => {
    // eslint-disable-next-line no-unused-vars
    const [maxName, maxCount] = mostArticlesAuthor  //deconstruct array
    // eslint-disable-next-line no-unused-vars
    const [name, count] = author //deconstruct array
    return maxCount < count ? author : mostArticlesAuthor
  }, ['', 0])

  return { author: mostArticlesAuthor[0], blogs: mostArticlesAuthor[1] }
}

//  This is a more elegant way to write it - commented out as it isn't my code
// const mostBlogs = (blogs) => {
//   const authorsCount = blogs.reduce((count, blog) => {
//     count[blog.author] = (count[blog.author] || 0) + 1
//     return count
//   }, {})

//   const [mostArticlesAuthor, blogsCount] = Object.entries(authorsCount)
//     .reduce(([maxAuthor, maxCount], [author, count]) => {
//       return count > maxCount ? [author, count] : [maxAuthor, maxCount]
//     }, ['', 0])

//   return { author: mostArticlesAuthor, blogs: blogsCount }
// }


const authorMostLikes = (blogs) => {
  const authorLikes = blogs.reduce((authorLikes, blog) => {
    if(!authorLikes[blog.author]) { //if author hasn't been added as property, then initialize prop with blog.likes
      authorLikes[blog.author] = blog.likes
    } else { // if author exists, add blog likes to overall likes
      authorLikes[blog.author] += blog.likes
    }

    return authorLikes
  }, {})

  const maxAuthorLikes = Object.entries(authorLikes)
    .reduce((maxAuthorLikes, author) => {
      const [maxName, maxLikeCount] = maxAuthorLikes //deconstruct array
      const [name, likeCount ] = author //deconstruct array
      if (maxLikeCount < likeCount) {
        maxAuthorLikes = author
      }

      return maxAuthorLikes
    }, ['', 0])

  const [maxName, maxLikeCount] = maxAuthorLikes
  return { author: maxName, likes: maxLikeCount }
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  authorMostLikes
}