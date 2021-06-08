
export async function getScriptIndex() {
  const response = await fetch('/script-index')
  return await response.json()
}

export async function execute(scriptId) {
  const response = await fetch(`/runtime/${scriptId}`)
  return await response.json()
}

export async function streamStdoutFrom(scriptId) {
  const response = await fetch(`/runtime/${scriptId}/stdout`)
  return await response.text()
}
