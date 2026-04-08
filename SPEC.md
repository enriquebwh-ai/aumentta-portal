# SPEC.md — Aumentta Client Portal

## 1. Concept & Vision

Aumentta Client Portal es un dashboard privado para clientes que sustituye la comunicación por email por un sistema centralizado: chat en tiempo real con IA operativa, seguimiento de proyectos en tiempo real, gestión de tareas, y un motor de IA (Minimax M2.7) que analiza incidencias y propone soluciones - pero **nunca ejecuta sin validación humana**.

El diseño sigue la línea visual de Aumentta: **profesional, moderno, limpio** - evocando Linear/Notion/Slack pero con personalidad propia.

## 2. Design Language

### Aesthetic Direction
Inspiración: Linear + Notion + Slack. Minimalismo funcional con acentos de color estratégicos. Cards flotantes, sombras sutiles, bordes redondeados suaves.

### Color Palette (basado en Aumentta)
```
--primary:        #4F46E5   (Indigo - tecnología, confianza)
--primary-dark:   #3730A3   (Indigo oscuro - hover states)
--primary-light:  #818CF8   (Indigo claro - backgrounds)
--accent:         #F59E0B   (Amber - energía, CTAs)
--accent-dark:    #D97706   (Amber oscuro)
--success:        #10B981   (Verde - completado)
--warning:        #F59E0B   (Amber - en progreso)
--error:          #EF4444   (Rojo - errores)
--bg-primary:     #FFFFFF   (Blanco)
--bg-secondary:   #F9FAFB   (Gris muy claro)
--bg-tertiary:    #F3F4F6   (Gris claro)
--text-primary:   #111827   (Gris muy oscuro)
--text-secondary: #6B7280   (Gris medio)
--text-muted:     #9CA3AF   (Gris claro)
--border:         #E5E7EB   (Borde sutil)
```

### Typography
- **Headings**: Inter (700, 600) - limpia, moderna, profesional
- **Body**: Inter (400, 500) - legibilidad óptima
- **Code/Mono**: JetBrains Mono - para fragmentos de código
- **Scale**: 12 / 14 / 16 / 20 / 24 / 32 / 48px

### Spatial System
- Base unit: 4px
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64px
- Border radius: 6px (small), 8px (medium), 12px (large), 16px (xl)
- Card padding: 24px

### Motion Philosophy
- **Micro-interactions**: 150ms ease-out (hover, focus)
- **Transitions**: 200ms ease-in-out (panel slides, modals)
- **Loading states**: pulse animation 1.5s
- **Messages**: slide-in 200ms ease-out
- Principio: movimiento sutil que confirma acciones, nunca distrae

### Visual Assets
- **Icons**: Lucide React (consistent stroke width, 24px default)
- **Avatars**: Initials con gradiente de fondo
- **Status indicators**: dots de 8px con color semántico
- **Empty states**: illustrations with muted colors + icon

## 3. Layout & Structure

