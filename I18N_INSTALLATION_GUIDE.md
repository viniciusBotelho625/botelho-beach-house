# Guia de Instalação do i18next

## ⚠️ Importante: Instalar Dependências

O sistema de internacionalização foi configurado, mas as dependências ainda precisam ser instaladas.

## 📦 Instalar Dependências

Execute um dos seguintes comandos na raiz do projeto:

### Opção 1: com npm
```bash
npm install i18next react-i18next
```

### Opção 2: com pnpm (recomendado)
```bash
pnpm add i18next react-i18next
```

### Opção 3: com yarn
```bash
yarn add i18next react-i18next
```

## ✅ Arquivos Criados

1. **`src/i18n/config.ts`** - Configuração do i18next com traduções em PT e EN
2. **`src/app/providers/I18nProvider.tsx`** - Provider React para i18n
3. **`src/app/layout.tsx`** - Atualizado com I18nProvider
4. **`src/app/components/Navigation.tsx`** - Atualizado com seletor de idioma funcional

## 🎯 Como Funciona

### Seletor de Idioma
Os botões PT/EN na navegação agora:
- Trocam o idioma do site inteiro
- Destacam o idioma atual (texto branco + negrito)
- Salvam a escolha no localStorage do navegador
- Detectam automaticamente o idioma do navegador na primeira visita

### Adicionar Traduções
Para adicionar novas traduções, edite o arquivo `src/i18n/config.ts`:

```typescript
const resources = {
  pt: {
    translation: {
      minha_chave: 'Texto em Português',
    },
  },
  en: {
    translation: {
      minha_chave: 'Text in English',
    },
  },
};
```

### Usar Traduções em Componentes

```typescript
'use client';

import { useTranslation } from 'react-i18next';

export default function MeuComponente() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('minha_chave')}</h1>
    </div>
  );
}
```

## 🚀 Próximos Passos

1. **Instale as dependências** (comando acima)
2. **Reinicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```
3. **Teste a troca de idiomas** clicando em PT/EN na navegação
4. **Adicione mais traduções** conforme necessário

## 📝 Traduções Já Implementadas

- Navegação (Menu, Contatos)
- Hero (Título, Subtítulo, CTA)
- Comodidades (Todas as seções)
- Fotos (Títulos)
- Avaliações (Títulos, badges, botões)
- Footer (Direitos, contato)

## 🌐 Idiomas Suportados

- **Português (pt)** - Padrão
- **Inglês (en)**

## ⚙️ Configurações

O i18next está configurado para:
- Detectar automaticamente o idioma do navegador
- Salvar a escolha do usuário no localStorage
- Fallback para português se o idioma não for suportado
- Não escapar HTML (React já protege contra XSS)

---

**Pronto!** Após instalar as dependências e reiniciar o servidor, o sistema de idiomas estará funcionando! 🎉
