import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './App.css'

/* ─── Icon components ─────────────────────────────────────────────────────── */

const MenuIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)
const CloseIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)
const AddIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
)
const DeleteIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
)
const FileIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" />
  </svg>
)
const ImportIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
)
const ExportIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
  </svg>
)
const ResetIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
  </svg>
)
const SunIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
  </svg>
)
const MoonIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
  </svg>
)
const TreeIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z" />
  </svg>
)
const RadialIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const AiIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.72A2 2 0 0 1 12 2zm-3 9a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z" />
  </svg>
)
const SendIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
)
const ChevronUpIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
  </svg>
)
const ZoomInIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
  </svg>
)
const ZoomOutIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
  </svg>
)
const GlobeIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)
const ConnectIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
)
const SaveIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
  </svg>
)
const WarningIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
)
const StopIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h12v12H6z" />
  </svg>
)
const CheckIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
)
const LoadingIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spin">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
)

/* ─── Types ───────────────────────────────────────────────────────────────── */

type Language = 'en' | 'es'
type Theme = 'light' | 'dark'
type AiProvider = 'OpenAI' | 'Anthropic' | 'Google Gemini' | 'Mistral' | 'Cohere' | 'Custom'
type ViewType = 'tree' | 'radial'

type MindMapNode = {
  id: string
  parentId: string | null
  title: string
  description: string
}

