const { buildLinks, buildSelfLink } = require('./build-links');

const buildItemsResponse = ({ items, limit, offset, total, req, pretty }) => {
  const result = {
    items: items
      .slice(offset, offset > 0 ? offset + limit : limit)
      .map((item) => ({
        ...item,
        _links: buildSelfLink({ id: item.id, req })
      })),
    _total: total,
    _links: buildLinks({ limit, offset, total, req })
  };

  return pretty ? JSON.stringify(result, null, 4) : result;
};

const buildItemResponse = ({ item, req, pretty }) => {
  const result = {
    ...item,
    _links: buildSelfLink({ req })
  };

  return pretty ? JSON.stringify(result, null, 4) : result;
};

module.exports = {
  buildItemResponse,
  buildItemsResponse
};
