class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.querystr };
    const remove = ["keyword", "page", "limit"];
    remove.forEach((key) => delete queryCopy[key]);
    //this.query = this.query.find(queryCopy);
    console.log(queryCopy)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(queryStr)
    return this;
  }
  pagination(resultPerPage) {
    let currentPage = Number(this.queryStr.page) || 1;

    let skip = resultPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }
}
module.exports = ApiFeatures;