type MindMapDocument = {
  version: 1
  language: Language
  theme: Theme
  nodes: MindMapNode[]
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

/* ─── Constants ───────────────────────────────────────────────────────────── */

const ROOT_ID = 'central-node'
const LEVEL_COLORS = ['#d32f2f', '#1976d2', '#2e7d32', '#ed6c02', '#6a1b9a']
const RADIAL_RADIUS_STEP = 160
const RADIAL_VIEW_PADDING = 70
const RADIAL_POSITION_PRECISION = 10
const RADIAL_MAX_LABEL_LENGTH = 14
const RADIAL_SCALE_THRESHOLD = 8
const MAX_NODE_TITLE_LENGTH = 80
/** Milliseconds between each node appearing when applying AI suggestions */
const NODE_ANIMATION_DELAY_MS = 200
/** Regex matching Markdown bullet points with optional bold markers */
const BULLET_POINT_PATTERN = /^(\s*)[-*]\s+\*{0,2}([^*\n]+?)\*{0,2}\s*$/
/** Milliseconds for the connect button animation before marking connected */
const CONNECTION_ANIMATION_DURATION_MS = 700

const TEXT = {
  en: {
    appTitle: 'OpenMindMapper v1.2',
    menu: 'Menu',
    file: 'File',
    import: 'Import .openmindmapper',
    export: 'Export .openmindmapper',
    reset: 'Reset map',
    theme: 'Toggle theme',
    language: 'Language',
    view: 'View',
    viewTree: 'Tree',
    viewRadial: 'Radial',
    aiPanel: 'AI assistant',
    expandAi: 'Expand AI assistant',
    collapseAi: 'Collapse AI assistant',
    provider: 'Provider',
    apiKey: 'API key',
    endpointUrl: 'Endpoint URL (optional)',
    connect: 'Connect',
    connected: 'Connected',
    disconnected: 'Disconnected',
    askAi: 'Ask AI for mind-map suggestions',
    send: 'Send',
    mapTitle: 'Mind map',
    addChild: 'Add child node',
    removeNode: 'Delete node',
    nodeTitle: 'Node title',
    nodeDescription: 'Node description',
    nodeEdit: 'Edit node',
    newNodeTitle: 'New node',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    clickNodeHint: 'Click a node to select it.',
    centralTitle: 'Central Idea',
    childTitle: 'New node',
    invalidFile: 'Invalid .openmindmapper file.',
    connectRequired: 'Connect a provider before sending AI messages.',
    confirmDelete: 'Delete node with subnodes?',
    confirmDeleteBody: 'This node has child nodes. All subnodes will also be deleted.',
    connecting: 'Connecting…',
    connectionFailed: 'Connection failed',
    apiKeyRequired: 'API key is required.',
    endpointRequired: 'Endpoint URL is required for Custom / Local.',
    endpointInvalid: 'Please enter a valid URL.',
    endpointUrlCustom: 'Endpoint URL',
    modelNameCustom: 'Model name (optional)',
    stopAi: 'Stop',
    applyToMap: 'Add to map',
    suggestionsLabel: 'node suggestions',
    aiThinking: 'Thinking…',
  },
  es: {
    appTitle: 'OpenMindMapper v1.2',
    menu: 'Menú',
    file: 'Archivo',
    import: 'Importar .openmindmapper',
    export: 'Exportar .openmindmapper',
    reset: 'Reiniciar mapa',
    theme: 'Cambiar tema',
    language: 'Idioma',
    view: 'Vista',
    viewTree: 'Árbol',
    viewRadial: 'Radial',
    aiPanel: 'Asistente IA',
    expandAi: 'Expandir asistente IA',
    collapseAi: 'Contraer asistente IA',
    provider: 'Proveedor',
    apiKey: 'Clave API',
    endpointUrl: 'URL del endpoint (opcional)',
    connect: 'Conectar',
    connected: 'Conectado',
    disconnected: 'Desconectado',
    askAi: 'Pide sugerencias de mapa mental a la IA',
    send: 'Enviar',
    mapTitle: 'Mapa mental',
    addChild: 'Agregar subnodo',
    removeNode: 'Eliminar nodo',
    nodeTitle: 'Título del nodo',
    nodeDescription: 'Descripción del nodo',
    nodeEdit: 'Editar nodo',
    newNodeTitle: 'Nuevo nodo',
    save: 'Guardar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    clickNodeHint: 'Haz clic en un nodo para seleccionarlo.',
    centralTitle: 'Idea Central',
    childTitle: 'Nuevo nodo',
    invalidFile: 'Archivo .openmindmapper inválido.',
    connectRequired: 'Conecta un proveedor antes de enviar mensajes a la IA.',
    confirmDelete: '¿Eliminar nodo con subnodos?',
    confirmDeleteBody: 'Este nodo tiene subnodos. Todos los subnodos también serán eliminados.',
    connecting: 'Conectando…',
    connectionFailed: 'Error de conexión',
    apiKeyRequired: 'La clave API es requerida.',
    endpointRequired: 'La URL del endpoint es requerida para Custom / Local.',
    endpointInvalid: 'Ingresa una URL válida.',
    endpointUrlCustom: 'URL del endpoint',
    modelNameCustom: 'Nombre del modelo (opcional)',
    stopAi: 'Detener',
    applyToMap: 'Agregar al mapa',
    suggestionsLabel: 'sugerencias de nodos',
    aiThinking: 'Pensando…',
  },
} as const

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

const createInitialNodes = (language: Language): MindMapNode[] => [
  {
    id: ROOT_ID,
    parentId: null,
    title: TEXT[language].centralTitle,
    description: '',
  },
]

const descendantsOf = (nodes: MindMapNode[], nodeId: string): Set<string> => {
  const childrenByParent = new Map<string, string[]>()

  for (const node of nodes) {
    if (!node.parentId) {
      continue
    }

    const existing = childrenByParent.get(node.parentId) ?? []
    existing.push(node.id)
    childrenByParent.set(node.parentId, existing)
  }

  const toDelete = new Set<string>()
  const stack = [nodeId]

  while (stack.length > 0) {
    const currentId = stack.pop()

    if (!currentId || toDelete.has(currentId)) {
      continue
    }

    toDelete.add(currentId)
    const children = childrenByParent.get(currentId) ?? []

    for (const child of children) {
      stack.push(child)
    }
  }

  return toDelete
}

const getLevel = (node: MindMapNode, nodesById: Map<string, MindMapNode>): number => {
  let level = 0
  let currentNode: MindMapNode | undefined = node

  while (currentNode?.parentId) {
    const parent = nodesById.get(currentNode.parentId)

    if (!parent) {
      break
    }

    currentNode = parent
    level += 1
  }

  return level
}

const levelColor = (level: number): string => LEVEL_COLORS[level % LEVEL_COLORS.length]

const isValidDocument = (doc: unknown): doc is MindMapDocument => {
  if (!doc || typeof doc !== 'object') {
    return false
  }

  const candidate = doc as Partial<MindMapDocument>

  if (candidate.version !== 1 || !Array.isArray(candidate.nodes)) {
    return false
  }

  const nodesById = new Map(candidate.nodes.map((node) => [node.id, node]))

  if (!nodesById.has(ROOT_ID)) {
    return false
  }

  return candidate.nodes.every((node) => {
    if (
      !node ||
      typeof node.id !== 'string' ||
      typeof node.title !== 'string' ||
      typeof node.description !== 'string'
    ) {
      return false
    }

    if (node.id === ROOT_ID) {
      return node.parentId === null
    }

    return typeof node.parentId === 'string' && nodesById.has(node.parentId)
  })
}

/* ─── AI provider configs ─────────────────────────────────────────────────── */

const PROVIDER_DEFAULT_ENDPOINTS: Partial<Record<AiProvider, string>> = {
  OpenAI: 'https://api.openai.com/v1/chat/completions',
  Mistral: 'https://api.mistral.ai/v1/chat/completions',
  Anthropic: 'https://api.anthropic.com/v1/messages',
  Cohere: 'https://api.cohere.com/v2/chat',
}

const PROVIDER_DEFAULT_MODELS: Record<AiProvider, string> = {
  OpenAI: 'gpt-4o-mini',
  Anthropic: 'claude-3-haiku-20240307',
  'Google Gemini': 'gemini-1.5-flash',
  Mistral: 'mistral-small-latest',
  Cohere: 'command-r',
  Custom: '',
}

/* ─── Streaming helpers ───────────────────────────────────────────────────── */

async function* streamOpenAICompatible(
  url: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string, void, undefined> {
  const requestMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ]
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: 'Bearer ' + apiKey } : {}),
    },
    body: JSON.stringify({ model, stream: true, max_tokens: 2048, messages: requestMessages }),
    signal,
  })
  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const d = (await res.json()) as { error?: { message?: string } }
      if (d.error?.message) detail = d.error.message
    } catch { /* ignore */ }
    throw new Error(detail)
  }
  const reader = res.body!.getReader()
  const dec = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const payload = line.slice(6).trim()
      if (payload === '[DONE]') return
      try {
        const parsed = JSON.parse(payload) as { choices?: Array<{ delta?: { content?: string } }> }
        const text = parsed.choices?.[0]?.delta?.content
        if (text) yield text
      } catch { /* ignore */ }
    }
  }
}

async function* streamAnthropic(
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string, void, undefined> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: PROVIDER_DEFAULT_MODELS['Anthropic'],
      max_tokens: 2048,
      stream: true,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
    signal,
  })
  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const d = (await res.json()) as { error?: { message?: string } }
      if (d.error?.message) detail = d.error.message
    } catch { /* ignore */ }
    throw new Error(detail)
  }
  const reader = res.body!.getReader()
  const dec = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      try {
        const parsed = JSON.parse(line.slice(6).trim()) as {
          type?: string
          delta?: { type?: string; text?: string }
        }
        if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
          const text = parsed.delta.text
          if (text) yield text
        }
      } catch { /* ignore */ }
    }
  }
}

