import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import groupBy from "lodash.groupby"
import { Box } from "lib"

export function Sidenav() {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          internal: { mediaType: { eq: "text/mdx" } }
          sourceInstanceName: { eq: "components" }
        }
      ) {
        nodes {
          id
          childMdx {
            slug
            frontmatter {
              group
            }
          }
        }
      }
    }
  `)

  const groupedPages = React.useMemo(
    () => groupBy(data.allFile.nodes, node => node.childMdx.frontmatter.group),
    [data]
  )

  return (
    <Box as="nav" p={4}>
      {Object.entries(groupedPages).map(([group, pages]) => (
        <React.Fragment>
          {group !== "null" ? <strong>{group}</strong> : null}
          <ul>
            {pages.map(page => (
              <li key={page.id}>
                <a href={`/${page.childMdx.slug}`}>{page.childMdx.slug}</a>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </Box>
  )
}
