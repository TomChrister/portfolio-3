import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import Readme from "./Readme";

test("renders the supported markdown subset", () => {
  const html = renderToStaticMarkup(
    <Readme
      text={"# Title\n\nSome **bold**, _italic_, `code` and [Zod](https://zod.dev).\n\n- item one\n- item two"}
    />
  );
  expect(html).toContain(">Title</h2>");
  expect(html).toContain(">bold</strong>");
  expect(html).toContain(">italic</em>");
  expect(html).toContain(">code</code>");
  expect(html).toMatch(/<a href="https:\/\/zod.dev"[^>]*>Zod<\/a>/);
  expect(html.match(/<li/g)).toHaveLength(2);
  // No markdown syntax left in the visible text (class names contain brackets, so strip tags).
  expect(html.replace(/<[^>]*>/g, "")).not.toMatch(/[[\]*`_]/);
});