async function* streamGemini(
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string, void, undefined> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDER_DEFAULT_MODELS['Google Gemini']}:streamGenerateContent?key=${apiKey}&alt=sse`
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { maxOutputTokens: 2048 },
    }),
    signal,
  })
  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const d = (await res.json()) as { error?: { message?: string } }
      if (d.error?.message) detail = d.error.message
    } catch { /* ignore */ }
    throw new Error(detail)
  }
  const reader = res.body!.getReader()
  const dec = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      try {
        const parsed = JSON.parse(line.slice(6).trim()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
        }
        const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) yield text
      } catch { /* ignore */ }
    }
  }
}

async function* streamCohere(
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[],
  signal: AbortSignal,
): AsyncGenerator<string, void, undefined> {
  const res = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey,
    },
    body: JSON.stringify({
      model: PROVIDER_DEFAULT_MODELS['Cohere'],
      stream: true,
      preamble: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    }),
    signal,
  })
  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const d = (await res.json()) as { message?: string }
      if (d.message) detail = d.message
    } catch { /* ignore */ }
    throw new Error(detail)
  }
  const reader = res.body!.getReader()
  const dec = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      if (!line.trim()) continue
      try {
        const parsed = JSON.parse(line) as {
          type?: string
          delta?: { message?: { content?: { text?: string } } }
        }
        if (parsed.type === 'content-delta') {
          const text = parsed.delta?.message?.content?.text
          if (text) yield text
        }
      } catch { /* ignore */ }
    }
  }
}

/* ─── App ─────────────────────────────────────────────────────────────────── */

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [theme, setTheme] = useState<Theme>('dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [fileMenuOpen, setFileMenuOpen] = useState(false)
  const [viewType, setViewType] = useState<ViewType>('tree')
  const [nodes, setNodes] = useState<MindMapNode[]>(() => createInitialNodes('en'))
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [nodeModalOpen, setNodeModalOpen] = useState(false)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [provider, setProvider] = useState<AiProvider>('OpenAI')
  const [apiKey, setApiKey] = useState('')
  const [customEndpoint, setCustomEndpoint] = useState('')
  const [customModel, setCustomModel] = useState('')
  const [connectedProvider, setConnectedProvider] = useState<AiProvider | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [pendingNodeSuggestions, setPendingNodeSuggestions] = useState<MindMapNode[] | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const [zoom, setZoom] = useState(1.0)

  const [pendingNewNode, setPendingNewNode] = useState<{
    parentId: string
    title: string
    description: string
  } | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const importInputRef = useRef<HTMLInputElement>(null)

  const t = TEXT[language]

  /* Sync theme state with DOM */
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const nodesById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  )

  const selectedNode = selectedNodeId ? nodesById.get(selectedNodeId) ?? null : null

  const childrenByParent = useMemo(() => {
    const map = new Map<string, MindMapNode[]>()

    for (const node of nodes) {
      if (!node.parentId) {
        continue
      }

      const siblings = map.get(node.parentId) ?? []
      siblings.push(node)
      map.set(node.parentId, siblings)
    }

    return map
  }, [nodes])

  /* ── Handlers ─────────────────────────────────────────────────────────── */

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      document.documentElement.dataset.theme = nextTheme
      return nextTheme
    })
  }

  const updateSelectedNode = (updates: Partial<MindMapNode>) => {
    if (!selectedNodeId) {
      return
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === selectedNodeId ? { ...node, ...updates } : node,
      ),
    )
  }

  const addChildNode = () => {
    if (!selectedNodeId) {
      return
    }

    setPendingNewNode({ parentId: selectedNodeId, title: t.childTitle, description: '' })
  }

  const confirmAddNode = () => {
    if (!pendingNewNode) {
      return
    }

    const newNode: MindMapNode = {
      id: crypto.randomUUID(),
      parentId: pendingNewNode.parentId,
      title: pendingNewNode.title,
      description: pendingNewNode.description,
    }

    setNodes((currentNodes) => [...currentNodes, newNode])
    setSelectedNodeId(newNode.id)
    setPendingNewNode(null)
  }

  const cancelAddNode = () => {
    setPendingNewNode(null)
  }

  const requestDeleteNode = () => {
    if (!selectedNode || selectedNode.id === ROOT_ID) {
      return
    }

    const children = childrenByParent.get(selectedNode.id) ?? []

    if (children.length > 0) {
      setDeleteConfirmOpen(true)
    } else {
      confirmDeleteNode()
    }
  }

  const confirmDeleteNode = () => {
    if (!selectedNode || selectedNode.id === ROOT_ID) {
      return
    }

    const toDelete = descendantsOf(nodes, selectedNode.id)
    setNodes((currentNodes) => currentNodes.filter((node) => !toDelete.has(node.id)))
    setSelectedNodeId(selectedNode.parentId)
    setNodeModalOpen(false)
    setDeleteConfirmOpen(false)
  }

  const resetMap = () => {
    setNodes(createInitialNodes(language))
    setSelectedNodeId(null)
    setNodeModalOpen(false)
    setPendingNewNode(null)
    setDeleteConfirmOpen(false)
    setMessages([])
    setChatInput('')
    setMenuOpen(false)
    setFileMenuOpen(false)
  }

  const exportMap = () => {
    const doc: MindMapDocument = { version: 1, language, theme, nodes }
    const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'mindmap.openmindmapper'
    link.click()
    URL.revokeObjectURL(link.href)
    setMenuOpen(false)
    setFileMenuOpen(false)
  }

  const importMap = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const content = await file.text()
      const parsed = JSON.parse(content) as unknown

      if (!isValidDocument(parsed)) {
        throw new Error('invalid')
      }

      setLanguage(parsed.language)
      setTheme(parsed.theme)
      document.documentElement.dataset.theme = parsed.theme
      setNodes(parsed.nodes)
      setSelectedNodeId(null)
      setNodeModalOpen(false)
      setPendingNewNode(null)
      setDeleteConfirmOpen(false)
      setMessages([])
      setMenuOpen(false)
      setFileMenuOpen(false)
    } catch {
      window.alert(t.invalidFile)
    } finally {
      event.target.value = ''
    }
  }

  const connectProvider = () => {
    setConnectionError('')

    if (provider === 'Custom') {
      const trimmed = customEndpoint.trim()
      if (!trimmed) {
        setConnectionError(t.endpointRequired)
        return
      }
      try { new URL(trimmed) } catch {
        setConnectionError(t.endpointInvalid)
        return
      }
    } else if (!apiKey.trim()) {
      setConnectionError(t.apiKeyRequired)
      return
    }

    setIsConnecting(true)
    setTimeout(() => {
      setConnectedProvider(provider)
      setIsConnecting(false)
    }, CONNECTION_ANIMATION_DURATION_MS)
  }

  const buildSystemPrompt = () => {
    const mapLines = nodes
      .map((n) => '  '.repeat(getLevel(n, nodesById)) + '- ' + n.title + (n.description ? ': ' + n.description : ''))
      .join('\n')
    return `You are an AI assistant for OpenMindMapper, a mind-mapping web app. Help the user brainstorm, organize, and expand their mind map. When suggesting new nodes or a map structure, present them as a hierarchical bullet list using "- " and 2-space indentation per level so they can be applied directly to the map. Ask clarifying questions when the user's request is ambiguous. Be creative, thorough, and concise.

