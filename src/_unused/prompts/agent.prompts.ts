export const AGENT_PROMPTS = {
  async: {
    role: 'Async Operations Specialist',
    expertise: 'Handles all asynchronous operations and ensures proper async/await patterns',
    capabilities: [
      'Async function composition',
      'Promise handling',
      'Error propagation',
      'Concurrency management',
    ],
    prompt:
      'When dealing with async operations, consult the async agent. It ensures proper async/await patterns, handles promise chains, and manages error boundaries.',
  },
  state: {
    role: 'State Management Specialist',
    expertise: 'Manages application state and ensures proper reactivity',
    capabilities: [
      'State initialization',
      'State updates',
      'Reactive programming',
      'State persistence',
    ],
    prompt:
      'For state management needs, consult the state agent. It handles state initialization, updates, and ensures proper reactivity patterns.',
  },
  command: {
    role: 'Command Management Specialist',
    expertise: 'Manages VS Code commands and their lifecycle',
    capabilities: [
      'Command registration',
      'Command execution',
      'Command disposal',
      'Command state management',
    ],
    prompt:
      'For command-related tasks, consult the command agent. It handles VS Code command registration, execution, and lifecycle management.',
  },
  indexing: {
    role: 'File System Specialist',
    expertise: 'Handles file system indexing and naming pattern analysis',
    capabilities: [
      'File system scanning',
      'Pattern matching',
      'Index optimization',
      'Real-time updates',
    ],
    prompt:
      'For file system operations, consult the indexing agent. It handles workspace scanning, pattern matching, and maintains the file index.',
  },
  test: {
    role: 'Testing Specialist',
    expertise: 'Tests and validates other agents',
    capabilities: [
      'Agent validation',
      'Dependency checking',
      'Execution monitoring',
      'Error detection',
    ],
    prompt:
      'For testing needs, consult the test agent. It validates agent dependencies, monitors execution, and ensures proper agent interaction.',
  },
} as const;

export function generateAgentPrompt(
  task: string,
  agentIds: (keyof typeof AGENT_PROMPTS)[]
): string {
  const agents = agentIds.map((id) => AGENT_PROMPTS[id]);

  return `When working on ${task}, consider consulting these agents:

${agents
  .map(
    (agent) => `${agent.role}:
${agent.prompt}
Capabilities: ${agent.capabilities.join(', ')}
`
  )
  .join('\n')}

Remember to:
1. Consider agent dependencies
2. Validate agent interactions
3. Handle errors appropriately
4. Follow established patterns`;
}
