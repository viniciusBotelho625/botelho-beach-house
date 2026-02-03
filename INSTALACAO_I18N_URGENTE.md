# ⚠️ INSTALAÇÃO URGENTE - I18N

## 🔴 PROBLEMA ATUAL

O sistema de idiomas (i18next) está configurado mas as bibliotecas NÃO estão instaladas.
Por isso, clicar em EN/PT não troca o idioma.

## ✅ SOLUÇÃO RÁPIDA

Execute estes comandos na raiz do projeto:

```bash
# 1. Instalar as bibliotecas do i18next
npm install i18next react-i18next

# 2. Reiniciar o servidor
# Pressione Ctrl+C no terminal onde está rodando 'pnpm dev' ou 'npm dev'
# Depois execute novamente:
pnpm dev
# ou
npm run dev
```

## 🧪 COMO TESTAR

Após instalar e reiniciar:

1. Abra o site: `http://localhost:3000`
2. Clique no botão **EN** no canto superior esquerdo
3. O texto "Contato" deve mudar para "Contact"
4. Abra o Console do navegador (F12) e veja os logs:
   ```
   Changing language to: en
   Language changed successfully to: en
   ```

## 🎯 O QUE VAI FUNCIONAR

Quando instalado corretamente, o i18n vai:

- ✅ Trocar idioma ao clicar em PT/EN
- ✅ Destacar o idioma atual (negrito + branco)
- ✅ Salvar a escolha no localStorage
- ✅ Detectar idioma do navegador na primeira visita
- ✅ Traduzir automaticamente todos os textos do site

## 📝 ALTERNATIVA (se npm install falhar)

Se o `npm install` continuar falhando com erros de node_modules corrompidos:

```bash
# Deletar node_modules e reinstalar tudo
rm -rf node_modules
rm -rf package-lock.json
npm install
```

## 💡 DICA

Enquanto o i18n não estiver instalado, os textos ficam fixos em português.
Isso é normal - não é um bug no código, apenas falta instalar as dependências.

---

**Status**: Código implementado ✅ | Dependências instaladas ❌
