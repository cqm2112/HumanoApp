# HumanoApp - Prueba Técnica

Hola, espero que esta prueba sea de su agrado. Aproveché para añadirle un toque personal con algunas funciones extra que muestran mejor lo que puedo hacer. Le puse cariño a la parte visual con fondos animados y también sumé una lógica interesante para gestionar productos públicos y privados.

## Stack Tecnológico

**Backend:**
- ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication

**Frontend:**
- React + TypeScript
- Redux Toolkit
- Framer Motion
- Tailwind CSS
- Vite

## Requisitos

- .NET 8.0 SDK
- Node.js (v18+)
- SQL Server (opcional - ya tengo una BD desplegada)

## Cómo Correr el Proyecto

### Backend

Para facilitar las pruebas, ya desplegué la base de datos en un hosting. Solo necesita:

```bash
cd server
dotnet restore
dotnet run
```

El servidor corre en `https://localhost:7293`

**Si prefiere usar una BD local:**

1. Crea una base de datos llamada `Humano` en SQL Server
2. Reemplaza el `ConnectionString` en `server/appsettings.json`:
   ```json
   "DefaultConnection": "Server=localhost;Database=Humano;Trusted_Connection=True;TrustServerCertificate=True;"
   ```
3. Ejecuta las migraciones:
   ```bash
   dotnet ef database update
   ```

### Frontend

```bash
cd client
npm install
npm run dev
```

El cliente corre en `http://localhost:5173`



## Documentación API

Swagger UI disponible en:
- Local: `http://localhost:7293/swagger`
- Producción: `https://crisquiroz-001-site1.qtempurl.com/swagger`



## Estructura del Proyecto

```
HumanoApp/
├── server/              # Backend ASP.NET Core
│   ├── Controllers/     # Endpoints de la API
│   ├── Models/          # Modelos de datos
│   ├── Services/        # Servicios (JWT, etc.)
│   └── Data/            # DbContext
└── client/              # Frontend React
    ├── src/
    │   ├── components/  # Componentes reutilizables
    │   ├── pages/       # Páginas de la app
    │   ├── features/    # Redux slices
    │   └── contexts/    # Context providers
    └── public/
```

## Contacto

[Encuesta de Prueba](https://forms.gle/FRAgPHbeMP21sYz78)
