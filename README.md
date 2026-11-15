# leechristie — personal website

The site for Lee Christie: speaking, insights, about and contact.
It is a plain [Jekyll](https://jekyllrb.com) site, which GitHub Pages builds and hosts for free.
There is nothing to install: edit a file on github.com, commit, and the live site updates in about a minute.

## Putting it online (once)

1. Create a new **public** repository on GitHub and push this folder to it.
   Name it `YOUR-USERNAME.github.io` to get the address `https://YOUR-USERNAME.github.io`;
   any other name gives `https://YOUR-USERNAME.github.io/REPO-NAME/`. Both work.
2. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**, choose `main` and `/ (root)`, then Save.
3. Wait a minute and open the address shown on that page.

To use your own domain later, add it under **Settings → Pages → Custom domain**.

## Where things live

| To change… | Edit… |
| --- | --- |
| Email, LinkedIn, tagline, portrait, speaker kit, form settings | `_config.yml` |
| The talks | `_data/talks.yml` |
| Upcoming events | `_data/events.yml` |
| Past engagements | `_data/past.yml` |
| "As heard at" strip | `_data/stages.yml` |
| Organiser quotes | `_data/testimonials.yml` |
| Before-you-book questions | `_data/faq.yml` |
| Articles | `_posts/` (one file each) |
| Page wording | `index.html`, `speaking.html`, `insights.html`, `about.html`, `contact.html` |
| Header and footer | `_includes/header.html`, `_includes/footer.html` |
| Colours, type and layout | `assets/css/site.css` (colours are the variables on the first lines) |
| Pictures | `assets/img/` |

## Writing an article

Each file in `_posts/` is one article, named `YEAR-MONTH-DAY-title-with-dashes.md`. The newest date shows first.

```markdown
---
title: "Why plans stall in the quiet months"
topics: [Change]
image: sweep.webp
summary: "Launch gets the budget. Adoption gets a toolkit and an inbox."
---

Write the article here in Markdown.

## A sub-heading

More text, **bold**, [a link](https://example.com).
```

The six articles there now are titles and summaries only, marked `coming_soon: true`, so they show a
"Coming soon" badge and are not clickable. To publish one, write the text under the second `---`,
delete the `coming_soon: true` line, and set the date in the file name to the day you publish.
Add `featured: true` to the one that should sit in the big slot at the top of the Insights page.

## Things still to add

These are switched off until you fill them in, so nothing unfinished shows on the live site.

- **Portrait.** Put a photo in `assets/img/` and set `portrait:` in `_config.yml`. It appears in the Home and About heroes.
- **Speaker kit.** Put the PDF in `assets/files/` and set `speaker_kit:`. Until then the button asks people to email for it.
- **A real organiser quote.** Add one to `_data/testimonials.yml` and the quote band appears on the home page.
- **Stage photos.** The Past engagements grid uses artwork for now; swap the `image:` names in `_data/past.yml`.
- **Forms.** With no form service set, "Send enquiry" and "Subscribe" open the visitor's email app with the message
  already written. To collect submissions directly, create a form at a service such as [Formspree](https://formspree.io)
  and paste its address into `form_endpoint:` / `newsletter_endpoint:` in `_config.yml`.

## Previewing on your own computer (optional)

Needs Ruby. In this folder:

```bash
bundle install
```

```bash
bundle exec jekyll serve
```

Then open http://localhost:4000.
