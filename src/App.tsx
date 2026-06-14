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

/* ─── Types ───────────────────────────────────────────────────────────────── */

type Language = 'en' | 'es'
type Theme = 'light' | 'dark'
type AiProvider = 'OpenAI' | 'Anthropic' | 'Google Gemini'
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
const RADIAL_TRUNCATE_AT = 13

const TEXT = {
  en: {
    appTitle: 'OpenMindMapper',
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
    close: 'Close',
    clickNodeHint: 'Click a node to edit it.',
    centralTitle: 'Central Idea',
    childTitle: 'New node',
    invalidFile: 'Invalid .openmindmapper file.',
    connectRequired: 'Connect a provider before sending AI messages.',
  },
  es: {
    appTitle: 'OpenMindMapper',
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
    close: 'Cerrar',
    clickNodeHint: 'Haz clic en un nodo para editarlo.',
    centralTitle: 'Idea Central',
    childTitle: 'Nuevo nodo',
    invalidFile: 'Archivo .openmindmapper inválido.',
    connectRequired: 'Conecta un proveedor antes de enviar mensajes a la IA.',
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
  const [aiExpanded, setAiExpanded] = useState(false)
  const [provider, setProvider] = useState<AiProvider>('OpenAI')
  const [apiKey, setApiKey] = useState('')
  const [connectedProvider, setConnectedProvider] = useState<AiProvider | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

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

    const newNode: MindMapNode = {
      id: crypto.randomUUID(),
      parentId: selectedNodeId,
      title: t.childTitle,
      description: '',
    }

    setNodes((currentNodes) => [...currentNodes, newNode])
    setSelectedNodeId(newNode.id)
    setNodeModalOpen(true)
  }

  const deleteSelectedNode = () => {
    if (!selectedNode || selectedNode.id === ROOT_ID) {
      return
    }

    const toDelete = descendantsOf(nodes, selectedNode.id)
    setNodes((currentNodes) => currentNodes.filter((node) => !toDelete.has(node.id)))
    setSelectedNodeId(selectedNode.parentId)
    setNodeModalOpen(false)
  }

  const resetMap = () => {
    setNodes(createInitialNodes(language))
    setSelectedNodeId(null)
    setNodeModalOpen(false)
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
    if (apiKey.trim().length > 0) {
      setConnectedProvider(provider)
    }
  }

  const sendAiMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = chatInput.trim()

    if (!trimmedMessage) {
      return
    }

    if (!connectedProvider) {
      window.alert(t.connectRequired)
      return
    }

    const focusTitle = selectedNode?.title ?? TEXT[language].centralTitle
    const response =
      language === 'es'
        ? `[${connectedProvider}] Sugiero crear 2-3 subnodos para "${focusTitle}" y priorizar riesgos, objetivos y acciones.`
        : `[${connectedProvider}] I suggest adding 2-3 child nodes for "${focusTitle}" focused on risks, goals, and actions.`

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: response },
    ])
    setChatInput('')
  }

  const openNodeModal = (nodeId: string) => {
    setSelectedNodeId(nodeId)
    setNodeModalOpen(true)
  }

  /* ── Radial layout ────────────────────────────────────────────────────── */

  const computeRadialLayout = (): Map<string, { x: number; y: number }> => {
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
      const radius = level * RADIAL_RADIUS_STEP
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

  const renderTree = (node: MindMapNode) => {
    const children = childrenByParent.get(node.id) ?? []
    const level = getLevel(node, nodesById)

    return (
      <li key={node.id}>
        <button
          type="button"
          className="node"
          style={{ borderColor: levelColor(level) }}
          aria-pressed={selectedNodeId === node.id}
          onClick={() => openNodeModal(node.id)}
        >
          <span className="node-level" style={{ backgroundColor: levelColor(level) }}>
            {level}
          </span>
          <span>{node.title}</span>
        </button>

        {children.length > 0 && (
          <ul aria-label={`children-of-${node.id}`}>
            {children.map((child) => renderTree(child))}
          </ul>
        )}
      </li>
    )
  }

  const renderRadial = () => {
    const positions = computeRadialLayout()

    let minX = 0
    let minY = 0
    let maxX = 0
    let maxY = 0

    for (const pos of positions.values()) {
      minX = Math.min(minX, pos.x - RADIAL_VIEW_PADDING)
      minY = Math.min(minY, pos.y - RADIAL_VIEW_PADDING)
      maxX = Math.max(maxX, pos.x + RADIAL_VIEW_PADDING)
      maxY = Math.max(maxY, pos.y + RADIAL_VIEW_PADDING)
    }

    const vbW = maxX - minX
    const vbH = maxY - minY

    return (
      <svg
        className="mindmap-radial"
        viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
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
          const label = node.title.length > RADIAL_MAX_LABEL_LENGTH ? node.title.slice(0, RADIAL_TRUNCATE_AT) + '…' : node.title

          return (
            <g
              key={node.id}
              onClick={() => openNodeModal(node.id)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-pressed={isSelected}
              aria-label={node.title}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openNodeModal(node.id)
              }}
            >
              <ellipse
                cx={pos.x}
                cy={pos.y}
                rx={54}
                ry={22}
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
                fontSize="11"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {label}
              </text>
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

          {/* Menu button */}
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
        </div>
      </header>

      {/* ── Dropdown menu ───────────────────────────────────────────────── */}
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

      <input
        ref={importInputRef}
        type="file"
        accept=".openmindmapper,application/json"
        hidden
        onChange={importMap}
      />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="content-grid">
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
              onClick={deleteSelectedNode}
              disabled={!selectedNode || selectedNode.id === ROOT_ID}
            >
              <DeleteIcon />
              <span>{t.removeNode}</span>
            </button>
          </div>

          {viewType === 'tree' && (
            <ul className="mindmap-tree">{renderTree(nodesById.get(ROOT_ID) ?? nodes[0])}</ul>
          )}
          {viewType === 'radial' && renderRadial()}
        </section>

        {/* Side panel */}
        <aside className="side-panel">
          <section className="ai-panel" aria-label={t.aiPanel}>
            <div className="ai-panel-header">
              <h2>
                <AiIcon />
                <span>{t.aiPanel}</span>
              </h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setAiExpanded((e) => !e)}
                aria-expanded={aiExpanded}
                aria-controls="ai-panel-body"
                aria-label={aiExpanded ? t.collapseAi : t.expandAi}
              >
                {aiExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            </div>

            {aiExpanded && (
              <div id="ai-panel-body">
                <label htmlFor="provider-select">{t.provider}</label>
                <select
                  id="provider-select"
                  value={provider}
                  onChange={(event) => setProvider(event.target.value as AiProvider)}
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Google Gemini">Google Gemini</option>
                </select>

                <label htmlFor="api-key">{t.apiKey}</label>
                <input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                />

                <button type="button" className="connect-btn" onClick={connectProvider}>
                  <ConnectIcon />
                  <span>{t.connect}</span>
                </button>
                <p className="status-line" aria-live="polite">
                  {connectedProvider ? (
                    <span className="status-connected">
                      ● {t.connected} ({connectedProvider})
                    </span>
                  ) : (
                    <span className="status-disconnected">○ {t.disconnected}</span>
                  )}
                </p>

                <form onSubmit={sendAiMessage}>
                  <label htmlFor="chat-input" className="sr-only">
                    {t.askAi}
                  </label>
                  <textarea
                    id="chat-input"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder={t.askAi}
                    rows={3}
                  />
                  <button type="submit" className="send-btn">
                    <SendIcon />
                    <span>{t.send}</span>
                  </button>
                </form>

                <ul className="chat-list" aria-live="polite">
                  {messages.map((message, index) => (
                    <li key={`${message.role}-${index}`} className={`chat-msg chat-msg--${message.role}`}>
                      <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong> {message.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {!nodeModalOpen && (
            <p className="click-hint" aria-live="polite">
              {t.clickNodeHint}
            </p>
          )}
        </aside>
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
                onClick={deleteSelectedNode}
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
    </div>
  )
}

export default App

