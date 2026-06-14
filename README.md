# openMindMapper

OpenMindMapper is a frontend-only, cross-platform React application for creating, editing, and growing connected mind maps.

## Features

- Accessible header with collapsible menu
- **File** submenu to import/export `.openmindmapper` JSON files
- Reset map and Light/Dark theme toggle
- English/Spanish language selector
- Hierarchical mind map (no free nodes):
  - Central node (level 0, red)
  - Child nodes connected to parent nodes
  - Level-based node coloring
- Node title/description editor (description appears after selecting a node)
- AI assistant panel with provider selection (OpenAI, Anthropic, Google Gemini)

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run test
npm run build
```