### Page Structure
```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + Nav + User Menu                         │
├────────────┬────────────────────────────────────────────┤
│            │                                            │
│  Sidebar   │         Main Content Area                  │
│  (240px)   │         (fluid)                            │
│            │                                            │
│  - Dashboard│                                           │
│  - Projects │                                           │
│  - Chat    │                                            │
│  - Tasks   │                                            │
│  - Settings│                                            │
│            │                                            │
└────────────┴────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1280px+)**: Sidebar visible, 3-column layouts
- **Tablet (768-1279px)**: Sidebar collapsible, 2-column
- **Mobile (<768px)**: Bottom nav, single column, full-width cards

### Visual Pacing
- Dashboard: Grid de métricas + actividad reciente
- Chat: Full-height con sidebar de conversaciones
- Proyectos: Lista con progress bars + expandibles

## 4. Features & Interactions

### 4.1 Authentication
- **Login**: Email + password, JWT tokens
- **Logout**: Clear session, redirect to login
- **Session**: Auto-refresh token, 7-day expiry
- **Error states**: "Credenciales inválidas", "Sesión expirada"

### 4.2 Dashboard Principal
- **Project Status Card**: Progress bar (%), estado actual
- **Quick Stats**: Tareas completadas, mensajes sin leer, incidencias abiertas
- **Recent Activity**: Timeline de últimas acciones
- **Quick Actions**: Nuevo ticket, ver proyecto, contactar

### 4.3 Chat Inteligente
- **Message Types**: Texto, código, adjuntos, system
- **AI Responses**: Badge "IA" en respuestas automáticas
- **Message Status**: Enviado, leído (checkmarks)
- **Typing Indicator**: "IA está escribiendo..."
- **Actions**: Adjuntar archivo, enviar, eliminar propio mensaje

### 4.4 Estado del Proyecto
- **Header**: Nombre, cliente, fecha inicio, fecha estimada
- **Progress Section**: Barra de progreso + porcentaje + estado
- **Task Breakdown**: Lista de tareas con checkboxes
- **Services**: Lista de servicios contratados con costes

### 4.5 Panel de Tareas
- **Tabs**: Todas / Pendientes / En Progreso / Completadas
- **Task Card**: Título, descripción, prioridad, fecha límite
- **Priority Badges**: Alta (rojo), Media (amber), Baja (gris)
- **Filters**: Por fecha, por prioridad, por estado

### 4.6 Motor IA (Nivel MVP)
- **Clasificación Automática**:
  - Consulta → Respuesta FAQ
  - Incidencia → Análisis + propuesta
  - Cambio → Registro para revisión
- **Análisis de Código**: Buscar errores relacionados, proponer solución
- **Propuesta**: Genera patch/modificación
- **Validación**: Botón "Aprobar" / "Rechazar" para cambios
- **Logging**: Todas las acciones IA quedan registradas

### 4.7 Incidencias
- **Crear Incidencia**: Título, descripción, prioridad, screenshots
- **Estados**: Abierta → En análisis → Solucionada → Cerrada
- **Hilo de Conversación**: Cada incidencia tiene su chat
- **Propuesta IA**: Se muestra en expandable "Ver análisis IA"

## 5. Component Inventory

### Button
- **Variants**: primary, secondary, ghost, danger
- **Sizes**: sm (32px), md (40px), lg (48px)
- **States**: default, hover (darken 10%), active (darken 15%), disabled (opacity 50%), loading (spinner)
- **Icons**: left or right icon slot

### Input
- **Types**: text, email, password, textarea
- **States**: default, focus (ring primary), error (ring red), disabled
- **Addons**: left icon, right icon/button

### Card
- **Variants**: default (white bg), elevated (shadow-md), bordered
- **Padding**: 16px, 24px
- **Header**: Optional title + actions slot

### Badge
- **Variants**: primary, success, warning, error, neutral
- **Size**: sm (20px height), md (24px)
- **Dot variant**: 8px circle + text

### Avatar
- **Sizes**: sm (32px), md (40px), lg (56px)
- **Types**: image, initials with gradient bg
- **Status dot**: online, away, offline

### Message Bubble
- **Variants**: sent (primary bg), received (gray bg)
- **Timestamp**: below bubble, muted
- **AI Badge**: small "IA" pill

### Progress Bar
- **Height**: 8px
- **Variants**: single color, segmented
- **Label**: percentage above or inline

### Sidebar Nav Item
- **States**: default, hover, active (primary bg + left border)
- **Icon + Label**: 24px icon, 14px label
- **Badge**: optional count badge right

### Modal
- **Sizes**: sm (400px), md (560px), lg (720px)
- **Overlay**: bg black/50
- **Animation**: fade in + scale from 95%

### Toast Notification
- **Variants**: success, error, warning, info
- **Position**: top-right
- **Duration**: 5s auto-dismiss
- **Actions**: dismiss, action button

## 6. Technical Approach

### Stack Recomendado
```
Frontend:  Next.js 14 (App Router) + TypeScript
Styling:   Tailwind CSS
UI Lib:    shadcn/ui (Radix primitives)
State:     Zustand (client) + React Query (server)
Chat:      Socket.io or Pusher
Auth:      NextAuth.js with JWT
Backend:   Node.js API Routes (o separado si escala)
Database:  PostgreSQL + Prisma
AI:        Minimax M2.7 API (HTTP calls)
```

### Data Model

```typescript
// User (employee of Aumentta)
User {
  id, email, name, role: 'admin' | 'agent', avatar
}

// Client (external customer)
Client {
  id, name, email, company, phone, createdAt
}

