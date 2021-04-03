const statsOnly = (arrObj) => {
  const allLinks = arrObj.map((elem) => elem.href);
  const uniqueLinks = (new Set(allLinks)).size;
  return `Total: ${allLinks.length}, Unique: ${uniqueLinks}`;
};

const brokenLinks = (arrObj) => {
  const failedLinks = arrObj.filter((elem) => elem.message === 'FAIL');
  return `Broken: ${failedLinks.length}`;
};

module.exports = {
  statsOnly,
  brokenLinks,
};
