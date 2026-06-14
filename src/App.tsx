import { useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './App.css'

type Language = 'en' | 'es'
type Theme = 'light' | 'dark'
type AiProvider = 'OpenAI' | 'Anthropic' | 'Google Gemini'

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

const ROOT_ID = 'central-node'
const LEVEL_COLORS = ['#d32f2f', '#1976d2', '#2e7d32', '#ed6c02', '#6a1b9a']

const TEXT = {
  en: {
    appTitle: 'OpenMindMapper',
    menu: 'Menu',
    file: 'File',
    import: 'Import .openmindmapper',
    export: 'Export .openmindmapper',
    reset: 'Reset map',
    theme: 'Light/Dark',
    language: 'Language',
    aiPanel: 'AI assistant',
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
    clickNodeHint: 'Click a node to edit title and description.',
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
    theme: 'Claro/Oscuro',
    language: 'Idioma',
    aiPanel: 'Asistente IA',
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
    clickNodeHint: 'Haz clic en un nodo para editar título y descripción.',
    centralTitle: 'Idea Central',
    childTitle: 'Nuevo nodo',
    invalidFile: 'Archivo .openmindmapper inválido.',
    connectRequired: 'Conecta un proveedor antes de enviar mensajes a la IA.',
  },
} as const

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

const levelColor = (level: number): string => LEVEL_COLORS[level] ?? LEVEL_COLORS[(level % (LEVEL_COLORS.length - 1)) + 1]

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

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [theme, setTheme] = useState<Theme>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [fileMenuOpen, setFileMenuOpen] = useState(false)
  const [nodes, setNodes] = useState<MindMapNode[]>(() => createInitialNodes('en'))
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [provider, setProvider] = useState<AiProvider>('OpenAI')
  const [apiKey, setApiKey] = useState('')
  const [connectedProvider, setConnectedProvider] = useState<AiProvider | null>(null)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const importInputRef = useRef<HTMLInputElement>(null)

  const t = TEXT[language]

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
        node.id === selectedNodeId
          ? {
              ...node,
              ...updates,
            }
          : node,
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
  }

  const deleteSelectedNode = () => {
    if (!selectedNode || selectedNode.id === ROOT_ID) {
      return
    }

    const toDelete = descendantsOf(nodes, selectedNode.id)
    setNodes((currentNodes) => currentNodes.filter((node) => !toDelete.has(node.id)))
    setSelectedNodeId(selectedNode.parentId)
  }

  const resetMap = () => {
    setNodes(createInitialNodes(language))
    setSelectedNodeId(null)
    setMessages([])
    setChatInput('')
    setMenuOpen(false)
    setFileMenuOpen(false)
  }

  const exportMap = () => {
    const doc: MindMapDocument = {
      version: 1,
      language,
      theme,
      nodes,
    }

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
          onClick={() => setSelectedNodeId(node.id)}
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

  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>{t.appTitle}</h1>
        <div className="top-controls">
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

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="collapsible-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {t.menu}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav id="collapsible-menu" className="menu" aria-label={t.menu}>
          <button
            type="button"
            className="submenu-trigger"
            aria-expanded={fileMenuOpen}
            onClick={() => setFileMenuOpen((open) => !open)}
          >
            {t.file}
          </button>

          {fileMenuOpen && (
            <div className="submenu">
              <button type="button" onClick={() => importInputRef.current?.click()}>
                {t.import}
              </button>
              <button type="button" onClick={exportMap}>
                {t.export}
              </button>
            </div>
          )}

          <button type="button" onClick={resetMap}>
            {t.reset}
          </button>
          <button type="button" onClick={toggleTheme}>
            {t.theme}
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

      <main className="content-grid">
        <section className="mindmap-area" aria-label={t.mapTitle}>
          <div className="mindmap-actions">
            <h2>{t.mapTitle}</h2>
            <button type="button" onClick={addChildNode} disabled={!selectedNodeId}>
              {t.addChild}
            </button>
            <button
              type="button"
              onClick={deleteSelectedNode}
              disabled={!selectedNode || selectedNode.id === ROOT_ID}
            >
              {t.removeNode}
            </button>
          </div>

          <ul className="mindmap-tree">{renderTree(nodesById.get(ROOT_ID) ?? nodes[0])}</ul>
        </section>

        <aside className="side-panel">
          <section className="editor-panel">
            <h2>{selectedNode ? selectedNode.title : t.clickNodeHint}</h2>
            {selectedNode && (
              <>
                <label htmlFor="node-title">{t.nodeTitle}</label>
                <input
                  id="node-title"
                  type="text"
                  value={selectedNode.title}
                  onChange={(event) => updateSelectedNode({ title: event.target.value })}
                />

                <label htmlFor="node-description">{t.nodeDescription}</label>
                <textarea
                  id="node-description"
                  value={selectedNode.description}
                  onChange={(event) => updateSelectedNode({ description: event.target.value })}
                  rows={4}
                />
              </>
            )}
          </section>

          <section className="ai-panel" aria-label={t.aiPanel}>
            <h2>{t.aiPanel}</h2>
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

            <button type="button" onClick={connectProvider}>
              {t.connect}
            </button>
            <p className="status-line">
              {connectedProvider ? t.connected : t.disconnected}
              {connectedProvider ? ` (${connectedProvider})` : ''}
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
              <button type="submit">{t.send}</button>
            </form>

            <ul className="chat-list" aria-live="polite">
              {messages.map((message, index) => (
                <li key={`${message.role}-${index}`}>
                  <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong> {message.content}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </div>
  )
}

export default App
