/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const fetch = require("node-fetch");

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () =>
  console.log("Loaded plugin: gatsby-source-microsoft-learn-catalog");

/**
 * Fetches the Microsoft Learn Catalog Data from the API
 * See: https://docs.microsoft.com/api/learn/catalog/
 */

const CATALOG_URL = `https://docs.microsoft.com/api/learn/catalog/`;

/**
 * NOTE: these type name constants are currently expected to be the singular form of the collection name in JSON.
 * e.g. certification => { 'certifications': [{ ... }]} }
 * exam => { 'exams': [{ ... }]} }
 * ...
 */
const CERTIFICATION_NODE_TYPE = `certification`;
const LEARNINGPATH_NODE_TYPE = `learningPath`;
const MODULE_NODE_TYPE = `module`;
const UNIT_NODE_TYPE = `unit`;
const EXAM_NODE_TYPE = `exam`;
const COURSE_NODE_TYPE = `course`;
const LEVEL_NODE_TYPE = `level`;
const ROLE_NODE_TYPE = `role`;
const PRODUCT_NODE_TYPE = `product`;

const NODE_TYPES = [
  CERTIFICATION_NODE_TYPE,
  LEARNINGPATH_NODE_TYPE,
  MODULE_NODE_TYPE,
  UNIT_NODE_TYPE,
  EXAM_NODE_TYPE,
  COURSE_NODE_TYPE,
  LEVEL_NODE_TYPE,
  ROLE_NODE_TYPE,
  PRODUCT_NODE_TYPE,
];

// store the response from the API in the cache
const locale = "en-us"; // TODO: make this configurable
const cacheKey = `mslearn-catalog-data-${locale}`;
const CLEAR_CACHE = false;

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, getNodesById, getNode, cache },
  pluginOptions
) => {
  const { createNode } = actions;

  let sourceData = await cache.get(cacheKey);

  // fetch fresh data if nothing is found in the cache or a plugin option says not to cache data
  if (!sourceData || !pluginOptions.cacheResponse || CLEAR_CACHE) {
    console.log(
      `Fetching fresh data from the MS Learn API for locale: ${locale}`
    );
    await cache.set(cacheKey, null);

    // The actual API call is just a HTTPS GET request to the catalog endpoint URL
    sourceData = await fetch(`${CATALOG_URL}`); //?locale=${locale}`);
    sourceData = await sourceData.json();

    await cache.set(cacheKey, sourceData);
  }
  try {
    // For each node type, create all nodes
    NODE_TYPES.forEach((nodeType) => {
      // sourceData keys for the different collections are in the form "${nodeType}s" (note the plural-s)
      // e.g.  'certification' ==>  collectionName = 'certifications'
      let collectionName = `${nodeType}s`;

      sourceData[collectionName].forEach((node) => {
        createNode({
          ...node,
          // Note: we will always link to the `id` field.
          // Types that have a "uid" field insted (coming from the API), will get their id set  - id = uid
          id: node.uid ? node.uid : node.id,

          parent: null,
          children: [],
          internal: {
            type: nodeType,
            content: JSON.stringify(node),
            contentDigest: createContentDigest(node),
          },
        });
      });
    });
  } catch (e) {
    console.log(e);
    console.log(`Error creating nodes: ${e}, invalidating cache...`);
    await cache.set(cacheKey, null);
  }

  return;
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Establish "by-id" relationships between nodes

  createTypes(`
    type module implements Node {
        levels: [level!] @link( by: "id" )
        roles: [role!] @link( by: "id" )
        
        products: [product!] @link( by: "id" )
        units: [unit!] @link( by: "id" )
    }
  
    type unit implements Node {
        uid: ID!
    }

    type learningPath implements Node {
        levels: [level!] @link( by: "id" )
        roles: [role!] @link( by: "id" )

        products: [product!] @link( by: "id" )
        modules: [module!] @link( by: "id" )
    }

    type certification implements Node {
        
        levels: [level!] @link( by: "id" )
        roles: [role!] @link( by: "id" )
        exams: [exam!] @link( by: "id"  )

    }
    
 
    type exam implements Node {
        courses: [course!] @link( by: "id" )
        levels: [level!] @link( by: "id" )
        roles: [role!] @link( by: "id" )
        products: [product!] @link( by: "id" )
    }

    

    type course implements Node {
        exam: exam @link( by: "id" )
        certification: certification @link( by: "id" )
        levels: [level!] @link( by: "id" )
        roles: [role!] @link( by: "id" )
        products: [product!] @link( by: "id" )
    }

    type level implements Node {
        id: ID!
    }
      
    type role implements Node {
        id: ID!
    }

    type product implements Node {
        id: ID!
        name: String!
        children: [product!]
    }

`);
};

exports.onPostBuild = async ({ cache }) => {
  //console.log (`Cached value: ${cachedValue}`);
};
