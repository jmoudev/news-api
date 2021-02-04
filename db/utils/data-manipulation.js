exports.formatArticlesData = rawData => {
  const formattedData = rawData.map(data => {
    const newData = { ...data };

    newData.created_at = new Date(data.created_at);
    return newData;
  });

  return formattedData;
};

exports.formatCommentsData = (commentsArr, articleLookup) => {
  const formattedComments = commentsArr.map(comment => {
    const newComment = { ...comment };

    newComment.article_id = articleLookup[comment.belongs_to];
    delete newComment.belongs_to;

    newComment.username = comment.created_by;
    delete newComment.created_by;

    newComment.created_at = new Date(comment.created_at);

    return newComment;
  });

  return formattedComments;
};

exports.createArticleLookup = articlesArr => {
  const lookup = {};

  articlesArr.forEach(article => {
    lookup[article.title] = article.article_id;
  });

  return lookup;
};
