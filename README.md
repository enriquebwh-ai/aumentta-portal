# Portal Cliente Aumentta

Portal de gestión de clientes para Aumentta - una plataforma centralizada para comunicación, seguimiento de proyectos y soporte con IA operativa.

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:push

# Iniciar desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
aumentta-portal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Rutas de autenticación
│   │   ├── (dashboard)/       # Dashboard y páginas protegidas
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Componentes base (shadcn-style)
│   │   ├── layout/            # Layout principal
│   │   ├── dashboard/         # Componentes del dashboard
│   │   ├── chat/              # Componentes de chat
│   │   └── incidents/         # Componentes de incidencias
│   ├── lib/                   # Utilidades y clientes
│   ├── stores/                # Zustand stores
│   └── types/                 # TypeScript types
└── prisma/
    └── schema.prisma          # Schema de base de datos
```

## 🎨 Diseño

- **Colores**: Paleta basada en el branding de Aumentta (Indigo #4F46E5 + Amber #F59E0B)
- **Tipografía**: Inter (UI), JetBrains Mono (código)
- **UI Components**: Inspirado en Linear, Notion y Slack

## 🔐 Autenticación

Demo credentials:
- **Email**: demo@aumentta.com
- **Password**: demo123

## 📝 Licencia

© 2025 Aumentta Strategy Advisors
