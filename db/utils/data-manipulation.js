// extract any functions you are using to manipulate your data, into this file
//formatArticlesData
//
// 1471522072389 milliseconds from 1970

// 946684800000 milliseconds between 1970 and 2000

exports.formatArticlesData = rawData => {
  const formattedData = rawData.map(data => {
    const newData = { ...data };
    newData.created_at = new Date(data.created_at);
    return newData;
  });
  return formattedData;
};

exports.formatCommentsData = (commentsArr, articleLookup) => {
  return commentsArr.map(comment => {
    const newComment = { ...comment };

    newComment.article_id = articleLookup[newComment.belongs_to];
    delete newComment.belongs_to;

    newComment.username = newComment.created_by;
    delete newComment.created_by;

    newComment.created_at = new Date(newComment.created_at);

    return newComment;
  });
};

exports.createArticleLookup = articlesArr => {
  const lookup = {};
  articlesArr.forEach(article => {
    lookup[article.title] = article.article_id;
  });

  return lookup;
};
