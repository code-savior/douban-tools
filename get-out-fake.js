const groupid = 648540;//小组id，需要替换
const page = 5;//需要过滤的总页数，可根据需求调整，每页所需时间30秒左右

var filterArticles = [];

const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const filterPageArticles = (articlesIndex, href) => {
  console.log(`page${articlesIndex} - href`, href);
  fetch(href)
    .then(function (response) {
      // When the page is loaded convert it to text
      return response.text();
    })
    .then(async function (html) {
      // Initialize the DOM parser
      var parser = new DOMParser();

      // Parse the text
      var doc = parser.parseFromString(html, "text/html");

      // You can now even select part of that html as you would in the regular DOM
      // Example:
      // var docArticle = doc.querySelector('article').innerHTML;
      var articlesnodelist = doc.querySelectorAll(
        'table[class="olt"] tr[class=""]'
      );
      var articles = Array.apply(null, articlesnodelist);
      var newarticles = await asyncFilter(articles, async (article, index) => {
        var href = article.children[1].querySelector("a").href;
        await sleep(1000 * index);
        const hasfocus = await fetch(href)
          .then(function (response) {
            return response.text();
          })
          .then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var focusNum = doc.querySelector('p[class="rev-link"] a').innerHTML;
            focusNum = focusNum.match(/(\S*)被(\S*)人关注/)[2];
            return focusNum > 0;
          })
          .catch(function (err) {
            console.log("Failed to fetch items page: ", err);
          });
        return hasfocus;
      });
      filterArticles = filterArticles.concat(newarticles);
      console.log(`page${articlesIndex}, filterArticles`, filterArticles);

      if (articlesIndex == page) {
        console.log("Filter done!!!");
        var trs = document.querySelectorAll(
          'table[class="olt"] tr[class=""]'
        );
        Array.prototype.forEach.call(trs, function (node) {
          node.parentNode.removeChild(node);
        });
        var tbody = document.querySelector(
          'table[class="olt"] tbody'
        );
        Array.prototype.forEach.call(filterArticles, function (node) {
          var aNodes = node.querySelectorAll('td a');
          Array.prototype.forEach.call(aNodes, function (aNode) {
            aNode.target='_blank';
          });
          tbody.appendChild(node);
        });
      }
    })
    .catch(function (err) {
      console.log("Failed to fetch articles page: ", err);
    });
};

async function main() {
  for (var i = 0; i < page; i++) {
    var href = `https://www.douban.com/group/${groupid}/discussion?start=${25 * i
      }`;
    filterPageArticles(i + 1, href);
    console.log(`time: ${new Date().toLocaleTimeString()}, page: ${i + 1}`);
    if (i + 1 < page) {
      await sleep(25000);
    }
  }
}

main();
