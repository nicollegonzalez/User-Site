const { format, parse } = require('url');
const { join } = require('path');

const buildLinks = ({ id, limit, offset = 0, total, req }) => {
  const { protocol, originalUrl } = req;
  const { pathname, query } = parse(originalUrl, true);
  const buildHref = (limit, offset) => format({
    protocol,
    host: req.get('host'),
    pathname,
    query: {
      ...query,
      limit,
      offset
    }
  });

  return {
    previous: {
      href: offset === 0 ? null : buildHref(limit, Math.max(0, offset - limit))
    },
    next: {
      href: offset + limit >= total ? null : buildHref(limit, offset + limit)
    }
  }
};

const buildSelfLink = ({ id, req }) => {
  const { protocol, originalUrl } = req;
  const { pathname, query } = parse(originalUrl, true);

  return {
    self: {
      href: format({
        protocol,
        host: req.get('host'),
        pathname: join(pathname, (id || '').toString()),
        query
      })
    }
  }
};

module.exports = {
  buildLinks,
  buildSelfLink
};
