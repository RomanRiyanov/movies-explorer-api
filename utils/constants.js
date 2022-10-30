const INPUT_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

const regLink = /^http(s)?:\/\/(www.)?([0-9A-Za-z.:%_/+\-#=]+)+(.[a-zA-Z]{2,3})(\/[0-9A-Za-z.@:%_/+\-#=]+)*$/;
const LinkRegExp = new RegExp(regLink);

module.exports = {
  INPUT_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  LinkRegExp,
};
