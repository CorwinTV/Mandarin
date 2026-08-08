Contributing to Mandarin

Thanks for your interest in contributing!

This is a small unofficial fan tool for Warframe Mandachord.  
Contributions are welcome, but please keep the scope focused.

How to contribute

Fork the repository
Create a new branch (git checkout -b feature/your-feature)
Make your changes
Test locally (serve the docs/ folder over HTTP)
Open a Pull Request

Local development

Serve the site locally (required for WASM / modules)
npx serve docs
or
python -m http.server -d docs

Open the printed URL and hard-refresh after changes (Ctrl+Shift+R).

Rust / WASM part

The core logic lives in mandachord_core/.  
If you change Rust code, rebuild the WASM package and update docs/pkg/.

What we accept

Bug fixes
UI/UX improvements
Better note detection / grid placement
Documentation improvements
Dependency updates

What we usually don't accept

Commercial use of Warframe assets
Large unrelated features
Breaking changes without discussion

Pull Requests

Keep PRs focused and small when possible
Describe what you changed and why
Make sure the site still works after your changes

Code style

Keep the existing style
Prefer clear and simple code
Comments in English

Questions

Open an Issue if you want to discuss a bigger change before implementing it.

License

By contributing, you agree that your contributions will be licensed under the MIT License.
