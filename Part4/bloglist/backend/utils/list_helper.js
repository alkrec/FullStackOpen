const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sumLikes, blog) => {
    return sumLikes + blog.likes
  }, 0)
}

const mostLikes = (blogs) => {
  if(blogs.length ===  0) {
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


module.exports = {
  dummy,
  totalLikes,
  mostLikes
}