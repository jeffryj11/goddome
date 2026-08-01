export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const StoriesPartsFragmentDoc = gql`
    fragment StoriesParts on Stories {
  __typename
  title
  category
  author
  date
  readTime
  image
  hebrew_scripture
  christian_scripture
  themes
  summary
  excerpt
  draft
  body
}
    `;
export const StoriesDocument = gql`
    query stories($relativePath: String!) {
  stories(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StoriesParts
  }
}
    ${StoriesPartsFragmentDoc}`;
export const StoriesConnectionDocument = gql`
    query storiesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StoriesFilter) {
  storiesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StoriesParts
      }
    }
  }
}
    ${StoriesPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    stories(variables, options) {
      return requester(StoriesDocument, variables, options);
    },
    storiesConnection(variables, options) {
      return requester(StoriesConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
