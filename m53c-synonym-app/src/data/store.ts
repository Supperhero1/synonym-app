if(!global.M53C_SYNONYM_APP_STORE) {
    global.M53C_SYNONYM_APP_STORE = new Map()
}

export default global.M53C_SYNONYM_APP_STORE as Map<string, Set<string>>