// Project
Project {
  id, clientId, name, description,
  status: 'pending' | 'in_progress' | 'review' | 'completed',
  progress: 0-100, startDate, endDate, createdAt
}

// Task
Task {
  id, projectId, title, description,
  status: 'todo' | 'in_progress' | 'done',
  priority: 'low' | 'medium' | 'high',
  dueDate, createdAt
}

// Service (contracted by client)
Service {
  id, projectId, name, description, cost, frequency: 'monthly' | 'one_time'
}

// Message
Message {
  id, chatId, senderId, senderType: 'client' | 'user' | 'ai',
  content, attachments, createdAt
}

// Chat/Conversation
Chat {
  id, clientId, projectId, type: 'support' | 'incident' | 'general',
  lastMessageAt, createdAt
}

// Incident
Incident {
  id, projectId, title, description,
  status: 'open' | 'analyzing' | 'proposed' | 'resolved' | 'closed',
  priority: 'low' | 'medium' | 'high',
  aiAnalysis, proposedSolution, createdAt
}

// CodeSnapshot (for AI analysis)
CodeSnapshot {
  id, projectId, files: JSON, version, createdAt
}

// AIActionLog
AIActionLog {
  id, incidentId, action, input, output, validated: boolean,
  createdAt
}
```

### API Endpoints

```
Auth:
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

Clients:
GET    /api/clients
GET    /api/clients/:id
POST   /api/clients

Projects:
GET    /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id

Tasks:
GET    /api/projects/:id/tasks
POST   /api/projects/:id/tasks
PUT    /api/tasks/:id

Messages:
GET    /api/chats/:id/messages
POST   /api/chats/:id/messages

Incidents:
GET    /api/incidents
POST   /api/incidents
PUT    /api/incidents/:id
POST   /api/incidents/:id/analyze (triggers AI)

AI:
POST   /api/ai/analyze (general chat AI)
POST   /api/ai/classify (classifies message type)
```

### Security
- JWT con expiry 7 días
- Refresh token rotation
- Cliente solo ve sus propios datos (multi-tenant)
- Rate limiting en API
- CSRF protection
- Input sanitization

### AI Integration (Minimax M2.7)
```
1. Client sends message
2. Server classifies intent:
   - FAQ → auto-response
   - Incident → create incident + AI analyze
   - Change request → create ticket for human review
   - General → AI responds
3. AI Analysis:
   - Get relevant code snapshot
   - Send to Minimax M2.7 with context
   - Store proposed solution
   - Notify human for validation
4. Human validates → executes change or responds
```

## 7. MVP Scope

Para empezar rápido:

**Incluido:**
- ✅ Login con email/password
- ✅ Dashboard básico con estado de proyecto
- ✅ Chat con IA (respuestas automáticas simples)
- ✅ Lista de tareas (lectura)
- ✅ Estados de incidencias (visualización)
- ✅ Panel de perfil de cliente

**Excluido inicialmente:**
- ❌ Ejecución automática de código
- ❌ Integración real con repositorios
- ❌ Notificaciones push
- ❌ App móvil
- ❌ Facturación detallada
- ❌ Deploy automático

## 8. File Structure

```
/aumentta-portal
├── SPEC.md
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (login redirect)
│   │   ├── (auth)/
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (dashboard home)
│   │   │   ├── projects/[id]/page.tsx
│   │   │   ├── chat/page.tsx
│   │   │   ├── tasks/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── clients/route.ts
│   │       ├── projects/route.ts
│   │       ├── tasks/route.ts
│   │       ├── messages/route.ts
│   │       ├── incidents/route.ts
│   │       └── ai/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── mobile-nav.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-card.tsx
│   │   │   ├── project-card.tsx
│   │   │   └── activity-list.tsx
│   │   ├── chat/
│   │   │   ├── chat-window.tsx
│   │   │   ├── message-bubble.tsx
│   │   │   └── chat-input.tsx
│   │   ├── projects/
│   │   │   ├── project-header.tsx
│   │   │   ├── progress-bar.tsx
│   │   │   └── task-list.tsx
│   │   └── incidents/
│   │       ├── incident-card.tsx
│   │       └── ai-analysis.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── ai-client.ts
│   │   └── utils.ts
│   ├── stores/
│   │   ├── auth-store.ts
│   │   └── chat-store.ts
│   └── types/
│       └── index.ts
└── public/
    └── favicon.ico
```
