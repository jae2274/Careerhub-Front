<script>
  import {link} from "svelte-spa-router";
  import {getMatchJob} from "~/view/my/match-job/api";
  import {encodeQuery} from "~/components/query/utils";
  import Layout from "~/components/my/Layout.svelte";

  const matchJobProms = getMatchJob().then((res) => {
    res.conditions.forEach((condition) => {
      const categoriesBySite = {};
      condition.query.categories.forEach((category) => {
        if (!categoriesBySite[category.site]) {
          categoriesBySite[category.site] = [];
        }
        categoriesBySite[category.site].push(category.categoryName);
      });

      const categories = [];
      for (const site in categoriesBySite) {
        categories.push({
          site,
          categoryNames: categoriesBySite[site],
        });
      }

      condition.query.categoriesBySite = categories;
    });

    return res;
  });
</script>

<Layout>
  <div slot="content">
    {#await matchJobProms}
      <span>Loading...</span>
    {:then matchJob}
      <div
        style="background: rgb(255, 255, 255); margin: 0px auto; padding: 0px; width: 100%; max-width: 600px; box-sizing: border-box;"
      >
        <table
          align="center"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style="margin: 0px; padding: 0px; max-width: 600px; background: rgb(255, 255, 255);"
        >
          <tbody
            ><tr> </tr><button>
              <a use:link href="/my/match-job/add">추가</a>
            </button>
            <tr
              ><td style="background: rgb(255, 255, 255);padding: 0px 2px 0px;"
                ><table
                  width="100%"
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tbody
                    ><tr
                      ><td
                        align="center"
                        style="background: rgb(255, 255, 255);"
                        ><table
                          width="520"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          style="border: 0px;"
                        >
                          <tbody
                            ><tr
                              ><td
                                height="1"
                                style="background-color: rgb(228, 228, 228);"
                              ></td></tr
                            >
                            {#each matchJob.conditions as condition}
                              <tr>
                                <td align="left"
                                  ><a
                                    href="https://dev-careerhub.jyo-liar.com/#/job_posting/jumpit/21807"
                                    ><table
                                      width="520"
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="border: 0px;"
                                    >
                                      <tbody
                                        ><tr
                                          ><td
                                            ><table
                                              width="320"
                                              align="left"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="border: 0px;"
                                            >
                                              <tbody
                                                ><tr><td height="12px"></td></tr
                                                >

                                                {#each condition.query.categoriesBySite as category}
                                                  <tr
                                                    ><td
                                                      style="font-size: 13px; line-height: 22px; color: yellowgreen; font-weight: 400; letter-spacing: -1px; margin: 0px; padding: 0px; font-family: &quot;Apple SD Gothic&quot;, &quot;Nanum Gothic&quot;, sans-serif;"
                                                      >{category.site}: {#each category.categoryNames as categoryName, i}
                                                        {#if i != 0}
                                                          &nbsp;/&nbsp;
                                                        {/if}
                                                        {categoryName}
                                                      {/each}
                                                    </td>
                                                  </tr>
                                                {/each}
                                                <tr
                                                  ><td
                                                    style="font-size: 13px; line-height: 22px; color: teal; font-weight: 400; letter-spacing: -1px; margin: 0px; padding: 0px; font-family: &quot;Apple SD Gothic&quot;, &quot;Nanum Gothic&quot;, sans-serif;"
                                                    >경력 {condition.query
                                                      .minCareer} ~ {condition
                                                      .query.maxCareer}</td
                                                  ></tr
                                                >
                                                <tr><td height="16px"></td></tr>
                                                <tr
                                                  ><td
                                                    style="font-size: 12px; line-height: 20px; color: rgb(0, 0, 0); font-weight: 500; letter-spacing: -1px; margin: 0px; padding: 0px; font-family: &quot;Apple SD Gothic&quot;, &quot;Nanum Gothic&quot;, sans-serif;"
                                                  >
                                                    {#each condition.query.skillNames as skillNames}
                                                      <span
                                                        style="background: rgb(244, 244, 244); padding: 4px 8px; border-radius: 4px; margin-right: 6px;"
                                                        >{#each skillNames as skillName, i}{#if i != 0}
                                                            &nbsp;/&nbsp;
                                                          {/if}{skillName}{/each}</span
                                                      >
                                                    {/each}
                                                  </td></tr
                                                >
                                                <tr><td height="16px"></td></tr
                                                ></tbody
                                              >
                                            </table></td
                                          >
                                          <td style="vertical-align: top;"
                                            ><button
                                              ><a
                                                use:link
                                                href="/my/match-job/edit/{condition.conditionId}?encoded_query={encodeQuery(
                                                  condition.query
                                                )}">변경</a
                                              ></button
                                            ></td
                                          ></tr
                                        ></tbody
                                      >
                                    </table></a
                                  ></td
                                >
                              </tr>
                              <tr
                                ><td
                                  height="1"
                                  style="background-color: rgb(228, 228, 228);"
                                ></td>
                              </tr>
                            {/each}
                          </tbody>
                        </table></td
                      ></tr
                    ></tbody
                  >
                </table></td
              ></tr
            ></tbody
          >
        </table>
        <div class="yj6qo"></div>
        <div class="adL"></div>
      </div>
    {/await}
  </div>
</Layout>
