
export async function getScriptIndex() {
  const response = await fetch('/script-index')
  return await response.json()
}

export async function getUiWireframe() {
  const response = await fetch('/ui-wireframe')
  return await response.json()
}

export async function getScriptById(id) {
  const response = await fetch(`/script/${id}`)
  return await response.json()
}

export async function execute(scriptId) {
  const response = await fetch(`/script/${scriptId}/execute`)
  return await response.json()
}

export async function streamLogs(scriptId) {
  const response = await fetch(`/log-stream/${scriptId}`)
  return await response.text()
}
