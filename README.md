# Differential Equations Learning Lab

A beginner-friendly, interactive learning app for the foundations of first-order ordinary differential equations.

## Features

- Four guided modules: introduction, variable separable equations, first-order linear equations, and integrating factor method.
- Step-by-step worked examples.
- Four-question quiz with instant feedback.
- Formula reference sheet.
- Lesson completion tracker saved in the browser with `localStorage`.
- Responsive layout for desktop, tablet, and mobile.
- No backend, build tools, or package installation required.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.

## Publish with GitHub Pages

1. Create a new GitHub repository (for example, `differential-equations-learning-lab`).
2. Upload `index.html`, `styles.css`, `script.js`, and this `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish the site. The public URL will appear in the Pages settings.

## Project structure

```text
differential-equations-learning-lab/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Notes on the mathematics

This project currently introduces selected first-order ODE methods. It is an educational guide, not a symbolic algebra system. The separable example includes the zero solution as well as the exponential family. In the integrating-factor module, the standard form is `dy/dx + P(x)y = Q(x)`, with `IF = e^(integral P(x) dx)`.

## Customise it

- Add lesson content in the `lessons` object in `script.js`.
- Add quiz questions to the `questions` array in `script.js`.
- Adjust colours, spacing, and typography in `styles.css`.
- Update the page title and description in `index.html`.

## License

MIT — feel free to use, modify, and share this project.
