if(!(global as any).M53C_SYNONYM_APP_STORE) {
    (global as any).M53C_SYNONYM_APP_STORE = new Map([['word', new Set(['word', 'other word'])]])
}

export default (global as any).M53C_SYNONYM_APP_STORE as Map<string, Set<string>>
