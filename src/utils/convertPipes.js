const cheerio = require("cheerio");

const filterMap = {
  Number: "format_number",
  Currency: "format_currency",
  Date: "format_date"
};

const convertElementToPipe = $elem => {
  const { pipe, id, type } = $elem.data();
  const filter = filterMap[type];
  let inner = `${pipe}.answer-${id}`;

  if (filter) {
    inner += `|${filter}`;
  }

  return `{{${inner}}}`;
};

const parseHTML = (html = "") => {
  return cheerio.load(html)("body");
};

const convertPipes = html => {
  if (!html) {
    return html;
  }

  const $ = parseHTML(html);

  $.find("[data-pipe]").each((i, elem) => {
    const $elem = cheerio(elem);
    $elem.replaceWith(convertElementToPipe($elem));
  });

  return $.html();
};

module.exports = convertPipes;
