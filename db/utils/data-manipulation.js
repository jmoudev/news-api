// extract any functions you are using to manipulate your data, into this file
//formatArticlesData
//
// 1471522072389 milliseconds from 1970

// 946684800000 milliseconds between 1970 and 2000

exports.formatArticlesData = (rawData) => {

    const formattedData = rawData.map(data => {
        const newData = { ...data };
        const newDate = new Date(data.created_at)
        console.log(newDate)
        newData.created_at = newDate
        return newData
    })
    return formattedData;
}

