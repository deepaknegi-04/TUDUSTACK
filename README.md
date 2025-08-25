## Environment variables

Create a `.env` file in this directory (same level as `package.json`) and set:

```
VITE_API_BASE=http://localhost:3000
```

At runtime, the app reads this via `import.meta.env.VITE_API_BASE` (see `src/config.js`).


