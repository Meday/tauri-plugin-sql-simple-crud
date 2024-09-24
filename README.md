## Tauri + SvelteKit

### Stack
Server : Bun
Frontend => SvelteKit : Typescript, Skeleton UI, Tailwind, PostCss
Backend => Tauri : Rust, SqlLite

### Setup

https://v1.tauri.app/v1/guides/getting-started/setup/sveltekit/

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/)
- [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)
- [TailWindCss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [PostCss](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

### Run the app in dev mode

```
bunx tauri dev
```

### Compile for production

```
bunx tauri build
```

> This command builds the app in the `src-tauri/target/release/` directory.
