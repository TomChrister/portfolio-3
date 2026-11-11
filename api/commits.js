// Vercel function: total GitHub commits across all years. Needs GITHUB_TOKEN (read:user) in Vercel env.
const LOGIN = "TomChrister";

async function gql(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}`, "User-Agent": "portfolio" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? res.status));
  return json.data;
}

export async function GET() {
  try {
    const { user } = await gql(
      `query($login:String!){ user(login:$login){ contributionsCollection{ contributionYears } } }`,
      { login: LOGIN }
    );
    const years = await Promise.all(
      user.contributionsCollection.contributionYears.map((year) =>
        gql(
          `query($login:String!,$from:DateTime!,$to:DateTime!){ user(login:$login){
            contributionsCollection(from:$from,to:$to){ totalCommitContributions restrictedContributionsCount } } }`,
          { login: LOGIN, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` }
        )
      )
    );
    // shortcut: restrictedContributionsCount counts all private contributions, not only commits
    const total = years.reduce((sum, d) => {
      const c = d.user.contributionsCollection;
      return sum + c.totalCommitContributions + c.restrictedContributionsCount;
    }, 0);
    return Response.json({ total }, { headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate" } });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "github request failed" }, { status: 502 });
  }
}
