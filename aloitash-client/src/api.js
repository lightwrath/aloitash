
export async function getScriptIndex() {
  const response = await fetch('http://localhost:8080/script-index')
  return await response.json()
}

export async function execute(scriptId) {
  const response = await fetch(`http://localhost:8080/runtime/${scriptId}`)
  return await response.json()
}