Current mind map:
${mapLines}`
  }

  const parseNodeSuggestions = (text: string, anchorParentId: string): MindMapNode[] => {
    const lines = text.split('\n')
    const result: MindMapNode[] = []
    const stack: Array<{ id: string; indent: number }> = [{ id: anchorParentId, indent: -1 }]

    for (const line of lines) {
      const match = line.match(BULLET_POINT_PATTERN)
      if (!match) continue
      const indent = match[1].length
      const title = match[2].replace(/`/g, '').trim().slice(0, MAX_NODE_TITLE_LENGTH)
      if (!title) continue
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop()
      const newNode: MindMapNode = {
        id: crypto.randomUUID(),
        parentId: stack[stack.length - 1].id,
        title,
        description: '',
      }
      result.push(newNode)
      stack.push({ id: newNode.id, indent })
    }

    return result
  }

  const applyNodeSuggestions = () => {
    if (!pendingNodeSuggestions) return
    pendingNodeSuggestions.forEach((node, i) => {
      setTimeout(() => {
        setNodes((prev) => [...prev, node])
      }, i * NODE_ANIMATION_DELAY_MS)
    })
    const lastNode = pendingNodeSuggestions[pendingNodeSuggestions.length - 1]
    if (lastNode) {
      setTimeout(() => setSelectedNodeId(lastNode.id), pendingNodeSuggestions.length * NODE_ANIMATION_DELAY_MS)
    }
    setPendingNodeSuggestions(null)
  }

  const sendAiMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage || !connectedProvider || isAiTyping) return

    const userMsg: ChatMessage = { role: 'user', content: trimmedMessage }
    const historyWithUser = [...messages, userMsg]
    setMessages(historyWithUser)
    setChatInput('')
    setIsAiTyping(true)
    setStreamingContent('')
    setPendingNodeSuggestions(null)

    const controller = new AbortController()
    abortControllerRef.current = controller
    let fullText = ''

    const onChunk = (chunk: string) => {
      fullText += chunk
      setStreamingContent(fullText)
    }

    try {
      const sysPrompt = buildSystemPrompt()

      switch (connectedProvider) {
        case 'OpenAI': {
          const url = customEndpoint.trim() || PROVIDER_DEFAULT_ENDPOINTS['OpenAI']!
          for await (const chunk of streamOpenAICompatible(url, apiKey, PROVIDER_DEFAULT_MODELS['OpenAI'], sysPrompt, historyWithUser, controller.signal)) {
            onChunk(chunk)
          }
          break
        }
        case 'Mistral': {
          const url = PROVIDER_DEFAULT_ENDPOINTS['Mistral']!
          for await (const chunk of streamOpenAICompatible(url, apiKey, PROVIDER_DEFAULT_MODELS['Mistral'], sysPrompt, historyWithUser, controller.signal)) {
            onChunk(chunk)
          }
          break
        }
        case 'Custom': {
          for await (const chunk of streamOpenAICompatible(customEndpoint.trim(), apiKey, customModel.trim(), sysPrompt, historyWithUser, controller.signal)) {
            onChunk(chunk)
          }
          break
        }
        case 'Anthropic': {
          for await (const chunk of streamAnthropic(apiKey, sysPrompt, historyWithUser, controller.signal)) {
            onChunk(chunk)
          }
          break
        }
        case 'Google Gemini': {
          for await (const chunk of streamGemini(apiKey, sysPrompt, historyWithUser, controller.signal)) {
            onChunk(chunk)
          }
          break
        }
        case 'Cohere': {
          for await (const chunk of streamCohere(apiKey, sysPrompt, historyWithUser, controller.signal)) {
            onChunk(chunk)
          }
          break
        }
      }

      if (fullText) {
        setMessages((prev) => [...prev, { role: 'assistant', content: fullText }])
        const suggestions = parseNodeSuggestions(fullText, selectedNodeId ?? ROOT_ID)
        if (suggestions.length >= 2) setPendingNodeSuggestions(suggestions)
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        const msg = (err as Error)?.message ?? 'Unknown error'
        setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ ' + msg }])
      } else if (fullText) {
        setMessages((prev) => [...prev, { role: 'assistant', content: fullText }])
      }
    } finally {
      setIsAiTyping(false)
      setStreamingContent('')
      abortControllerRef.current = null
    }
  }

  const openNodeModal = (nodeId: string) => {
    setSelectedNodeId(nodeId)
    setNodeModalOpen(true)
  }

  const zoomIn = () => setZoom((z) => Math.min(4, parseFloat((z + 0.25).toFixed(2))))
  const zoomOut = () => setZoom((z) => Math.max(0.25, parseFloat((z - 0.25).toFixed(2))))

  /* ── Radial layout ────────────────────────────────────────────────────── */

  const computeRadialLayout = (radiusStep: number): Map<string, { x: number; y: number }> => {
    const positions = new Map<string, { x: number; y: number }>()
    const subtreeSize = new Map<string, number>()

    const computeSize = (nodeId: string): number => {
      const children = childrenByParent.get(nodeId) ?? []
      const size = 1 + children.reduce((sum, child) => sum + computeSize(child.id), 0)
      subtreeSize.set(nodeId, size)
      return size
    }

    computeSize(ROOT_ID)

    const assign = (nodeId: string, startAngle: number, endAngle: number, level: number) => {
      const midAngle = (startAngle + endAngle) / 2
      const radius = level * radiusStep
      positions.set(nodeId, {
        x: Math.round(radius * Math.cos(midAngle) * RADIAL_POSITION_PRECISION) / RADIAL_POSITION_PRECISION,
        y: Math.round(radius * Math.sin(midAngle) * RADIAL_POSITION_PRECISION) / RADIAL_POSITION_PRECISION,
      })

      const children = childrenByParent.get(nodeId) ?? []
      if (children.length === 0) return

      const totalSize = children.reduce((sum, child) => sum + (subtreeSize.get(child.id) ?? 1), 0)
      let currentAngle = startAngle

      for (const child of children) {
        const childSize = subtreeSize.get(child.id) ?? 1
        const sweep = (childSize / totalSize) * (endAngle - startAngle)
        assign(child.id, currentAngle, currentAngle + sweep, level + 1)
        currentAngle += sweep
      }
    }

    assign(ROOT_ID, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI, 0)
    return positions
  }

  /* ── Renderers ────────────────────────────────────────────────────────── */

  const renderHorizontalTree = () => {
    const nodeCount = nodes.length
    const adaptiveScale = Math.min(1, Math.sqrt(RADIAL_SCALE_THRESHOLD / Math.max(nodeCount, RADIAL_SCALE_THRESHOLD)))
    const nodeW = Math.max(60, Math.round(110 * adaptiveScale))
    const nodeH = Math.max(22, Math.round(34 * adaptiveScale))
    const xStep = nodeW + Math.max(30, Math.round(60 * adaptiveScale))
    const ySpacing = nodeH + Math.max(10, Math.round(20 * adaptiveScale))
    const nodeFontSize = Math.max(8, Math.round(11 * adaptiveScale))
    const maxLabelChars = Math.max(6, Math.round(RADIAL_MAX_LABEL_LENGTH * adaptiveScale))

    const leafCount = new Map<string, number>()
    const computeLeafCount = (nodeId: string): number => {
      const children = childrenByParent.get(nodeId) ?? []
      if (children.length === 0) {
        leafCount.set(nodeId, 1)
        return 1
      }
      const total = children.reduce((sum, child) => sum + computeLeafCount(child.id), 0)
      leafCount.set(nodeId, total)
      return total
    }
    computeLeafCount(ROOT_ID)

    const positions = new Map<string, { x: number; y: number }>()
    const totalLeaves = leafCount.get(ROOT_ID) ?? 1
    const totalHeight = totalLeaves * ySpacing

    const assign = (nodeId: string, level: number, yStart: number, yEnd: number) => {
      positions.set(nodeId, { x: level * xStep, y: (yStart + yEnd) / 2 })
      const children = childrenByParent.get(nodeId) ?? []
      if (children.length === 0) return
      const total = leafCount.get(nodeId) ?? 1
      let y = yStart
      for (const child of children) {
        const childLeaves = leafCount.get(child.id) ?? 1
        const childH = (childLeaves / total) * (yEnd - yStart)
        assign(child.id, level + 1, y, y + childH)
        y += childH
      }
    }
    assign(ROOT_ID, 0, 0, totalHeight)

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const pos of positions.values()) {
      minX = Math.min(minX, pos.x - nodeW / 2)
      minY = Math.min(minY, pos.y - nodeH / 2)
      maxX = Math.max(maxX, pos.x + nodeW / 2)
      maxY = Math.max(maxY, pos.y + nodeH / 2)
    }
    const pad = 20
    minX -= pad
    minY -= pad
    maxX += pad
    maxY += pad

    const naturalW = maxX - minX
    const naturalH = maxY - minY
    const zoomedW = naturalW / zoom
    const zoomedH = naturalH / zoom
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    return (
      <svg
        className="mindmap-tree-svg"
        viewBox={`${centerX - zoomedW / 2} ${centerY - zoomedH / 2} ${zoomedW} ${zoomedH}`}
        role="img"
        aria-label={t.mapTitle}
      >
        {nodes.map((node) => {
          if (!node.parentId) return null
          const from = positions.get(node.parentId)
          const to = positions.get(node.id)
          if (!from || !to) return null
          const parentRight = from.x + nodeW / 2
          const childLeft = to.x - nodeW / 2
          const midX = (parentRight + childLeft) / 2
          return (
            <path
              key={`edge-${node.id}`}
              d={`M ${parentRight} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${childLeft} ${to.y}`}
              fill="none"
              stroke="var(--border-color)"
              strokeWidth={2}
            />
          )
        })}

        {nodes.map((node) => {
          const pos = positions.get(node.id)
          if (!pos) return null
          const level = getLevel(node, nodesById)
          const color = levelColor(level)
          const isSelected = selectedNodeId === node.id
          const label = node.title.length > maxLabelChars ? node.title.slice(0, maxLabelChars - 1) + '…' : node.title
          return (
            <g
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-pressed={isSelected}
              aria-label={node.title}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedNodeId(node.id)
              }}
            >
              <rect
                x={pos.x - nodeW / 2}
                y={pos.y - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx={nodeH / 2}
                fill={color}
                fillOpacity={isSelected ? 1 : 0.82}
                stroke={isSelected ? 'var(--accent-color)' : color}
                strokeWidth={isSelected ? 3 : 1}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize={nodeFontSize}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {label}
              </text>
              {isSelected && (
                <g
                  onClick={(e) => { e.stopPropagation(); openNodeModal(node.id) }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); openNodeModal(node.id) }
                  }}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-label={t.nodeEdit}
                  tabIndex={0}
                >
                  <circle cx={pos.x + nodeW / 2 + 14} cy={pos.y} r={10} fill="var(--accent-color)" />
                  <svg x={pos.x + nodeW / 2 + 7} y={pos.y - 7} width={14} height={14} viewBox="0 0 24 24">
                    <path fill="white" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    )
  }

  const renderRadial = () => {
    const nodeCount = nodes.length
    const adaptiveScale = Math.min(1, Math.sqrt(RADIAL_SCALE_THRESHOLD / Math.max(nodeCount, RADIAL_SCALE_THRESHOLD)))
    const adaptRadiusStep = Math.max(70, Math.round(RADIAL_RADIUS_STEP * adaptiveScale))
    const ellipseRx = Math.max(26, Math.round(54 * adaptiveScale))
    const ellipseRy = Math.max(11, Math.round(22 * adaptiveScale))
    const nodeFontSize = Math.max(8, Math.round(11 * adaptiveScale))
    const nodePadding = Math.max(40, Math.round(RADIAL_VIEW_PADDING * adaptiveScale))
    const maxLabelChars = Math.max(6, Math.round(RADIAL_MAX_LABEL_LENGTH * adaptiveScale))

    const positions = computeRadialLayout(adaptRadiusStep)

    let minX = 0
    let minY = 0
    let maxX = 0
    let maxY = 0

    for (const pos of positions.values()) {
      minX = Math.min(minX, pos.x - ellipseRx - nodePadding)
      minY = Math.min(minY, pos.y - ellipseRy - nodePadding)
      maxX = Math.max(maxX, pos.x + ellipseRx + nodePadding)
      maxY = Math.max(maxY, pos.y + ellipseRy + nodePadding)
    }

    const naturalVbW = maxX - minX
    const naturalVbH = maxY - minY
    const zoomedVbW = naturalVbW / zoom
    const zoomedVbH = naturalVbH / zoom
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    return (
      <svg
        className="mindmap-radial"
        viewBox={`${centerX - zoomedVbW / 2} ${centerY - zoomedVbH / 2} ${zoomedVbW} ${zoomedVbH}`}
        role="img"
        aria-label={t.mapTitle}
      >
        {/* Edges */}
        {nodes.map((node) => {
          if (!node.parentId) return null
          const from = positions.get(node.parentId)
          const to = positions.get(node.id)
          if (!from || !to) return null
          return (
            <line
              key={`edge-${node.id}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--border-color)"
              strokeWidth={2}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = positions.get(node.id)
          if (!pos) return null
          const level = getLevel(node, nodesById)
          const color = levelColor(level)
          const isSelected = selectedNodeId === node.id
          const label = node.title.length > maxLabelChars ? node.title.slice(0, maxLabelChars - 1) + '…' : node.title

          return (
            <g
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-pressed={isSelected}
              aria-label={node.title}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedNodeId(node.id)
              }}
            >
              <ellipse
                cx={pos.x}
                cy={pos.y}
                rx={ellipseRx}
                ry={ellipseRy}
                fill={color}
                fillOpacity={isSelected ? 1 : 0.82}
                stroke={isSelected ? 'var(--accent-color)' : color}
                strokeWidth={isSelected ? 3 : 1}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize={nodeFontSize}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {label}
              </text>
              {isSelected && (
                <g
                  onClick={(e) => { e.stopPropagation(); openNodeModal(node.id) }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); openNodeModal(node.id) }
                  }}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-label={t.nodeEdit}
                  tabIndex={0}
                >
                  <circle cx={pos.x + ellipseRx + 14} cy={pos.y} r={10} fill="var(--accent-color)" />
                  <svg x={pos.x + ellipseRx + 7} y={pos.y - 7} width={14} height={14} viewBox="0 0 24 24">
                    <path fill="white" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </g>
              )}
            </g>
          )
        })}
      </svg>
    )
  }

  /* ── JSX ──────────────────────────────────────────────────────────────── */

  return (
    <div className="app-shell">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="top-bar">
        <div className="top-bar-brand">
          <img src="/favicon.svg" alt="" width="28" height="28" aria-hidden="true" />
          <h1>{t.appTitle}</h1>
        </div>

        <div className="top-controls">
          {/* View toggle */}
          <div className="view-switcher" role="group" aria-label={t.view}>
            <button
              type="button"
              className={viewType === 'tree' ? 'view-btn active' : 'view-btn'}
              aria-pressed={viewType === 'tree'}
              onClick={() => setViewType('tree')}
              title={t.viewTree}
            >
              <TreeIcon />
              <span>{t.viewTree}</span>
            </button>
            <button
              type="button"
              className={viewType === 'radial' ? 'view-btn active' : 'view-btn'}
              aria-pressed={viewType === 'radial'}
              onClick={() => setViewType('radial')}
              title={t.viewRadial}
            >
              <RadialIcon />
              <span>{t.viewRadial}</span>
            </button>
          </div>

          {/* Language */}
          <div className="lang-wrapper">
            <GlobeIcon />
            <label htmlFor="language-select" className="sr-only">
              {t.language}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          {/* AI assistant button */}
          <div className="ai-wrapper">
            <button
              type="button"
              className="menu-btn"
              aria-expanded={aiPanelOpen}
              aria-controls="ai-panel"
              aria-label={aiPanelOpen ? t.collapseAi : t.expandAi}
              onClick={() => setAiPanelOpen((o) => !o)}
            >
              <AiIcon />
              <span>{t.aiPanel}</span>
            </button>

            {aiPanelOpen && (
              <div id="ai-panel" className="ai-dropdown" aria-label={t.aiPanel}>
                <label htmlFor="provider-select">{t.provider}</label>
                <select
                  id="provider-select"
                  value={provider}
                  onChange={(event) => {
                    setProvider(event.target.value as AiProvider)
                    setConnectedProvider(null)
                    setConnectionError('')
                  }}
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Google Gemini">Google Gemini</option>
                  <option value="Mistral">Mistral</option>
                  <option value="Cohere">Cohere</option>
                  <option value="Custom">Custom / Local</option>
                </select>

                {provider !== 'Custom' && (
                  <>
                    <label htmlFor="api-key">{t.apiKey}</label>
                    <input
                      id="api-key"
                      type="password"
                      value={apiKey}
                      onChange={(event) => {
                        setApiKey(event.target.value)
                        setConnectedProvider(null)
                      }}
                    />
                  </>
                )}

                {provider === 'Custom' && (
                  <>
                    <label htmlFor="endpoint-url">{t.endpointUrlCustom}</label>
                    <input
                      id="endpoint-url"
                      type="url"
                      placeholder="http://localhost:1234/v1/chat/completions"
                      value={customEndpoint}
                      onChange={(event) => {
                        setCustomEndpoint(event.target.value)
                        setConnectedProvider(null)
                      }}
                    />
                    <label htmlFor="model-name">{t.modelNameCustom}</label>
                    <input
                      id="model-name"
                      type="text"
                      placeholder="gemma-3-27b-it"
                      value={customModel}
                      onChange={(event) => {
                        setCustomModel(event.target.value)
                        setConnectedProvider(null)
                      }}
                    />
                  </>
                )}

                {connectionError && (
                  <p className="connection-error" role="alert">{connectionError}</p>
                )}

                <button
                  type="button"
                  className={`connect-btn${connectedProvider === provider ? ' connected' : ''}`}
                  onClick={connectProvider}
                  disabled={isConnecting}
                >
                  {isConnecting ? <LoadingIcon /> : connectedProvider === provider ? <CheckIcon /> : <ConnectIcon />}
                  <span>{isConnecting ? t.connecting : connectedProvider === provider ? t.connected : t.connect}</span>
                </button>

                <p className="status-line" aria-live="polite">
                  {connectedProvider ? (
                    <span className="status-connected">✓ {t.connected}: {connectedProvider}</span>
                  ) : (
                    <span className="status-disconnected">○ {t.disconnected}</span>
                  )}
                </p>

                <form className="chat-form" onSubmit={sendAiMessage}>
                  <label htmlFor="chat-input" className="sr-only">{t.askAi}</label>
                  <textarea
                    id="chat-input"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        e.currentTarget.form?.requestSubmit()
                      }
                    }}
                    placeholder={t.askAi}
                    rows={2}
                    disabled={!connectedProvider || isAiTyping}
                  />
                  <div className="chat-actions">
                    {isAiTyping ? (
                      <button
                        type="button"
                        className="stop-btn"
                        onClick={() => abortControllerRef.current?.abort()}
                      >
                        <StopIcon />
                        <span>{t.stopAi}</span>
                      </button>
                    ) : (
                      <button type="submit" className="send-btn primary-btn" disabled={!connectedProvider || !chatInput.trim()}>
                        <SendIcon />
                        <span>{t.send}</span>
                      </button>
                    )}
                  </div>
                </form>

                <ul className="chat-list" aria-live="polite">
                  {messages.map((message, index) => (
                    <li key={`${message.role}-${index}`} className={`chat-msg chat-msg--${message.role}`}>
                      <span className="chat-msg-label">{message.role === 'user' ? 'You' : 'AI'}</span>
                      <span className="chat-msg-content">{message.content}</span>
                    </li>
                  ))}
                  {isAiTyping && (
                    <li className="chat-msg chat-msg--assistant chat-msg--streaming">
                      <span className="chat-msg-label">AI</span>
                      <span className="chat-msg-content">
                        {streamingContent || <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>}
                        {streamingContent && <span className="cursor-blink"> ▋</span>}
                      </span>
                    </li>
                  )}
                </ul>

                {pendingNodeSuggestions && pendingNodeSuggestions.length >= 2 && (
                  <div className="suggestions-bar">
                    <span className="suggestions-count">{pendingNodeSuggestions.length} {t.suggestionsLabel}</span>
                    <button type="button" className="primary-btn apply-btn" onClick={applyNodeSuggestions}>
                      {t.applyToMap}
                    </button>
                    <button type="button" className="icon-btn" onClick={() => setPendingNodeSuggestions(null)} aria-label={t.close}>
                      <CloseIcon />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Menu button */}
          <div className="menu-wrapper">
            <button
              type="button"
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="collapsible-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <MenuIcon />
              <span>{t.menu}</span>
            </button>

            {menuOpen && (
              <nav id="collapsible-menu" className="dropdown-menu" aria-label={t.menu}>
                <div className="menu-group">
                  <button
                    type="button"
                    className="menu-item submenu-trigger"
                    aria-expanded={fileMenuOpen}
                    onClick={() => setFileMenuOpen((open) => !open)}
                  >
                    <FileIcon />
                    <span>{t.file}</span>
                    {fileMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </button>

                  {fileMenuOpen && (
                    <div className="submenu">
                      <button
                        type="button"
                        className="menu-item"
                        onClick={() => importInputRef.current?.click()}
                      >
                        <ImportIcon />
                        <span>{t.import}</span>
                      </button>
                      <button type="button" className="menu-item" onClick={exportMap}>
                        <ExportIcon />
                        <span>{t.export}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="menu-divider" role="separator" />

                <button type="button" className="menu-item" onClick={resetMap}>
                  <ResetIcon />
                  <span>{t.reset}</span>
                </button>

                <button type="button" className="menu-item" onClick={toggleTheme}>
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                  <span>{t.theme}</span>
                </button>
              </nav>
            )}
          </div>
        </div>
      </header>

      <input
        ref={importInputRef}
        type="file"
        accept=".openmindmapper,application/json"
        hidden
        onChange={importMap}
      />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="main-content">
        {/* Mind map */}
        <section className="mindmap-area" aria-label={t.mapTitle}>
          <div className="mindmap-actions">
            <h2>{t.mapTitle}</h2>
            <button type="button" onClick={addChildNode} disabled={!selectedNodeId}>
              <AddIcon />
              <span>{t.addChild}</span>
            </button>
            <button
              type="button"
              onClick={requestDeleteNode}
              disabled={!selectedNode || selectedNode.id === ROOT_ID}
            >
              <DeleteIcon />
              <span>{t.removeNode}</span>
            </button>
            <div className="zoom-controls" role="group" aria-label="Zoom">
              <button type="button" onClick={zoomOut} disabled={zoom <= 0.25} aria-label="Zoom out">
                <ZoomOutIcon />
              </button>
              <span className="zoom-level">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={zoomIn} disabled={zoom >= 4} aria-label="Zoom in">
                <ZoomInIcon />
              </button>
            </div>
          </div>

          {viewType === 'tree' && renderHorizontalTree()}
          {viewType === 'radial' && renderRadial()}

          {/* ── Description popover ─────────────────────────────────────── */}
          {selectedNode && selectedNode.description && (
            <div className="node-popover" role="status" aria-live="polite">
              <strong className="node-popover-title">{selectedNode.title}</strong>
              <p>{selectedNode.description}</p>
            </div>
          )}
        </section>
      </main>

      {/* ── Node edit modal ──────────────────────────────────────────────── */}
      {nodeModalOpen && selectedNode && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setNodeModalOpen(false)
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <h2 id="modal-title">
                {selectedNode.id === ROOT_ID ? selectedNode.title : t.nodeEdit}
              </h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setNodeModalOpen(false)}
                aria-label={t.close}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body">
              <label htmlFor="node-title">{t.nodeTitle}</label>
              <input
                id="node-title"
                type="text"
                value={selectedNode.title}
                onChange={(event) => updateSelectedNode({ title: event.target.value })}
                autoFocus
              />

              <label htmlFor="node-description">{t.nodeDescription}</label>
              <textarea
                id="node-description"
                value={selectedNode.description}
                onChange={(event) => updateSelectedNode({ description: event.target.value })}
                rows={4}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={requestDeleteNode}
                disabled={selectedNode.id === ROOT_ID}
                className="danger-btn"
              >
                <DeleteIcon />
                <span>{t.removeNode}</span>
              </button>
              <button type="button" onClick={() => setNodeModalOpen(false)}>
                <CloseIcon />
                <span>{t.close}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── New node creation modal ──────────────────────────────────────── */}
      {pendingNewNode && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelAddNode()
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-node-modal-title"
          >
            <div className="modal-header">
              <h2 id="new-node-modal-title">{t.newNodeTitle}</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={cancelAddNode}
                aria-label={t.close}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body">
              <label htmlFor="new-node-title">{t.nodeTitle}</label>
              <input
                id="new-node-title"
                type="text"
                value={pendingNewNode.title}
                onChange={(e) => setPendingNewNode({ ...pendingNewNode, title: e.target.value })}
                autoFocus
              />

              <label htmlFor="new-node-description">{t.nodeDescription}</label>
              <textarea
                id="new-node-description"
                value={pendingNewNode.description}
                onChange={(e) => setPendingNewNode({ ...pendingNewNode, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="modal-footer">
              <button type="button" onClick={cancelAddNode}>
                <CloseIcon />
                <span>{t.cancel}</span>
              </button>
              <button type="button" className="primary-btn" onClick={confirmAddNode}>
                <SaveIcon />
                <span>{t.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal ────────────────────────────────────── */}
      {deleteConfirmOpen && selectedNode && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeleteConfirmOpen(false)
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
          >
            <div className="modal-header">
              <h2 id="confirm-delete-title">
                <WarningIcon />
                {t.confirmDelete}
              </h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setDeleteConfirmOpen(false)}
                aria-label={t.close}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="modal-body">
              <p>{t.confirmDeleteBody}</p>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={() => setDeleteConfirmOpen(false)}>
                <CloseIcon />
                <span>{t.cancel}</span>
              </button>
              <button type="button" className="danger-btn" onClick={confirmDeleteNode}>
                <DeleteIcon />
                <span>{t.removeNode}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile backdrop for AI panel ──────────────────────────────────── */}
      {aiPanelOpen && (
        <div
          className="ai-backdrop"
          onClick={() => setAiPanelOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default App

